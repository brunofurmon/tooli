import { WheelSegment } from '@tooli/wheel-engine';

export interface User {
  id: string;
  name: string;
  isActive: boolean;
  isChecked: boolean;
  customWeight?: number; // 0-100, optional
  color?: string;
  createdAt: Date;
  lastModified: Date;
  stats?: {
    wins: number;
    totalSpins: number;
    winRate: number;
  };
}

export interface UserStats {
  [userId: string]: {
    wins: number;
    totalSpins: number;
    winRate: number;
    participationRate: number;
  };
}

export class UserManager {
  private users: User[] = [];
  private storageKey = 'tooli-users';
  private listeners: Array<() => void> = [];

  constructor() {
    this.loadFromStorage();
  }

  // User CRUD operations
  addUser(name: string): User {
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length > 255) {
      throw new Error('Name must be between 1 and 255 characters');
    }

    // Check for duplicate names (allowed as per requirements)
    const newUser: User = {
      id: this.generateId(),
      name: trimmedName,
      isActive: true,
      isChecked: true, // Default to checked/participating
      color: this.generateColor(),
      createdAt: new Date(),
      lastModified: new Date(),
      stats: {
        wins: 0,
        totalSpins: 0,
        winRate: 0,
      },
    };

    this.users.push(newUser);
    this.saveToStorage();
    this.notifyListeners();
    return newUser;
  }

  removeUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.saveToStorage();
      this.notifyListeners();
      return true;
    }
    return false;
  }

  toggleUserParticipation(id: string): void {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      user.isChecked = !user.isChecked;
      user.lastModified = new Date();
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  updateUserWeight(id: string, weight: number): void {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      if (weight < 0 || weight > 100) {
        throw new Error('Weight must be between 0 and 100');
      }

      user.customWeight = weight === 0 ? undefined : weight;
      user.lastModified = new Date();
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  updateUserName(id: string, name: string): void {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      const trimmedName = name.trim();
      if (!trimmedName || trimmedName.length > 255) {
        throw new Error('Name must be between 1 and 255 characters');
      }

      user.name = trimmedName;
      user.lastModified = new Date();
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  // Getters
  getAllUsers(): User[] {
    return [...this.users];
  }

  getActiveUsers(): User[] {
    return this.users.filter((user) => user.isChecked);
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getUserCount(): number {
    return this.users.length;
  }

  getActiveUserCount(): number {
    return this.users.filter((user) => user.isChecked).length;
  }

  // Wheel integration
  getWheelSegments(): WheelSegment[] {
    const activeUsers = this.users.filter((user) => user.isChecked);

    console.log(
      'Getting wheel segments for',
      activeUsers.length,
      'active users out of',
      this.users.length,
      'total users'
    );

    if (activeUsers.length === 0) {
      // Return default segments if no users
      console.log('No active users, returning default segments');
      return [
        { id: 'prize1', label: 'Free Spin', probability: 0.1 },
        { id: 'prize2', label: 'Bonus Points', probability: 0.2 },
        { id: 'prize3', label: 'Try Again', probability: 0.3 },
        { id: 'prize4', label: 'Small Prize', probability: 0.4 },
      ];
    }

    // Calculate probabilities
    const usersWithCustomWeights = activeUsers.filter(
      (user) => user.customWeight !== undefined && user.customWeight > 0
    );
    const usersWithoutCustomWeights = activeUsers.filter(
      (user) => user.customWeight === undefined || user.customWeight === 0
    );

    console.log('Users with custom weights:', usersWithCustomWeights.length);
    console.log(
      'Users without custom weights:',
      usersWithoutCustomWeights.length
    );

    const totalCustomWeight = usersWithCustomWeights.reduce(
      (sum, user) => sum + (user.customWeight || 0),
      0
    );
    const remainingWeight = Math.max(0, 100 - totalCustomWeight);
    const equalWeight =
      usersWithoutCustomWeights.length > 0
        ? remainingWeight / usersWithoutCustomWeights.length
        : 0;

    console.log(
      'Total custom weight:',
      totalCustomWeight,
      'Remaining weight:',
      remainingWeight,
      'Equal weight:',
      equalWeight
    );

    // Create segments
    const segments: WheelSegment[] = [];

    // Add users with custom weights
    usersWithCustomWeights.forEach((user) => {
      segments.push({
        id: user.id,
        label: user.name,
        probability: (user.customWeight || 0) / 100,
        color: user.color,
      });
    });

    // Add users without custom weights
    usersWithoutCustomWeights.forEach((user) => {
      const weight = equalWeight > 0 ? equalWeight : 100 / activeUsers.length;
      segments.push({
        id: user.id,
        label: user.name,
        probability: weight / 100,
        color: user.color,
      });
    });

    // If no valid segments, create a default one
    if (segments.length === 0) {
      console.log('No segments created, adding default segment');
      segments.push({
        id: 'default',
        label: 'No Users',
        probability: 1,
      });
    }

    console.log('Created', segments.length, 'wheel segments');
    return segments;
  }

  // Statistics
  getUserStats(): UserStats {
    const stats: UserStats = {};

    // Calculate total spins across all users
    const totalSpinsAcrossAllUsers = this.users.reduce((total, user) => {
      return total + (user.stats?.wins || 0);
    }, 0);

    this.users.forEach((user) => {
      const wins = user.stats?.wins || 0;
      // Calculate selection rate as percentage of total spins across all users
      const selectionRate =
        totalSpinsAcrossAllUsers > 0
          ? (wins / totalSpinsAcrossAllUsers) * 100
          : 0;
      const participationRate = user.isChecked ? 100 : 0;

      stats[user.id] = {
        wins,
        totalSpins: wins, // This represents the number of times this user was selected
        winRate: selectionRate, // This now represents selection rate among all spins
        participationRate,
      };
    });

    return stats;
  }

  // Record win for a user
  recordWin(userId: string): void {
    const user = this.users.find((u) => u.id === userId);
    if (user && user.stats) {
      user.stats.wins++;
      user.stats.totalSpins++;
      user.stats.winRate = (user.stats.wins / user.stats.totalSpins) * 100;
      user.lastModified = new Date();
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  // Record spin for a user
  recordSpin(userId: string): void {
    const user = this.users.find((u) => u.id === userId);
    if (user && user.stats) {
      user.stats.totalSpins++;
      user.stats.winRate = (user.stats.wins / user.stats.totalSpins) * 100;
      user.lastModified = new Date();
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  // Export functionality
  exportToCSV(): string {
    const headers = [
      'ID',
      'Name',
      'Active',
      'Checked',
      'Custom Weight',
      'Wins',
      'Total Spins',
      'Win Rate',
      'Created',
      'Modified',
    ];
    const rows = this.users.map((user) => [
      user.id,
      user.name,
      user.isActive ? 'Yes' : 'No',
      user.isChecked ? 'Yes' : 'No',
      user.customWeight || '',
      user.stats?.wins || 0,
      user.stats?.totalSpins || 0,
      user.stats?.winRate || 0,
      user.createdAt.toISOString(),
      user.lastModified.toISOString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    return csvContent;
  }

  exportToJSON(): string {
    return JSON.stringify(this.users, null, 2);
  }

  // Import functionality
  importFromJSON(jsonData: string): void {
    try {
      const importedUsers = JSON.parse(jsonData) as User[];

      // Validate and process imported users
      const validUsers = importedUsers.filter(
        (user) =>
          user.id &&
          user.name &&
          user.name.length <= 255 &&
          typeof user.isActive === 'boolean' &&
          typeof user.isChecked === 'boolean'
      );

      // Merge with existing users (avoid duplicates by ID)
      const existingIds = new Set(this.users.map((u) => u.id));
      const newUsers = validUsers.filter((user) => !existingIds.has(user.id));

      this.users.push(...newUsers);
      this.saveToStorage();
      this.notifyListeners();
    } catch (error) {
      throw new Error('Invalid JSON format');
    }
  }

  // Reset user statistics
  resetUserStats(userId: string): void {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      user.stats = {
        wins: 0,
        totalSpins: 0,
        winRate: 0,
      };
      user.lastModified = new Date();
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  // Force update to trigger listeners
  forceUpdate(): void {
    this.saveToStorage();
    this.notifyListeners();
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

  private generateColor(): string {
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FFEAA7',
      '#DDA0DD',
      '#98D8C8',
      '#F7DC6F',
      '#BB8FCE',
      '#85C1E9',
      '#F8C471',
      '#82E0AA',
      '#F1948A',
      '#85C1E9',
      '#D7BDE2',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private async saveToStorage(): Promise<void> {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.storageKey, JSON.stringify(this.users));
      }
    } catch (error) {
      console.error('Failed to save users to storage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          const parsedUsers = JSON.parse(stored);
          this.users = parsedUsers.map((user: any) => ({
            ...user,
            createdAt: new Date(user.createdAt),
            lastModified: new Date(user.lastModified),
          }));
        }
      }
    } catch (error) {
      console.error('Failed to load users from storage:', error);
      this.users = [];
    }
  }
}
