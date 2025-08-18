# 🎯 Tooli - Interactive Platform with Spinning Wheel

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Nx-143055?style=for-the-badge&logo=nx&logoColor=white" alt="Nx" />
</div>

## 🚀 Overview

Tooli is an interactive platform featuring a spinning wheel component, built with modern web technologies. The project uses a monorepo structure powered by Nx, providing a scalable and maintainable codebase.

## 🏗️ Architecture

The project is organized as a monorepo with the following structure:

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
└── docs/               # Project documentation
```

## 🎮 Features

- **Spinning Wheel**: Interactive wheel component with smooth animations
- **Audio System**: Comprehensive audio management and playback
- **History Tracking**: User interaction and session history
- **Shared UI Components**: Reusable design system
- **Multi-Agent Development**: AI-powered development workflow

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tooli

# Install dependencies
npm install

# Set up pre-commit hooks
npm run prepare
```

### Development

```bash
# Start the development server with spinning wheel
npm run wheel:dev

# Or use the standard dev command
npm run dev
```

The application will be available at `http://localhost:3000`

### Building

```bash
# Build the main application
npm run wheel:build

# Build all projects
npm run build:all
```

### Testing

```bash
# Run all tests
npm run test

# Run tests for affected projects only
npm run test:affected

# Run tests with coverage
npm run test:coverage

# Run end-to-end tests
npm run e2e
```

### Linting and Formatting

```bash
# Lint all projects
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

## 📦 Available Scripts

### Development Scripts

- `npm run dev` - Start development server
- `npm run wheel:dev` - Start development server on port 3000
- `npm run start` - Start production server
- `npm run wheel:start` - Start production server on port 3000

### Build Scripts

- `npm run build` - Build main application
- `npm run wheel:build` - Build main application
- `npm run build:all` - Build all projects
- `npm run libs:build` - Build all libraries

### Test Scripts

- `npm run test` - Run all tests
- `npm run test:affected` - Run tests for affected projects
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run wheel:test` - Test main application
- `npm run libs:test` - Test all libraries
- `npm run e2e` - Run end-to-end tests
- `npm run e2e:affected` - Run e2e tests for affected projects

### Quality Assurance Scripts

- `npm run lint` - Lint all projects
- `npm run lint:fix` - Fix linting issues
- `npm run libs:lint` - Lint all libraries
- `npm run typecheck` - Type check all projects
- `npm run format` - Format code
- `npm run format:check` - Check code formatting

### Utility Scripts

- `npm run clean` - Clean Nx cache
- `npm run graph` - Show project dependency graph
- `npm run affected:graph` - Show affected projects graph
- `npm run precommit` - Run pre-commit checks

## 🔧 Pre-commit Hooks

The project includes pre-commit hooks that automatically run:

1. **Linting**: ESLint and Prettier on staged files
2. **Testing**: Tests for affected projects
3. **Building**: Build verification for affected projects

These hooks ensure code quality and prevent broken builds from being committed.

## 🏛️ Multi-Agent Development

This project uses a sophisticated multi-agent development workflow with specialized AI agents:

- **🏗️ Atlas** - Architecture and monorepo structure
- **🕵️ Shadow** - Market research and competitive analysis
- **👩‍💻 Nova** - TypeScript implementation
- **🔍 Echo** - Code review and quality assurance
- **✅ Pulse** - Testing and quality validation
- **🔒 Cipher** - Security architecture and compliance
- **📚 Scroll** - Documentation and user guides

## 📚 Documentation

- [User Documentation](./docs/user/) - End-user guides and tutorials
- [Developer Documentation](./docs/developer/) - Technical implementation details
- [Interactive Documentation](./docs/interactive/) - Interactive examples and demos
- [Automated Documentation](./docs/automated/) - Generated documentation

## 🧪 Testing Strategy

The project implements a comprehensive testing strategy:

- **Unit Tests**: Jest-based unit tests for all libraries
- **Integration Tests**: Component and service integration tests
- **End-to-End Tests**: Playwright-based E2E tests
- **Type Checking**: TypeScript strict mode validation
- **Linting**: ESLint with custom rules for code quality

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run wheel:build

# Serve production build
npm run wheel:start
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Application configuration
NEXT_PUBLIC_APP_NAME=Tooli
NEXT_PUBLIC_APP_VERSION=1.0.0

# API endpoints
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the multi-agent workflow
4. Run tests: `npm run test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the [docs](./docs/) directory
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Discussions**: Join the community discussions

## 🔗 Links

- [Nx Documentation](https://nx.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

<div align="center">
  <p>Built with ❤️ using modern web technologies</p>
  <p>Powered by <a href="https://nx.dev">Nx</a> and <a href="https://nextjs.org">Next.js</a></p>
</div>
