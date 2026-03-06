import { TranslatedText } from "@/components/ui/TranslatedText";
import { useAuthStore } from "@/store/useAuthStore";
import { Image } from "expo-image";
import { Calendar, LogOut, Settings } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onEditAccount: () => void;
  onLogout: () => void;
}

export function ProfileMain({ onEditAccount, onLogout }: Props) {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();

  const shadowStyle = {
    shadowColor: "#656565",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 45,
    elevation: 4,
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: insets.top + 20,
          marginBottom: 24,
        }}
      >
        <TranslatedText
          style={{ fontSize: 22, fontWeight: "700", color: "#303030" }}
        >
          My Profile
        </TranslatedText>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        {/* User Card */}
        <View
          style={[
            {
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
            },
            shadowStyle,
          ]}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "#E0E0E0",
              marginRight: 16,
              overflow: "hidden",
            }}
          >
            <Image
              source={
                user?.profile_photo
                  ? { uri: user.profile_photo }
                  : require("@/assets/images/user-avatar.png")
              }
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
            />
          </View>
          <View>
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
              <Text style={{ fontSize: 14, color: "#6C6C6C", marginBottom: 6 }}>
                {user.email_address}
              </Text>
            )}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Calendar size={16} color="#6C6C6C" style={{ marginRight: 6 }} />
              <TranslatedText style={{ fontSize: 14, color: "#6C6C6C" }}>
                Joined Since 2025
              </TranslatedText>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View className="bg-white rounded-xl p-6 mb-5" style={[shadowStyle]}>
          <TranslatedText className="text-xl font-bold text-[#303030] mb-4">
            Settings
          </TranslatedText>

          {/* Account Settings */}
          <Pressable
            className="flex-row items-center py-3"
            onPress={onEditAccount}
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Settings size={24} color="#6C6C6C" style={{ marginRight: 16 }} />
            <TranslatedText className="text-xl font-medium text-[#6C6C6C]">
              Account Settings
            </TranslatedText>
          </Pressable>

          {/* Logout */}
          <Pressable
            className="flex-row items-center py-3"
            onPress={onLogout}
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <LogOut size={24} color="#cc3417" style={{ marginRight: 16 }} />
            <TranslatedText className="text-xl font-medium text-[#cc3417]">
              Logout
            </TranslatedText>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
