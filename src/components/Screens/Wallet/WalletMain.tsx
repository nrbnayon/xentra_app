import { Transaction, WalletStats } from "@/types/wallet";
import { LinearGradient } from "expo-linear-gradient";
import { Banknote, Briefcase, Wallet } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActionButton } from "./Common";
import { TransactionRow } from "./TransactionRow";
import { WalletStatCard } from "./WalletStatCard";

interface Props {
  stats: WalletStats;
  transactions: Transaction[];
  onDeposit: () => void;
  onWithdraw: () => void;
}

export function WalletMain({
  stats,
  transactions,
  onDeposit,
  onWithdraw,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#FFF0CE", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.1559, 0.9525]}
      start={{ x: 0.48, y: 0 }}
      end={{ x: 0.52, y: 1 }}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 160,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#303030",
            marginBottom: 24,
          }}
        >
          Wallet Details
        </Text>

        <WalletStatCard
          label="Balance"
          value={stats.balance}
          icon={<Banknote size={24} color="#FFFFFF" />}
          color="#43A047"
          bgColor="#75C57133"
          isLarge
        />

        <View style={{ flexDirection: "row", gap: 12, marginBottom: 28 }}>
          <WalletStatCard
            label="Total Winnings"
            value={stats.totalWinnings}
            icon={<Briefcase size={20} color="#FFFFFF" />}
            color="#EB6D00"
            bgColor="#FFA8281F"
          />
          <WalletStatCard
            label="Total Deposited"
            value={stats.totalDeposited}
            icon={<Wallet size={20} color="#FFFFFF" />}
            color="#3B89DD"
            bgColor="#DFEEFF"
          />
        </View>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#303030",
            marginBottom: 12,
          }}
        >
          Transaction History
        </Text>

        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#F0F0F0",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#F0F0F0",
            }}
          >
            {["Date", "Reasons", "Amount", "Status"].map((h) => (
              <Text
                key={h}
                style={{
                  flex: 1,
                  fontSize: 13,
                  fontWeight: "700",
                  color: "#303030",
                  textAlign: h === "Status" ? "right" : "left",
                }}
              >
                {h}
              </Text>
            ))}
          </View>

          {transactions.map((tx, i) => (
            <TransactionRow
              key={tx.id}
              transaction={tx}
              isLast={i === transactions.length - 1}
            />
          ))}
        </View>

        {/* Buttons flow natively after the history table to guarantee visibility */}
        <View
          style={{
            flexDirection: "row",
            gap: 14,
            marginTop:60,
          }}
        >
          <View style={{ flex: 1 }}>
            <ActionButton label="Deposit" onPress={onDeposit} />
          </View>
          <View style={{ flex: 1 }}>
            <ActionButton label="Withdraw" onPress={onWithdraw} />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
