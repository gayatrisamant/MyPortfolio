// Firebase initialization using modular SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// In a real app, load from secure env (e.g. with expo-constants or react-native-dotenv)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'REPLACE_ME',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'REPLACE_ME.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'REPLACE_ME',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'REPLACE_ME.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'REPLACE_ME',
  appId: process.env.FIREBASE_APP_ID || 'REPLACE_ME'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
