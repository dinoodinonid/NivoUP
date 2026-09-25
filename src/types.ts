export interface Habit {
  id: string;
  title: string;
  xpReward: number;
  completedToday: boolean;
  streak: number;
  category: string;
}

export interface UserStats {
  xp: number;
  level: number;
  lastOpenedDate: string;
}