'use client';

import React, { useState, useRef, useEffect } from 'react';
import { WheelEngine, WheelSegment } from '@tooli/wheel-engine';
import { WheelCanvas } from './wheel/WheelCanvas';
import { WheelControls } from './wheel/WheelControls';
import { WheelResult } from './wheel/WheelResult';

interface PickerWheelProps {
  size?: number;
  segments?: WheelSegment[];
  onSpinComplete?: (result: WheelSegment) => void;
}

export const PickerWheel: React.FC<PickerWheelProps> = ({
  size = 400,
  segments,
  onSpinComplete,
}) => {
  const [wheelEngine] = useState(() => {
    const defaultSegments: WheelSegment[] = [
      { id: 'prize1', label: 'Free Spin', probability: 0.1 },
      { id: 'prize2', label: 'Bonus Points', probability: 0.2 },
      { id: 'prize3', label: 'Try Again', probability: 0.3 },
      { id: 'prize4', label: 'Small Prize', probability: 0.4 },
    ];

    console.log(
      'Initializing wheel engine with segments:',
      segments?.length || defaultSegments.length
    );
    return new WheelEngine({ segments: segments || defaultSegments });
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<WheelSegment | null>(null);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | undefined>(undefined);

  // Update wheel engine when segments change
  useEffect(() => {
    if (segments && segments.length > 0) {
      wheelEngine.updateSegments(segments);
      console.log('Updated wheel segments:', segments.length);
    }
  }, [segments, wheelEngine]);

  const wheelSegments = wheelEngine.getSegments();
  console.log('Current wheel segments:', wheelSegments.length);

  const spinWheel = async () => {
    if (isSpinning) return;

    console.log('Starting wheel spin...');
    setIsSpinning(true);
    setResult(null);

    try {
      const spinResult = await wheelEngine.spin();
      setResult(spinResult.segment);
      console.log('Spin result:', spinResult);

      // Call the callback if provided
      onSpinComplete?.(spinResult.segment);

      // Animate the wheel
      const startRotation = rotation;
      const endRotation = startRotation + 1440 + Math.random() * 360; // Multiple full rotations
      const duration = 3000; // 3 seconds
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentRotation =
          startRotation + (endRotation - startRotation) * easeOut;

        setRotation(currentRotation);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsSpinning(false);
          console.log('Spin animation complete');
        }
      };

      animate();
    } catch (error) {
      console.error('Error during spin:', error);
      setIsSpinning(false);
    }
  };

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
        justifyContent: 'center',
        gap: '24px',
        width: '100%',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'var(--nextui-colors-foreground)',
            margin: 0,
            marginBottom: '8px',
          }}
        >
          🎯 Spinning Wheel
        </h2>
        <p
          style={{
            color: 'var(--nextui-colors-foreground)',
            opacity: 0.7,
            margin: 0,
          }}
        >
          Click the wheel or button to spin!
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <WheelCanvas
          size={size}
          segments={wheelSegments}
          rotation={rotation}
          onSpin={spinWheel}
          isSpinning={isSpinning}
        />
      </div>

      <WheelResult result={result} isSpinning={isSpinning} />

      <WheelControls onSpin={spinWheel} isSpinning={isSpinning} />
    </div>
  );
};
