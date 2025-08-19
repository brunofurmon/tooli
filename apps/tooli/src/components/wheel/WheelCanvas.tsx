'use client';

import React, { useRef, useEffect } from 'react';
import { WheelSegment } from '@tooli/wheel-engine';

interface WheelCanvasProps {
  size: number;
  segments: WheelSegment[];
  rotation: number;
  onSpin: () => void;
  isSpinning: boolean;
}

export const WheelCanvas: React.FC<WheelCanvasProps> = ({
  size,
  segments,
  rotation,
  onSpin,
  isSpinning,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colors = [
    '#ff6b6b', // var(--wheel-color-1) - Vibrant red
    '#4ecdc4', // var(--wheel-color-2) - Teal
    '#45b7d1', // var(--wheel-color-3) - Blue
    '#96ceb4', // var(--wheel-color-4) - Mint green
    '#ffeaa7', // var(--wheel-color-5) - Yellow
    '#dda0dd', // var(--wheel-color-6) - Purple
    '#98d8c8', // var(--wheel-color-7) - Sage green
    '#f7dc6f', // var(--wheel-color-8) - Gold
    '#bb8fce', // var(--wheel-color-9) - Lavender
    '#85c1e9', // var(--wheel-color-10) - Sky blue
    '#f8c471', // var(--wheel-color-11) - Orange
    '#82e0aa', // var(--wheel-color-12) - Light green
  ];

  const drawWheel = (
    ctx: CanvasRenderingContext2D,
    currentRotation: number
  ) => {
    console.log(
      'Drawing wheel with segments:',
      segments.length,
      'size:',
      size,
      'rotation:',
      rotation
    );

    if (segments.length === 0) {
      console.warn('No segments to draw');
      return;
    }

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 20;

    // Clear canvas with a visible background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#f0f0f0';
    ctx.fill();
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 3;
    ctx.stroke();

    let currentAngle = currentRotation * (Math.PI / 180);

    segments.forEach((segment, index) => {
      const segmentAngle = segment.probability * 2 * Math.PI;
      const startAngle = currentAngle;
      const endAngle = currentAngle + segmentAngle;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px Arial';
      ctx.fillText(segment.label, radius * 0.7, 0);
      ctx.restore();

      currentAngle = endAngle;
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw pointer (positioned at top, pointing down)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius + 15);
    ctx.lineTo(centerX - 15, centerY - radius - 15);
    ctx.lineTo(centerX + 15, centerY - radius - 15);
    ctx.closePath();
    ctx.fillStyle = '#FF6B6B';
    ctx.fill();
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.stroke();

    console.log('Wheel drawing completed');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas ref is null');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D context');
      return;
    }

    console.log('Canvas context obtained, drawing wheel...');
    drawWheel(ctx, rotation);
  }, [rotation, segments, size]);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          borderRadius: '16px',
          border: '3px solid #333333',
          backgroundColor: '#ffffff',
          display: 'block',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
        onClick={onSpin}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      />
      {isSpinning && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Spinning...
          </div>
        </div>
      )}
    </div>
  );
};
