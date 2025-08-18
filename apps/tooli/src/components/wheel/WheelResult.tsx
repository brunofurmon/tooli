'use client';

import React from 'react';
import { WheelSegment } from '@tooli/wheel-engine';

interface WheelResultProps {
  result: WheelSegment | null;
  isSpinning: boolean;
}

export const WheelResult: React.FC<WheelResultProps> = ({
  result,
  isSpinning,
}) => {
  if (!result || isSpinning) {
    return null;
  }

  return (
    <div className="text-center">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
        <h3 className="font-bold text-lg">🎉 Result: {result.label}</h3>
        <p className="text-sm mt-1">Probability: {result.probability}%</p>
      </div>
    </div>
  );
};
