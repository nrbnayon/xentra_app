import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { Alert, Text, View } from "react-native";

export default function ProtectedIndex() {
  const { signOut, deleteAccount, user } = useAuthStore();

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

  return (
    <View className="flex-1 justify-center items-center px-6 gap-6">
      <View className="items-center">
        <Text className="text-2xl font-bold text-primary">
          Xentra Protected
        </Text>
        <Text className="text-base text-secondary mt-1">
          Welcome, {user?.full_name || "User"}
        </Text>
        <Text className="text-sm text-secondary">
          Phone: {user?.phone_number}
        </Text>
      </View>

      <View className="w-full gap-4">
        <Button
          variant="default"
          onPress={() => signOut()}
          className="w-full h-14 rounded-xl"
        >
          <Text className="text-white font-bold">Sign Out</Text>
        </Button>

        <Button
          variant="outline"
          onPress={handleDeleteAccount}
          className="w-full h-14 rounded-xl border-red-500"
        >
          <Text className="text-red-500 font-bold">Delete Account</Text>
        </Button>

        <Text className="text-xs text-secondary text-center px-4">
          Required for App Store & Play Store compliance
        </Text>
      </View>
    </View>
  );
}
