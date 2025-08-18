'use client';

import React, { useState, useEffect, useRef } from 'react';
import { WheelCanvas } from './wheel/WheelCanvas';
import { WheelResult } from './wheel/WheelResult';
import { WheelEngine } from '@tooli/wheel-engine';
import { WheelSegment } from '@tooli/wheel-engine';

export interface PickerWheelProps {
  size: number;
  segments: WheelSegment[];
  onSpinComplete?: (result: WheelSegment) => void;
  onSpinStart?: () => void;
  isSpinning?: boolean;
  pendingResult?: WheelSegment | null;
}

export const PickerWheel: React.FC<PickerWheelProps> = ({
  size,
  segments,
  onSpinComplete,
  onSpinStart,
  isSpinning = false,
  pendingResult,
}) => {
  const [wheelEngine] = useState(() => {
    console.log('Initializing wheel engine with segments:', segments.length);
    return new WheelEngine(segments);
  });

  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<WheelSegment | null>(null);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);

  // Update wheel segments when they change
  useEffect(() => {
    console.log('Current wheel segments:', segments.length);
    wheelEngine.updateSegments(segments);
  }, [segments, wheelEngine]);

  // Update wheel segments when they change
  useEffect(() => {
    console.log('Updated wheel segments:', segments.length);
    wheelEngine.updateSegments(segments);
  }, [segments, wheelEngine]);

  const handleSpin = () => {
    if (isWheelSpinning || isSpinning) return;

    console.log('Starting spin...');
    setIsWheelSpinning(true);
    setResult(null);

    // Notify parent that spin is starting
    if (onSpinStart) {
      onSpinStart();
    }

    try {
      const spinResult = wheelEngine.spin();
      console.log('Spin result:', spinResult);

      // Animate the wheel
      const startRotation = rotation;
      const targetRotation = startRotation + 1440 + Math.random() * 360; // Multiple rotations + random
      const duration = 3000; // 3 seconds
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentRotation =
          startRotation + (targetRotation - startRotation) * easeOut;

        setRotation(currentRotation);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Spin completed
          setIsWheelSpinning(false);
          setResult(spinResult);

          // Notify parent of result
          if (onSpinComplete) {
            onSpinComplete(spinResult);
          }
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    } catch (error) {
      console.error('Error during spin:', error);
      setIsWheelSpinning(false);
    }
  };

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '16px',
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'var(--nextui-colors-foreground)',
            margin: '0 0 8px 0',
          }}
        >
          🎡 Decision Wheel
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--nextui-colors-foreground)',
            opacity: 0.7,
            margin: 0,
          }}
        >
          Click the wheel to spin and make a decision
        </p>
      </div>

      <div
        onClick={handleSpin}
        style={{
          cursor: isWheelSpinning || isSpinning ? 'not-allowed' : 'pointer',
          position: 'relative',
        }}
      >
        <WheelCanvas size={size} segments={segments} rotation={rotation} />
      </div>

      {/* Show pending result at the top of history */}
      {pendingResult && (
        <div
          style={{
            position: 'fixed',
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            backgroundColor: 'var(--nextui-colors-success)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          🎉 Winner: {pendingResult.label}!
        </div>
      )}

      {/* Show result below wheel */}
      {result && !pendingResult && <WheelResult result={result} />}
    </div>
  );
};
