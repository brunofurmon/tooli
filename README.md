# 🎯 Tooli - productivity tools for humans

A comprehensive platform designed to enhance team productivity through intelligent decision-making tools. Tooli provides an interactive spinning wheel with advanced user management, real-time analytics, and seamless collaboration features.

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

## 🎮 Features

### 🎡 Interactive Spinning Wheel

- **Route:** `/` (Home page)
- **Dynamic Segments**: Automatically updates based on active users and their weights
- **Custom Weights**: Set individual probabilities (0-100) for each participant
- **Real-time Updates**: Wheel segments update instantly when users are added/removed/toggled
- **Smooth Animations**: Engaging 2-second spinning experience with result display
- **Accurate Results**: Position-based calculation ensures visual position matches declared winner
- **Fair Randomization**: Probability-based algorithms ensure fair selection
- **Weight Redistribution**: Automatic recalculation when users are enabled/disabled

### 👥 User Management

- **Add/Remove Users**: Real-time user management with instant wheel updates
- **Custom Weights**: Set individual probabilities for each participant
- **Participation Toggle**: Enable/disable users without removing them from the list
- **Real-time Editing**: Edit user names with instant updates
- **Data Persistence**: All user data saved to localStorage
- **Export/Import**: Backup and restore user data in JSON format

### 📊 History Tracking

- **Spin History**: Complete record of all spins with timestamps
- **User Results**: Track individual user wins and performance
- **Load More**: Collapsible history with "load more" functionality
- **Real-time Updates**: History updates automatically after each spin
- **Data Export**: Export complete history in JSON format

### 📈 Analytics & Statistics

- **Overall Statistics**: Total spins, most frequent winner, average probability
- **User Performance**: Individual win rates and participation statistics
- **Real-time Updates**: Analytics update automatically
- **Data Management**: Export users and history data
- **Performance Metrics**: Track team and individual performance over time

### 📄 About Platform

- **Route:** `/about`
- Comprehensive information about Tooli platform
- Technology stack and architecture details
- Feature overview and capabilities

## 🆕 Latest Improvements (v1.2.0)

### 🎯 Enhanced Accuracy

- **Fixed Wheel Results**: Visual position now perfectly matches declared winner
- **Coordinate System**: Proper mapping between canvas and wheel coordinates
- **Position-Based Calculation**: Results determined by actual wheel position

### 🎨 UI/UX Polish

- **Consistent Modal**: Winner modal with stable white background and dark text
- **Proper Contrast**: All text elements visible in both light and dark modes
- **Smooth Animations**: Optimized 2-second spin duration for better experience

### ⚡ Performance & Reliability

- **Instant Response**: Eliminated delays in wheel spinning
- **Real-time Updates**: Immediate weight redistribution when users are toggled
- **Robust Synchronization**: Reliable state management and updates

## 🛠️ Development

### Project Structure

```
apps/tooli/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Home page (Spinning Wheel)
│   │   ├── about/
│   │   │   └── page.tsx                # About page
│   │   ├── api/
│   │   │   └── health/
│   │   │       └── route.ts            # Health check API
│   │   └── layout.tsx                  # Root layout
│   ├── components/
│   │   ├── ui/                         # Atomic UI components
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   ├── wheel/                      # Wheel-specific components
│   │   │   ├── WheelCanvas.tsx
│   │   │   ├── WheelControls.tsx
│   │   │   └── WheelResult.tsx
│   │   ├── user-panel/                 # User management components
│   │   │   ├── UserPanel.tsx
│   │   │   ├── UserListItem.tsx
│   │   │   └── AddUserInput.tsx
│   │   ├── history-panel/              # History tracking components
│   │   │   └── HistoryPanel.tsx
│   │   ├── analytics-panel/            # Analytics components
│   │   │   └── AnalyticsPanel.tsx
│   │   ├── Navigation.tsx              # Route-based navigation
│   │   └── PickerWheel.tsx             # Main wheel component
│   └── ...
libs/
├── wheel-engine/                       # Core wheel logic
├── user-management/                    # User data management
├── history-tracker/                    # History tracking system
├── shared-ui/                          # Shared UI components
└── audio-system/                       # Audio system (planned)
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
npm run test:health        # Run health check tests

# Quality Assurance
npm run lint               # Lint all projects
npm run lint:fix           # Fix linting issues
npm run typecheck          # TypeScript type checking

# Build & Deploy
npm run build              # Build main application
npm run build:all          # Build all projects
npm run build:affected     # Build affected projects

# Health & Monitoring
npm run health:check       # Check application health
npm run health:monitor     # Monitor routes continuously
npm run dev:monitored      # Development with monitoring

# Utilities
npm run clean              # Clean build artifacts
npm run graph              # Show dependency graph
npm run format             # Format code
```

### Architecture

Tooli uses a modern monorepo architecture powered by Nx, providing:

- **Atomic Design:** Components are broken down into single-responsibility atomic parts
- **Route-based Navigation:** Clean URL structure with Next.js App Router
- **Modular Libraries:** Separate libraries for wheel engine, user management, and history tracking
- **Real-time Updates:** Event-driven architecture with subscription system
- **Data Persistence:** localStorage-based persistence with export/import capabilities
- **Type Safety:** Full TypeScript support throughout the application
- **Performance:** Optimized builds and efficient caching

### Pre-commit Hooks

The project includes pre-commit hooks that automatically:

- Lint staged files
- Run tests for affected projects
- Build affected projects
- Perform health checks
- Format code

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests for specific project
npm run wheel:test

# Run tests with coverage
npm run test:coverage

# Run health checks
npm run test:health

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
- **Data Management:** localStorage with JSON export/import

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
- [x] **Phase 2: User Management** - Add, edit, remove users with custom weights
- [x] **Phase 3: History Tracking** - Complete spin history with analytics
- [x] **Phase 4: Analytics** - Performance metrics and data management
- [ ] **Phase 5: Advanced Features** - Scrum Poker, productivity tools

## 🆘 Support

For support and questions, please open an issue in the GitHub repository.

---

Built with ❤️ for teams that need fair and engaging decision-making tools
