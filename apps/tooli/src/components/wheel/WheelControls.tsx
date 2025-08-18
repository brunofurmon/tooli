'use client';

import React from 'react';
import { Button } from '../ui/Button';

interface WheelControlsProps {
  onSpin: () => void;
  isSpinning: boolean;
}

export const WheelControls: React.FC<WheelControlsProps> = ({
  onSpin,
  isSpinning,
}) => {
  return (
    <Button
      onPress={onSpin}
      disabled={isSpinning}
      color="primary"
      size="lg"
      className="font-bold"
    >
      {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
    </Button>
  );
};
