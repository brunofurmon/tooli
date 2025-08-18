'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { PickerWheel } from '../components/PickerWheel';
import { UserPanel } from '../components/user-panel/UserPanel';
import { UserManager } from '@tooli/user-management';
import { WheelSegment } from '@tooli/wheel-engine';

export default function HomePage() {
  const [userManager] = useState(() => {
    const manager = new UserManager();
    // Pre-populate default users if none exist
    if (manager.getUserCount() === 0) {
      console.log('Adding default users...');
      manager.addUser('Yes');
      manager.addUser('No');
      manager.addUser('Yes');
      manager.addUser('No');
    }
    console.log(
      'UserManager initialized with',
      manager.getUserCount(),
      'users'
    );
    return manager;
  });
  const [wheelSegments, setWheelSegments] = useState(
    userManager.getWheelSegments()
  );

  useEffect(() => {
    console.log('Setting up user manager subscription...');
    const unsubscribe = userManager.subscribe(() => {
      const newSegments = userManager.getWheelSegments();
      console.log('User manager updated, new segments:', newSegments.length);
      setWheelSegments(newSegments);
    });

    return unsubscribe;
  }, [userManager]);

  const handleUsersChanged = () => {
    const newSegments = userManager.getWheelSegments();
    console.log('Users changed, updating segments:', newSegments.length);
    setWheelSegments(newSegments);
  };

  const handleSpinComplete = (result: WheelSegment) => {
    // Record the spin result for the user
    if (
      result.id &&
      result.id !== 'default' &&
      result.id !== 'prize1' &&
      result.id !== 'prize2' &&
      result.id !== 'prize3' &&
      result.id !== 'prize4'
    ) {
      // This is a user ID, record the win
      userManager.recordWin(result.id);
    }
  };

  console.log(
    'Rendering HomePage with',
    wheelSegments.length,
    'wheel segments'
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--nextui-colors-background)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navigation />
      <main
        style={{
          flex: 1,
          padding: '16px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          {/* Top section: Wheel and User Panel */}
          <div
            style={{
              marginBottom: '32px',
            }}
          >
            {/* Desktop Layout: Wheel on left, User Panel on right */}
            <div className="main-layout">
              {/* Wheel section */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '500px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                  }}
                >
                  <PickerWheel
                    size={450}
                    segments={wheelSegments}
                    onSpinComplete={handleSpinComplete}
                  />
                </div>
              </div>

              {/* User Panel section */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <UserPanel
                  userManager={userManager}
                  onUsersChanged={handleUsersChanged}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
