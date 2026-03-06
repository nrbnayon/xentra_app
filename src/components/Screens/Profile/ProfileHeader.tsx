import { BackButton } from "@/components/ui/BackButton";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  title: string;
  onBack: () => void;
}

export function ProfileHeader({ title, onBack }: Props) {
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
        <TranslatedText
          style={{ fontSize: 20, fontWeight: "700", color: "#303030" }}
        >
          {title}
        </TranslatedText>
      </View>
    </View>
  );
}
