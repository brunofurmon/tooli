import React from 'react';
import { Navigation } from '../components/Navigation';
import { PickerWheel } from '../components/PickerWheel';
import { Card } from '../components/ui/Card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <PickerWheel size={450} />
        </Card>
      </div>
    </div>
  );
}
