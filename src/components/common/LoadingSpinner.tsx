import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { loadingStyles } from '../../styles/appStyles';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({ message = 'Cargando...' }: LoadingSpinnerProps) => {
  return (
    <View style={loadingStyles.container}>
      <ActivityIndicator size="large" color="#1B5E20" />
      <Text style={loadingStyles.text}>{message}</Text>
    </View>
  );
};
