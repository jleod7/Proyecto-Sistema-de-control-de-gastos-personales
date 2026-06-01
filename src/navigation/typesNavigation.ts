import { StackScreenProps } from "@react-navigation/stack";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  List: undefined;
  Detail: { id: string };
  Form: { id?: string };
  Resumen: undefined;
  Feriados: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, T>;

export type AppScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;
