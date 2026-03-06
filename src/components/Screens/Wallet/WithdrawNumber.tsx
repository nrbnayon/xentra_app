import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Text, View } from "react-native";
import { ActionButton, FormInput } from "./Common";
import { WalletHeader } from "./WalletHeader";

interface Props {
  title: string;
  buttonLabel: string;
  onBack: () => void;
  onSubmit: (number: string) => void;
}

export function WithdrawNumber({
  title,
  buttonLabel,
  onBack,
  onSubmit,
}: Props) {
  const [number, setNumber] = useState("");

  return (
    <LinearGradient
      colors={["#BEE3FF", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.238, 0.9525]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.45, y: 1 }}
      className="flex-1"
    >
      <WalletHeader title={title} onBack={onBack} />
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 24 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#303030",
            marginBottom: 10,
          }}
        >
          Moncash/Natcash Number
        </Text>
        <FormInput
          placeholder="Enter Account Number"
          value={number}
          onChangeText={setNumber}
          keyboardType="phone-pad"
        />
        <Text style={{ fontSize: 13, color: "#9E9E9E", marginTop: 6 }}>
          Enter your Moncash/Natcash number
        </Text>
        <View style={{ marginTop: 20 }}>
          <ActionButton
            label={buttonLabel}
            onPress={() => number && onSubmit(number)}
            disabled={!number}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
