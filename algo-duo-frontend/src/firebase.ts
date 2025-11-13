// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config for Algo Duo project
const firebaseConfig = {
  apiKey: "AIzaSyBxohu9tOMRj4_A3HU-ZUcz5V82sSoH768", // Replace with your real API key
  authDomain: "algo-duo-quest-37286300-b56fc.firebaseapp.com",
  projectId: "algo-duo-quest-37286300-b56fc",
  storageBucket: "algo-duo-quest-37286300-b56fc.appspot.com",
  messagingSenderId: "802859361739",
  appId: "1:802859361739:web:1eea6994a5d3ffe0b7424e", // You'll need to get this from Firebase console
  //measurementId: "G-YOUR-MEASUREMENT-ID" // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

// Configure Google Auth Provider with additional scopes
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
googleProvider.setCustomParameters({
  //client_id: "197800520783-nl64hpdkuq8plulcg7ea5bm90h8v3qvq.apps.googleusercontent.com",
  prompt: "select_account"
});

// Optional: Initialize Analytics
//export const analytics = getAnalytics(app);

export const db = getFirestore(app);

export default app;