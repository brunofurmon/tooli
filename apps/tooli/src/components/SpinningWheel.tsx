'use client';

import React, { useState, useRef } from 'react';
import { WheelEngine, SpinResult } from '@tooli/wheel-engine';

interface SpinningWheelProps {
  size?: number;
  onSpinComplete?: (result: SpinResult) => void;
  disabled?: boolean;
}

export const SpinningWheel: React.FC<SpinningWheelProps> = ({
  size = 300,
  onSpinComplete,
  disabled = false,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<SpinResult | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const wheelEngine = useRef(new WheelEngine());

  const segments = wheelEngine.current.getSegments();
  const segmentAngle = 360 / segments.length;

  const handleSpin = async () => {
    if (isSpinning || disabled) return;

    setIsSpinning(true);
    setResult(null);

    try {
      // Add random rotation for visual effect
      const randomRotation = Math.random() * 360;
      const newRotation = rotation + 1440 + randomRotation; // 4 full rotations + random
      setRotation(newRotation);

      // Spin the wheel engine
      const spinResult = await wheelEngine.current.spin();
      setResult(spinResult);

      if (onSpinComplete) {
        onSpinComplete(spinResult);
      }
    } catch (error) {
      console.error('Spin failed:', error);
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <div className="spinning-wheel-container" style={{ textAlign: 'center' }}>
      <div
        ref={wheelRef}
        className="wheel"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          position: 'relative',
          border: '4px solid #333',
          transition: isSpinning
            ? 'none'
            : 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: `rotate(${rotation}deg)`,
          cursor: isSpinning || disabled ? 'not-allowed' : 'pointer',
          margin: '0 auto',
        }}
        onClick={handleSpin}
      >
        {segments.map((segment, index) => {
          const startAngle = index * segmentAngle;
          const endAngle = (index + 1) * segmentAngle;
          const midAngle = (startAngle + endAngle) / 2;

          return (
            <div
              key={segment.id}
              className="wheel-segment"
              style={{
                position: 'absolute',
                width: '50%',
                height: '50%',
                transformOrigin: '100% 100%',
                transform: `rotate(${startAngle}deg)`,
                clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
                backgroundColor: segment.color || '#ccc',
                border: '1px solid #333',
              }}
            >
              <div
                className="segment-label"
                style={{
                  position: 'absolute',
                  top: '25%',
                  left: '25%',
                  transform: `rotate(${midAngle - startAngle}deg)`,
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#fff',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                  whiteSpace: 'nowrap',
                }}
              >
                {segment.label}
              </div>
            </div>
          );
        })}

        {/* Center pointer */}
        <div
          className="wheel-pointer"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 0,
            height: 0,
            transform: 'translate(-50%, -50%)',
            borderLeft: '15px solid transparent',
            borderRight: '15px solid transparent',
            borderTop: '30px solid #333',
            zIndex: 10,
          }}
        />
      </div>

      {/* Spin button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning || disabled}
        style={{
          marginTop: '20px',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: isSpinning || disabled ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: isSpinning || disabled ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s',
        }}
      >
        {isSpinning ? 'Spinning...' : 'Spin Wheel'}
      </button>

      {/* Result display */}
      {result && (
        <div
          className="result-display"
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: result.isWinner ? '#d4edda' : '#f8d7da',
            border: `2px solid ${result.isWinner ? '#c3e6cb' : '#f5c6cb'}`,
            borderRadius: '8px',
            color: result.isWinner ? '#155724' : '#721c24',
          }}
        >
          <h3>
            {result.isWinner ? '🎉 Congratulations!' : 'Better luck next time!'}
          </h3>
          <p>
            You won: <strong>{result.prize}</strong>
          </p>
        </div>
      )}
    </div>
  );
};
