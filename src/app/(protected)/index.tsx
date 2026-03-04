import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { useLanguage } from "@/context/LanguageContext";
import { useAppTheme } from "@/context/ThemeContext";
import { useAuthStore } from "@/store/useAuthStore";
import { router } from "expo-router";
import {
  Languages,
  LogOut,
  Monitor,
  Moon,
  Sun,
  Trash2,
} from "lucide-react-native";
import { Alert, Pressable, View } from "react-native";

export default function ProtectedIndex() {
  const { signOut, deleteAccount, user } = useAuthStore();
  const { mode, setMode, theme } = useAppTheme();
  const { currentLanguage } = useLanguage();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to permanently delete your account? This action cannot be undone and all your data will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteAccount();
          },
        },
      ],
    );
  };

  const toggleTheme = () => {
    const modes: ("light" | "dark" | "system")[] = ["light", "dark", "system"];
    const nextIndex = (modes.indexOf(mode) + 1) % modes.length;
    setMode(modes[nextIndex]);
  };

  const ThemeIcon = mode === "light" ? Sun : mode === "dark" ? Moon : Monitor;

  return (
    <ThemedView className="flex-1 px-6 pt-12">
      {/* Header with Icons */}
      <View className="flex-row justify-between items-center mb-10">
        <ThemedText type="subtitle" className="font-bold">
          Settings
        </ThemedText>
        <View className="flex-row gap-4">
          <Pressable
            onPress={() => router.push("/(public)/language-select")}
            className="p-2 rounded-full bg-primary/10"
          >
            <Languages
              size={24}
              color={theme === "dark" ? "#FFFFFF" : "#16467A"}
            />
          </Pressable>
          <Pressable
            onPress={toggleTheme}
            className="p-2 rounded-full bg-primary/10"
          >
            <ThemeIcon
              size={24}
              color={theme === "dark" ? "#FFFFFF" : "#16467A"}
            />
          </Pressable>
        </View>
      </View>

      <View className="items-center mb-10">
        <ThemedText type="title" className="text-3xl text-center">
          Xentra Protected
        </ThemedText>
        <ThemedText className="mt-2 text-lg">
          Welcome, {user?.full_name || "User"}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Phone: {user?.phone_number}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" className="mt-1">
          Language: {currentLanguage.name}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Theme: {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </ThemedText>
      </View>

      <View className="w-full gap-4 mt-auto mb-10">
        <Pressable
          onPress={() => signOut()}
          className="w-full h-14 rounded-xl bg-primary flex-row items-center justify-center gap-2"
        >
          <LogOut size={24} color="white" />
          <TranslatedText className="text-white font-bold ">Sign Out</TranslatedText>
        </Pressable>

        <Pressable
          onPress={handleDeleteAccount}
          className="w-full h-14 rounded-xl border border-red-500 flex-row items-center justify-center gap-2"
        >
          <Trash2 size={20} color="#EF4444" />
          <ThemedText className="text-red-500 font-bold">
            Delete Account
          </ThemedText>
        </Pressable>

        <ThemedText
          type="small"
          themeColor="textSecondary"
          className="text-center px-4"
        >
          Required for App Store & Play Store compliance
        </ThemedText>
      </View>
    </ThemedView>
  );
}
