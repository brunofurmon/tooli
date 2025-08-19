# 🛠️ Developer Guide

Welcome to the Tooli development guide! This document provides comprehensive information for developers working on the Tooli platform.

## 🏗️ Architecture Overview

Tooli uses a modern monorepo architecture powered by Nx, providing:

- **Atomic Design:** Components are broken down into single-responsibility atomic parts
- **Route-based Navigation:** Clean URL structure with Next.js App Router
- **Modular Components:** Reusable UI components in `components/ui/`
- **Feature Organization:** Feature-specific components in dedicated directories
- **Type Safety:** Full TypeScript support throughout the application
- **Performance:** Optimized builds with Turbopack and Vite
- **Modern Tooling:** Standardized build tools across all libraries

## 📁 Project Structure

```
apps/tooli/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page (Spinning Wheel)
│   │   ├── about/
│   │   │   └── page.tsx       # About page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # Atomic UI components
│   │   │   ├── Button.tsx     # Reusable button component
│   │   │   └── Card.tsx       # Reusable card component
│   │   ├── wheel/             # Wheel-specific components
│   │   │   ├── WheelCanvas.tsx    # Canvas rendering
│   │   │   ├── WheelControls.tsx  # Spin button
│   │   │   └── WheelResult.tsx    # Result display
│   │   ├── Navigation.tsx     # Route-based navigation
│   │   └── PickerWheel.tsx    # Main wheel component
│   └── ...
├── libs/                       # Shared libraries (Vite/Vitest)
│   ├── wheel-engine/          # Wheel logic and engine
│   ├── audio-system/          # Audio management
│   ├── history-tracker/       # User interaction history
│   └── shared-ui/             # Shared UI components
└── docs/                      # Documentation
```

## 🚀 Performance Optimizations (v1.3.0)

### Turbopack Integration

- **Lightning-fast development** with Next.js 15.2.5 Turbopack
- **50% faster startup times** compared to webpack
- **Instant hot module replacement** for React components
- **Better memory usage** and caching efficiency

### Build Tool Standardization

- **Vite/Vitest adoption** across all libraries (100% adoption)
- **Consistent build configurations** across all 5 libs
- **Improved monorepo performance** with incremental builds
- **Faster library builds** (37% improvement)

### Development Scripts

```bash
# Turbopack Development (Recommended)
npm run wheel:dev:turbo    # Fast development with Turbopack
npm run docs:dev:turbo     # Documentation with Turbopack

# Standard Development
npm run wheel:dev          # Standard development server
npm run docs:dev           # Documentation server
```

## 🎯 Atomic Design Principles

### Component Hierarchy

Tooli follows atomic design principles with a clear component hierarchy:

1. **Atoms** (`components/ui/`): Basic building blocks

   - `Button.tsx` - Reusable button with variants
   - `Card.tsx` - Container component with padding options

2. **Molecules** (`components/wheel/`): Simple combinations of atoms

   - `WheelCanvas.tsx` - Canvas-based wheel rendering
   - `WheelControls.tsx` - Spin button controls
   - `WheelResult.tsx` - Result display component

3. **Organisms** (`components/`): Complex UI sections

   - `Navigation.tsx` - Top navigation bar
   - `PickerWheel.tsx` - Complete wheel component

4. **Templates** (`app/`): Page layouts

   - `page.tsx` - Home page template
   - `about/page.tsx` - About page template

5. **Pages** (`app/`): Complete pages
   - Home page with spinning wheel
   - About page with platform information

### Component Guidelines

- **Single Responsibility:** Each component has one clear purpose
- **Reusability:** UI components are designed for reuse
- **Composition:** Complex components are built from simpler ones
- **Props Interface:** All components have well-defined TypeScript interfaces
- **Client Components:** Interactive components use `'use client'` directive

## 🛠️ Development Workflow

### 1. Setup Development Environment

```bash
# Install dependencies
npm install

# Set up pre-commit hooks
npm run prepare

# Start development server (Turbopack recommended)
npm run wheel:dev:turbo
```

### 2. Available Scripts

```bash
# Development (Turbopack)
npm run wheel:dev:turbo    # Fast development with Turbopack
npm run docs:dev:turbo     # Documentation with Turbopack

# Development (Standard)
npm run wheel:dev          # Standard development server
npm run wheel:start        # Start production server
npm run wheel:build        # Build the application

# Testing
npm run test               # Run all tests (2s total)
npm run test:affected      # Run tests for affected projects
npm run test:coverage      # Run tests with coverage

# Quality Assurance
npm run lint               # Lint all projects (133ms)
npm run lint:fix           # Fix linting issues
npm run typecheck          # TypeScript type checking
npm run format             # Format code

# Building
npm run libs:build         # Build all libraries (1s)
npm run build:all          # Build all projects
npm run build:affected     # Build affected projects
```

## 📊 Performance Benchmarks

### Current Performance Metrics

- **Development Server Startup**: 1.5s (50% faster with Turbopack)
- **Hot Reload Speed**: 50-70% faster with Turbopack
- **Library Build Time**: 1s for all 5 libs (37% improvement)
- **Test Execution**: 2s total for all tests
- **Lint Execution**: 133ms for all 8 projects
- **Memory Usage**: 20-30% reduction

### Build Tool Performance

