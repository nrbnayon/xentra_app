import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft } from "lucide-react-native";
import { Pressable, ViewStyle } from "react-native";

interface Props {
  onPress: () => void;
  style?: ViewStyle;
  iconSize?: number;
  containerSize?: number;
}

export function BackButton({
  onPress,
  style,
  iconSize = 20,
  containerSize = 36,
}: Props) {
  const borderRadius = containerSize / 2;

  return (
    <LinearGradient
      colors={["#F6F6F6", "#FFF5E6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        {
          width: containerSize,
          height: containerSize,
          borderRadius: borderRadius,
          padding: 1,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        style,
      ]}
    >
      <BlurView
        intensity={25}
        tint="light"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: borderRadius,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={onPress}
          style={({ pressed }) => ({
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <ChevronLeft size={iconSize} color="#303030" />
        </Pressable>
      </BlurView>
    </LinearGradient>
  );
}
