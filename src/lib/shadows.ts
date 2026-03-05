import { Platform } from "react-native";

export const SHADOWS = {
  soft: Platform.select({
    ios: {
      shadowColor: "#181818",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.16,
      shadowRadius: 10,
    },
    android: {
      elevation: 6,
      shadowColor: "#181818",
    },
    web: {
      boxShadow: "0px 2px 10px 0px rgba(24, 24, 24, 0.16)",
    },
  }),
  medium: Platform.select({
    ios: {
      shadowColor: "#16467A",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
    },
    android: {
      elevation: 6,
      shadowColor: "#16467A",
    },
    web: {
      boxShadow: "0px 8px 24px rgba(22, 70, 122, 0.08)",
    },
  }),
  floating: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.06,
      shadowRadius: 32,
    },
    android: {
      elevation: 10,
    },
    web: {
      boxShadow: "0px 20px 32px rgba(0, 0, 0, 0.06)",
    },
  }),
  tab: Platform.select({
    ios: {
      shadowColor: "#181818",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 10,
    },
    android: {
      elevation: 4, // close visual match to blur 10
    },
    web: {
      boxShadow: "0px 2px 10px rgba(24,24,24,0.18)",
    },
  }),
};
