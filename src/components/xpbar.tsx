import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface GlowingXpBarProps {
  currentXp: number;
  maxXp: number;
  level: number;
}

export default function GlowingXpBar({ currentXp, maxXp, level }: GlowingXpBarProps) {
  const progressPercent = Math.min(1, Math.max(0, currentXp / maxXp));

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${withSpring(progressPercent * 100, { damping: 15, stiffness: 90 })}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.levelText}>NIVO {level}</Text>
        <Text style={styles.xpText}>{currentXp} / {maxXp} XP</Text>
      </View>

      <View style={styles.track}>
        {}
        <Animated.View style={[styles.fillContainer, animatedStyle]}>
          <LinearGradient
            colors={['#00F2FE', '#4FACFE', '#8A2BE2']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientFill}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16161E',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A3A',
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  levelText: {
    color: '#00F2FE',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1,
  },
  xpText: {
    color: '#A0A0B0',
    fontSize: 13,
    fontWeight: '600',
  },
  track: {
    height: 14,
    backgroundColor: '#09090D',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1F1F2E',
  },
  fillContainer: {
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradientFill: {
    flex: 1,
    height: '100%',
  },
});