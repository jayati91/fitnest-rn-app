import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { BounceIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

import { auth } from '../firebase';

const { width } = Dimensions.get('window');

const workouts = [
  { id: '1', name: 'Yoga Flow', emoji: '🧘‍♀️', duration: '20 min', type: 'Flexibility' },
  { id: '2', name: 'HIIT Burn', emoji: '🔥', duration: '15 min', type: 'Cardio' },
  { id: '3', name: 'Core Crusher', emoji: '🏋️‍♂️', duration: '10 min', type: 'Strength' },
  { id: '4', name: 'Leg Day Beast', emoji: '🦵', duration: '25 min', type: 'Lower Body' },
  { id: '5', name: 'Zen Walk', emoji: '🚶‍♀️', duration: '30 min', type: 'Mindful' },
];

const WorkoutScreen = ({ navigation }) => {
  const renderItem = ({ item, index }) => (
    <Animated.View entering={FadeInUp.delay(index * 120).duration(600)}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
      >
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.meta}>{item.duration} • {item.type}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      style={styles.container}
    >
      <Text style={styles.header}>✨ Today's Workouts ✨</Text>
      <View style={styles.streakBar}>
      <Text style={styles.streakEmoji}>🔥</Text>
      <Text style={styles.streakText}>3-Day Streak</Text>
       </View>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity onPress={() => auth.signOut()}>
        <Text style={styles.logout}>🚪 Log Out</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 24,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  emojiContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  emoji: {
    fontSize: 28,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  streakBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    shadowColor: '#ffcc00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
  },
  
  streakEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  streakText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  
  meta: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
  logout: {
    color: '#ffd700',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    textDecorationLine: 'underline',
  },
});

export default WorkoutScreen;
