import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { Alert } from 'react-native';

const { width } = Dimensions.get('window');

const WorkoutDetailScreen = ({ route, navigation }) => {
  const { workout } = route.params;

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      style={styles.container}
    >
      <Text style={styles.emoji}>{workout.emoji}</Text>
      <Text style={styles.name}>{workout.name}</Text>
      <Text style={styles.meta}>{workout.duration} • {workout.type}</Text>

      <LottieView
        source={require('../../assets/confetti.json')} // 💥 PLACE YOUR LOTTIE FILE HERE
        autoPlay
        loop={false}
        style={styles.lottie}
      />
      <Button
       title="✔ Mark as Completed"
       onPress={() => {
       console.log('Clicked mark as completed ✅');
       logWorkout();
        }}
        color="#32CD32"
      />

      <View style={styles.buttonContainer}>
        <Button title="Back to Workouts" color="#ffd700" onPress={() => navigation.goBack()} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emoji: {
    fontSize: 72,
    marginBottom: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  meta: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  lottie: {
    width: width * 0.9,
    height: width * 0.9,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
});

const logWorkout = async () => {
  const today = new Date().toISOString().split('T')[0]; // e.g., "2025-07-03"
  const userId = auth.currentUser?.uid;

  const q = query(
    collection(db, 'workoutsCompleted'),
    where('userId', '==', userId),
    where('date', '==', today),
    where('name', '==', workout.name)
  );

  const existing = await getDocs(q);
  if (!existing.empty) {
    Alert.alert('Already Logged', 'You already completed this workout today!');
    return;
  }

  await addDoc(collection(db, 'workoutsCompleted'), {
    userId,
    name: workout.name,
    date: today,
    timestamp: new Date(),
  });

  Alert.alert('Logged!', 'Workout marked as completed ✅');
};


export default WorkoutDetailScreen;
