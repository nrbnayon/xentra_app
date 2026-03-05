import PredictionCard from "@/components/Screens/Prediction/PredictionCard";
import PredictionTabs from "@/components/Screens/Prediction/PredictionTabs";
import { PredictionSkeleton } from "@/components/Skeleton/PredictionSkeleton";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { mockPredictions } from "@/data/mockPredictions";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PredictionTab() {
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "latest" | "won" | "lose"
  >("all");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const filteredPredictions = mockPredictions.filter((p) => {
    if (selectedStatus === "all") return true;
    if (selectedStatus === "latest") return p.status === "pending";
    return p.status === selectedStatus;
  });

  return (
    <LinearGradient
      colors={["#FFF0CE", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.1559, 0.9525]}
      start={{ x: 0.48, y: 0 }}
      end={{ x: 0.52, y: 1 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 px-6 pt-4 pb-[110px]" edges={["top"]}>
        {/* Header Title & Balance */}
        <View className="flex-row justify-between items-center mb-6 pt-2">
          <TranslatedText className="text-[#303030] text-2xl font-bold">
            All Predictions
          </TranslatedText>

          {/* Balance Pill matched to HomeHeader */}
          <LinearGradient
            colors={["rgba(255,240,208,1)", "rgba(255,204,93,1)"]}
            locations={[0, 0.61]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ borderRadius: 999, overflow: "hidden" }}
            className="flex-row items-center gap-1.5 px-3 py-1.5 shadow-sm"
          >
            <Image
              className="w-4 h-4"
              alt="Coin"
              source={require("../../../assets/images/coin.png")}
            />
            <Text className="font-bold text-[#553F11] text-xs text-center tracking-tight">
              10,000 HTG
            </Text>
          </LinearGradient>
        </View>

        {/* Filters Tabs */}
        <PredictionTabs
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
        />

        {/* Prediction Listing */}
        <FlatList
          data={refreshing ? ([1, 2, 3] as any) : filteredPredictions}
          keyExtractor={(item, index) =>
            refreshing ? `skeleton-${index}` : item.id
          }
          className="overflow-visible"
          showsVerticalScrollIndicator={false}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({ item }) =>
            refreshing ? (
              <PredictionSkeleton />
            ) : (
              <PredictionCard prediction={item} />
            )
          }
          ItemSeparatorComponent={() => <View className="h-4" />}
          contentContainerStyle={{
            paddingBottom: 40,
            paddingHorizontal: 4, // Horizontal room for shadows
            paddingTop: 10,
          }}
          ListEmptyComponent={
            !refreshing ? (
              <View className="flex-1 justify-center items-center py-20">
                <TranslatedText className="text-secondary/60 text-base">
                  No predictions found.
                </TranslatedText>
              </View>
            ) : null
          }
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
