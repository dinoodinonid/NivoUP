import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Habit } from '../types';

interface ConfirmMissionModalProps {
  visible: boolean;
  habit: Habit | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmMissionModal({
  visible,
  habit,
  onClose,
  onConfirm,
}: ConfirmMissionModalProps) {
  if (!habit) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.icon}>{habit.category}</Text>
          <Text style={styles.title}>Potvrdi Misiju</Text>
          <Text style={styles.description}>
            Da li si siguran/na da želiš završiti misiju{'\n'}
            <Text style={styles.habitTitle}>"{habit.title}"</Text>?
          </Text>

          <View style={styles.rewardBox}>
            <Text style={styles.rewardText}>Osvajaš +{habit.xpReward} XP</Text>
            <Text style={styles.warningText}>⚠️ Zobog ovoga misiju nije moguće poništiti!</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Odustani</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
              <Text style={styles.confirmText}>Završi (+{habit.xpReward} XP)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#1A1A24',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A38',
  },
  icon: {
    fontSize: 40,
    marginBottom: 8,
  },
  title: {
    color: '#00F2FE',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#A0A0B0',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  habitTitle: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  rewardBox: {
    backgroundColor: '#121218',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#2A2A38',
  },
  rewardText: {
    color: '#00CEC9',
    fontWeight: 'bold',
    fontSize: 15,
  },
  warningText: {
    color: '#FF7675',
    fontSize: 11,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#252535',
  },
  cancelText: {
    color: '#808090',
    fontWeight: '600',
  },
  confirmBtn: {
    flex: 1.5,
    backgroundColor: '#00F2FE',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  confirmText: {
    color: '#000',
    fontWeight: 'bold',
  },
});