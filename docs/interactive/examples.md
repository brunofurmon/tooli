# 🎮 Interactive Examples

This section provides interactive examples and demos for the Tooli platform components.

## 🎯 Spinning Wheel Examples

### Basic Wheel Implementation

```typescript
import { WheelEngine } from '@tooli/wheel-engine';
import { AudioManager } from '@tooli/audio-system';
import { HistoryTracker } from '@tooli/history-tracker';

// Initialize components
const wheel = new WheelEngine();
const audio = new AudioManager();
const history = new HistoryTracker();

// Basic spin function
async function spinWheel() {
  try {
    // Play spin sound
    await audio.playSound('wheel-spin-start');

    // Spin the wheel
    const result = await wheel.spin();

    // Play result sound
    await audio.playSound('wheel-spin-end');

    // Record in history
    history.recordSpin({
      timestamp: Date.now(),
      result: result,
      duration: wheel.getSpinDuration(),
    });

    return result;
  } catch (error) {
    console.error('Spin failed:', error);
    throw error;
  }
}
```

### Custom Wheel Configuration

```typescript
import { WheelEngine } from '@tooli/wheel-engine';

// Configure wheel with custom options
const wheelConfig = {
  segments: [
    { id: 'prize1', label: 'Free Spin', probability: 0.1 },
    { id: 'prize2', label: 'Bonus Points', probability: 0.2 },
    { id: 'prize3', label: 'Try Again', probability: 0.3 },
    { id: 'prize4', label: 'Small Prize', probability: 0.4 },
  ],
  spinDuration: 3000, // 3 seconds
  easing: 'ease-out',
  soundEnabled: true,
};

const customWheel = new WheelEngine(wheelConfig);
```

### Wheel with Audio Integration

```typescript
import { WheelEngine } from '@tooli/wheel-engine';
import { AudioManager } from '@tooli/audio-system';

class AudioWheel {
  private wheel: WheelEngine;
  private audio: AudioManager;

  constructor() {
    this.wheel = new WheelEngine();
    this.audio = new AudioManager();
  }

  async spinWithAudio() {
    // Pre-load audio files
    await this.audio.preload(['wheel-spin-start.mp3', 'wheel-spin-loop.mp3', 'wheel-spin-end.mp3', 'prize-win.mp3']);

    // Start spin sound
    this.audio.playSound('wheel-spin-start');

    // Spin the wheel
    const result = await this.wheel.spin();

    // Play result sound based on outcome
    if (result.isWinner) {
      this.audio.playSound('prize-win');
    }

    return result;
  }
}
```

## 🎵 Audio System Examples

### Audio Manager Setup

```typescript
import { AudioManager } from '@tooli/audio-system';

// Initialize audio manager
const audioManager = new AudioManager({
  volume: 0.7,
  muted: false,
  preload: true,
});

// Configure audio sources
const audioConfig = {
  'wheel-spin': '/sounds/wheel-spin.mp3',
  'prize-win': '/sounds/prize-win.mp3',
  'background-music': '/sounds/background.mp3',
  'button-click': '/sounds/click.mp3',
};

// Load audio files
await audioManager.loadAudio(audioConfig);
```

### Audio Controls

```typescript
// Volume control
audioManager.setVolume(0.5);

// Mute/unmute
audioManager.mute();
audioManager.unmute();

// Play specific sounds
audioManager.playSound('wheel-spin');
audioManager.playSound('prize-win', { volume: 0.8 });

// Background music
audioManager.playBackgroundMusic('background-music', { loop: true });
audioManager.stopBackgroundMusic();
```

### Audio Events

```typescript
// Listen to audio events
audioManager.on('play', (soundName) => {
  console.log(`Playing: ${soundName}`);
});

audioManager.on('end', (soundName) => {
  console.log(`Finished: ${soundName}`);
});

audioManager.on('error', (error) => {
  console.error('Audio error:', error);
});
```

## 📊 History Tracking Examples

### Basic History Usage

```typescript
import { HistoryTracker } from '@tooli/history-tracker';

const tracker = new HistoryTracker();

// Record a spin
tracker.recordSpin({
  timestamp: Date.now(),
  result: 'winner',
  prize: 'Free Spin',
  duration: 2500,
});

// Get session history
const sessionHistory = tracker.getSessionHistory();

// Get all history
const allHistory = tracker.getAllHistory();
```

### History with Analytics

```typescript
import { HistoryTracker } from '@tooli/history-tracker';

class AnalyticsTracker extends HistoryTracker {
  getSpinStatistics() {
    const history = this.getAllHistory();

    return {
      totalSpins: history.length,
      wins: history.filter((spin) => spin.result === 'winner').length,
      averageDuration: history.reduce((sum, spin) => sum + spin.duration, 0) / history.length,
      mostCommonPrize: this.getMostCommonPrize(history),
    };
  }

  getMostCommonPrize(history) {
    const prizes = history.map((spin) => spin.prize);
    const counts = prizes.reduce((acc, prize) => {
      acc[prize] = (acc[prize] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).sort(([, a], [, b]) => b - a)[0][0];
  }
}
```

## 🎨 UI Component Examples

### Button Components