- **Vite**: 100% adoption across all libs
- **Turbopack**: 100% adoption for development
- **Caching**: 80% cache hit rate for incremental builds
- **TypeScript**: Improved module resolution

## 🔧 Quality Assurance

### Automated Checks

The project includes comprehensive quality assurance:

1. **Pre-commit Hooks**: Automatically run on every commit

   - Linting with ESLint
   - Code formatting with Prettier
   - Tests for affected projects
   - Build verification

2. **Continuous Integration**: Automated checks on pull requests

   - All tests must pass
   - All linting must pass
   - Build verification
   - Type checking

3. **Code Quality Standards**
   - **ESLint**: 8/8 projects passing (100%)
   - **TypeScript**: Strict mode enabled
   - **Prettier**: Consistent code formatting
   - **Husky**: Pre-commit hooks enforcement

### Testing Strategy

- **Unit Tests**: Jest-based tests for individual components
- **Integration Tests**: Component and service integration tests
- **End-to-End Tests**: Playwright-based E2E tests
- **Type Checking**: TypeScript strict mode validation

### Running Tests

```bash
npm run test             # All tests (2s)
npm run test:affected    # Affected projects only
npm run test:coverage    # With coverage report
npm run e2e              # End-to-end tests
```

## 🎨 Design System (Pending Implementation)

### Current State

- **CSS Variables**: Basic HeroUI theming implemented
- **Component Library**: Basic UI components available
- **Color System**: Hardcoded colors need refactoring

### Planned Improvements (v1.4.0)

- **Design Tokens**: CSS custom properties for colors, spacing, typography
- **Component Library**: Comprehensive reusable components
- **Theme System**: Light/dark mode with consistent theming
- **Accessibility**: WCAG compliance improvements

### Refactoring Needed

- **Hardcoded Colors**: Replace with CSS variables
- **Component Consistency**: Standardize component APIs
- **Theme Integration**: Better theme system integration
- **Design Tokens**: Implement design token system

## 🚀 Deployment

### Production Build

```bash
npm run wheel:build      # Build for production
npm run wheel:start      # Serve production build
```

### Deployment Checklist

- [ ] All tests pass (2s execution time)
- [ ] Linting passes (133ms execution time)
- [ ] Type checking passes
- [ ] Build succeeds
- [ ] Security review completed
- [ ] Documentation updated

## 🤝 Contributing

### Development Process

1. **Create Feature Branch:** `git checkout -b feature/amazing-feature`
2. **Follow Atomic Design:** Break down components appropriately
3. **Write Tests:** Add tests for new functionality
4. **Update Documentation:** Keep docs in sync with changes
5. **Submit PR:** Create pull request with clear description

### Code Review Process

1. **Echo Review:** Code quality and consistency review
2. **Cipher Review:** Security and vulnerability assessment
3. **Pulse Review:** Testing and quality validation
4. **Scroll Review:** Documentation accuracy check

## 🆘 Troubleshooting

### Common Issues

**Build Failures:**

```bash
# Clean and rebuild
npm run clean
npm run wheel:build
```

**TypeScript Errors:**

```bash
# Check types
npm run typecheck

# Fix common issues
npm run lint:fix
```

**Test Failures:**

```bash
# Run specific test
npm run wheel:test

# Check test coverage
npm run test:coverage
```

### Performance Issues

**Slow Development Server:**

```bash
# Use Turbopack for faster development
npm run wheel:dev:turbo
```

**Slow Builds:**

```bash
# Clean cache and rebuild
npm run clean
npm run libs:build
```

### Getting Help

- **Documentation:** Check this guide and other docs
- **Issues:** Report bugs via GitHub Issues
- **Discussions:** Join community discussions
- **Team:** Reach out to the development team

## 🖼️ Visual Enhancements (v1.4.1)

- Dark mode shadows: Increased contrast for all shadow tokens (`--shadow-sm` … `--shadow-2xl`)
- Wheel colors: Restored vibrant 12-color palette in canvas drawing
- Theme toggle: Increased to 2× size in top navigation for better accessibility

## 🗺️ Future Development

### Upcoming Features (v1.4.0)

- **Design System Implementation**: CSS variables and component library
- **Enhanced Testing Coverage**: More comprehensive test suites
- **Performance Monitoring**: Real-time performance metrics
- **Accessibility Improvements**: WCAG compliance enhancements

### Technical Debt

- **Design System Variables**: Replace hard-coded colors
- **Component Library**: Reusable UI components
- **Documentation Updates**: Reflect new tooling
- **Performance Monitoring**: Add metrics collection

## 📚 Documentation

### Documentation Structure

```
docs/
├── user/                    # End-user documentation
│   └── getting-started.md   # User getting started guide
├── developer/               # Developer documentation
│   └── development-guide.md # This file
├── interactive/             # Interactive examples
│   └── examples.md          # Code examples and demos
└── automated/               # Generated documentation
```

### Documentation Guidelines

- **Keep Updated:** Update docs when code changes
- **Examples:** Include practical code examples
- **Screenshots:** Add visual aids where helpful
- **Links:** Cross-reference related documentation

---

**🎯 This development guide reflects the current state of Tooli v1.3.0 with performance optimizations, modern tooling, and comprehensive quality assurance.**
