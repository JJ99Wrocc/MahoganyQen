// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Konfiguracja Firebase z Firebase Console → Projekt → Ustawienia
const firebaseConfig = {
  apiKey: "AIzaSyAHKAVr7Y9Pd1zlLe7l-af37k_vmU6XC-A",
  authDomain: "sessionbooking-bca4b.firebaseapp.com",
  projectId: "sessionbooking-bca4b",
  storageBucket: "sessionbooking-bca4b.appspot.com", // poprawione .app → .appspot.com
  messagingSenderId: "86766181848",
  appId: "1:86766181848:web:2835c1f10f3defd880a6ad",
  measurementId: "G-PG2WECNZ8L"
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);

// Eksport Firestore i Auth
export const db = getFirestore(app);
export const auth = getAuth(app);

// Opcjonalnie eksport samej aplikacji Firebase
export default app;
