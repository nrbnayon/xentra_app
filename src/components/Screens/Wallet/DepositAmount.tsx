import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Text, View } from "react-native";
import { ActionButton, FormInput } from "./Common";
import { WalletHeader } from "./WalletHeader";

interface Props {
  onBack: () => void;
  onConfirm: (amount: string) => void;
}

export function DepositAmount({ onBack, onConfirm }: Props) {
  const [amount, setAmount] = useState("");

  return (
    <LinearGradient
      colors={["#BEE3FF", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.238, 0.9525]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.45, y: 1 }}
      className="flex-1"
    >
      <WalletHeader title="Deposit Amount" onBack={onBack} />
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 24 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#303030",
            marginBottom: 10,
          }}
        >
          Deposit Amount
        </Text>
        <FormInput
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <View style={{ marginTop: 20 }}>
          <ActionButton
            label="Deposit"
            onPress={() => amount && onConfirm(amount)}
            disabled={!amount}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
