import { __awaiter } from 'tslib';
export class WheelEngine {
  constructor(config) {
    this.isSpinning = false;
    this.segments =
      (config === null || config === void 0 ? void 0 : config.segments) ||
      this.getDefaultSegments();
    this.spinDuration =
      (config === null || config === void 0 ? void 0 : config.spinDuration) ||
      3000;
  }
  getDefaultSegments() {
    return [
      { id: 'prize1', label: 'Free Spin', probability: 0.1, color: '#FF6B6B' },
      {
        id: 'prize2',
        label: 'Bonus Points',
        probability: 0.2,
        color: '#4ECDC4',
      },
      { id: 'prize3', label: 'Try Again', probability: 0.3, color: '#45B7D1' },
      {
        id: 'prize4',
        label: 'Small Prize',
        probability: 0.4,
        color: '#96CEB4',
      },
    ];
  }
  spin() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.isSpinning) {
        throw new Error('Wheel is already spinning');
      }
      this.isSpinning = true;
      try {
        // Simulate spin duration
        yield this.delay(this.spinDuration);
        // Calculate result based on probabilities
        const result = this.calculateResult();
        this.isSpinning = false;
        return result;
      } catch (error) {
        this.isSpinning = false;
        throw error;
      }
    });
  }
  calculateResult() {
    const random = Math.random();
    let cumulativeProbability = 0;
    for (const segment of this.segments) {
      cumulativeProbability += segment.probability;
      if (random <= cumulativeProbability) {
        return {
          segment,
          isWinner: segment.id === 'prize1' || segment.id === 'prize2',
          prize: segment.label,
          spinDuration: this.spinDuration,
        };
      }
    }
    // Fallback to last segment
    const lastSegment = this.segments[this.segments.length - 1];
    return {
      segment: lastSegment,
      isWinner: false,
      prize: lastSegment.label,
      spinDuration: this.spinDuration,
    };
  }
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  getSpinDuration() {
    return this.spinDuration;
  }
  getSegments() {
    return [...this.segments];
  }
  isCurrentlySpinning() {
    return this.isSpinning;
  }
  updateConfig(config) {
    if (config.segments) {
      this.segments = config.segments;
    }
    if (config.spinDuration) {
      this.spinDuration = config.spinDuration;
    }
  }
  updateSegments(segments) {
    this.segments = [...segments];
  }
}
// Export the original function for backward compatibility
export function wheelEngine() {
  return 'wheel-engine';
}
//# sourceMappingURL=wheel-engine.js.map
