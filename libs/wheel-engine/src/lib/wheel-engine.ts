export interface WheelSegment {
  id: string;
  label: string;
  probability: number;
  color?: string;
}

export interface WheelConfig {
  segments: WheelSegment[];
  spinDuration?: number;
  easing?: string;
  soundEnabled?: boolean;
}

export interface SpinResult {
  segment: WheelSegment;
  isWinner: boolean;
  prize: string;
  spinDuration: number;
}

export class WheelEngine {
  private segments: WheelSegment[];
  private spinDuration: number;

  private isSpinning = false;

  constructor(config?: WheelConfig) {
    this.segments = config?.segments || this.getDefaultSegments();
    this.spinDuration = config?.spinDuration || 3000;
  }

  private getDefaultSegments(): WheelSegment[] {
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

  public async spin(): Promise<SpinResult> {
    if (this.isSpinning) {
      throw new Error('Wheel is already spinning');
    }

    this.isSpinning = true;

    try {
      // Simulate spin duration
      await this.delay(this.spinDuration);

      // Calculate result based on probabilities
      const result = this.calculateResult();

      this.isSpinning = false;
      return result;
    } catch (error) {
      this.isSpinning = false;
      throw error;
    }
  }

  private calculateResult(): SpinResult {
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

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public getSpinDuration(): number {
    return this.spinDuration;
  }

  public getSegments(): WheelSegment[] {
    return [...this.segments];
  }

  public isCurrentlySpinning(): boolean {
    return this.isSpinning;
  }

  public updateConfig(config: Partial<WheelConfig>): void {
    if (config.segments) {
      this.segments = config.segments;
    }
    if (config.spinDuration) {
      this.spinDuration = config.spinDuration;
    }
  }
}

// Export the original function for backward compatibility
export function wheelEngine(): string {
  return 'wheel-engine';
}
