import { TranslatedText } from "@/components/ui/TranslatedText";
import { useLanguage } from "@/context/LanguageContext";
import { useAuthStore } from "@/store/useAuthStore";
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
        <View className="w-12 h-12 rounded-xl bg-blue-600 shadow-sm overflow-hidden items-center justify-center">
          <Image
            source={require("../../../../assets/images/favicon.png")}
            className="w-10 h-10"
            resizeMode="contain"
          />
        </View>
        <View>
          <View className="flex-row items-center">
            <TranslatedText className="text-secondary font-medium">
              Welcome to 
            </TranslatedText>
            <Text className="text-primary font-bold">XENTRA!</Text>
          </View>
          <Text className="text-secondary text-sm font-medium">
            {currentLanguage.code !== "en"
              ? `${translate("Good Morning")} ${userName}.`
              : `Good Morning ${userName}.`}
          </Text>
        </View>
      </View>

      {/* Right side: Balance & Profile */}
      <View className="flex-row items-center gap-3">
        {/* HTG Coin Badge */}
        <View className="flex-row items-center bg-[#FFC107] px-3 py-1.5 rounded-full shadow-sm">
          <Text className="text-[#B45309] font-bold mr-1">🪙</Text>
          <Text className="text-black font-bold text-sm">10,000 HTG</Text>
        </View>

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
