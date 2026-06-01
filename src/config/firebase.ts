import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

//Configuracion de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCUnj52qa6aFIxZC7BQLCaZ8_sejSj9c8w",
  authDomain: "control-de-gastos---app.firebaseapp.com",
  databaseURL: "https://control-de-gastos---app-default-rtdb.firebaseio.com",
  projectId: "control-de-gastos---app",
  storageBucket: "control-de-gastos---app.firebasestorage.app",
  messagingSenderId: "1053979514443",
  appId: "1:1053979514443:web:6518e6247427a4a4259fce"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getDatabase(app);
