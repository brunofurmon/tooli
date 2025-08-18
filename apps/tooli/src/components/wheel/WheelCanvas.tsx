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
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DDA0DD',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E9',
    '#F8C471',
    '#82E0AA',
  ];

  const drawWheel = (
    ctx: CanvasRenderingContext2D,
    currentRotation: number
  ) => {
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 20;
    const segmentAngle = 360 / segments.length;

    ctx.clearRect(0, 0, size, size);

    segments.forEach((segment, index) => {
      const startAngle =
        (index * segmentAngle + currentRotation) * (Math.PI / 180);
      const endAngle =
        ((index + 1) * segmentAngle + currentRotation) * (Math.PI / 180);

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + (segmentAngle * Math.PI) / 180 / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(segment.label, radius * 0.7, 0);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 10);
    ctx.lineTo(centerX - 10, centerY - radius + 10);
    ctx.lineTo(centerX + 10, centerY - radius + 10);
    ctx.closePath();
    ctx.fillStyle = '#FF6B6B';
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawWheel(ctx, rotation);
  }, [rotation, segments, size]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="cursor-pointer transition-transform hover:scale-105"
        onClick={onSpin}
      />
      {isSpinning && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/50 text-white px-4 py-2 rounded-lg">
            Spinning...
          </div>
        </div>
      )}
    </div>
  );
};
