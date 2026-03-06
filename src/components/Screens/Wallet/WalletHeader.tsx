import { ChevronLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  title: string;
  onBack: () => void;
}

export function WalletHeader({ title, onBack }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top + 12,
        paddingBottom: 20,
        paddingHorizontal: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <Pressable
          onPress={onBack}
          style={{
            width: 32,
            height: 32,
            borderRadius: 20,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChevronLeft size={20} color="#303030" />
        </Pressable>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#303030" }}>
          {title}
        </Text>
      </View>
    </View>
  );
}
