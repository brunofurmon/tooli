'use client';

import React, { useState, useRef, useEffect } from 'react';
import { WheelEngine, WheelSegment } from '@tooli/wheel-engine';
import { WheelCanvas } from './wheel/WheelCanvas';
import { WheelControls } from './wheel/WheelControls';
import { WheelResult } from './wheel/WheelResult';

interface PickerWheelProps {
  size?: number;
  segments?: WheelSegment[];
}

export const PickerWheel: React.FC<PickerWheelProps> = ({
  size = 400,
  segments,
}) => {
  const [wheelEngine] = useState(() => {
    const defaultSegments: WheelSegment[] = [
      { id: 'prize1', label: 'Free Spin', probability: 0.1 },
      { id: 'prize2', label: 'Bonus Points', probability: 0.2 },
      { id: 'prize3', label: 'Try Again', probability: 0.3 },
      { id: 'prize4', label: 'Small Prize', probability: 0.4 },
    ];

    return new WheelEngine({ segments: segments || defaultSegments });
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<WheelSegment | null>(null);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | undefined>(undefined);

  const wheelSegments = wheelEngine.getSegments();

  const spinWheel = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    const spinResult = await wheelEngine.spin();
    setResult(spinResult.segment);

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
      }
    };

    animate();
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6">
      <WheelCanvas
        size={size}
        segments={wheelSegments}
        rotation={rotation}
        onSpin={spinWheel}
        isSpinning={isSpinning}
      />

      <WheelResult result={result} isSpinning={isSpinning} />

      <WheelControls onSpin={spinWheel} isSpinning={isSpinning} />
    </div>
  );
};
