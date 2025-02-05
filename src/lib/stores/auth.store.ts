import { create } from 'zustand';
import { User } from '../types/user';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  login: (email: string, password: string) => {
    // Mock successful login
    set({ 
      isAuthenticated: true,
      user: {
        id: '1',
        email,
        firstName: 'Test',
        lastName: 'User',
        preferences: {
          notifications: true,
          language: 'en',
          darkMode: false,
          measurementUnit: 'metric',
          emailNotifications: {
            appointments: true,
            promotions: true,
            newsletter: true
          }
        },
        paymentMethods: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  },

  logout: () => set({ 
    isAuthenticated: false,
    user: null 
  }),

  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null });
    try {
      // Mock registration success
      set({ 
        isAuthenticated: true,
        user: {
          id: '1',
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          preferences: {
            notifications: true,
            language: 'en',
            darkMode: false,
            measurementUnit: 'metric',
            emailNotifications: {
              appointments: true,
              promotions: true,
              newsletter: true
            }
          },
          paymentMethods: [],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        isLoading: false 
      });
    } catch (error) {
      set({ error: 'Failed to register', isLoading: false });
    }
  },
}));