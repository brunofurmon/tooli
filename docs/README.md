# 📚 Tooli Documentation

Welcome to the comprehensive documentation for the Tooli platform. This documentation is organized to help you quickly find the information you need.

## 🗂️ Documentation Structure

```
docs/
├── README.md              # This index file
├── user/                  # End-user documentation
│   └── getting-started.md # User getting started guide
├── developer/             # Developer documentation
│   └── development-guide.md # Comprehensive developer guide
├── interactive/           # Interactive examples and demos
│   └── examples.md        # Code examples and demos
└── automated/             # Generated documentation
    └── api-reference.md   # API documentation (auto-generated)
```

## 🎯 Quick Navigation

### For End Users

- **[Getting Started](./user/getting-started.md)** - Learn how to use Tooli
- **Installation Guide** - Set up Tooli on your system
- **User Manual** - Complete feature guide

### For Developers

- **[Development Guide](./developer/development-guide.md)** - Complete developer documentation
- **API Reference** - Technical API documentation
- **Architecture Guide** - System design and structure

### For Contributors

- **Contributing Guide** - How to contribute to Tooli
- **Code Standards** - Coding conventions and standards
- **Testing Guide** - Testing strategies and practices

## 🚀 Quick Start

### For Users

1. **[Installation](./user/getting-started.md#installation)** - Set up Tooli
2. **[Running the Application](./user/getting-started.md#running-the-application)** - Start using Tooli
3. **[Using the Spinning Wheel](./user/getting-started.md#using-the-spinning-wheel)** - Learn the basics

### For Developers

1. **[Development Setup](./developer/development-guide.md#development-setup)** - Set up your development environment
2. **[Development Workflow](./developer/development-guide.md#development-workflow)** - Learn the development process
3. **[Testing Strategy](./developer/development-guide.md#testing-strategy)** - Understand testing approaches

## 🎮 Features Overview

### Core Features

- **Spinning Wheel**: Interactive wheel component with smooth animations
- **Audio System**: Comprehensive audio management and playback
- **History Tracking**: User interaction and session history
- **Shared UI Components**: Reusable design system

### Technical Features

- **Multi-Agent Development**: AI-powered development workflow
- **Monorepo Architecture**: Scalable codebase management
- **Comprehensive Testing**: Unit, integration, and E2E tests
- **Quality Assurance**: Automated linting, formatting, and type checking

## 🛠️ Available Scripts

### Development

```bash
npm run wheel:dev      # Start development server with wheel focus
npm run dev            # Standard development server
npm run start          # Start production server
```

### Building

```bash
npm run wheel:build    # Build main application
npm run build:all      # Build all projects
npm run libs:build     # Build all libraries
```

### Testing

```bash
npm run test           # Run all tests
npm run test:affected  # Test affected projects
npm run test:coverage  # Tests with coverage
npm run e2e            # End-to-end tests
```

### Quality Assurance

```bash
npm run lint           # Lint all projects
npm run lint:fix       # Fix linting issues
npm run typecheck      # Type checking
npm run format         # Format code
```

## 🏛️ Multi-Agent Development

This project uses a sophisticated multi-agent development workflow:

- **🏗️ Atlas** - Architecture and monorepo structure
- **🕵️ Shadow** - Market research and competitive analysis
- **👩‍💻 Nova** - TypeScript implementation
- **🔍 Echo** - Code review and quality assurance
- **✅ Pulse** - Testing and quality validation
- **🔒 Cipher** - Security architecture and compliance
- **📚 Scroll** - Documentation and user guides

## 📦 Project Structure

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

## 🔧 Configuration

### Environment Variables

```env
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=Tooli
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_ENABLE_AUDIO=true
NEXT_PUBLIC_ENABLE_HISTORY=true
```

### Pre-commit Hooks

The project includes automated pre-commit hooks that run:

1. **Linting**: ESLint and Prettier on staged files
2. **Testing**: Tests for affected projects
3. **Building**: Build verification for affected projects

## 🧪 Testing Strategy

### Test Types

- **Unit Tests**: Jest-based tests for individual components
- **Integration Tests**: Component and service integration tests
- **End-to-End Tests**: Playwright-based E2E tests
- **Type Checking**: TypeScript strict mode validation

### Running Tests

```bash
npm run test             # All tests
npm run test:affected    # Affected projects only
npm run test:coverage    # With coverage report
npm run e2e              # End-to-end tests
```

## 🚀 Deployment

### Production Build

```bash
npm run wheel:build      # Build for production
npm run wheel:start      # Serve production build
```

### Deployment Checklist

- [ ] All tests pass
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Build succeeds
- [ ] Security review completed
- [ ] Documentation updated

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

- **Documentation**: Browse the documentation sections above
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join community discussions
- **Code Review**: Request code review from the team

### Resources

- [Nx Documentation](https://nx.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

<div align="center">
  <p><strong>Happy coding and spinning! 🎯</strong></p>
  <p>Built with ❤️ using modern web technologies</p>
</div>
