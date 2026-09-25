import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit, UserStats } from '../types';

const STORAGE_KEYS = {
  HABITS: '@nivoup_habits',
  STATS: '@nivoup_stats',
};

export const INITIAL_HABITS: Habit[] = [
  { id: '1', title: 'Popij 2L vode', xpReward: 15, completedToday: false, streak: 0, category: '💧' }, 
  { id: '2', title: 'Šetnja 30 min', xpReward: 30, completedToday: false, streak: 0, category: '🏃' }, 
  { id: '3', title: 'Intenzivan Trening / Gym', xpReward: 50, completedToday: false, streak: 0, category: '💪' }, 
];
export const INITIAL_STATS: UserStats = {
  xp: 0,
  level: 1,
  lastOpenedDate: new Date().toISOString().split('T')[0],
};

export const loadAppData = async (): Promise<{ habits: Habit[]; stats: UserStats }> => {
  try {
    const habitsJson = await AsyncStorage.getItem(STORAGE_KEYS.HABITS);
    const statsJson = await AsyncStorage.getItem(STORAGE_KEYS.STATS);

    const habits: Habit[] = habitsJson ? JSON.parse(habitsJson) : INITIAL_HABITS;
    let stats: UserStats = statsJson ? JSON.parse(statsJson) : INITIAL_STATS;

    const todayStr = new Date().toISOString().split('T')[0];

    if (stats.lastOpenedDate !== todayStr) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const isConsecutiveDay = stats.lastOpenedDate === yesterdayStr;

      const resetHabits = habits.map((h) => ({
        ...h,
        completedToday: false,
        streak: isConsecutiveDay && h.completedToday ? h.streak : 0,
      }));

      stats = { ...stats, lastOpenedDate: todayStr };
      await saveAppData(resetHabits, stats);
      return { habits: resetHabits, stats };
    }

    return { habits, stats };
  } catch (e) {
    console.error('Failed to load data:', e);
    return { habits: INITIAL_HABITS, stats: INITIAL_STATS };
  }
};

export const saveAppData = async (habits: Habit[], stats: UserStats): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
    await AsyncStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save data:', e);
  }
};