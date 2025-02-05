export interface User {
  id: string;
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  goals?: string[];
  preferences: UserPreferences;
  paymentMethods: PaymentMethod[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  notifications: boolean;
  language: string;
  darkMode: boolean;
  measurementUnit: 'metric' | 'imperial';
  emailNotifications: {
    appointments: boolean;
    promotions: boolean;
    newsletter: boolean;
  };
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'eft';
  lastFour?: string;
  isDefault: boolean;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}