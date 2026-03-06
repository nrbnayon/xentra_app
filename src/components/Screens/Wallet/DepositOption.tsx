import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { ActionButton, PRIMARY } from "./Common";
import { WalletHeader } from "./WalletHeader";
import { TranslatedText } from "@/components/ui/TranslatedText";

interface Props {
  title: string;
  buttonLabel: string;
  methods: string[];
  onBack: () => void;
  onNext: (method: string) => void;
}

export function DepositOption({
  title,
  buttonLabel,
  methods,
  onBack,
  onNext,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);

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
        {methods.map((method) => (
          <Pressable
            key={method}
            onPress={() => setSelected(method)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: selected === method ? PRIMARY : "#E0E0E0",
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              backgroundColor: selected === method ? "#EEF4FB" : "#FAFAFA",
            }}
          >
            <TranslatedText style={{ fontSize: 15, color: "#444" }}>{method}</TranslatedText>
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderWidth: 2,
                borderColor: selected === method ? PRIMARY : "#C0C0C0",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selected === method && (
                <View
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 6,
                    backgroundColor: PRIMARY,
                  }}
                />
              )}
            </View>
          </Pressable>
        ))}

        <View style={{ marginTop: 8 }}>
          <ActionButton
            label={buttonLabel}
            onPress={() => selected && onNext(selected)}
            disabled={!selected}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
