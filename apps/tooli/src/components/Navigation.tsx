'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/Button';

export const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              🎯 Tooli
            </Link>
          </div>

          <div className="flex space-x-2">
            <Link href="/">
              <Button
                variant={pathname === '/' ? 'primary' : 'ghost'}
                size="md"
                className="min-w-[140px]"
              >
                🎮 Spinning Wheel
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant={pathname === '/about' ? 'primary' : 'ghost'}
                size="md"
                className="min-w-[100px]"
              >
                ℹ️ About
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
