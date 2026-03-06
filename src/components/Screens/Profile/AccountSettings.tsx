import AuthInput from "@/components/Auth/AuthInput";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { useAuthStore } from "@/store/useAuthStore";
import { useToastStore } from "@/store/useToastStore";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Calendar, Camera, SquarePen, UserPen } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FormInput } from "../Wallet/Common";
import { ProfileHeader } from "./ProfileHeader";

interface Props {
  onBack: () => void;
}

type EditMode = "none" | "name" | "password";

export function AccountSettings({ onBack }: Props) {
  const { user, updateUser } = useAuthStore();
  const { showToast } = useToastStore();
  const avatar = require("@/assets/images/user-avatar.png");

  const [editMode, setEditMode] = useState<EditMode>("none");
  const [name, setName] = useState(user?.full_name || "");

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shadowStyle = {
    shadowColor: "#656565",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 45,
    elevation: 8,
  };

  const handleSaveName = async () => {
    if (!name.trim()) {
      showToast("Name cannot be empty", "error");
      return;
    }
    await updateUser({ full_name: name });
    showToast("Name updated successfully", "success");
    setEditMode("none");
  };

  const handleSavePassword = () => {
    const newErrors: Record<string, string> = {};
    if (!currentPass) newErrors.currentPass = "Current password is required";
    if (!newPass) newErrors.newPass = "New password is required";
    else if (newPass.length < 6)
      newErrors.newPass = "Password must be at least 6 characters";
    if (newPass !== confirmPass)
      newErrors.confirmPass = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    showToast("Password updated successfully", "success");
    setEditMode("none");
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    setErrors({});
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      await updateUser({ profile_photo: uri });
      showToast("Profile photo updated", "success");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ProfileHeader title="Account setting" onBack={onBack} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        {/* Profile Photo Card */}
        <View
          style={[
            {
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 24,
              marginBottom: 24,
            },
            shadowStyle,
          ]}
        >
          <TranslatedText
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#303030",
              marginBottom: 20,
            }}
          >
            Profile Photo
          </TranslatedText>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ position: "relative" }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: "#E0E0E0",
                  overflow: "hidden",
                }}
              >
                <Image
                  source={
                    user?.profile_photo ? { uri: user.profile_photo } : avatar
                  }
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                />
              </View>
              <TouchableOpacity
                onPress={handlePickImage}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: -4,
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1,
                  borderColor: "#F3B530",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Camera size={16} color="#F3B530" />
              </TouchableOpacity>
            </View>

            <View className="ml-5">
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#505050",
                  marginBottom: 2,
                }}
              >
                {user?.full_name || "Jhon Doe Smith"}
              </Text>
              {user?.email_address && (
                <Text
                  style={{ fontSize: 14, color: "#6C6C6C", marginBottom: 6 }}
                >
                  {user.email_address}
                </Text>
              )}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Calendar
                  size={16}
                  color="#6C6C6C"
                  style={{ marginRight: 6 }}
                />
                <TranslatedText style={{ fontSize: 14, color: "#6C6C6C" }}>
                  Joined Since 2025
                </TranslatedText>
              </View>
            </View>
          </View>
        </View>

        {/* Personal Information Card */}
        <View
          style={[
            {
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 24,
              marginBottom: 24,
            },
            shadowStyle,
          ]}
        >
          <TranslatedText
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#303030",
              marginBottom: 20,
            }}
          >
            Personal Information
          </TranslatedText>

          {/* Name Field */}
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <TranslatedText
                style={{ fontSize: 15, fontWeight: "600", color: "#303030" }}
              >
                Name
              </TranslatedText>
              {editMode !== "name" && (
                <TouchableOpacity
                  onPress={() => {
                    setName(user?.full_name || "");
                    setEditMode("name");
                  }}
                >
                  <UserPen size={18} color="#303030" />
                </TouchableOpacity>
              )}
            </View>

            {editMode === "name" ? (
              <View>
                <FormInput
                  placeholder="Enter Name"
                  value={name}
                  onChangeText={setName}
                />
                <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setEditMode("none");
                      setName(user?.full_name || "");
                    }}
                    style={{
                      flex: 1,
                      height: 48,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#EDEDED",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TranslatedText
                      style={{ fontWeight: "600", color: "#1A1A1A" }}
                    >
                      Cancel
                    </TranslatedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSaveName}
                    style={{
                      flex: 1,
                      height: 48,
                      borderRadius: 10,
                      backgroundColor: "#16467A",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TranslatedText
                      style={{ fontWeight: "600", color: "#FFFFFF" }}
                    >
                      Save
                    </TranslatedText>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Text style={{ fontSize: 16, color: "#686868" }}>
                {user?.full_name || "Enter Name"}
              </Text>
            )}
          </View>

          {/* Phone Field (Read only) */}
          <View style={{ marginBottom: 20 }}>
            <TranslatedText
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "#303030",
                marginBottom: 8,
              }}
            >
              Phone
            </TranslatedText>
            <Text style={{ fontSize: 16, color: "#B0B0B0" }}>
              {user?.phone_number || "019273748332"}
            </Text>
          </View>

          {/* Password Field */}
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <TranslatedText
                style={{ fontSize: 15, fontWeight: "600", color: "#303030" }}
              >
                Your Password
              </TranslatedText>
              {editMode !== "password" && (
                <TouchableOpacity onPress={() => setEditMode("password")}>
                  <SquarePen size={18} color="#303030" />
                </TouchableOpacity>
              )}
            </View>

            {editMode === "password" ? (
              <View>
                <AuthInput
                  label="Current Password"
                  placeholder="Enter Current Password"
                  value={currentPass}
                  onChangeText={(v) => {
                    setCurrentPass(v);
                    setErrors((prev) => ({ ...prev, currentPass: "" }));
                  }}
                  isPassword
                  error={errors.currentPass}
                />
                <AuthInput
                  label="New Password"
                  placeholder="Enter New Password"
                  value={newPass}
                  onChangeText={(v) => {
                    setNewPass(v);
                    setErrors((prev) => ({ ...prev, newPass: "" }));
                  }}
                  isPassword
                  error={errors.newPass}
                />
                <AuthInput
                  label="Confirm Password"
                  placeholder="Confirm New Password"
                  value={confirmPass}
                  onChangeText={(v) => {
                    setConfirmPass(v);
                    setErrors((prev) => ({ ...prev, confirmPass: "" }));
                  }}
                  isPassword
                  error={errors.confirmPass}
                />

                <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setEditMode("none");
                      setCurrentPass("");
                      setNewPass("");
                      setConfirmPass("");
                      setErrors({});
                    }}
                    style={{
                      flex: 1,
                      height: 48,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#EDEDED",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TranslatedText
                      style={{ fontWeight: "600", color: "#1A1A1A" }}
                    >
                      Cancel
                    </TranslatedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSavePassword}
                    style={{
                      flex: 1,
                      height: 48,
                      borderRadius: 10,
                      backgroundColor: "#16467A",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TranslatedText
                      style={{ fontWeight: "600", color: "#FFFFFF" }}
                    >
                      Save
                    </TranslatedText>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Text style={{ fontSize: 16, color: "#686868" }}>********</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
