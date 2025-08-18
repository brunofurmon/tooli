# 🎯 Tooli - Software Engineering Team Platform

A comprehensive platform designed specifically for software engineering teams to enhance their day-to-day productivity and collaboration. Tooli provides a suite of interactive tools that make development workflows more engaging and efficient.

## 🚀 Quick Start

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

# Start the development server
npm run wheel:dev
```

The application will be available at `http://localhost:3000`

## 🎮 Available Tools

### Spinning Wheel (Available Now)

- **Route:** `/` (Home page)
- Interactive decision-making tool for team activities
- Fair randomization with probability-based algorithms
- Smooth animations and engaging user experience
- Perfect for team building exercises and random selections

### About Platform (Available Now)

- **Route:** `/about`
- Comprehensive information about Tooli platform
- Technology stack and architecture details
- Roadmap and upcoming features
- Designed for software engineering teams

### Coming Soon

- **Scrum Poker:** Agile estimation tool for story point voting
- **Dev Productivity Tools:** Time tracking, task management, and analytics

## 🛠️ Development

### Project Structure

```
apps/tooli/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home page (Spinning Wheel)
│   │   ├── about/
│   │   │   └── page.tsx      # About page
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── ui/               # Atomic UI components
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   ├── wheel/            # Wheel-specific components
│   │   │   ├── WheelCanvas.tsx
│   │   │   ├── WheelControls.tsx
│   │   │   └── WheelResult.tsx
│   │   ├── Navigation.tsx    # Route-based navigation
│   │   └── PickerWheel.tsx   # Main wheel component
│   └── ...
```

### Available Scripts

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

### Architecture

Tooli uses a modern monorepo architecture powered by Nx, providing:

- **Atomic Design:** Components are broken down into single-responsibility atomic parts
- **Route-based Navigation:** Clean URL structure with Next.js App Router
- **Modular Components:** Reusable UI components in `components/ui/`
- **Feature Organization:** Feature-specific components in dedicated directories
- **Type Safety:** Full TypeScript support throughout the application
- **Performance:** Optimized builds and efficient caching

### Pre-commit Hooks

The project includes pre-commit hooks that automatically:

- Lint staged files
- Run tests for affected projects
- Build affected projects
- Format code

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests for specific project
npm run wheel:test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run e2e
```

## 📚 Documentation

- **User Guide:** `docs/user/getting-started.md`
- **Developer Guide:** `docs/developer/development-guide.md`
- **Interactive Examples:** `docs/interactive/examples.md`

## 🛠️ Technology Stack

- **Frontend:** React 19, Next.js 15, TypeScript
- **Styling:** HeroUI with CSS Variables
- **Build System:** Nx Monorepo
- **Testing:** Jest, Playwright
- **Quality:** ESLint, Prettier, Husky

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow atomic design principles
- Write tests for new features
- Ensure TypeScript type safety
- Follow the established code style
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🗺️ Roadmap

- [x] **Phase 1: Foundation** - Spinning Wheel tool
- [ ] **Phase 2: Agile Tools** - Scrum Poker and estimation tools
- [ ] **Phase 3: Productivity Suite** - Advanced productivity and analytics tools

## 🆘 Support

For support and questions, please open an issue in the GitHub repository.

---

Built with ❤️ for software engineering teams
