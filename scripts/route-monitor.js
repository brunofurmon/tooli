#!/usr/bin/env node

const http = require('http');
const https = require('https');
const { spawn } = require('child_process');

class RouteMonitor {
  constructor(baseUrl = 'http://localhost:3000', checkInterval = 10000) {
    this.baseUrl = baseUrl;
    this.checkInterval = checkInterval;
    this.isMonitoring = false;
    this.consecutiveFailures = 0;
    this.maxFailures = 3;
    this.devServerProcess = null;
  }

  async checkRoute(path, expectedStatus = 200) {
    return new Promise((resolve) => {
      const url = `${this.baseUrl}${path}`;
      const client = url.startsWith('https') ? https : http;

      const req = client.get(
        {
          hostname: 'localhost',
          port: 3000,
          path: path,
          timeout: 5000,
        },
        (res) => {
          resolve({
            path,
            status: res.statusCode,
            expected: expectedStatus,
            success: res.statusCode === expectedStatus,
            timestamp: new Date().toISOString(),
          });
        }
      );

      req.on('error', (error) => {
        resolve({
          path,
          status: 'ERROR',
          expected: expectedStatus,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString(),
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          path,
          status: 'TIMEOUT',
          expected: expectedStatus,
          success: false,
          error: 'Request timeout',
          timestamp: new Date().toISOString(),
        });
      });
    });
  }

  async runHealthCheck() {
    console.log(
      `🔍 [${new Date().toLocaleTimeString()}] Running route health check...`
    );

    const criticalRoutes = [
      { path: '/', expected: 200, name: 'Root Route' },
      { path: '/about', expected: 200, name: 'About Route' },
      { path: '/health', expected: 200, name: 'Health Check' },
      { path: '/api/health', expected: 200, name: 'API Health Check' },
    ];

    const criticalAssets = [
      {
        path: '/_next/static/css/app/layout.css',
        expected: 200,
        name: 'CSS Assets',
      },
      {
        path: '/_next/static/chunks/main-app.js',
        expected: 200,
        name: 'JS Assets',
      },
      {
        path: '/_next/static/chunks/app-pages-internals.js',
        expected: 200,
        name: 'App Pages Internals',
      },
    ];

    const allChecks = [...criticalRoutes, ...criticalAssets];
    const results = [];

    for (const check of allChecks) {
      const result = await this.checkRoute(check.path, check.expected);
      results.push(result);

      if (result.success) {
        console.log(`✅ ${check.name}: OK (${result.status})`);
      } else {
        console.log(
          `❌ ${check.name}: FAILED (${result.status}, expected ${check.expected})`
        );
        if (result.error) {
          console.log(`   Error: ${result.error}`);
        }
      }
    }

    const failedChecks = results.filter((r) => !r.success);
    const hasCriticalFailures = failedChecks.length > 0;

    if (hasCriticalFailures) {
      this.consecutiveFailures++;
      console.log(
        `🚨 Critical failures detected! (${this.consecutiveFailures}/${this.maxFailures})`
      );

      if (this.consecutiveFailures >= this.maxFailures) {
        console.log(
          '🔄 Maximum failures reached. Restarting development server...'
        );
        await this.restartDevServer();
      }
    } else {
      this.consecutiveFailures = 0;
      console.log('✅ All routes healthy');
    }

    return { success: !hasCriticalFailures, results };
  }

  async restartDevServer() {
    console.log('🛑 Stopping development server...');

    // Kill existing nx dev processes
    const killProcess = spawn('pkill', ['-f', 'nx dev']);
    await new Promise((resolve) => {
      killProcess.on('close', resolve);
    });

    // Wait a moment for processes to fully stop
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('🚀 Starting development server...');

    // Start new dev server
    this.devServerProcess = spawn('npm', ['run', 'wheel:dev'], {
      stdio: 'inherit',
      shell: true,
    });

    // Wait for server to start
    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log('✅ Development server restarted');
    this.consecutiveFailures = 0;
  }

  startMonitoring() {
    if (this.isMonitoring) {
      console.log('⚠️  Monitoring already active');
      return;
    }

    console.log('🚀 Starting automated route monitoring...');
    console.log(`📍 Monitoring: ${this.baseUrl}`);
    console.log(`⏱️  Check interval: ${this.checkInterval}ms`);
    console.log(
      `🔄 Auto-restart after ${this.maxFailures} consecutive failures`
    );
    console.log('');

    this.isMonitoring = true;

    const runCheck = async () => {
      if (!this.isMonitoring) return;

      try {
        await this.runHealthCheck();
      } catch (error) {
        console.error('❌ Monitoring error:', error.message);
      }

      if (this.isMonitoring) {
        setTimeout(runCheck, this.checkInterval);
      }
    };

    // Start the monitoring loop
    runCheck();

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Stopping route monitoring...');
      this.isMonitoring = false;
      if (this.devServerProcess) {
        this.devServerProcess.kill();
      }
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log('\n🛑 Stopping route monitoring...');
      this.isMonitoring = false;
      if (this.devServerProcess) {
        this.devServerProcess.kill();
      }
      process.exit(0);
    });
  }

  stopMonitoring() {
    this.isMonitoring = false;
    console.log('🛑 Route monitoring stopped');
  }
}

// Run monitoring if this script is executed directly
if (require.main === module) {
  const baseUrl = process.argv[2] || 'http://localhost:3000';
  const checkInterval = parseInt(process.argv[3]) || 10000;

  const monitor = new RouteMonitor(baseUrl, checkInterval);
  monitor.startMonitoring();
}

module.exports = RouteMonitor;
