import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { StackNavigator } from './src/navigation/StackNavigator';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <StackNavigator />
    </AuthProvider>
  );
};

export default App;
