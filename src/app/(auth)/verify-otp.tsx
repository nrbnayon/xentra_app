import AuthLayout from "@/components/Auth/AuthLayout";
import OtpInput from "@/components/Auth/OtpInput";
import { Button } from "@/components/ui/button";
import { useToastStore } from "@/store/useToastStore";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export default function VerifyOTPPage() {
  const { mode, phone } = useLocalSearchParams<{
    mode: string;
    phone?: string;
  }>();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(false);
  const { showToast } = useToastStore();

  const handleVerify = async () => {
    if (otp.length < 6) {
      setError(true);
      return;
    }

    try {
      setIsVerifying(true);
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showToast("Verification successful", "success");
      if (mode === "signup") {
        router.push({
          pathname: "/(auth)/success",
          params: { mode: "signup" },
        });
      } else {
        router.push("/(auth)/reset-password");
      }
    } catch (err) {
      setError(true);
      console.error(err);
      showToast("Invalid OTP", "error");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = () => {
    console.log("Resend OTP to", phone);
    // Mock resend
    setOtp("");
    setError(false);
    showToast("OTP resent successfully", "info");
  };

  return (
    <AuthLayout
      title="Enter OTP"
      subtitle="We have sent you a 6digit code to your phone number"
    >
      <View className="mt-4 mb-10">
        <OtpInput
          length={6}
          value={otp}
          onValueChange={(v) => {
            setOtp(v);
            if (error) setError(false);
          }}
          error={error}
        />

        <View className="flex-row justify-center mt-6">
          <Text className="text-secondary text-sm font-medium">
            Didn&apos;t get OTP?{" "}
          </Text>
          <Pressable onPress={handleResend}>
            <Text className="text-yellow font-bold text-sm">Resent</Text>
          </Pressable>
        </View>
      </View>

      <Button
        onPress={handleVerify}
        className={`w-full h-14 rounded-xl ${otp.length === 6 ? "bg-primary" : "bg-primary/60"}`}
        disabled={isVerifying || otp.length < 6}
      >
        {isVerifying ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg">Verify</Text>
        )}
      </Button>
    </AuthLayout>
  );
}
