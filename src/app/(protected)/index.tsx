import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { Text, View } from "react-native";

export default function ProtectedIndex() {
  const { signOut, user } = useAuthStore();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Protected Home</Text>
      <Text>Welcome, {user?.full_name || "User"}</Text>
      <Button onPress={() => signOut()}>
        <Text style={{ color: "white" }}>Sign Out</Text>
      </Button>
    </View>
  );
}