```typescript
import { Button } from '@tooli/shared-ui';

// Basic button
<Button variant="primary" onClick={handleSpin}>
  Spin Wheel
</Button>

// Disabled button
<Button variant="secondary" disabled={isSpinning}>
  {isSpinning ? 'Spinning...' : 'Spin Again'}
</Button>

// Button with icon
<Button variant="success" icon="trophy">
  Claim Prize
</Button>
```

### Card Components

```typescript
import { Card, CardHeader, CardBody, CardFooter } from '@tooli/shared-ui';

<Card>
  <CardHeader title="Wheel of Fortune" subtitle="Try your luck!" />
  <CardBody>
    <WheelComponent />
  </CardBody>
  <CardFooter>
    <Button variant="primary">Spin</Button>
  </CardFooter>
</Card>;
```

### Modal Components

```typescript
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@tooli/shared-ui';

<Modal isOpen={showPrizeModal} onClose={() => setShowPrizeModal(false)}>
  <ModalHeader title="Congratulations!" />
  <ModalBody>
    <p>You won: {prize}</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="primary" onClick={claimPrize}>
      Claim Prize
    </Button>
  </ModalFooter>
</Modal>;
```

## 🔧 Integration Examples

### Complete Wheel Application

```typescript
import React, { useState, useEffect } from 'react';
import { WheelEngine } from '@tooli/wheel-engine';
import { AudioManager } from '@tooli/audio-system';
import { HistoryTracker } from '@tooli/history-tracker';
import { Button, Card, Modal } from '@tooli/shared-ui';

function WheelApp() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [currentPrize, setCurrentPrize] = useState(null);

  const wheel = new WheelEngine();
  const audio = new AudioManager();
  const history = new HistoryTracker();

  const handleSpin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);

    try {
      // Play spin sound
      await audio.playSound('wheel-spin-start');

      // Spin the wheel
      const result = await wheel.spin();

      // Record in history
      history.recordSpin({
        timestamp: Date.now(),
        result: result.isWinner ? 'winner' : 'loser',
        prize: result.prize,
        duration: wheel.getSpinDuration(),
      });

      // Show prize modal
      setCurrentPrize(result);
      setShowPrizeModal(true);
    } catch (error) {
      console.error('Spin failed:', error);
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <div className="wheel-app">
      <Card>
        <WheelComponent isSpinning={isSpinning} />
        <Button variant="primary" disabled={isSpinning} onClick={handleSpin}>
          {isSpinning ? 'Spinning...' : 'Spin Wheel'}
        </Button>
      </Card>

      <Modal isOpen={showPrizeModal} onClose={() => setShowPrizeModal(false)}>
        <h2>Congratulations!</h2>
        <p>You won: {currentPrize?.prize}</p>
        <Button variant="primary" onClick={() => setShowPrizeModal(false)}>
          Claim Prize
        </Button>
      </Modal>
    </div>
  );
}
```

### Responsive Wheel Component

```typescript
import React from 'react';
import { useMediaQuery } from '@tooli/shared-ui';

function ResponsiveWheel() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const wheelSize = isMobile ? 200 : isTablet ? 300 : 400;

  return (
    <div
      className="wheel-container"
      style={{
        width: wheelSize,
        height: wheelSize,
      }}
    >
      <WheelComponent size={wheelSize} />
    </div>
  );
}
```

## 🎯 Demo Applications

### Simple Demo

```bash
# Run the simple demo
npm run wheel:dev

# Navigate to http://localhost:3000
```

### Interactive Demo

```bash
# Run with all features enabled
npm run dev

# Features available:
# - Spinning wheel with animations
# - Audio feedback
# - History tracking
# - Responsive design
```

### Documentation Demo

```bash
# Run documentation server
npm run docs:dev

# Navigate to http://localhost:3001
```

## 🧪 Testing Examples

### Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { WheelComponent } from './WheelComponent';

test('wheel spins when button is clicked', async () => {
  render(<WheelComponent />);

  const spinButton = screen.getByText('Spin Wheel');
  fireEvent.click(spinButton);

  expect(screen.getByText('Spinning...')).toBeInTheDocument();
});
```

### Library Testing

```typescript
import { WheelEngine } from '@tooli/wheel-engine';

test('wheel engine returns valid result', async () => {
  const wheel = new WheelEngine();
  const result = await wheel.spin();

  expect(result).toHaveProperty('prize');
  expect(result).toHaveProperty('isWinner');
  expect(typeof result.prize).toBe('string');
  expect(typeof result.isWinner).toBe('boolean');
});
```

## 🚀 Performance Examples

### Lazy Loading

```typescript
import { lazy, Suspense } from 'react';

const WheelComponent = lazy(() => import('./WheelComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading wheel...</div>}>
      <WheelComponent />
    </Suspense>
  );
}
```

### Audio Preloading

```typescript
import { AudioManager } from '@tooli/audio-system';

// Preload audio for better performance
const audioManager = new AudioManager();

useEffect(() => {
  audioManager.preload(['wheel-spin-start.mp3', 'wheel-spin-end.mp3', 'prize-win.mp3']);
}, []);
```

---

**Try these examples and explore the interactive features! 🎮**
