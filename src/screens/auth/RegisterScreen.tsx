import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { AuthScreenProps } from "../../navigation/typesNavigation";
import {
  isValidEmail,
  isValidPassword,
  passwordsMatch,
} from "../../utils/validators";
import { registerStyles } from "../../styles/appStyles";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { RegisterForm } from "../../types/auth";
import { registerWithEmail } from "../../services/authService";
import { FirebaseError } from "firebase/app";

type Props = AuthScreenProps<"Register">;

export const RegisterScreen = ({ navigation }: Props) => {
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmError, setConfirmError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (key: string, value: string) => {
    setRegisterForm({ ...registerForm, [key]: value });
  };

  const validate = (): boolean => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setConfirmError("");

    if (!isValidEmail(registerForm.email)) {
      setEmailError("Ingresa un email válido");
      valid = false;
    }
    if (!isValidPassword(registerForm.password)) {
      setPasswordError("Mínimo 6 caracteres");
      valid = false;
    }
    if (!passwordsMatch(registerForm.password, registerForm.confirmPassword)) {
      setConfirmError("Las contraseñas no coinciden");
      valid = false;
    }
    return valid;
  };

  //Funcion para registrar usuario.
  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await registerWithEmail({
        email: registerForm.email.trim(),
        password: registerForm.password,
        confirmPassword: registerForm.confirmPassword,
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
        const msg =
          error.code === "auth/email-already-in-use"
            ? "El correo ya está registrado"
            : "Error al registrar usuario";
        Alert.alert("Error", msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={registerStyles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={registerStyles.header}>
          <View style={registerStyles.iconCircle}>
            <Text style={registerStyles.iconEmoji}>📊</Text>
          </View>
          <Text style={registerStyles.title}>Crear Cuenta</Text>
          <Text style={registerStyles.subtitle}>Empieza a controlar tus gastos</Text>
        </View>

        <View style={registerStyles.form}>
          <Input
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            value={registerForm.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
          />
          <Input
            label="Contraseña"
            placeholder="Mínimo 6 caracteres"
            value={registerForm.password}
            onChangeText={(value) => handleInputChange("password", value)}
            isPassword
            error={passwordError}
          />
          <Input
            label="Confirmar Contraseña"
            placeholder="Repite tu contraseña"
            value={registerForm.confirmPassword}
            onChangeText={(value) => handleInputChange("confirmPassword", value)}
            isPassword
            error={confirmError}
          />
          <Button
            title="Registrarse"
            onPress={handleRegister}
            loading={loading}
            style={registerStyles.button}
          />
        </View>

        <View style={registerStyles.footer}>
          <Text style={registerStyles.footerText}>¿Ya tienes cuenta? </Text>
          <Text style={registerStyles.link} onPress={() => navigation.goBack()}>
            Inicia Sesión
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
