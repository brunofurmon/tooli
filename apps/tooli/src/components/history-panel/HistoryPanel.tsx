'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Button } from '@heroui/react';
import { HistoryTracker, SpinRecord } from '@tooli/history-tracker';
import { WheelSegment } from '@tooli/wheel-engine';

interface HistoryPanelProps {
  historyTracker: HistoryTracker;
  pendingResult?: WheelSegment | null;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  historyTracker,
  pendingResult,
}) => {
  const [history, setHistory] = useState<SpinRecord[]>([]);
  const [displayLimit, setDisplayLimit] = useState(10);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const updateHistory = () => {
      setHistory(historyTracker.getRecentSpins(displayLimit));
    };

    updateHistory();
    const unsubscribe = historyTracker.subscribe(updateHistory);
    return unsubscribe;
  }, [historyTracker, displayLimit]);

  const handleLoadMore = () => {
    const newLimit = displayLimit + 10;
    setDisplayLimit(newLimit);
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setDisplayLimit(10);
    setIsExpanded(false);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatProbability = (probability: number): string => {
    return `${(probability * 100).toFixed(1)}%`;
  };

  return (
    <Card style={{ width: '100%', maxWidth: '600px' }}>
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
            📊 Spin History
          </h3>
          <span
            style={{
              fontSize: '14px',
              color: 'var(--nextui-colors-foreground)',
              opacity: 0.7,
            }}
          >
            {history.length} spins
          </span>
        </div>
      </CardHeader>
      <CardBody>
        {/* Show pending result at the top */}
        {pendingResult && (
          <div
            style={{
              backgroundColor: 'var(--nextui-colors-success)',
              color: 'white',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '16px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            🎉 Latest Result: {pendingResult.label} (
            {formatProbability(pendingResult.probability)})
          </div>
        )}

        {history.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '24px',
              color: 'var(--nextui-colors-foreground)',
              opacity: 0.6,
            }}
          >
            No spins recorded yet. Spin the wheel to see history!
          </div>
        ) : (
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {history.map((record) => (
                <div
                  key={record.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    borderBottom: '1px solid var(--nextui-colors-divider)',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      'var(--nextui-colors-default50)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'var(--nextui-colors-foreground)',
                      }}
                    >
                      {record.userName}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--nextui-colors-foreground)',
                        opacity: 0.7,
                      }}
                    >
                      {formatDate(record.timestamp)}
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '4px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'var(--nextui-colors-success)',
                      }}
                    >
                      {record.result}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--nextui-colors-foreground)',
                        opacity: 0.7,
                      }}
                    >
                      {formatProbability(record.probability)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More / Collapse Controls */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '16px',
                gap: '8px',
              }}
            >
              {!isExpanded &&
                historyTracker.getAllHistory().length > displayLimit && (
                  <Button size="sm" variant="light" onPress={handleLoadMore}>
                    Load More (
                    {historyTracker.getAllHistory().length - displayLimit}{' '}
                    remaining)
                  </Button>
                )}

              {isExpanded && (
                <Button size="sm" variant="light" onPress={handleCollapse}>
                  Show Less
                </Button>
              )}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
