export interface User {
  id: string;
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  goals?: string[];
  preferences?: UserPreferences;
  paymentMethods?: PaymentMethod[];
}

export interface UserPreferences {
  notifications: boolean;
  language: string;
  darkMode: boolean;
  measurementUnit: 'metric' | 'imperial';
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'eft';
  lastFour?: string;
  isDefault: boolean;
}