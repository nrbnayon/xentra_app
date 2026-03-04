import AuthInput from "@/components/Auth/AuthInput";
import AuthLayout from "@/components/Auth/AuthLayout";
import CountryPicker from "@/components/Auth/CountryPicker";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Country } from "@/constants/countries";
import { cn } from "@/lib/utils";
import { useToastStore } from "@/store/useToastStore";
import { router } from "expo-router";
import parsePhoneNumberFromString, { CountryCode } from "libphonenumber-js";
import { Lock, User } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignUpPage() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: "HT",
    name: "Haiti",
    dial: "+509",
    flag: "🇭🇹",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showToast } = useToastStore();

  const formatPhoneDisplay = (raw: string): string => {
    const digits = raw.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    if (digits.length <= 10)
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(
      6,
      10,
    )} ${digits.slice(10, 15)}`;
  };

  const handlePhoneChange = (text: string) => {
    const digitsOnly = text.replace(/\D/g, "");
    setPhone(digitsOnly);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneNumber = parsePhoneNumberFromString(
        phone,
        selectedCountry.code as CountryCode,
      );
      if (!phoneNumber || !phoneNumber.isValid()) {
        newErrors.phone = `Enter a valid phone number for ${selectedCountry.name}`;
      }
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!agreeTerms) newErrors.terms = "You must agree to terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const phoneNumber = parsePhoneNumberFromString(
        phone,
        selectedCountry.code as CountryCode,
      );
      const fullPhone = phoneNumber
        ? phoneNumber.number
        : `${selectedCountry.dial}${phone}`;

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showToast("Verification code sent", "success");
      router.push({
        pathname: "/(auth)/verify-otp",
        params: { mode: "signup", phone: fullPhone },
      });
    } catch (error) {
      console.error(error);
      showToast("Something went wrong", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Sign Up" subtitle="Sign up to access your account">
      <View className="gap-1 mb-6">
        {/* Phone Field */}
        <View className="gap-2 mb-4">
          <Text className="text-base font-semibold text-foreground">Phone</Text>
          <View className="flex-row gap-2">
            <CountryPicker
              selectedCountry={selectedCountry}
              onSelect={setSelectedCountry}
              error={!!errors.phone}
            />
            <View
              className={`flex-1 flex-row items-center h-14 rounded-xl border px-3.5 bg-white ${
                errors.phone ? "border-red-500" : "border-gray-200"
              }`}
            >
              <TextInput
                value={formatPhoneDisplay(phone)}
                onChangeText={handlePhoneChange}
                placeholder="Enter your number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                className="flex-1 text-base text-foreground h-full"
              />
            </View>
          </View>
          {errors.phone ? (
            <Text className="text-red-500 text-xs px-1">{errors.phone}</Text>
          ) : null}
        </View>

        {/* Name Field */}
        <AuthInput
          label="Name(Optional)"
          value={name}
          onChangeText={(v) => {
            setName(v);
            if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
          }}
          placeholder="Enter your name"
          icon={<User size={18} color="#6C6C6C" />}
        />

        {/* Password Field */}
        <AuthInput
          label="Password"
          value={password}
          onChangeText={(v) => {
            setPassword(v);
            if (errors.password)
              setErrors((prev) => ({ ...prev, password: "" }));
          }}
          placeholder="Enter your password"
          isPassword
          icon={<Lock size={18} color="#6C6C6C" />}
          error={errors.password}
        />

        {/* Re-type Password Field */}
        <AuthInput
          label="Re-type Password"
          value={confirmPassword}
          onChangeText={(v) => {
            setConfirmPassword(v);
            if (errors.confirmPassword)
              setErrors((prev) => ({ ...prev, confirmPassword: "" }));
          }}
          placeholder="Enter your password"
          isPassword
          icon={<Lock size={18} color="#6C6C6C" />}
          error={errors.confirmPassword}
        />

        {/* Terms Checkbox */}
        <View className="gap-2 mb-8">
          <Pressable
            onPress={() => setAgreeTerms(!agreeTerms)}
            className="flex-row items-start gap-3"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Checkbox
              checked={agreeTerms}
              onCheckedChange={(v) => {
                setAgreeTerms(v);
                if (errors.terms) setErrors((prev) => ({ ...prev, terms: "" }));
              }}
              className="mt-0.5 rounded-md border-gray-300"
            />
            <Text className="text-[13px] text-foreground/80 leading-[20px] flex-1">
              I confirm that I am 18+ and agree to XENTRA's{" "}
              <Text
                onPress={() => router.push("/(public)/terms")}
                className="text-yellow font-bold"
              >
                Terms & Conditions
              </Text>
              {", "}
              <Text
                onPress={() => router.push("/(public)/privacy")}
                className="text-yellow font-bold"
              >
                Privacy Policy
              </Text>
              {" and "}
              <Text
                onPress={() => router.push("/(public)/contest-rules")}
                className="text-yellow font-bold"
              >
                Contest Rules
              </Text>
            </Text>
          </Pressable>
          {errors.terms ? (
            <Text className="text-red-500 text-xs px-1">{errors.terms}</Text>
          ) : null}
        </View>
      </View>

      {/* Submit Button */}
      <Button
        onPress={handleSignUp}
        className={cn(
          "w-full rounded-xl h-14",
          !phone || !password || !confirmPassword || !agreeTerms
            ? "bg-gray-300"
            : "bg-primary",
        )}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg">Sign Up</Text>
        )}
      </Button>

      {/* Footer */}
      <View className="flex-row justify-center mt-6">
        <Text className="text-foreground">Already have an account? </Text>
        <Pressable onPress={() => router.push("/(auth)/login")}>
          <Text className="text-yellow font-bold">Sign In</Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
}
