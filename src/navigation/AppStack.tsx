import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppStackParamList } from "./typesNavigation";
import { ListScreen } from "../screens/app/ListScreen";
import DetailScreen from "../screens/app/DetailScreen";
import { FormScreen } from "../screens/app/FormScreen";
import { ResumenScreen } from "../screens/app/ResumenScreen";
import { FeriadosScreen } from "../screens/app/FeriadosScreen";
import { COLORS } from "../styles/appStyles";

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Detalle del Gasto' }}
      />
      <Stack.Screen
        name="Form"
        component={FormScreen}
        options={({ route }) => ({
          title: route.params?.id ? 'Editar Gasto' : 'Nuevo Gasto',
        })}
      />
      <Stack.Screen
        name="Resumen"
        component={ResumenScreen}
        options={{ title: 'Resumen Mensual' }}
      />
      <Stack.Screen
        name="Feriados"
        component={FeriadosScreen}
        options={{ title: 'Feriados Ecuador 🇪🇨' }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
