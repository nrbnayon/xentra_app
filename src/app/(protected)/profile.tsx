import { AccountSettings } from "@/components/Screens/Profile/AccountSettings";
import { LogoutModal } from "@/components/Screens/Profile/LogoutModal";
import { ProfileMain } from "@/components/Screens/Profile/ProfileMain";
import { useAuthStore } from "@/store/useAuthStore";
import { useToastStore } from "@/store/useToastStore";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View } from "react-native";

type ProfileStep = "main" | "settings";

export default function ProfileTab() {
  const [step, setStep] = useState<ProfileStep>("main");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { signOut } = useAuthStore();
  const { showToast } = useToastStore();

  const handleLogout = async () => {
    try {
      await signOut();
      setShowLogoutModal(false);
      showToast("Logged out successfully", "success");
    } catch (error) {
      showToast("Failed to logout", "error");
    }
  };

  return (
    <LinearGradient
      colors={["#BEE3FF", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.238, 0.9525]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.45, y: 1 }}
      className="flex-1"
    >
      <View style={{ flex: 1 }}>
        {step === "main" ? (
          <ProfileMain
            onEditAccount={() => setStep("settings")}
            onLogout={() => setShowLogoutModal(true)}
          />
        ) : (
          <AccountSettings onBack={() => setStep("main")} />
        )}
      </View>

      <LogoutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </LinearGradient>
  );
}
