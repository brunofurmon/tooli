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
export declare class WheelEngine {
  private segments;
  private spinDuration;
  private isSpinning;
  constructor(config?: WheelConfig);
  private getDefaultSegments;
  spin(): Promise<SpinResult>;
  private calculateResult;
  private delay;
  getSpinDuration(): number;
  getSegments(): WheelSegment[];
  isCurrentlySpinning(): boolean;
  updateConfig(config: Partial<WheelConfig>): void;
  updateSegments(segments: WheelSegment[]): void;
}
export declare function wheelEngine(): string;
//# sourceMappingURL=wheel-engine.d.ts.map
