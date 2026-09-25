import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Habit } from '../types';

interface HabitCardProps {
  habit: Habit;
  onToggle: () => void;
  onDelete: () => void;
}

export default function HabitCard({ habit, onToggle, onDelete }: HabitCardProps) {
  return (
    <View style={[styles.card, habit.completedToday && styles.cardCompleted]}>
      {/* Main pressable area for completing mission */}
      <TouchableOpacity 
        style={styles.content} 
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>{habit.category}</Text>
        
        <View style={styles.textContainer}>
          <Text style={[styles.title, habit.completedToday && styles.titleCompleted]}>
            {habit.title}
          </Text>
          <Text style={styles.subtext}>
            🔥 Streak: {habit.streak}d | +{habit.xpReward} XP
          </Text>
        </View>
      </TouchableOpacity>

      {/* Independent delete button */}
      <TouchableOpacity 
        style={styles.deleteBtn} 
        onPress={onDelete}
        activeOpacity={0.6}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16161E',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A38',
  },
  cardCompleted: {
    opacity: 0.6,
    backgroundColor: '#121218',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#808090',
  },
  subtext: {
    color: '#808090',
    fontSize: 12,
    marginTop: 2,
  },
  deleteBtn: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#252535',
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    fontSize: 16,
  },
});