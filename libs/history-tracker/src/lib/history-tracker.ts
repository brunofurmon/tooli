export interface SpinRecord {
  id: string;
  userId: string;
  userName: string;
  timestamp: Date;
  result: string;
  probability: number;
}

export interface HistoryStats {
  totalSpins: number;
  mostFrequentWinner: string;
  averageProbability: number;
  lastSpinDate: Date | null;
}

export class HistoryTracker {
  private history: SpinRecord[] = [];
  private storageKey = 'tooli-spin-history';
  private listeners: Array<() => void> = [];
  private maxHistorySize = 1000; // Keep last 1000 spins

  constructor() {
    this.loadFromStorage();
  }

  // Add a new spin record
  addSpinRecord(
    userId: string,
    userName: string,
    result: string,
    probability: number
  ): SpinRecord {
    const record: SpinRecord = {
      id: this.generateId(),
      userId,
      userName,
      timestamp: new Date(),
      result,
      probability,
    };

    this.history.unshift(record); // Add to beginning (most recent first)

    // Keep only the last maxHistorySize records
    if (this.history.length > this.maxHistorySize) {
      this.history = this.history.slice(0, this.maxHistorySize);
    }

    this.saveToStorage();
    this.notifyListeners();
    return record;
  }

  // Get recent spins (most recent first)
  getRecentSpins(limit = 10): SpinRecord[] {
    return this.history.slice(0, limit);
  }

  // Get all history
  getAllHistory(): SpinRecord[] {
    return [...this.history];
  }

  // Get history for a specific user
  getUserHistory(userId: string): SpinRecord[] {
    return this.history.filter((record) => record.userId === userId);
  }

  // Get history within a date range
  getHistoryInRange(startDate: Date, endDate: Date): SpinRecord[] {
    return this.history.filter(
      (record) => record.timestamp >= startDate && record.timestamp <= endDate
    );
  }

  // Clear all history
  clearHistory(): void {
    this.history = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  // Get statistics
  getStats(): HistoryStats {
    if (this.history.length === 0) {
      return {
        totalSpins: 0,
        mostFrequentWinner: '',
        averageProbability: 0,
        lastSpinDate: null,
      };
    }

    // Count wins per user
    const winCounts: { [key: string]: number } = {};
    let totalProbability = 0;

    this.history.forEach((record) => {
      winCounts[record.userName] = (winCounts[record.userName] || 0) + 1;
      totalProbability += record.probability;
    });

    // Find most frequent winner
    const mostFrequentWinner = Object.entries(winCounts).sort(
      ([, a], [, b]) => b - a
    )[0][0];

    return {
      totalSpins: this.history.length,
      mostFrequentWinner,
      averageProbability: totalProbability / this.history.length,
      lastSpinDate: this.history[0]?.timestamp || null,
    };
  }

  // Export history to JSON
  exportToJSON(): string {
    return JSON.stringify(this.history, null, 2);
  }

  // Import history from JSON
  importFromJSON(jsonData: string): void {
    try {
      const importedHistory = JSON.parse(jsonData) as SpinRecord[];

      // Validate and process imported history
      const validRecords = importedHistory.filter(
        (record) =>
          record.id &&
          record.userId &&
          record.userName &&
          record.timestamp &&
          record.result &&
          typeof record.probability === 'number'
      );

      // Convert timestamp strings back to Date objects
      const processedRecords = validRecords.map((record) => ({
        ...record,
        timestamp: new Date(record.timestamp),
      }));

      this.history = processedRecords;
      this.saveToStorage();
      this.notifyListeners();
    } catch {
      throw new Error('Invalid JSON format for history data');
    }
  }

  // Export history to CSV
  exportToCSV(): string {
    const headers = [
      'ID',
      'User ID',
      'User Name',
      'Result',
      'Probability',
      'Timestamp',
    ];
    const rows = this.history.map((record) => [
      record.id,
      record.userId,
      record.userName,
      record.result,
      record.probability.toString(),
      record.timestamp.toISOString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    return csvContent;
  }

  // Event listeners
  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  // Private helper methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private async saveToStorage(): Promise<void> {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.storageKey, JSON.stringify(this.history));
      }
    } catch (error) {
      console.error('Failed to save history to storage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          const parsedHistory = JSON.parse(stored);
          this.history = parsedHistory.map(
            (record: { timestamp: string; [key: string]: unknown }) => ({
              ...record,
              timestamp: new Date(record.timestamp),
            })
          );
        }
      }
    } catch (error) {
      console.error('Failed to load history from storage:', error);
      this.history = [];
    }
  }
}
