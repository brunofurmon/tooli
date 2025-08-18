# 🛠️ Developer Guide

Welcome to the Tooli development guide! This document provides comprehensive information for developers working on the Tooli platform.

## 🏗️ Architecture Overview

Tooli uses a modern monorepo architecture powered by Nx, providing:

- **Atomic Design:** Components are broken down into single-responsibility atomic parts
- **Route-based Navigation:** Clean URL structure with Next.js App Router
- **Modular Components:** Reusable UI components in `components/ui/`
- **Feature Organization:** Feature-specific components in dedicated directories
- **Type Safety:** Full TypeScript support throughout the application
- **Performance:** Optimized builds and efficient caching

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
├── libs/                       # Shared libraries
│   ├── wheel-engine/          # Wheel logic and engine
│   ├── audio-system/          # Audio management
│   ├── history-tracker/       # User interaction history
│   └── shared-ui/             # Shared UI components
└── docs/                      # Documentation
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

# Start development server
npm run wheel:dev
```

### 2. Available Scripts

```bash
# Development
npm run wheel:dev          # Start development server
npm run wheel:start        # Start production server
npm run wheel:build        # Build the application

# Testing
npm run test               # Run all tests
npm run test:affected      # Run tests for affected projects
npm run test:coverage      # Run tests with coverage

# Quality Assurance
npm run lint               # Lint all projects
npm run lint:fix           # Fix linting issues
npm run typecheck          # TypeScript type checking

# Build & Deploy
npm run build              # Build main application
npm run build:all          # Build all projects
npm run build:affected     # Build affected projects

# Utilities
npm run clean              # Clean build artifacts
npm run graph              # Show dependency graph
npm run format             # Format code
```

### 3. Pre-commit Hooks

The project includes pre-commit hooks that automatically:

- Lint staged files
- Run tests for affected projects
- Build affected projects
- Format code

## 🎮 Wheel Component Architecture

### Component Breakdown

The spinning wheel is broken down into atomic components:

#### WheelCanvas (`components/wheel/WheelCanvas.tsx`)

- **Responsibility:** Canvas-based wheel rendering
- **Props:** `size`, `segments`, `rotation`, `onSpin`, `isSpinning`
- **Features:** HTML5 Canvas drawing, smooth animations, click handling

#### WheelControls (`components/wheel/WheelControls.tsx`)

- **Responsibility:** Spin button and controls
- **Props:** `onSpin`, `isSpinning`
- **Features:** Disabled state, loading text

#### WheelResult (`components/wheel/WheelResult.tsx`)

- **Responsibility:** Display spin results
- **Props:** `result`, `isSpinning`
- **Features:** Conditional rendering, result formatting

#### PickerWheel (`components/PickerWheel.tsx`)

- **Responsibility:** Main wheel component composition
- **Features:** State management, animation logic, component orchestration

### Wheel Engine Integration

The wheel components integrate with the `@tooli/wheel-engine` library:

```typescript
import { WheelEngine, WheelSegment } from '@tooli/wheel-engine';

// Create wheel engine instance
const wheelEngine = new WheelEngine({ segments });

// Spin the wheel
const result = await wheelEngine.spin();
```

## 🧪 Testing Strategy

### Testing Levels

1. **Unit Tests:** Individual component and function testing
2. **Integration Tests:** Component interaction testing
3. **E2E Tests:** Full user journey testing with Playwright

### Test Structure

```
apps/tooli/
├── specs/
│   └── index.spec.tsx      # Component tests
├── src/
│   └── components/
│       ├── __tests__/      # Component-specific tests
│       └── ...
```

### Running Tests

```bash
# Run all tests
npm run test

# Run specific project tests
npm run wheel:test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run e2e
```

## 🔧 Code Quality

### TypeScript

- **Strict Mode:** Enabled for all projects
- **Type Safety:** All components have proper TypeScript interfaces
- **No `any` Types:** Avoid using `any` type

### ESLint Configuration

- **Rules:** Custom rules for React, TypeScript, and Next.js
- **Formatting:** Prettier integration
- **Auto-fix:** Available with `npm run lint:fix`

### Code Style

- **Components:** PascalCase for component names
- **Files:** kebab-case for file names
- **Functions:** camelCase for function names
- **Constants:** UPPER_SNAKE_CASE for constants

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

## 🔒 Security Considerations

### Best Practices

- **Input Validation:** Validate all user inputs
- **XSS Prevention:** Sanitize data before rendering
- **CSP:** Content Security Policy implementation
- **HTTPS:** Always use HTTPS in production

### Security Review

All changes require security review by the Cipher agent:

- Package vulnerability scanning
- Code security analysis
- OWASP compliance checking

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

### Getting Help

- **Documentation:** Check this guide and other docs
- **Issues:** Report bugs via GitHub Issues
- **Discussions:** Join community discussions
- **Team:** Reach out to the development team

## 🗺️ Future Development

### Upcoming Features

- **Scrum Poker:** Agile estimation tool
- **Productivity Tools:** Time tracking and analytics
- **Enhanced UI:** More interactive components
- **Mobile App:** Native mobile application

### Architecture Evolution

- **Micro-frontends:** Potential migration to micro-frontend architecture
- **API Integration:** Backend API development
- **Real-time Features:** WebSocket integration
- **Advanced Analytics:** User behavior tracking

---

**Happy coding! 🎯**

For questions or support, reach out to the development team or check the documentation.
