import { FlatList, StyleSheet, Text, View } from 'react-native';

interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  level: number;
  isMe?: boolean;
}

interface LeaderboardViewProps {
  userXp: number;
  userLevel: number;
}

const fakeleaderboard: LeaderboardUser[] = [
  { id: '1', name: 'Amina K.', xp: 480, level: 5 },
  { id: '2', name: 'Tarik M.', xp: 320, level: 4 },
  { id: '3', name: 'Emina H.', xp: 210, level: 3 },
  { id: '4', name: 'Dino N.', xp: 90, level: 1 },
];

export default function LeaderboardView({ userXp, userLevel }: LeaderboardViewProps) {
  const allUsers: LeaderboardUser[] = [
    ...fakeleaderboard
,
    { id: 'user_me', name: 'Ti (Korisnik)', xp: userXp, level: userLevel, isMe: true },
  ].sort((a, b) => b.xp - a.xp);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Rang Lista</Text>
      <FlatList
        data={allUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;

          return (
            <View style={[styles.row, item.isMe && styles.myRow]}>
              <Text style={styles.rank}>{medal}</Text>
              <View style={styles.userInfo}>
                <Text style={[styles.name, item.isMe && styles.myName]}>{item.name}</Text>
                <Text style={styles.level}>Nivo {item.level}</Text>
              </View>
              <Text style={styles.xp}>{item.xp} XP</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A24',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2A2A38',
  },
  myRow: {
    borderColor: '#00F2FE',
    backgroundColor: '#00F2FE11',
  },
  rank: {
    fontSize: 16,
    color: '#00F2FE',
    fontWeight: 'bold',
    width: 36,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  myName: {
    color: '#00F2FE',
    fontWeight: 'bold',
  },
  level: {
    color: '#808090',
    fontSize: 12,
  },
  xp: {
    color: '#00CEC9',
    fontWeight: 'bold',
    fontSize: 14,
  },
});