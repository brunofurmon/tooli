# 🚀 Getting Started with Tooli

Welcome to Tooli! This guide will help you get up and running with the interactive platform featuring the spinning wheel component.

## 🎯 What is Tooli?

Tooli is an interactive web platform that provides:

- **Spinning Wheel Component**: An engaging, animated wheel for interactive experiences
- **Audio System**: Rich audio feedback and sound management
- **History Tracking**: Session and interaction history
- **Modern UI**: Beautiful, responsive design built with React and Next.js

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Checking Your Setup

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tooli
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Development Environment

```bash
# Install pre-commit hooks
npm run prepare
```

## 🎮 Running the Application

### Development Mode

Start the development server with the spinning wheel:

```bash
npm run wheel:dev
```

The application will be available at `http://localhost:3000`

### Alternative Commands

```bash
# Standard development server
npm run dev

# Production build and serve
npm run wheel:build
npm run wheel:start
```

## 🎯 Using the Spinning Wheel

### Basic Usage

1. **Navigate to the Application**: Open your browser and go to `http://localhost:3000`
2. **Locate the Wheel**: The spinning wheel component will be prominently displayed
3. **Interact**: Click or tap to spin the wheel
4. **Watch the Animation**: Enjoy the smooth spinning animation with audio feedback

### Features

- **Smooth Animations**: Hardware-accelerated CSS animations
- **Audio Feedback**: Sound effects for interactions
- **History Tracking**: Your spins are recorded for future reference
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🎵 Audio System

The platform includes a comprehensive audio system:

- **Sound Effects**: Interactive feedback for wheel spins
- **Background Music**: Optional ambient audio
- **Volume Control**: Adjustable audio levels
- **Mute Options**: Quick mute/unmute functionality

## 📊 History Tracking

Your interactions are automatically tracked:

- **Session History**: View your current session's spins
- **Persistent Storage**: Data is saved locally for future sessions
- **Analytics**: Track patterns and preferences

## 🎨 Customization

### Themes

The platform supports multiple themes:

- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy on the eyes
- **High Contrast**: Accessibility-focused design

### Wheel Options

Customize your spinning wheel experience:

- **Speed Control**: Adjust spinning speed
- **Color Schemes**: Choose from various color palettes
- **Sound Preferences**: Select different audio themes

## 🔧 Troubleshooting

### Common Issues

#### Application Won't Start

```bash
# Check if port 3000 is available
lsof -i :3000

# Kill process if needed
kill -9 <PID>

# Try a different port
npm run wheel:dev -- --port=3001
```

#### Dependencies Issues

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Build Errors

```bash
# Clean Nx cache
npm run clean

# Rebuild
npm run wheel:build
```

### Getting Help

If you encounter issues:

1. **Check the Console**: Look for error messages in the browser console
2. **Review Logs**: Check terminal output for detailed error information
3. **Documentation**: Refer to the [developer documentation](../developer/)
4. **Issues**: Report bugs via GitHub Issues

## 📱 Mobile Usage

The platform is fully responsive and works great on mobile devices:

- **Touch Controls**: Optimized for touch interactions
- **Responsive Design**: Adapts to different screen sizes
- **Mobile Audio**: Compatible with mobile audio systems

## 🔒 Privacy and Security

- **Local Storage**: Your data stays on your device
- **No Tracking**: No external analytics or tracking
- **Secure**: Built with modern security practices

## 🆘 Support

Need help? Here are your options:

- **Documentation**: Browse the [docs](../) directory
- **Issues**: Report problems via GitHub Issues
- **Community**: Join discussions in the community forum

## 🎉 Next Steps

Now that you're up and running:

1. **Explore Features**: Try different wheel configurations
2. **Customize**: Adjust settings to your preferences
3. **Share**: Tell others about your experience
4. **Contribute**: Consider contributing to the project

---

**Happy spinning! 🎯**
