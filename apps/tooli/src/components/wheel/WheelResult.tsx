'use client';

import React from 'react';
import { Card, CardBody } from '@heroui/react';
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
    <div style={{ textAlign: 'center' }}>
      <Card
        style={{
          backgroundColor: 'var(--nextui-colors-success50)',
          border: '1px solid var(--nextui-colors-success200)',
          color: 'var(--nextui-colors-success700)',
        }}
      >
        <CardBody>
          <h3
            style={{
              fontWeight: 'bold',
              fontSize: '18px',
              margin: 0,
              marginBottom: '4px',
            }}
          >
            🎉 Result: {result.label}
          </h3>
          <p
            style={{
              fontSize: '14px',
              margin: 0,
              opacity: 0.8,
            }}
          >
            Probability: {((result.probability || 0) * 100).toFixed(1)}%
          </p>
        </CardBody>
      </Card>
    </div>
  );
};
