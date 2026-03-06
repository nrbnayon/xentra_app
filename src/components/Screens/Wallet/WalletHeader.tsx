import { BackButton } from "@/components/ui/BackButton";
import { Text, View } from "react-native";
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
        <BackButton onPress={onBack} />
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#303030" }}>
          {title}
        </Text>
      </View>
    </View>
  );
}
