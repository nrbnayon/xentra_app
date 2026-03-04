import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PredictionSuccess() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#E6F4FE", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.3 }}
      className="flex-1"
    >
      <View
        className="flex-1 px-6"
        style={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
        }}
      >
        {/* Header Back Button */}
        <Pressable
          onPress={() => router.replace("/(protected)/" as any)}
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm mb-12"
        >
          <ChevronLeft size={24} color="#111111" />
        </Pressable>

        <View className="flex-1 items-center justify-center -mt-20">
          <Image
            source={require("../../../assets/images/champion.png")}
            className="w-72 h-72 mb-10"
            resizeMode="contain"
          />

          <Text className="text-3xl font-bold text-primary mb-4 text-center">
            Congratulations!
          </Text>
          <Text className="text-base text-gray-600 text-center px-6 leading-6">
            Your prediction has been submitted successfully. Good luck!
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}
