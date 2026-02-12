// Import Authentication and Firestore services
import { getAuth } from "firebase/auth"; // For Firebase Authentication
import { getFirestore } from "firebase/firestore"; // For Cloud Firestore
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5UHhSFCyOo9_lNGFMRevxTzBIjmMdE08",
  authDomain: "authentiqa.firebaseapp.com",
  projectId: "authentiqa",
  storageBucket: "authentiqa.firebasestorage.app",
  messagingSenderId: "779418201543",
  appId: "1:779418201543:web:4a3d275eafb6b194483de2",
  measurementId: "G-N13Y0JF6LH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
