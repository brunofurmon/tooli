'use client';

import React from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';

interface ColorSwatchProps {
  name: string;
  variable: string;
  color: string;
  description?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  name,
  variable,
  color,
  description,
}) => (
  <div className="flex flex-col gap-2">
    <div
      className="w-16 h-16 rounded-lg shadow-md border border-gray-200"
      style={{ backgroundColor: color }}
    />
    <div className="text-sm">
      <div className="font-semibold">{name}</div>
      <div className="text-gray-600 font-mono text-xs">{variable}</div>
      {description && (
        <div className="text-gray-500 text-xs mt-1">{description}</div>
      )}
    </div>
  </div>
);

export const ColorPalette: React.FC = () => {
  const primaryColors = [
    {
      name: 'Primary 50',
      variable: '--color-primary-50',
      color: 'var(--color-primary-50)',
      description: 'Lightest primary',
    },
    {
      name: 'Primary 100',
      variable: '--color-primary-100',
      color: 'var(--color-primary-100)',
      description: 'Very light primary',
    },
    {
      name: 'Primary 500',
      variable: '--color-primary-500',
      color: 'var(--color-primary-500)',
      description: 'Main primary',
    },
    {
      name: 'Primary 600',
      variable: '--color-primary-600',
      color: 'var(--color-primary-600)',
      description: 'Primary hover',
    },
    {
      name: 'Primary 900',
      variable: '--color-primary-900',
      color: 'var(--color-primary-900)',
      description: 'Darkest primary',
    },
  ];

  const semanticColors = [
    {
      name: 'Success',
      variable: '--color-success',
      color: 'var(--color-success)',
      description: 'Success states',
    },
    {
      name: 'Warning',
      variable: '--color-warning',
      color: 'var(--color-warning)',
      description: 'Warning states',
    },
    {
      name: 'Error',
      variable: '--color-error',
      color: 'var(--color-error)',
      description: 'Error states',
    },
    {
      name: 'Info',
      variable: '--color-info',
      color: 'var(--color-info)',
      description: 'Info states',
    },
  ];

  const wheelColors = [
    {
      name: 'Wheel 1',
      variable: '--wheel-color-1',
      color: 'var(--wheel-color-1)',
      description: 'Vibrant red',
    },
    {
      name: 'Wheel 2',
      variable: '--wheel-color-2',
      color: 'var(--wheel-color-2)',
      description: 'Teal',
    },
    {
      name: 'Wheel 3',
      variable: '--wheel-color-3',
      color: 'var(--wheel-color-3)',
      description: 'Blue',
    },
    {
      name: 'Wheel 4',
      variable: '--wheel-color-4',
      color: 'var(--wheel-color-4)',
      description: 'Mint green',
    },
    {
      name: 'Wheel 5',
      variable: '--wheel-color-5',
      color: 'var(--wheel-color-5)',
      description: 'Yellow',
    },
    {
      name: 'Wheel 6',
      variable: '--wheel-color-6',
      color: 'var(--wheel-color-6)',
      description: 'Purple',
    },
    {
      name: 'Wheel 7',
      variable: '--wheel-color-7',
      color: 'var(--wheel-color-7)',
      description: 'Sage green',
    },
    {
      name: 'Wheel 8',
      variable: '--wheel-color-8',
      color: 'var(--wheel-color-8)',
      description: 'Gold',
    },
    {
      name: 'Wheel 9',
      variable: '--wheel-color-9',
      color: 'var(--wheel-color-9)',
      description: 'Lavender',
    },
    {
      name: 'Wheel 10',
      variable: '--wheel-color-10',
      color: 'var(--wheel-color-10)',
      description: 'Sky blue',
    },
    {
      name: 'Wheel 11',
      variable: '--wheel-color-11',
      color: 'var(--wheel-color-11)',
      description: 'Orange',
    },
    {
      name: 'Wheel 12',
      variable: '--wheel-color-12',
      color: 'var(--wheel-color-12)',
      description: 'Light green',
    },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Design System Color Palette</h3>
          <p className="text-gray-600">
            Comprehensive color system for Tooli v1.4.0
          </p>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            {/* Primary Colors */}
            <div>
              <h4 className="text-lg font-medium mb-4">Primary Colors</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {primaryColors.map((color) => (
                  <ColorSwatch key={color.name} {...color} />
                ))}
              </div>
            </div>

            {/* Semantic Colors */}
            <div>
              <h4 className="text-lg font-medium mb-4">Semantic Colors</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {semanticColors.map((color) => (
                  <ColorSwatch key={color.name} {...color} />
                ))}
              </div>
            </div>

            {/* Wheel Colors */}
            <div>
              <h4 className="text-lg font-medium mb-4">Wheel Colors</h4>
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4">
                {wheelColors.map((color) => (
                  <ColorSwatch key={color.name} {...color} />
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
