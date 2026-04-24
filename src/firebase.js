// Firebase initialization for the frontend
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD5UHhSFCyOo9_lNGFMRevxTzBIjmMdE08",
  authDomain: "authentiqa.firebaseapp.com",
  projectId: "authentiqa",
  storageBucket: "authentiqa.firebasestorage.app",
  messagingSenderId: "779418201543",
  appId: "1:779418201543:web:4a3d275eafb6b194483de2",
  measurementId: "G-N13Y0JF6LH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
