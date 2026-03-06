import AuthLayout from "@/components/Auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { router, useLocalSearchParams } from "expo-router";
import { Check } from "lucide-react-native";
import { View } from "react-native";

import { useEffect } from "react";
import { TranslatedText } from "@/components/ui/TranslatedText";

export default function SuccessPage() {
  const { mode } = useLocalSearchParams<{ mode: string }>();

  const handleSignIn = () => {
    router.replace("/(auth)/login");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSignIn();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthLayout showBackButton={false} scrollable={false}>
      <View className="flex-1 items-center justify-center gap-8 px-4">
        {/* Layered Circles with Checkmark — matches image 3 exactly */}
        <View className="items-center justify-center">
          {/* Outermost faint ring */}
          <View className="w-52 h-52 rounded-full bg-[#D6E9FA] items-center justify-center">
            {/* Middle ring */}
            <View className="w-40 h-40 rounded-full bg-[#C0DCF5] items-center justify-center">
              {/* Inner solid navy circle */}
              <View className="w-24 h-24 rounded-full bg-primary items-center justify-center shadow-lg shadow-blue-400">
                <Check size={44} color="white" strokeWidth={3.5} />
              </View>
            </View>
          </View>
        </View>

        {/* Text Section */}
        <View className="items-center gap-3">
          <TranslatedText className="text-4xl font-bold text-primary text-center">
            Congratulations!
          </TranslatedText>
          <TranslatedText className="text-base text-secondary text-center px-8 leading-6">
            {mode === "signup"
              ? "Account created successful! You'll be redirected to the sign in screen now"
              : "Password Reset successful! You'll be redirected to the sign in screen now"}
          </TranslatedText>
        </View>

        {/* Button */}
        <Button
          onPress={handleSignIn}
          className="w-full h-14 rounded-xl bg-primary"
        >
          <TranslatedText className="text-white font-bold text-base">Sign In</TranslatedText>
        </Button>
      </View>
    </AuthLayout>
  );
}
