import React from 'react';
import { PickerWheel } from './PickerWheel';
import { Card } from './ui/Card';

export const WheelTab: React.FC = () => {
  return (
    <div className="wheel-tab">
      <Card className="max-w-2xl mx-auto">
        <PickerWheel size={450} />
      </Card>
    </div>
  );
};
