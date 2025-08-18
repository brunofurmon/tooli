# 👨‍💻 Developer Guide

This guide provides comprehensive information for developers working on the Tooli platform.

## 🏗️ Project Architecture

### Monorepo Structure

Tooli uses Nx as a monorepo management tool with the following structure:

```
tooli/
├── apps/
│   ├── tooli/           # Main Next.js application
│   └── tooli-e2e/       # End-to-end tests
├── libs/
│   ├── audio-system/    # Audio management system
│   ├── history-tracker/ # User interaction history
│   ├── shared-ui/       # Reusable UI components
│   └── wheel-engine/    # Spinning wheel logic
├── docs/               # Project documentation
├── .husky/            # Git hooks
└── nx.json            # Nx configuration
```

### Technology Stack

- **Frontend**: React 19, Next.js 15, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Testing**: Jest, Playwright
- **Build Tool**: Nx, Vite
- **Linting**: ESLint, Prettier
- **Package Manager**: npm

## 🚀 Development Setup

### Prerequisites

```bash
# Required versions
Node.js >= 18
npm >= 8
Git >= 2.0
```

### Initial Setup

```bash
# Clone and install
git clone <repository-url>
cd tooli
npm install

# Set up pre-commit hooks
npm run prepare
```

### Environment Configuration

Create `.env.local` in the root directory:

```env
# Development settings
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=Tooli
NEXT_PUBLIC_APP_VERSION=1.0.0

# API configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Feature flags
NEXT_PUBLIC_ENABLE_AUDIO=true
NEXT_PUBLIC_ENABLE_HISTORY=true
```

## 🛠️ Development Workflow

### Starting Development

```bash
# Start development server
npm run wheel:dev

# Alternative commands
npm run dev              # Standard dev server
npm run docs:dev         # Documentation server
```

### Available Scripts

#### Development Scripts

```bash
npm run dev              # Start development server
npm run wheel:dev        # Start with wheel focus
npm run start            # Start production server
npm run wheel:start      # Start production with wheel
```

#### Build Scripts

```bash
npm run build            # Build main app
npm run wheel:build      # Build with wheel focus
npm run build:all        # Build all projects
npm run libs:build       # Build all libraries
```

#### Test Scripts

```bash
npm run test             # Run all tests
npm run test:affected    # Test affected projects
npm run test:watch       # Watch mode tests
npm run test:coverage    # Tests with coverage
npm run e2e              # End-to-end tests
```

#### Quality Assurance

```bash
npm run lint             # Lint all projects
npm run lint:fix         # Fix linting issues
npm run typecheck        # Type checking
npm run format           # Format code
npm run format:check     # Check formatting
```

### Multi-Agent Development Workflow

This project uses a sophisticated multi-agent development approach:

1. **Planning Phase**: All agents provide input on architecture and approach
2. **Implementation**: Nova handles TypeScript implementation
3. **Review**: Echo and Cipher review code and security
4. **QA**: Pulse validates with tests, Cipher checks security, Scroll reviews docs
5. **Final Approval**: All agents sign off before user commits

## 📦 Library Development

### Audio System (`libs/audio-system`)

Handles all audio-related functionality:

```typescript
// Example usage
import { AudioManager } from '@tooli/audio-system';

const audioManager = new AudioManager();
audioManager.playSound('wheel-spin');
```

### History Tracker (`libs/history-tracker`)

Manages user interaction history:

```typescript
// Example usage
import { HistoryTracker } from '@tooli/history-tracker';

const tracker = new HistoryTracker();
tracker.recordSpin({ timestamp: Date.now(), result: 'winner' });
```

### Shared UI (`libs/shared-ui`)

Reusable UI components:

```typescript
// Example usage
import { Button, Card } from '@tooli/shared-ui';

<Card>
  <Button variant="primary">Spin Wheel</Button>
</Card>;
```

### Wheel Engine (`libs/wheel-engine`)

Core spinning wheel logic:

```typescript
// Example usage
import { WheelEngine } from '@tooli/wheel-engine';

const wheel = new WheelEngine();
wheel.spin().then((result) => console.log(result));
```

