import { TranslatedText } from "@/components/ui/TranslatedText";
import { AlertCircle, X } from "lucide-react-native";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ visible, onClose, onConfirm }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "#00000099",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 30,
        }}
      >
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 24,
            padding: 24,
            width: "100%",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Close button */}
          <Pressable
            onPress={onClose}
            style={{
              position: "absolute",
              right: 16,
              top: 16,
              padding: 4,
            }}
          >
            <X size={24} color="#cc3417" />
          </Pressable>

          {/* Icon */}
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: "#EEF4FB",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
              marginTop: 12,
            }}
          >
            <AlertCircle size={32} color="#cc3417" />
          </View>

          {/* Text */}
          <TranslatedText
            className="text-center font-bold text-lg text-[#303030]"
            style={{ marginBottom: 32 }}
          >
            Are you sure you want to logout?
          </TranslatedText>

          {/* Buttons */}
          <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                flex: 1,
                height: 52,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#CFCFCF",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TranslatedText
                style={{ color: "#8A8A8A", fontWeight: "700", fontSize: 16 }}
              >
                Cancel
              </TranslatedText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              style={{
                flex: 1,
                height: 52,
                borderRadius: 12,
                backgroundColor: "#EF4444",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TranslatedText
                style={{ color: "#FFFFFF", fontWeight: "700", fontSize: 16 }}
              >
                Log Out
              </TranslatedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
