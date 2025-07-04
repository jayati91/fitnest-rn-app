// src/firebase.js
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZLd6XNOgjYpLKDxxqUcpmDowx8caBQ9o",
  authDomain: "fitnest-decc3.firebaseapp.com",
  projectId: "fitnest-decc3",
  storageBucket: "fitnest-decc3.firebasestorage.app",
  messagingSenderId: "588452925270",
  appId: "1:588452925270:web:6d88889e6ca478884b10f7",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);

export { auth };
