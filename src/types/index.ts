export interface Routine {
  id: string;
  title: string;
  description?: string;
  scheduledTime?: string | null;
  frequency: 'daily' | 'weekdays' | 'weekends' | 'weekly' | 'custom';
  completedToday: boolean;
  streak: number;
  monthlySuccessRate: number;
  createdAt: string;
  updatedAt: string;
  lastCompletedAt?: string;
}

export interface RoutineHistoryRecord {
  date: string;
  completed: boolean;
}

export interface UserSettings {
  primaryColor: string;
  theme: 'light' | 'dark' | 'system';
}

export interface AppState {
  version: number;
  routines: Routine[];
  routineHistoryById: Record<string, RoutineHistoryRecord[]>;
  settings: UserSettings;
  lastBackupAt?: string;
}

export type StorageKey = 'APP_STATE';
export const APP_STATE_KEY: StorageKey = 'APP_STATE';

