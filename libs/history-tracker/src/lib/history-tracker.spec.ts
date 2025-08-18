import { HistoryTracker } from './history-tracker.js';

describe('HistoryTracker', () => {
  let historyTracker: HistoryTracker;

  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    historyTracker = new HistoryTracker();
  });

  it('should create an instance', () => {
    expect(historyTracker).toBeInstanceOf(HistoryTracker);
  });

  it('should add spin records', () => {
    const record = historyTracker.addSpinRecord(
      'user1',
      'John',
      'Winner',
      0.25
    );

    expect(record).toBeDefined();
    expect(record.userId).toBe('user1');
    expect(record.userName).toBe('John');
    expect(record.result).toBe('Winner');
    expect(record.probability).toBe(0.25);
    expect(record.timestamp).toBeInstanceOf(Date);
  });

  it('should get recent spins', () => {
    historyTracker.addSpinRecord('user1', 'John', 'Winner', 0.25);
    historyTracker.addSpinRecord('user2', 'Jane', 'Loser', 0.75);

    const recentSpins = historyTracker.getRecentSpins(2);
    expect(recentSpins).toHaveLength(2);
    expect(recentSpins[0].userName).toBe('Jane'); // Most recent first
    expect(recentSpins[1].userName).toBe('John');
  });

  it('should get user history', () => {
    historyTracker.addSpinRecord('user1', 'John', 'Winner', 0.25);
    historyTracker.addSpinRecord('user2', 'Jane', 'Loser', 0.75);
    historyTracker.addSpinRecord('user1', 'John', 'Winner', 0.5);

    const userHistory = historyTracker.getUserHistory('user1');
    expect(userHistory).toHaveLength(2);
    expect(userHistory.every((record) => record.userId === 'user1')).toBe(true);
  });

  it('should get statistics', () => {
    historyTracker.addSpinRecord('user1', 'John', 'Winner', 0.25);
    historyTracker.addSpinRecord('user2', 'Jane', 'Loser', 0.75);
    historyTracker.addSpinRecord('user1', 'John', 'Winner', 0.5);

    const stats = historyTracker.getStats();
    expect(stats.totalSpins).toBe(3);
    expect(stats.mostFrequentWinner).toBe('John');
    expect(stats.averageProbability).toBeCloseTo(0.5, 2);
    expect(stats.lastSpinDate).toBeInstanceOf(Date);
  });

  it('should handle empty history', () => {
    const stats = historyTracker.getStats();
    expect(stats.totalSpins).toBe(0);
    expect(stats.mostFrequentWinner).toBe('');
    expect(stats.averageProbability).toBe(0);
    expect(stats.lastSpinDate).toBeNull();
  });

  it('should export and import JSON', () => {
    historyTracker.addSpinRecord('user1', 'John', 'Winner', 0.25);
    historyTracker.addSpinRecord('user2', 'Jane', 'Loser', 0.75);

    const jsonData = historyTracker.exportToJSON();
    expect(jsonData).toBeDefined();

    // Create new instance and import
    const newHistoryTracker = new HistoryTracker();
    newHistoryTracker.importFromJSON(jsonData);

    const importedSpins = newHistoryTracker.getRecentSpins();
    expect(importedSpins).toHaveLength(2);
  });

  it('should export CSV', () => {
    historyTracker.addSpinRecord('user1', 'John', 'Winner', 0.25);

    const csvData = historyTracker.exportToCSV();
    expect(csvData).toContain(
      '"ID","User ID","User Name","Result","Probability","Timestamp"'
    );
    expect(csvData).toContain('John');
    expect(csvData).toContain('Winner');
  });

  it('should clear history', () => {
    historyTracker.addSpinRecord('user1', 'John', 'Winner', 0.25);
    expect(historyTracker.getRecentSpins()).toHaveLength(1);

    historyTracker.clearHistory();
    expect(historyTracker.getRecentSpins()).toHaveLength(0);
  });

  it('should notify subscribers', () => {
    const mockListener = jest.fn();
    const unsubscribe = historyTracker.subscribe(mockListener);

    historyTracker.addSpinRecord('user1', 'John', 'Winner', 0.25);
    expect(mockListener).toHaveBeenCalled();

    unsubscribe();
    mockListener.mockClear();

    historyTracker.addSpinRecord('user2', 'Jane', 'Loser', 0.75);
    expect(mockListener).not.toHaveBeenCalled();
  });
});
