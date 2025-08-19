'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { PickerWheel } from '../components/PickerWheel';
import { UserPanel } from '../components/user-panel/UserPanel';
import { HistoryPanel } from '../components/history-panel/HistoryPanel';
import { AnalyticsPanel } from '../components/analytics-panel/AnalyticsPanel';
import { UserManager } from '@tooli/user-management';
import { HistoryTracker } from '@tooli/history-tracker';
import { WheelSegment } from '@tooli/wheel-engine';

export default function HomePage() {
  // Set page title
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = 'Tooli - Spin';
    }
  }, []);
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

  const [historyTracker] = useState(() => {
    console.log('Initializing HistoryTracker...');
    return new HistoryTracker();
  });

  const [wheelSegments, setWheelSegments] = useState(
    userManager.getWheelSegments()
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const [pendingResult, setPendingResult] = useState<WheelSegment | null>(null);

  // Subscribe to user manager changes to update wheel segments immediately
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

  const handleSpinStart = () => {
    setIsSpinning(true);
    setPendingResult(null);
  };

  const handleSpinComplete = (result: WheelSegment) => {
    setIsSpinning(false);
    setPendingResult(result);

    // Record the spin result for the user after a short delay to show the result
    setTimeout(() => {
      if (
        result.id &&
        result.id !== 'default' &&
        result.id !== 'prize1' &&
        result.id !== 'prize2' &&
        result.id !== 'prize3' &&
        result.id !== 'prize4'
      ) {
        // This is a user ID, record the win
        const user = userManager.getUserById(result.id);
        if (user) {
          userManager.recordWin(result.id);
          historyTracker.addSpinRecord(
            result.id,
            user.name,
            result.label,
            result.probability
          );
          console.log(
            'Recorded spin for user:',
            user.name,
            'with result:',
            result.label
          );
        }
      }
      setPendingResult(null);
    }, 2000); // Show result for 2 seconds before clearing
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
              padding: '24px',
              backgroundColor: 'var(--nextui-colors-background)',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
                    onSpinStart={handleSpinStart}
                    onSpinComplete={handleSpinComplete}
                    isSpinning={isSpinning}
                    pendingResult={pendingResult}
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

          {/* Bottom section: History and Analytics */}
          <div
            style={{
              marginBottom: '32px',
              padding: '24px',
              backgroundColor: 'var(--nextui-colors-background)',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Desktop Layout: History on left, Analytics on right */}
            <div className="history-analytics-layout">
              {/* History section */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <HistoryPanel
                  historyTracker={historyTracker}
                  pendingResult={pendingResult}
                />
              </div>

              {/* Analytics section */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <AnalyticsPanel
                  historyTracker={historyTracker}
                  userManager={userManager}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
