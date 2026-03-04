import { TranslatedText } from "@/components/ui/TranslatedText";
import { useLanguage } from "@/context/LanguageContext";
import { useAuthStore } from "@/store/useAuthStore";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, Text, View } from "react-native";

// Using a local logo or remote url
const logoUrl =
  "https://ui-avatars.com/api/?name=X&background=0284c7&color=fff"; // Placeholder for the blue X app logo
const UserAvatar =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop";

export default function HomeHeader() {
  const { user } = useAuthStore();
  const { translate, currentLanguage } = useLanguage();
  const userName = user?.full_name || "Jack";

  return (
    <View className="flex-row items-center justify-between mb-6">
      {/* Left side: Logo & Greeting */}
      <View className="flex-row items-center gap-3">
        <View className="w-12 h-12 rounded-xs shadow-sm overflow-hidden items-center justify-center">
          <Image
            source={require("../../../../assets/images/favicon.png")}
            className="w-12 h-12"
            resizeMode="contain"
          />
        </View>
        <View>
          <View className="flex-row items-center">
            <TranslatedText className="text-foreground font-medium">
              Welcome to
            </TranslatedText>
            <Text className="text-primary"> XENTRA!</Text>
          </View>
          <Text className="text-secondary text-sm font-medium">
            {currentLanguage.code !== "en"
              ? `${translate("Hi")} ${userName}.`
              : `Hi ${userName}.`}
          </Text>
        </View>
      </View>

      {/* Right side: Balance & Profile */}
      <View className="flex-row items-center gap-2">
        {/* HTG Coin Badge */}
        <LinearGradient
          colors={["rgba(255,240,208,1)", "rgba(255,204,93,1)"]}
          locations={[0, 0.61]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ borderRadius: 999, overflow: "hidden" }}
          className="flex-row items-center gap-1.5 px-3 py-1.5"
        >
          <Image
            className="w-4 h-4"
            alt="Coin"
            source={require("../../../../assets/images/coin.png")}
          />
          <Text className="font-bold text-[#553F11] text-xs text-center tracking-tight">
            10,000 HTG
          </Text>
        </LinearGradient>
        {/* Avatar */}
        <Pressable className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
          <Image
            source={{ uri: UserAvatar }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </Pressable>
      </View>
    </View>
  );
}
