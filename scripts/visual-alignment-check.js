#!/usr/bin/env node

const http = require('http');
const https = require('https');

class VisualAlignmentChecker {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async getPageHTML() {
    return new Promise((resolve, reject) => {
      const client = this.baseUrl.startsWith('https') ? https : http;

      const req = client.get(this.baseUrl, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve(data);
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.setTimeout(5000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  checkAlignment(html) {
    const checks = {
      centering: {
        passed: false,
        issues: [],
        description: 'Content centering',
      },
      navigation: {
        passed: false,
        issues: [],
        description: 'Navigation layout',
      },
      theme: {
        passed: false,
        issues: [],
        description: 'Theme toggle positioning',
      },
    };

    // Check for centering classes
    const centeringClasses = [
      'justify-center',
      'items-center',
      'mx-auto',
      'flex-1',
    ];

    const hasCentering = centeringClasses.some((cls) => html.includes(cls));
    if (hasCentering) {
      checks.centering.passed = true;
    } else {
      checks.centering.issues.push(
        'Missing centering classes (justify-center, items-center, mx-auto)'
      );
    }

    // Check for proper navigation layout
    const navigationClasses = ['justify-between', 'flex-shrink-0', 'flex-1'];

    const hasNavigationLayout = navigationClasses.some((cls) =>
      html.includes(cls)
    );
    if (hasNavigationLayout) {
      checks.navigation.passed = true;
    } else {
      checks.navigation.issues.push(
        'Missing navigation layout classes (justify-between, flex-shrink-0, flex-1)'
      );
    }

    // Check for theme toggle
    const hasThemeToggle =
      html.includes('aria-label="Toggle theme"') ||
      html.includes('role="switch"');
    if (hasThemeToggle) {
      checks.theme.passed = true;
    } else {
      checks.theme.issues.push('Missing theme toggle component');
    }

    // Check for dark theme support
    const hasDarkTheme = html.includes('dark') || html.includes('theme');
    if (hasDarkTheme) {
      checks.theme.passed = checks.theme.passed && true;
    } else {
      checks.theme.issues.push('Missing dark theme support');
    }

    return checks;
  }

  async runAlignmentCheck() {
    try {
      console.log('🔍 Checking visual alignment...');

      const html = await this.getPageHTML();
      const checks = this.checkAlignment(html);

      console.log('\n📊 Visual Alignment Report:');
      console.log('============================');

      let allPassed = true;

      Object.entries(checks).forEach(([key, check]) => {
        if (check.passed) {
          console.log(`✅ ${check.description}: PASSED`);
        } else {
          console.log(`❌ ${check.description}: FAILED`);
          check.issues.forEach((issue) => {
            console.log(`   - ${issue}`);
          });
          allPassed = false;
        }
      });

      console.log('\n🎯 Specific Checks:');

      // Check for specific layout patterns
      const layoutChecks = [
        {
          pattern: 'flex items-center justify-center',
          name: 'Main content centering',
        },
        { pattern: 'justify-between', name: 'Navigation distribution' },
        { pattern: 'flex-shrink-0', name: 'Fixed width elements' },
        { pattern: 'mx-auto', name: 'Horizontal centering' },
        { pattern: 'w-full', name: 'Full width containers' },
        { pattern: 'max-w-', name: 'Max width constraints' },
      ];

      layoutChecks.forEach((check) => {
        const found = html.includes(check.pattern);
        console.log(
          `${found ? '✅' : '❌'} ${check.name}: ${found ? 'Found' : 'Missing'}`
        );
        if (!found) allPassed = false;
      });

      if (allPassed) {
        console.log('\n🎉 All visual alignment checks passed!');
        return true;
      } else {
        console.log('\n⚠️  Some visual alignment issues detected.');
        console.log(
          '💡 Consider checking the layout classes in your components.'
        );
        return false;
      }
    } catch (error) {
      console.error('❌ Error during alignment check:', error.message);
      return false;
    }
  }
}

// Run alignment check if this script is executed directly
if (require.main === module) {
  const baseUrl = process.argv[2] || 'http://localhost:3000';
  const checker = new VisualAlignmentChecker(baseUrl);
  checker.runAlignmentCheck().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = VisualAlignmentChecker;
