import AuthLayout from "@/components/Auth/AuthLayout";
import CountryPicker from "@/components/Auth/CountryPicker";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { Country } from "@/constants/countries";
import { useAuthStore } from "@/store/useAuthStore";
import { useToastStore } from "@/store/useToastStore";
import { router } from "expo-router";
import parsePhoneNumberFromString, { CountryCode } from "libphonenumber-js";
import { Eye, EyeOff, Lock } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

// ─── Phone Validation ─────────────────────────────────────────────────────────

const formatPhoneDisplay = (raw: string): string => {
  const digits = raw.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  if (digits.length <= 10)
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)} ${digits.slice(10, 15)}`;
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(true);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: "HT",
    name: "Haiti",
    dial: "+509",
    flag: "🇭🇹",
  });

  const { signIn } = useAuthStore();
  const { showToast } = useToastStore();
  const phoneRef = useRef<TextInput>(null);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handlePhoneChange = (text: string) => {
    const digitsOnly = text.replace(/\D/g, "");
    setPhone(digitsOnly);
    if (phoneError) setPhoneError("");
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) setPasswordError("");
  };

  const handleLogin = async () => {
    setPhoneError("");
    setPasswordError("");
    let hasError = false;

    if (!phone.trim()) {
      setPhoneError("Phone number is required");
      hasError = true;
    } else {
      const phoneNumber = parsePhoneNumberFromString(
        phone,
        selectedCountry.code as CountryCode,
      );
      if (!phoneNumber || !phoneNumber.isValid()) {
        setPhoneError(`Enter a valid phone number for ${selectedCountry.name}`);
        hasError = true;
      }
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters");
      hasError = true;
    }

    if (hasError) return;

    try {
      setIsSubmitting(true);
      const phoneNumber = parsePhoneNumberFromString(
        phone,
        selectedCountry.code as CountryCode,
      );
      const fullPhone = phoneNumber
        ? phoneNumber.number
        : `${selectedCountry.dial}${phone}`;

      await signIn(fullPhone, password);
      showToast("Login Successful", "success");
      router.replace("/(protected)");
    } catch (error) {
      console.error(error);
      showToast("Invalid credentials or network error", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <AuthLayout
      title="Sign In"
      subtitle="Sign in to access your account"
      showBackButton={false}
    >
      {/* ── Form ────────────────────────────────────────── */}
      <View className="gap-5 mb-10">
        {/* Phone Field */}
        <View className="gap-2">
          <TranslatedText className="text-base font-semibold text-foreground">Phone</TranslatedText>

          <View className="flex-row gap-2">
            {/* Country Dial Picker */}
            <CountryPicker
              selectedCountry={selectedCountry}
              onSelect={setSelectedCountry}
              error={!!phoneError}
            />

            {/* Number Input */}
            <View
              className={`flex-1 flex-row items-center h-14 rounded-xl border px-3.5 gap-2 bg-white ${
                phoneError
                  ? "border-red-500"
                  : phoneFocused
                    ? "border-primary/80"
                    : "border-gray-200"
              }`}
            >
              <TextInput
                ref={phoneRef}
                value={formatPhoneDisplay(phone)}
                onChangeText={handlePhoneChange}
                onFocus={() => setPhoneFocused(true)}
                onBlur={() => setPhoneFocused(false)}
                placeholder="Enter your number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                maxLength={19}
                className="flex-1 text-base text-foreground"
                style={{ includeFontPadding: false }}
              />
            </View>
          </View>

          {phoneError ? (
            <TranslatedText className="text-red-500 text-xs px-1">{phoneError}</TranslatedText>
          ) : null}
        </View>

        {/* Password Field */}
        <View className="gap-2">
          <TranslatedText className="text-base font-semibold text-foreground">
            Password
          </TranslatedText>

          <View
            className={`flex-row items-center h-14 rounded-xl border px-3.5 gap-2 bg-white ${
              passwordError
                ? "border-red-500"
                : passwordFocused
                  ? "border-primary/80"
                  : "border-gray-200"
            }`}
          >
            <Lock size={18} color="#6C6C6C" />
            <TextInput
              value={password}
              onChangeText={handlePasswordChange}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              placeholder="Enter your password"
              placeholderTextColor="#6C6C6C"
              secureTextEntry={!showPassword}
              className="flex-1 text-base text-foreground"
              style={{ includeFontPadding: false }}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {showPassword ? (
                <Eye size={18} color="#6C6C6C" />
              ) : (
                <EyeOff size={18} color="#6C6C6C" />
              )}
            </Pressable>
          </View>

          {passwordError ? (
            <TranslatedText className="text-red-500 text-xs px-1">{passwordError}</TranslatedText>
          ) : null}

          {/* Remember me + Forgot */}
          <View className="flex-row items-center justify-between mt-1">
            <Pressable
              onPress={() => setRememberMe(!rememberMe)}
              className="flex-row items-center gap-2"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Checkbox checked={rememberMe} onCheckedChange={setRememberMe} />
              <TranslatedText className="text-sm text-foreground font-medium">
                Remember me
              </TranslatedText>
            </Pressable>

            <Pressable
              onPress={() => router.push("/(auth)/forgot-password")}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <TranslatedText className="text-sm font-semibold text-yellow">
                Forget Password?
              </TranslatedText>
            </Pressable>
          </View>
        </View>
      </View>

      {/* ── Submit Button ─────────────────────────────────── */}
      <Button
        onPress={handleLogin}
        className="w-full h-14 rounded-xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <View className="flex-row items-center justify-center gap-2">
            <ActivityIndicator color="white" />
            <Text className="text-white font-bold text-base">
              Signing in...
            </Text>
          </View>
        ) : (
          <Text className="text-white font-bold text-base">Sign In</Text>
        )}
      </Button>

      {/* ── Footer ──────────────────────────────────────── */}
      <View className="flex-row justify-center mt-6">
        <Text className="text-foreground">Don&apos;t have an account? </Text>
        <Pressable onPress={() => router.push("/(auth)/sign-up")}>
          <Text className="text-yellow font-bold">Sign Up</Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
}
