import { TranslatedText } from "@/components/ui/TranslatedText";
import { Transaction, TransactionStatus } from "@/types/wallet";
import { Text, View } from "react-native";

interface Props {
  transaction: Transaction;
  isLast: boolean;
}

function getStatusStyle(status: TransactionStatus) {
  switch (status) {
    case "Completed":
      return { bg: "#E6F9F0", text: "#1DB06A" };
    case "Pending":
      return { bg: "#FFF3E0", text: "#FF9800" };
    case "Failed":
      return { bg: "#FEECEC", text: "#E53935" };
  }
}

export function TransactionRow({ transaction, isLast }: Props) {
  const ss = getStatusStyle(transaction.status);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: "#F5F5F5",
      }}
    >
      <TranslatedText style={{ flex: 1, fontSize: 13, color: "#444" }}>
        {transaction.date}
      </TranslatedText>
      <TranslatedText style={{ flex: 1, fontSize: 13, color: "#444" }}>
        {transaction.reason}
      </TranslatedText>
      <Text style={{ flex: 1, fontSize: 13, color: "#444" }}>
        {transaction.amount}
      </Text>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <View
          style={{
            backgroundColor: ss.bg,
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}
        >
          <TranslatedText style={{ fontSize: 12, fontWeight: "600", color: ss.text }}>
            {transaction.status}
          </TranslatedText>
        </View>
      </View>
    </View>
  );
}
