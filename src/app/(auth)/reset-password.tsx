import AuthInput from "@/components/Auth/AuthInput";
import AuthLayout from "@/components/Auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { useToastStore } from "@/store/useToastStore";
import { router } from "expo-router";
import { Lock } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function ResetPasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { showToast } = useToastStore();

  const handleReset = async () => {
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      console.log("Reset password submitted");
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Navigate to success
      showToast("Password reset successfully", "success");
      router.replace({
        pathname: "/(auth)/success",
        params: { mode: "reset" },
      });
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({
        ...prev,
        currentPassword: "Failed to reset password. Please try again.",
      }));
      showToast("Failed to reset password", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Create a new unique password"
    >
      <View className="gap-1 mb-6">
        {/* Current Password */}
        {/* <AuthInput
          label="Current Password"
          value={currentPassword}
          onChangeText={(v) => {
            setCurrentPassword(v);
            if (errors.currentPassword)
              setErrors((prev) => ({ ...prev, currentPassword: "" }));
          }}
          placeholder="Enter your password"
          isPassword
          icon={<Lock size={18} color="#6C6C6C" />}
          error={errors.currentPassword}
        /> */}

        {/* New Password */}
        <AuthInput
          label="New Password"
          value={newPassword}
          onChangeText={(v) => {
            setNewPassword(v);
            if (errors.newPassword)
              setErrors((prev) => ({ ...prev, newPassword: "" }));
            // clear confirm mismatch in real time
            if (errors.confirmPassword && v === confirmPassword)
              setErrors((prev) => ({ ...prev, confirmPassword: "" }));
          }}
          placeholder="Enter your password"
          isPassword
          icon={<Lock size={18} color="#6C6C6C" />}
          error={errors.newPassword}
        />

        {/* Confirm New Password */}
        <AuthInput
          label="Re-type New Password"
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

        {/* Passwords match indicator */}
        {!errors.confirmPassword &&
          confirmPassword.length > 0 &&
          newPassword === confirmPassword && (
            <TranslatedText className="text-green-600 text-xs px-1 -mt-2">
              ✓ Passwords match
            </TranslatedText>
          )}
      </View>

      {/* Submit Button */}
      <Button
        onPress={handleReset}
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
