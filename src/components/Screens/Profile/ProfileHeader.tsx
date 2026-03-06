import { TranslatedText } from "@/components/ui/TranslatedText";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft } from "lucide-react-native";
import { Pressable, View } from "react-native";
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
        <LinearGradient
          colors={["#F6F6F6", "#FFF5E6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            padding: 1,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <BlurView
            intensity={25}
            tint="light"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 20,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={onBack}
              style={({ pressed }) => ({
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                alignItems: "center",
                justifyContent: "center",
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <ChevronLeft size={24} color="#303030" />
            </Pressable>
          </BlurView>
        </LinearGradient>
        <TranslatedText
          style={{ fontSize: 20, fontWeight: "700", color: "#303030" }}
        >
          {title}
        </TranslatedText>
      </View>
    </View>
  );
}