## 🧪 Testing Strategy

### Unit Tests

```bash
# Run unit tests for specific library
npm run test audio-system
npm run test history-tracker
npm run test shared-ui
npm run test wheel-engine

# Run all unit tests
npm run test
```

### Integration Tests

```bash
# Test the main application
npm run test tooli

# Test with coverage
npm run test:coverage
```

### End-to-End Tests

```bash
# Run E2E tests
npm run e2e

# Run E2E tests for affected projects
npm run e2e:affected
```

### Test Structure

```
libs/
├── audio-system/
│   └── src/
│       └── lib/
│           ├── audio-system.ts
│           └── audio-system.spec.ts
├── history-tracker/
│   └── src/
│       └── lib/
│           ├── history-tracker.ts
│           └── history-tracker.spec.ts
└── ...
```

## 🔧 Code Quality

### Linting

ESLint configuration is shared across all projects:

```bash
# Lint all projects
npm run lint

# Lint specific project
nx lint tooli

# Fix linting issues
npm run lint:fix
```

### Prettier

Code formatting is enforced:

```bash
# Format all code
npm run format

# Check formatting
npm run format:check
```

### Type Checking

TypeScript strict mode is enabled:

```bash
# Type check all projects
npm run typecheck

# Type check specific project
nx typecheck tooli
```

## 🔒 Security

### Security Review Process

1. **Cipher Agent**: Reviews all code for security issues
2. **OWASP Compliance**: Ensures adherence to OWASP guidelines
3. **Dependency Scanning**: Regular security audits of dependencies
4. **Code Review**: Security-focused code review process

### Security Best Practices

- Input validation and sanitization
- Secure dependency management
- Regular security updates
- Content Security Policy (CSP)
- HTTPS enforcement

## 📚 Documentation

### Documentation Standards

- **JSDoc**: All public APIs must be documented
- **README**: Each library has a comprehensive README
- **Examples**: Code examples for all major features
- **Architecture**: High-level architecture documentation

### Generating Documentation

```bash
# Build documentation
npm run docs:build

# Serve documentation
npm run docs:serve
```

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run wheel:build

# Verify build
npm run wheel:start
```

### Environment Variables

Production environment variables:

```env
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=Tooli
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_API_URL=https://api.tooli.com
```

### Deployment Checklist

- [ ] All tests pass
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Build succeeds
- [ ] Security review completed
- [ ] Documentation updated

## 🔄 Git Workflow

### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Critical fixes

### Commit Standards

```bash
# Conventional commits
feat: add new spinning wheel animation
fix: resolve audio playback issue
docs: update API documentation
test: add unit tests for wheel engine
refactor: improve audio system performance
```

### Pre-commit Hooks

Automated checks run before each commit:

1. **Linting**: ESLint and Prettier
2. **Testing**: Affected project tests
3. **Building**: Build verification

## 🐛 Debugging

### Development Tools

- **React DevTools**: Component inspection
- **Redux DevTools**: State management (if applicable)
- **Network Tab**: API request debugging
- **Console**: Error logging

### Common Issues

#### Build Failures

```bash
# Clean and rebuild
npm run clean
npm run build:all
```

#### Test Failures

```bash
# Run specific test
npm run test -- --testNamePattern="wheel engine"

# Debug mode
npm run test -- --verbose
```

#### Performance Issues

```bash
# Analyze bundle
npm run build -- --analyze

# Performance profiling
npm run dev -- --profile
```

## 🤝 Contributing

### Contribution Process

1. **Fork** the repository
2. **Create** a feature branch
3. **Follow** the multi-agent workflow
4. **Test** thoroughly
5. **Submit** a pull request

### Code Review Process

1. **Echo**: Code quality review
2. **Cipher**: Security review
3. **Pulse**: Test coverage review
4. **Scroll**: Documentation review
5. **User**: Final approval

## 📞 Support

### Getting Help

- **Documentation**: Check the [docs](../) directory
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Community discussions
- **Code Review**: Request code review from team

### Resources

- [Nx Documentation](https://nx.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

**Happy coding! 🚀**
