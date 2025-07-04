import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      //navigation.replace('Home'); // Go to Home after signup
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };
  console.log("✅ SignUpScreen mounted");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.link} onPress={() => auth.signOut()}>
        Already have an account? Log In
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 5 },
  link: { color: 'blue', marginTop: 15, textAlign: 'center' }
});

export default SignUpScreen;

