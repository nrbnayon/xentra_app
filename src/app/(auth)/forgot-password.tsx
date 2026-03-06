import AuthLayout from "@/components/Auth/AuthLayout";
import CountryPicker from "@/components/Auth/CountryPicker";
import { Button } from "@/components/ui/button";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { Country } from "@/constants/countries";
import { useToastStore } from "@/store/useToastStore";
import { router } from "expo-router";
import parsePhoneNumberFromString, { CountryCode } from "libphonenumber-js";
import { useState } from "react";
import { ActivityIndicator,  TextInput, View } from "react-native";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToastStore();
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: "HT",
    name: "Haiti",
    dial: "+509",
    flag: "🇭🇹",
  });

  const formatPhoneDisplay = (raw: string): string => {
    const digits = raw.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    if (digits.length <= 10)
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)} ${digits.slice(10, 15)}`;
  };

  const handlePhoneChange = (text: string) => {
    const digitsOnly = text.replace(/\D/g, "");
    setPhone(digitsOnly);
    if (phoneError) setPhoneError("");
  };

  const handleResetPassword = async () => {
    setPhoneError("");

    if (!phone.trim()) {
      setPhoneError("Phone number is required");
      return;
    }

    const phoneNumber = parsePhoneNumberFromString(
      phone,
      selectedCountry.code as CountryCode,
    );
    if (!phoneNumber || !phoneNumber.isValid()) {
      setPhoneError(`Enter a valid phone number for ${selectedCountry.name}`);
      return;
    }

    try {
      setIsSubmitting(true);
      const fullPhone = phoneNumber.number;

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showToast("Reset code sent", "success");
      // Navigate to OTP verification
      router.push({
        pathname: "/(auth)/verify-otp",
        params: { mode: "reset", phone: fullPhone },
      });
    } catch (error) {
      console.error(error);
      setPhoneError("Failed to send reset code. Please try again.");
      showToast("Failed to send reset code", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Forget Password"
      subtitle="Enter your phone number to change your password"
    >
      {/* Phone Field */}
      <View className="gap-2 mb-8">
        <TranslatedText className="text-base font-semibold text-foreground">Phone</TranslatedText>
        <View className="flex-row gap-2">
          <CountryPicker
            selectedCountry={selectedCountry}
            onSelect={setSelectedCountry}
            error={!!phoneError}
          />
          <View
            className={`flex-1 flex-row items-center h-14 rounded-xl border px-3.5 bg-white ${
              phoneError ? "border-red-500" : "border-gray-200"
            }`}
          >
            <TextInput
              value={formatPhoneDisplay(phone)}
              onChangeText={handlePhoneChange}
              placeholder="Enter your number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              className="flex-1 text-base text-foreground h-full"
              style={{ includeFontPadding: false }}
            />
          </View>
        </View>
        {phoneError ? (
          <TranslatedText className="text-red-500 text-xs px-1">{phoneError}</TranslatedText>
        ) : null}
      </View>

      {/* Submit Button */}
      <Button
        onPress={handleResetPassword}
        className="w-full h-14 rounded-xl bg-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <TranslatedText className="text-white font-bold text-base">Reset Password</TranslatedText>
        )}
      </Button>
    </AuthLayout>
  );
}
