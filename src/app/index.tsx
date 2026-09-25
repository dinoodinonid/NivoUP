import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HabitCard from '../components/cardhabit';
import ConfirmMissionModal from '../components/confirm';
import AddHabitModal from '../components/habit';
import LeaderboardView from '../components/lbview';
import GlowingXpBar from '../components/xpbar';
import { Habit, UserStats } from '../types';
import { loadAppData, saveAppData } from '../utils/storage';

const XP_PER_LEVEL = 100;
const MAX_DAILY_HABITS = 6;

export default function Index() {
  const [activeTab, setActiveTab] = useState<'quests' | 'leaderboard'>('quests');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [stats, setStats] = useState<UserStats>({ xp: 0, level: 1, lastOpenedDate: '' });
  
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedHabitForConfirm, setSelectedHabitForConfirm] = useState<Habit | null>(null);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    const data = await loadAppData();
    setHabits(data.habits);
    setStats(data.stats);
  };

  const handleOpenAddModal = () => {
    if (habits.length >= MAX_DAILY_HABITS) {
      Alert.alert(
        'Dostignut Limit!',
        `Možeš imati najviše ${MAX_DAILY_HABITS} aktivnih misija dnevno.`
      );
      return;
    }
    setAddModalVisible(true);
  };

  const handleHabitPress = (habit: Habit) => {
    if (habit.completedToday) {
      Alert.alert('Misija Je Već Završena!', 'Lokalna misija je već zaključana za danas. Vrati se sutra za novu misiju!');
      return;
    }

    setSelectedHabitForConfirm(habit);
  };

  const handleConfirmComplete = () => {
    if (!selectedHabitForConfirm) return;

    const targetId = selectedHabitForConfirm.id;
    const targetXp = selectedHabitForConfirm.xpReward;

    const newXp = stats.xp + targetXp;
    const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;

    const updatedHabits = habits.map((h) => {
      if (h.id === targetId) {
        return {
          ...h,
          completedToday: true,
          streak: h.streak + 1,
        };
      }
      return h;
    });

    const updatedStats: UserStats = {
      ...stats,
      xp: newXp,
      level: newLevel,
    };

    setHabits(updatedHabits);
    setStats(updatedStats);
    saveAppData(updatedHabits, updatedStats);

    setSelectedHabitForConfirm(null);
  };

  const handleDeleteHabit = (id: string, title: string) => {
    Alert.alert(
      'Obriši Misiju',
      `Da li si siguran/na da želiš obrisati misiju "${title}"?`,
      [
        { text: 'Odustani', style: 'cancel' },
        {
          text: 'Obriši',
          style: 'destructive',
          onPress: () => {
            const updatedHabits = habits.filter((h) => h.id !== id);
            setHabits(updatedHabits);
            saveAppData(updatedHabits, stats);
          },
        },
      ]
    );
  };

  const handleAddHabit = (title: string, category: string, xpReward: number) => {
    if (habits.length >= MAX_DAILY_HABITS) return;

    const newHabit: Habit = {
      id: Date.now().toString(),
      title,
      category,
      xpReward,
      completedToday: false,
      streak: 0,
    };

    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    saveAppData(updatedHabits, stats);
  };

  const currentLevelXp = stats.xp % XP_PER_LEVEL;
  const isMaxReached = habits.length >= MAX_DAILY_HABITS;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.headerTitle}>NivoUp</Text>

      <GlowingXpBar currentXp={currentLevelXp} maxXp={XP_PER_LEVEL} level={stats.level} />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'quests' && styles.tabBtnActive]}
          onPress={() => setActiveTab('quests')}
        >
          <Text style={[styles.tabText, activeTab === 'quests' && styles.tabTextActive]}>
            Misije
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'leaderboard' && styles.tabBtnActive]}
          onPress={() => setActiveTab('leaderboard')}
        >
          <Text style={[styles.tabText, activeTab === 'leaderboard' && styles.tabTextActive]}>
            Ljestvica
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'quests' ? (
        <View style={{ flex: 1 }}>
          <View style={styles.sectionRow}>
            <View>
              <Text style={styles.sectionHeader}>Dnevne Misije</Text>
              <Text style={styles.limitCounter}>
                {habits.length} / {MAX_DAILY_HABITS} Popunjeno
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.addBtn, isMaxReached && styles.addBtnDisabled]}
              onPress={handleOpenAddModal}
            >
              <Text style={[styles.addBtnText, isMaxReached && styles.addBtnTextDisabled]}>
                {isMaxReached ? 'Maksimum' : '+ Nova'}
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={habits}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <HabitCard
                habit={item}
                onToggle={() => handleHabitPress(item)}
                onDelete={() => handleDeleteHabit(item.id, item.title)}
              />
            )}
          />
        </View>
      ) : (
        <LeaderboardView userXp={stats.xp} userLevel={stats.level} />
      )}

      <AddHabitModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAdd={handleAddHabit}
      />

      <ConfirmMissionModal
        visible={selectedHabitForConfirm !== null}
        habit={selectedHabitForConfirm}
        onClose={() => setSelectedHabitForConfirm(null)}
        onConfirm={handleConfirmComplete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F14',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: '#00F2FE',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#16161E',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A38',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabBtnActive: {
    backgroundColor: '#252535',
  },
  tabText: {
    color: '#808090',
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#00F2FE',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  limitCounter: {
    color: '#808090',
    fontSize: 12,
    marginTop: 2,
  },
  addBtn: {
    backgroundColor: '#00F2FE22',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00F2FE',
  },
  addBtnDisabled: {
    backgroundColor: '#252535',
    borderColor: '#3A3A4A',
  },
  addBtnText: {
    color: '#00F2FE',
    fontWeight: 'bold',
    fontSize: 12,
  },
  addBtnTextDisabled: {
    color: '#606070',
  },
});