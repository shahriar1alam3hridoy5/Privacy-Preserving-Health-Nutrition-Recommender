// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Console থেকে পাওয়া config বসাও
const firebaseConfig = {
  apiKey: "AIzaSyA40G94ZUDx01r3C2C4rHnVHjT7NeWtCl8",
  authDomain: "health-nutrition-2a783.firebaseapp.com",
  projectId: "health-nutrition-2a783",
  storageBucket: "health-nutrition-2a783.firebasestorage.app",
  messagingSenderId: "745514825155",
  appId: "1:745514825155:web:cc22ffc0c603f73d7cf976"
};

// Firebase initialize করো
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
