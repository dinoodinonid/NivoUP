import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface AddHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string, category: string, xpReward: number) => void;
}

const CATEGORIES = ['🏃', '📚', '💪', '💧', '🧠', '🎨', '🎯'];

const DIFFICULTY_TIERS = [
  { label: 'Lako', xp: 15, color: '#00CEC9' },
  { label: 'Srednje', xp: 30, color: '#FFB800' },
  { label: 'Teško', xp: 50, color: '#FF7675' },
];

export default function AddHabitModal({ visible, onClose, onAdd }: AddHabitModalProps) {
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('🏃');
  const [selectedTier, setSelectedTier] = useState(DIFFICULTY_TIERS[0]); // Defaults to Lako (+15 XP)

  const handleCreate = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), selectedCategory, selectedTier.xp);
    setTitle('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Nova Misija</Text>

          {}
          <Text style={styles.label}>Naziv misije</Text>
          <TextInput
            style={styles.input}
            placeholder="npr. Popij 2L vode"
            placeholderTextColor="#606070"
            value={title}
            onChangeText={setTitle}
          />

          {}
          <Text style={styles.label}>Ikona</Text>
          <View style={styles.row}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryBtn,
                  selectedCategory === cat && styles.categoryBtnActive,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {}
          <Text style={styles.label}>Teškoća Zadatka</Text>
          <View style={styles.tierRow}>
            {DIFFICULTY_TIERS.map((tier) => {
              const isActive = selectedTier.label === tier.label;
              return (
                <TouchableOpacity
                  key={tier.label}
                  style={[
                    styles.tierBtn,
                    isActive && { borderColor: tier.color, backgroundColor: `${tier.color}22` },
                  ]}
                  onPress={() => setSelectedTier(tier)}
                >
                  <Text style={[styles.tierLabel, isActive && { color: tier.color }]}>
                    {tier.label}
                  </Text>
                  <Text style={[styles.tierXp, isActive && { color: tier.color }]}>
                    +{tier.xp} XP
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Odustani</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
              <Text style={styles.createText}>Kreiraj</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#1A1A24',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2A38',
  },
  modalTitle: {
    color: '#00F2FE',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    color: '#A0A0B0',
    fontSize: 13,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#121218',
    color: '#FFF',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2A2A38',
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryBtn: {
    backgroundColor: '#252535',
    padding: 10,
    borderRadius: 10,
  },
  categoryBtnActive: {
    backgroundColor: '#00F2FE22',
    borderWidth: 1,
    borderColor: '#00F2FE',
  },
  categoryText: {
    fontSize: 18,
  },
  tierRow: {
    flexDirection: 'row',
    gap: 10,
  },
  tierBtn: {
    flex: 1,
    backgroundColor: '#252535',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tierLabel: {
    color: '#A0A0B0',
    fontWeight: 'bold',
    fontSize: 13,
  },
  tierXp: {
    color: '#606070',
    fontSize: 12,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cancelText: {
    color: '#808090',
    fontWeight: '600',
  },
  createBtn: {
    backgroundColor: '#00F2FE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  createText: {
    color: '#000',
    fontWeight: 'bold',
  },
});