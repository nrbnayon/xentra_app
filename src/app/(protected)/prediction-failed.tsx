import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PredictionFailed() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#FEE6E6", "#FFFFFF"]}
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
            source={require("../../../assets/images/lose.png")}
            className="w-72 h-72 mb-10"
            resizeMode="contain"
          />

          <Text className="text-3xl font-bold text-red-500 mb-4 text-center">
            Prediction Failed
          </Text>
          <Text className="text-base text-gray-600 text-center px-6 leading-6">
            You may not have enough balance to place this prediction.
          </Text>

          <Pressable
            onPress={() => router.replace("/(protected)/" as any)}
            className="mt-10 bg-primary px-8 py-4 rounded-xl"
          >
            <Text className="text-white font-bold text-lg">Back to Home</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}
