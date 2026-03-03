import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { create } from "zustand";

interface User {
  id: string;
  email_address?: string;
  full_name?: string;
  phone_number?: string;
  role: "user" | "admin";
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const TOKEN_KEY = "track-fleet-auth-token";
const USER_KEY = "track-fleet-user-data";

// Safe Storage Abstraction
const safeStorage = {
  getSecureStore: () => {
    try {
      if (Platform.OS === "web") return null;
      // Use require to avoid top-level module load crash
      return require("expo-secure-store");
    } catch {
      return null;
    }
  },

  setItem: async (key: string, value: string) => {
    try {
      const SecureStore = safeStorage.getSecureStore();
      if (SecureStore) {
        await SecureStore.setItemAsync(key, value);
      } else {
        await AsyncStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn("Storage failed:", e);
    }
  },

  getItem: async (key: string) => {
    try {
      const SecureStore = safeStorage.getSecureStore();
      if (SecureStore) {
        return await SecureStore.getItemAsync(key);
      } else {
        return await AsyncStorage.getItem(key);
      }
    } catch {
      return null;
    }
  },

  removeItem: async (key: string) => {
    try {
      const SecureStore = safeStorage.getSecureStore();
      if (SecureStore) {
        await SecureStore.deleteItemAsync(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch {
      // Ignored
    }
  },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  signIn: async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const dummyUser: User = {
        id: "user_123",
        email_address: email,
        full_name: "Nayon",
        phone_number: "1234567890",
        role: "user",
      };
      const dummyToken = "dummy-jwt-token-123456";

      // Persist safely
      await safeStorage.setItem(TOKEN_KEY, dummyToken);
      await safeStorage.setItem(USER_KEY, JSON.stringify(dummyUser));

      set({
        user: dummyUser,
        token: dummyToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      await safeStorage.removeItem(TOKEN_KEY);
      await safeStorage.removeItem(USER_KEY);
      set({ user: null, token: null, isAuthenticated: false });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });

      const token = await safeStorage.getItem(TOKEN_KEY);
      const userStr = await safeStorage.getItem(USER_KEY);

      if (token && userStr) {
        set({
          token,
          user: JSON.parse(userStr),
          isAuthenticated: true,
        });
      } else {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error("Check auth error:", error);
      set({ isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
