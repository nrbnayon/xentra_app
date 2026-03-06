import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Text, View } from "react-native";
import { ActionButton, FormInput } from "./Common";
import { WalletHeader } from "./WalletHeader";
import { TranslatedText } from "@/components/ui/TranslatedText";

interface Props {
  onBack: () => void;
  onNext: (amount: string) => void;
}

export function WithdrawAmount({ onBack, onNext }: Props) {
  const [amount, setAmount] = useState("");

  return (
    <LinearGradient
      colors={["#BEE3FF", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.238, 0.9525]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.45, y: 1 }}
      className="flex-1"
    >
      <WalletHeader title="Withdraw Amount" onBack={onBack} />
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 24 }}>
        <TranslatedText
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#303030",
            marginBottom: 10,
          }}
        >
          Withdraw Amount
        </TranslatedText>
        <FormInput
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <View style={{ marginTop: 20 }}>
          <ActionButton
            label="Withdraw"
            onPress={() => amount && onNext(amount)}
            disabled={!amount}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
