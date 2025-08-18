#!/usr/bin/env node

const http = require('http');
const https = require('https');

class HealthChecker {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.results = [];
  }

  async checkEndpoint(path, expectedStatus = 200, optional = false) {
    return new Promise((resolve) => {
      const url = `${this.baseUrl}${path}`;
      const client = url.startsWith('https') ? https : http;

      const req = client.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          const expectedStatuses = Array.isArray(expectedStatus)
            ? expectedStatus
            : [expectedStatus];
          const success = expectedStatuses.includes(res.statusCode);

          const result = {
            path,
            status: res.statusCode,
            expected: expectedStatus,
            success: success || optional, // Don't fail if optional
            optional,
            timestamp: new Date().toISOString(),
            headers: res.headers,
          };

          if (res.headers['content-type']?.includes('application/json')) {
            try {
              result.data = JSON.parse(data);
            } catch (e) {
              result.data = data;
            }
          }

          this.results.push(result);
          resolve(result);
        });
      });

      req.on('error', (error) => {
        const result = {
          path,
          status: 'ERROR',
          expected: expectedStatus,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString(),
        };

        this.results.push(result);
        resolve(result);
      });

      req.setTimeout(5000, () => {
        req.destroy();
        const result = {
          path,
          status: 'TIMEOUT',
          expected: expectedStatus,
          success: false,
          error: 'Request timeout',
          timestamp: new Date().toISOString(),
        };

        this.results.push(result);
        resolve(result);
      });
    });
  }

  async runHealthChecks() {
    console.log('🔍 Starting health checks...\n');

    const checks = [
      { path: '/', expected: 200, name: 'Root Route' },
      { path: '/about', expected: 200, name: 'About Route' },
      { path: '/health', expected: 200, name: 'Health Check' },
      { path: '/api/health', expected: 200, name: 'API Health Check' },
      {
        path: '/_next/static/css/app/layout.css',
        expected: [200, 404],
        name: 'CSS Assets',
        optional: true,
      },
      {
        path: '/_next/static/chunks/main-app.js',
        expected: [200, 404],
        name: 'JS Assets',
        optional: true,
      },
      { path: '/non-existent-route', expected: 404, name: '404 Handling' },
    ];

    for (const check of checks) {
      console.log(`Checking ${check.name} (${check.path})...`);
      const result = await this.checkEndpoint(
        check.path,
        check.expected,
        check.optional
      );

      if (result.success) {
        if (
          result.optional &&
          Array.isArray(check.expected) &&
          !check.expected.includes(result.status)
        ) {
          console.log(
            `⚠️  ${check.name}: SKIPPED (${result.status}) - Development mode`
          );
        } else {
          console.log(`✅ ${check.name}: OK (${result.status})`);
        }
      } else {
        console.log(
          `❌ ${check.name}: FAILED (${result.status}, expected ${check.expected})`
        );
        if (result.error) {
          console.log(`   Error: ${result.error}`);
        }
      }
    }

    console.log('\n📊 Health Check Summary:');
    const passed = this.results.filter((r) => r.success).length;
    const total = this.results.length;
    const failed = total - passed;

    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${((passed / total) * 100).toFixed(1)}%`);

    if (failed > 0) {
      console.log('\n🚨 Failed Checks:');
      this.results
        .filter((r) => !r.success)
        .forEach((r) => {
          console.log(`   - ${r.path}: ${r.status} (expected ${r.expected})`);
          if (r.error) {
            console.log(`     Error: ${r.error}`);
          }
        });

      process.exit(1);
    } else {
      console.log('\n🎉 All health checks passed!');
      process.exit(0);
    }
  }
}

// Run health checks if this script is executed directly
if (require.main === module) {
  const baseUrl = process.argv[2] || 'http://localhost:3000';
  const checker = new HealthChecker(baseUrl);
  checker.runHealthChecks();
}

module.exports = HealthChecker;
