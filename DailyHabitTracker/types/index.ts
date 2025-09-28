export interface Routine {
  id: string;
  title: string;
  description?: string;
  scheduledTime: string;
  frequency: string;
  completed: boolean;
  streak: number;
  monthlySuccessRate: number;
}

export interface UserSettings {
  primaryColor: string;
  theme: 'light' | 'dark' | 'system';
}

export interface AnalyticsData {
  completionRate: number;
  averageStreak: number;
  totalRoutines: number;
  trends: {
    date: string;
    rate: number;
  }[];
  activity: {
    date: Date;
    rate: number;
  }[];
}

export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'red';
export type ThemeMode = 'light' | 'dark' | 'system';
