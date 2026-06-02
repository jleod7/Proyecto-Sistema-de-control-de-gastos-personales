import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA9-FwLYzRnh01p1fj7Eg5rQyKOAPdiKfI",
  authDomain: "control-de-gastos-6c377.firebaseapp.com",
  databaseURL: "https://control-de-gastos-6c377-default-rtdb.firebaseio.com/",
  projectId: "control-de-gastos-6c377",
  storageBucket: "control-de-gastos-6c377.firebasestorage.app",
  messagingSenderId: "126549995425",
  appId: "1:126549995425:web:8d17e403c984e753b0e5e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getDatabase(app);
