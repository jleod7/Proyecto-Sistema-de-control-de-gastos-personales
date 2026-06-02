import {
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { LoginForm, RegisterForm } from "../types/auth";
import { auth } from "../config/firebase";

// Iniciar sesión
export const loginWithEmail = async (data: LoginForm): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, data.email, data.password);
};

// Crear un usuario
export const registerWithEmail = async (data: RegisterForm): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, data.email, data.password);
};

// Cerrar sesión
export const logout = async (): Promise<void> => {
  return await signOut(auth);
};
