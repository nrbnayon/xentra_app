import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { Text, View } from "react-native";

export default function ProfileTab() {
  const { signOut, user } = useAuthStore();
  return (
    <View className="flex-1 items-center justify-center bg-white gap-4">
      <Text className="text-xl font-bold">Profile</Text>
      <Text className="text-base text-gray-500">
        {user?.phone_number || "User"}
      </Text>
      <Button onPress={() => signOut()} className="w-48 bg-red-500 rounded-xl">
        <Text className="text-white font-bold">Sign Out</Text>
      </Button>
    </View>
  );
}
