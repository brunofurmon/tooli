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
    return new WheelEngine({ segments });
  });

  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<WheelSegment | null>(null);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
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

  const handleSpin = async () => {
    if (isWheelSpinning || isSpinning) return;

    console.log('Starting spin...');
    setIsWheelSpinning(true);
    setResult(null);
    setShowWinnerModal(false);

    // Notify parent that spin is starting
    if (onSpinStart) {
      onSpinStart();
    }

    try {
      const spinResult = await wheelEngine.spin();
      console.log('Spin result:', spinResult);

      // Animate the wheel
      const startRotation = rotation;
      const targetRotation = startRotation + 1440 + Math.random() * 360; // Multiple rotations + random
      const duration = 1000; // 1 second for faster spin
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
          setResult(spinResult.segment);
          setShowWinnerModal(true);

          // Notify parent of result
          if (onSpinComplete) {
            onSpinComplete(spinResult.segment);
          }
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    } catch (error) {
      console.error('Error during spin:', error);
      setIsWheelSpinning(false);
    }
  };

  const handleCloseModal = () => {
    setShowWinnerModal(false);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
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
        <WheelCanvas
          size={size}
          segments={segments}
          rotation={rotation}
          onSpin={handleSpin}
          isSpinning={isWheelSpinning || isSpinning}
        />
      </div>

      {/* Winner Modal */}
      {showWinnerModal && result && (
        <div
          onClick={handleModalClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--nextui-colors-background)',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              position: 'relative',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--nextui-colors-divider)',
            }}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: 'var(--nextui-colors-foreground)',
                opacity: 0.7,
                padding: '4px',
                borderRadius: '4px',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.7';
              }}
            >
              ✕
            </button>

            {/* Winner content */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  fontSize: '48px',
                  marginBottom: '16px',
                }}
              >
                🎉
              </div>
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'var(--nextui-colors-foreground)',
                  margin: '0 0 8px 0',
                }}
              >
                Winner!
              </h2>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: 'var(--nextui-colors-success)',
                  margin: '0 0 16px 0',
                }}
              >
                {result.label}
              </p>
              <p
                style={{
                  fontSize: '16px',
                  color: 'var(--nextui-colors-foreground)',
                  opacity: 0.7,
                  margin: 0,
                }}
              >
                Probability: {((result.probability || 0) * 100).toFixed(1)}%
              </p>
            </div>

            <button
              onClick={handleCloseModal}
              style={{
                backgroundColor: 'var(--nextui-colors-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Show result below wheel */}
      {result && !showWinnerModal && (
        <WheelResult
          result={result}
          isSpinning={isWheelSpinning || isSpinning}
        />
      )}
    </div>
  );
};
