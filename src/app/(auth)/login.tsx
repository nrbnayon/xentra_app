import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/store/useAuthStore";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronDown, Eye, EyeOff, Lock, Search } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Country Data ─────────────────────────────────────────────────────────────
const COUNTRIES = [
  { code: "AF", name: "Afghanistan", dial: "+93", flag: "🇦🇫" },
  { code: "AL", name: "Albania", dial: "+355", flag: "🇦🇱" },
  { code: "DZ", name: "Algeria", dial: "+213", flag: "🇩🇿" },
  { code: "AR", name: "Argentina", dial: "+54", flag: "🇦🇷" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "AT", name: "Austria", dial: "+43", flag: "🇦🇹" },
  { code: "BD", name: "Bangladesh", dial: "+880", flag: "🇧🇩" },
  { code: "BE", name: "Belgium", dial: "+32", flag: "🇧🇪" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "CN", name: "China", dial: "+86", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", dial: "+57", flag: "🇨🇴" },
  { code: "CD", name: "Congo", dial: "+243", flag: "🇨🇩" },
  { code: "HR", name: "Croatia", dial: "+385", flag: "🇭🇷" },
  { code: "CZ", name: "Czech Republic", dial: "+420", flag: "🇨🇿" },
  { code: "DK", name: "Denmark", dial: "+45", flag: "🇩🇰" },
  { code: "EG", name: "Egypt", dial: "+20", flag: "🇪🇬" },
  { code: "ET", name: "Ethiopia", dial: "+251", flag: "🇪🇹" },
  { code: "FI", name: "Finland", dial: "+358", flag: "🇫🇮" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "GH", name: "Ghana", dial: "+233", flag: "🇬🇭" },
  { code: "GR", name: "Greece", dial: "+30", flag: "🇬🇷" },
  { code: "HT", name: "Haiti", dial: "+509", flag: "🇭🇹" },
  { code: "HK", name: "Hong Kong", dial: "+852", flag: "🇭🇰" },
  { code: "HU", name: "Hungary", dial: "+36", flag: "🇭🇺" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", dial: "+62", flag: "🇮🇩" },
  { code: "IR", name: "Iran", dial: "+98", flag: "🇮🇷" },
  { code: "IQ", name: "Iraq", dial: "+964", flag: "🇮🇶" },
  { code: "IE", name: "Ireland", dial: "+353", flag: "🇮🇪" },
  { code: "IL", name: "Israel", dial: "+972", flag: "🇮🇱" },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
  { code: "JO", name: "Jordan", dial: "+962", flag: "🇯🇴" },
  { code: "KE", name: "Kenya", dial: "+254", flag: "🇰🇪" },
  { code: "KR", name: "South Korea", dial: "+82", flag: "🇰🇷" },
  { code: "KW", name: "Kuwait", dial: "+965", flag: "🇰🇼" },
  { code: "LB", name: "Lebanon", dial: "+961", flag: "🇱🇧" },
  { code: "MY", name: "Malaysia", dial: "+60", flag: "🇲🇾" },
  { code: "MX", name: "Mexico", dial: "+52", flag: "🇲🇽" },
  { code: "MA", name: "Morocco", dial: "+212", flag: "🇲🇦" },
  { code: "MM", name: "Myanmar", dial: "+95", flag: "🇲🇲" },
  { code: "NP", name: "Nepal", dial: "+977", flag: "🇳🇵" },
  { code: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { code: "NZ", name: "New Zealand", dial: "+64", flag: "🇳🇿" },
  { code: "NG", name: "Nigeria", dial: "+234", flag: "🇳🇬" },
  { code: "NO", name: "Norway", dial: "+47", flag: "🇳🇴" },
  { code: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
  { code: "PE", name: "Peru", dial: "+51", flag: "🇵🇪" },
  { code: "PH", name: "Philippines", dial: "+63", flag: "🇵🇭" },
  { code: "PL", name: "Poland", dial: "+48", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", dial: "+351", flag: "🇵🇹" },
  { code: "QA", name: "Qatar", dial: "+974", flag: "🇶🇦" },
  { code: "RO", name: "Romania", dial: "+40", flag: "🇷🇴" },
  { code: "RU", name: "Russia", dial: "+7", flag: "🇷🇺" },
  { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { code: "SN", name: "Senegal", dial: "+221", flag: "🇸🇳" },
  { code: "RS", name: "Serbia", dial: "+381", flag: "🇷🇸" },
  { code: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { code: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦" },
  { code: "ES", name: "Spain", dial: "+34", flag: "🇪🇸" },
  { code: "LK", name: "Sri Lanka", dial: "+94", flag: "🇱🇰" },
  { code: "SE", name: "Sweden", dial: "+46", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", dial: "+41", flag: "🇨🇭" },
  { code: "SY", name: "Syria", dial: "+963", flag: "🇸🇾" },
  { code: "TW", name: "Taiwan", dial: "+886", flag: "🇹🇼" },
  { code: "TZ", name: "Tanzania", dial: "+255", flag: "🇹🇿" },
  { code: "TH", name: "Thailand", dial: "+66", flag: "🇹🇭" },
  { code: "TN", name: "Tunisia", dial: "+216", flag: "🇹🇳" },
  { code: "TR", name: "Turkey", dial: "+90", flag: "🇹🇷" },
  { code: "UG", name: "Uganda", dial: "+256", flag: "🇺🇬" },
  { code: "UA", name: "Ukraine", dial: "+380", flag: "🇺🇦" },
  { code: "AE", name: "UAE", dial: "+971", flag: "🇦🇪" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "VN", name: "Vietnam", dial: "+84", flag: "🇻🇳" },
  { code: "YE", name: "Yemen", dial: "+967", flag: "🇾🇪" },
  { code: "ZM", name: "Zambia", dial: "+260", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", dial: "+263", flag: "🇿🇼" },
];

type Country = (typeof COUNTRIES)[0];

// ─── Phone Validation ─────────────────────────────────────────────────────────
// Basic international phone: 5–15 digits (ITU-T E.164)
const validatePhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 5 && digits.length <= 15;
};

// Format as user types (adds spaces every few digits for readability)
const formatPhoneDisplay = (raw: string): string => {
  const digits = raw.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  if (digits.length <= 10)
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)} ${digits.slice(10, 15)}`;
};

// ─── Country Picker Modal ─────────────────────────────────────────────────────
function CountryPickerModal({
  visible,
  selected,
  onSelect,
  onClose,
}: {
  visible: boolean;
  selected: Country;
  onSelect: (c: Country) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const insets = useSafeAreaInsets();

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.dial.includes(query),
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/45" onPress={onClose}>
        <Pressable className="mt-auto" onPress={(e) => e.stopPropagation()}>
          <View
            className="bg-white rounded-t-3xl max-h-[80%] w-[90%] self-center"
            style={{
              paddingBottom: insets.bottom + 8,
            }}
          >
            {/* Handle */}
            <View className="items-center pt-3 pb-2">
              <View className="w-10 h-1 rounded-full bg-gray-200" />
            </View>

            {/* Title */}
            <Text className="text-lg font-bold text-primary text-center pb-3">
              Select Country
            </Text>

            {/* Search */}
            <View
              className={`mx-4 mb-3 flex-row items-center gap-2 px-3 rounded-xl border bg-gray-50 border-border focus-within:border-primary/80`}
            >
              <Search size={16} color="#9CA3AF" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search country or code..."
                placeholderTextColor="#9CA3AF"
                className="flex-1 py-3 text-sm text-foreground"
                autoFocus
              />
            </View>

            {/* List */}
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.code}
              keyboardShouldPersistTaps="handled"
              className="max-h-[380px]"
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className={`flex-row items-center justify-between px-5 py-3 ${
                    item.code === selected.code
                      ? "bg-[#E8F0F9]"
                      : "active:bg-muted"
                  }`}
                >
                  <View className="flex-row items-center gap-2 px-5">
                    {/* Flag */}
                    <Text className="text-2xl w-9 text-center focus:text-primary">
                      {item.flag}
                    </Text>
                    {/* Country name */}
                    <Text
                      numberOfLines={1}
                      className={`flex-1 text-base text-foreground ml-2.5 ${
                        item.code === selected.code
                          ? "font-semibold"
                          : "font-normal"
                      }`}
                    >
                      {item.name}
                    </Text>
                    {/* Dial code — fixed width so it never wraps */}
                    <Text className="text-sm text-secondary min-w-[48px] text-right">
                      {item.dial}
                    </Text>
                  </View>
                </Pressable>
              )}
              ItemSeparatorComponent={() => (
                <View className="h-[1px] bg-muted mx-5" />
              )}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function LoginPage() {
  const insets = useSafeAreaInsets();

  const [rememberMe, setRememberMe] = useState(true);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    COUNTRIES.find((c) => c.code === "HT")!, // Default Haiti as in design
  );

  const { signIn } = useAuthStore();
  const phoneRef = useRef<TextInput>(null);

  // ── Handlers ────────────────────────────────────────────────────────────────
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
    } else if (!validatePhone(phone)) {
      setPhoneError("Enter a valid phone number (5–15 digits)");
      hasError = true;
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
      const fullPhone = `${selectedCountry.dial}${phone}`;
      await signIn(fullPhone, password);
    } catch (error) {
      console.error(error);
      Alert.alert("Login Failed", "Invalid credentials or network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <LinearGradient
      colors={["#BEE3FF", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.238, 0.9525]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.45, y: 1 }}
      className="flex-1"
    >
      <StatusBar style="auto" />

      <CountryPickerModal
        visible={pickerVisible}
        selected={selectedCountry}
        onSelect={setSelectedCountry}
        onClose={() => setPickerVisible(false)}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerClassName="flex-grow"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View
              style={{ paddingTop: insets.top + 16 }}
              className="flex-1 items-center justify-center px-5 pb-10"
            >
              <View className="w-full max-w-md">
                {/* ── Header ──────────────────────────────────────── */}
                <View className="items-center gap-2 mb-10">
                  <Text className="text-4xl font-bold text-primary">
                    Sign In
                  </Text>
                  <Text className="text-base text-secondary text-center">
                    Sign in to access your account
                  </Text>
                </View>

                {/* ── Form ────────────────────────────────────────── */}
                <View className="gap-5 mb-10">
                  {/* Phone Field */}
                  <View className="gap-2">
                    <Text className="text-base font-semibold text-foreground">
                      Phone
                    </Text>

                    <View className="flex-row gap-2">
                      {/* Country Dial Picker */}
                      <Pressable
                        onPress={() => setPickerVisible(true)}
                        className={`flex-row items-center justify-center px-2 h-15 rounded-xl border border-gray-200 bg-white ${phoneError ? "border-red-500" : ""}`}
                      >
                        <Text className="text-[22px] leading-7">
                          {selectedCountry.flag}
                        </Text>
                        <Text className="text-sm text-foreground font-medium ml-1.5 mr-1">
                          {selectedCountry.dial}
                        </Text>
                        <ChevronDown size={13} color="#505050" />
                      </Pressable>

                      {/* Number Input */}
                      <View
                        className={`flex-1 flex-row items-center h-14 rounded-xl border px-3.5 gap-2 bg-white ${
                          phoneError
                            ? "border-red-500"
                            : "border-border focus:border-primary/80"
                        }`}
                      >
                        <TextInput
                          ref={phoneRef}
                          value={formatPhoneDisplay(phone)}
                          onChangeText={handlePhoneChange}
                          placeholder="Enter your number"
                          placeholderTextColor="#9CA3AF"
                          keyboardType="phone-pad"
                          maxLength={19}
                          className="flex-1 text-base text-foreground p-0"
                        />
                      </View>
                    </View>

                    {phoneError ? (
                      <Text className="text-red-500 text-sm">{phoneError}</Text>
                    ) : null}
                  </View>

                  {/* Password Field */}
                  <View className="gap-2">
                    <Text className="text-base font-semibold text-foreground">
                      Password
                    </Text>

                    <View
                      className={`flex-row items-center h-14 rounded-xl border px-3.5 gap-2 bg-white ${
                        passwordError
                          ? "border-red-500"
                          : "border-border focus:border-primary/80"
                      }`}
                    >
                      <Lock size={18} color="#6C6C6C" />
                      <TextInput
                        value={password}
                        onChangeText={handlePasswordChange}
                        placeholder="Enter your password"
                        placeholderTextColor="#6C6C6C"
                        secureTextEntry={!showPassword}
                        className="flex-1 text-base text-foreground p-0"
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
                      <Text className="text-red-500 text-sm">
                        {passwordError}
                      </Text>
                    ) : null}

                    {/* Remember me + Forgot */}
                    <View className="flex-row items-center justify-between mt-1">
                      <Pressable
                        onPress={() => setRememberMe(!rememberMe)}
                        className="flex-row items-center gap-2"
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Checkbox
                          checked={rememberMe}
                          onCheckedChange={setRememberMe}
                        />
                        <Text className="text-sm text-foreground font-medium">
                          Remember me
                        </Text>
                      </Pressable>

                      <Pressable
                        onPress={() => router.push("/(auth)/forgot-password")}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Text className="text-sm font-semibold text-yellow">
                          Forget Password?
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>

                {/* ── Submit Button ────────────────────────────────── */}
                <Button
                  onPress={handleLogin}
                  className="w-full rounded-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <View className="flex-row items-center justify-center gap-2">
                      <ActivityIndicator color="white" />
                      <Text className="text-white font-medium">
                        Signing in...
                      </Text>
                    </View>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                {/* ── Footer ──────────────────────────────────────── */}
                <View className="flex-row justify-center mt-5">
                  <Text className="text-foreground">
                    Don't have an account?{" "}
                  </Text>
                  <Pressable onPress={() => router.push("/(auth)/sign-up")}>
                    <Text className="text-yellow font-bold">Sign Up</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
