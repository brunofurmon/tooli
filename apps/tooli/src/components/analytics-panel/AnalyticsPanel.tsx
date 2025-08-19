'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Button } from '@heroui/react';
import { HistoryTracker, HistoryStats } from '@tooli/history-tracker';
import { UserManager } from '@tooli/user-management';

interface AnalyticsPanelProps {
  historyTracker: HistoryTracker;
  userManager: UserManager;
}

export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({
  historyTracker,
  userManager,
}) => {
  const [stats, setStats] = useState<HistoryStats>({
    totalSpins: 0,
    mostFrequentWinner: null,
    averageProbability: 0,
    lastSpinDate: null,
  });
  const [userStats, setUserStats] = useState<{
    [key: string]: { wins: number; totalSpins: number; winRate: number };
  }>({});

  useEffect(() => {
    const updateStats = () => {
      setStats(historyTracker.getStats());
      setUserStats(userManager.getUserStats());
    };

    updateStats();
    const unsubscribeHistory = historyTracker.subscribe(updateStats);
    const unsubscribeUsers = userManager.subscribe(updateStats);
    return () => {
      unsubscribeHistory();
      unsubscribeUsers();
    };
  }, [historyTracker, userManager]);

  const handleExportHistory = () => {
    const data = historyTracker.exportToJSON();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tooli-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleResetHistory = () => {
    if (
      confirm(
        'Are you sure you want to reset all spin history and user statistics? This action cannot be undone.'
      )
    ) {
      // Clear history
      historyTracker.clearHistory();

      // Reset user statistics without removing users
      const users = userManager.getAllUsers();
      users.forEach((user) => {
        if (user.stats) {
          user.stats.wins = 0;
          user.stats.totalSpins = 0;
          user.stats.winRate = 0;
          user.lastModified = new Date();
        }
      });

      // Force update by triggering a save
      userManager.forceUpdate();
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return 'Never';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(1)}%`;
  };

  // Sort user stats by wins (most wins first)
  const sortedUserStats = Object.entries(userStats)
    .sort(([, a], [, b]) => b.wins - a.wins)
    .filter(([, stats]) => stats.wins > 0); // Only show users with wins

  return (
    <Card style={{ width: '100%', maxWidth: '400px' }}>
      <CardHeader>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'var(--nextui-colors-foreground)',
              margin: 0,
            }}
          >
            📈 Analytics
          </h3>
          <span
            style={{
              fontSize: '14px',
              color: 'var(--nextui-colors-foreground)',
              opacity: 0.7,
            }}
          >
            {stats.totalSpins} total
          </span>
        </div>
      </CardHeader>
      <CardBody>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Overall Statistics */}
          <div>
            <h4
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--nextui-colors-foreground)',
                margin: '0 0 12px 0',
              }}
            >
              Overall Statistics
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px',
                }}
              >
                <span
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    opacity: 0.8,
                  }}
                >
                  Total Spins:
                </span>
                <span
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    fontWeight: '600',
                  }}
                >
                  {stats.totalSpins}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px',
                }}
              >
                <span
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    opacity: 0.8,
                  }}
                >
                  Most Wins:
                </span>
                <span
                  style={{
                    color: 'var(--nextui-colors-success)',
                    fontWeight: '600',
                  }}
                >
                  {stats.mostFrequentWinner || 'None'}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px',
                }}
              >
                <span
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    opacity: 0.8,
                  }}
                >
                  Avg Probability:
                </span>
                <span
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    fontWeight: '600',
                  }}
                >
                  {formatPercentage(stats.averageProbability)}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px',
                }}
              >
                <span
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    opacity: 0.8,
                  }}
                >
                  Last Spin:
                </span>
                <span
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    fontWeight: '600',
                  }}
                >
                  {formatDate(stats.lastSpinDate)}
                </span>
              </div>
            </div>
          </div>

          {/* User Statistics - Sorted by most wins */}
          {sortedUserStats.length > 0 && (
            <div>
              <h4
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--nextui-colors-foreground)',
                  margin: '0 0 12px 0',
                }}
              >
                Top Performers
              </h4>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {sortedUserStats.map(([userId, userStat]) => {
                  const user = userManager.getUserById(userId);
                  return (
                    <div
                      key={userId}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px',
                        backgroundColor: 'var(--nextui-colors-default50)',
                        borderRadius: '6px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: 'var(--nextui-colors-foreground)',
                          }}
                        >
                          {user?.name || 'Unknown'}
                        </span>
                        <span
                          style={{
                            fontSize: '12px',
                            color: 'var(--nextui-colors-foreground)',
                            opacity: 0.7,
                          }}
                        >
                          {userStat.totalSpins} selections
                        </span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: '2px',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: 'var(--nextui-colors-success)',
                          }}
                        >
                          {userStat.wins} selections
                        </span>
                        <span
                          style={{
                            fontSize: '12px',
                            color: 'var(--nextui-colors-foreground)',
                            opacity: 0.7,
                          }}
                        >
                          {formatPercentage(userStat.winRate / 100)} selection
                          rate
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reset Buttons */}
          <div>
            <h4
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--nextui-colors-foreground)',
                margin: '0 0 12px 0',
              }}
            >
              Data Management
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <Button
                size="sm"
                variant="light"
                onPress={handleExportHistory}
                style={{ justifyContent: 'flex-start' }}
              >
                📤 Export History (JSON)
              </Button>
              <Button
                size="sm"
                color="danger"
                variant="light"
                onPress={handleResetHistory}
                style={{ justifyContent: 'flex-start' }}
              >
                🗑️ Reset History & Analytics
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
