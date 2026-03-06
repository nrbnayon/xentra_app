import { TranslatedText } from "@/components/ui/TranslatedText";
import { ReactNode } from "react";
import { Text, View } from "react-native";

interface Props {
  label: string;
  value: string;
  icon: ReactNode;
  color: string;
  bgColor: string;
  isLarge?: boolean;
}

export function WalletStatCard({
  label,
  value,
  icon,
  color,
  bgColor,
  isLarge,
}: Props) {
  return (
    <View
      style={{
        flex: isLarge ? undefined : 1,
        backgroundColor: bgColor,
        borderRadius: 16,
        padding: isLarge ? 20 : 16,
        flexDirection: "row",
        alignItems: "center",
        gap: isLarge ? 14 : 12,
        marginBottom: isLarge ? 12 : 0,
      }}
    >
      <View
        style={{
          width: isLarge ? 44 : 40,
          height: isLarge ? 44 : 40,
          borderRadius: isLarge ? 12 : 10,
          backgroundColor: color,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <View>
        <Text
          style={{
            fontSize: isLarge ? 22 : 15,
            fontWeight: "700",
            color: "#303030",
          }}
        >
          {value}
        </Text>
        <TranslatedText
          style={{
            fontSize: isLarge ? 13 : 11,
            color: "#6B7280",
            marginTop: 2,
          }}
        >
          {label}
        </TranslatedText>
      </View>
    </View>
  );
}
