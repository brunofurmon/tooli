'use client';

import React from 'react';

interface WheelControlsProps {
  onSpin: () => void;
  isSpinning: boolean;
}

export const WheelControls: React.FC<WheelControlsProps> = ({
  onSpin,
  isSpinning,
}) => {
  return (
    <button
      onClick={onSpin}
      disabled={isSpinning}
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
    >
      {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
    </button>
  );
};
