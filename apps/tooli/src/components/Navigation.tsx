'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button, Switch } from '@heroui/react';
import { SunIcon, MoonIcon } from './icons';

export const Navigation: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav
      style={{
        backgroundColor: 'var(--nextui-colors-background)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--nextui-colors-divider)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px',
          }}
        >
          {/* Logo */}
          <div style={{ flexShrink: 0 }}>
            <Link
              href="/"
              style={{
                fontSize: '26px',
                fontWeight: 'bold',
                color: 'var(--nextui-colors-foreground)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--nextui-colors-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--nextui-colors-foreground)';
              }}
            >
              🎯 Tooli
            </Link>
          </div>

          {/* Navigation Links */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              padding: '0 16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '24px',
              }}
            >
              <Link href="/">
                <Button variant="light" size="md">
                  🎲 Spin
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="light" size="md">
                  ℹ️ About
                </Button>
              </Link>
            </div>
          </div>

          {/* Theme Toggle */}
          <div style={{ marginLeft: '16px' }}>
            <Switch
              isSelected={theme === 'dark'}
              onValueChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              size="md"
              color="primary"
              startContent={<SunIcon />}
              endContent={<MoonIcon />}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
