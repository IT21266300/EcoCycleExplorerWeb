// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNGoR6AtDK1eAt3___50piTlkqEnu1fP0",
  authDomain: "ecocycleadmin.firebaseapp.com",
  projectId: "ecocycleadmin",
  storageBucket: "ecocycleadmin.firebasestorage.app",
  messagingSenderId: "374971660095",
  appId: "1:374971660095:web:fab7859f3ed4296f7d058a",
  measurementId: "G-4J12GGKP39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);