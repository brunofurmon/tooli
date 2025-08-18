'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Button, Input } from '@heroui/react';
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
    mostFrequentWinner: '',
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

  const handleExportUsers = () => {
    try {
      const jsonData = userManager.exportToJSON();
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tooli-users.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export users:', error);
    }
  };

  const handleExportHistory = () => {
    try {
      const jsonData = historyTracker.exportToJSON();
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tooli-history.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export history:', error);
    }
  };

  const handleImportUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        userManager.importFromJSON(jsonData);
      } catch (error) {
        console.error('Failed to import users:', error);
      }
    };
    reader.readAsText(file);
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
    return `${value.toFixed(1)}%`;
  };

  return (
    <Card style={{ width: '100%', maxWidth: '400px' }}>
      <CardHeader>
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
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--nextui-colors-foreground)',
                margin: '0 0 8px 0',
              }}
            >
              Overall Stats
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
                  fontSize: '12px',
                }}
              >
                <span
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    opacity: 0.7,
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
                  fontSize: '12px',
                }}
              >
                <span
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    opacity: 0.7,
                  }}
                >
                  Most Wins:
                </span>
                <span
                  style={{
                    color: 'var(--nextui-colors-foreground)',
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
                  fontSize: '12px',
                }}
              >
                <span
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    opacity: 0.7,
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
                  fontSize: '12px',
                }}
              >
                <span
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    opacity: 0.7,
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

          {/* User Statistics */}
          <div>
            <h4
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--nextui-colors-foreground)',
                margin: '0 0 8px 0',
              }}
            >
              User Stats
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                maxHeight: '200px',
                overflowY: 'auto',
              }}
            >
              {Object.entries(userStats).map(([userId, userStat]) => {
                const user = userManager.getUserById(userId);
                if (!user) return null;

                return (
                  <div
                    key={userId}
                    style={{
                      padding: '8px',
                      border: '1px solid var(--nextui-colors-divider)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: '600',
                        color: 'var(--nextui-colors-foreground)',
                        marginBottom: '4px',
                      }}
                    >
                      {user.name}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: 'var(--nextui-colors-foreground)',
                        opacity: 0.7,
                      }}
                    >
                      <span>Wins: {userStat.wins}</span>
                      <span>Rate: {formatPercentage(userStat.winRate)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Import/Export Section */}
          <div>
            <h4
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--nextui-colors-foreground)',
                margin: '0 0 8px 0',
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
              <Button size="sm" variant="light" onPress={handleExportUsers}>
                Export Users (JSON)
              </Button>
              <Button size="sm" variant="light" onPress={handleExportHistory}>
                Export History (JSON)
              </Button>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Input
                  type="file"
                  accept=".json"
                  size="sm"
                  onChange={handleImportUsers}
                  style={{ flex: 1 }}
                />
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--nextui-colors-foreground)',
                    opacity: 0.7,
                  }}
                >
                  Import Users
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
