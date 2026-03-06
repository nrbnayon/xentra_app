import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft } from "lucide-react-native";
import { useMemo } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActionButton, PRIMARY } from "./Common";

interface Props {
  amount: string;
  method: string;
  accountNumber: string;
  onDone: () => void;
}

export function WithdrawSuccess({
  amount,
  method,
  accountNumber,
  onDone,
}: Props) {
  const insets = useSafeAreaInsets();
  const last4 = useMemo(
    () => accountNumber.replace(/\D/g, "").slice(-4) || "----",
    [accountNumber],
  );

  return (
    <LinearGradient
      colors={["#BEE3FF", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.238, 0.9525]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.45, y: 1 }}
      className="flex-1"
    >
      <View
        style={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 20,
          marginBottom: 8,
        }}
      >
        <Pressable
          onPress={onDone}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#F0F4F8",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChevronLeft size={22} color="#303030" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 40,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../../../../assets/images/champion.png")}
          style={{ width: 240, height: 240, marginBottom: 16 }}
          resizeMode="contain"
        />

        <Text
          style={{
            fontSize: 30,
            fontWeight: "800",
            color: PRIMARY,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Congratulations!
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#6B7280",
            textAlign: "center",
            marginBottom: 28,
            lineHeight: 20,
          }}
        >
          Your withdrawal request has been submitted successfully.
        </Text>

        <View
          style={{
            width: "100%",
            backgroundColor: "#F9FAFB",
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: "#E8EAF0",
            marginBottom: 32,
          }}
        >
          {[
            { label: "Withdrawal Amount:", value: `${amount} HTG` },
            { label: "Selected Method:", value: method },
            { label: "Last 4 digits of account number:", value: last4 },
            {
              label: "Estimated processing time:",
              value: "Within 1 business day",
            },
          ].map((row) => (
            <View
              key={row.label}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <Text style={{ fontSize: 13, color: "#6B7280", flex: 1 }}>
                {row.label}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#FF9800",
                  textAlign: "right",
                  flex: 1,
                }}
              >
                {row.value}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ width: "100%" }}>
          <ActionButton label="Done" onPress={onDone} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
