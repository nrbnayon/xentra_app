import LeaderboardCard from "@/components/Screens/Leaderboard/LeaderboardCard";
import LeaderboardDetail from "@/components/Screens/Leaderboard/LeaderboardDetail";
import LeaderboardFilter, {
  LeaderboardTab,
} from "@/components/Screens/Leaderboard/LeaderboardFilters";
import { LeaderboardCardSkeleton } from "@/components/Skeleton/LeaderboardSkeleton";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { LeaderboardMatch, leaderboardMatches } from "@/data/mockLeaderboard";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { FlatList, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LeaderboardTabScreen() {
  const insets = useSafeAreaInsets();
  const [selectedLeague, setSelectedLeague] = useState("Select League");
  const [selectedMatch, setSelectedMatch] = useState("Select Match");
  const [selectedTab, setSelectedTab] = useState<LeaderboardTab>("all");
  const [refreshing, setRefreshing] = useState(false);
  const [activeDetail, setActiveDetail] = useState<LeaderboardMatch | null>(
    null,
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Filter based on selected tab
  const filtered = leaderboardMatches.filter((m) => {
    if (selectedTab === "all") return true;
    return m.status === selectedTab;
  });

  // If viewing a specific match leaderboard
  if (activeDetail) {
    return (
      <LeaderboardDetail
        match={activeDetail}
        onBack={() => setActiveDetail(null)}
      />
    );
  }

  return (
    <LinearGradient
      colors={["#FFF0CE", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.1559, 0.9525]}
      start={{ x: 0.48, y: 0 }}
      end={{ x: 0.52, y: 1 }}
      className="flex-1"
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View className="flex-1" style={{ paddingTop: insets.top + 10 }}>
        <FlatList
          data={refreshing ? ([1, 2, 3] as any) : filtered}
          keyExtractor={(item, idx) => (refreshing ? `skel-${idx}` : item.id)}
          showsVerticalScrollIndicator={false}
          className="overflow-visible"
          onRefresh={onRefresh}
          refreshing={refreshing}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 120,
            paddingTop: 8,
          }}
          ListHeaderComponent={
            <View className="mb-6">
              {/* Title */}
              <TranslatedText className="text-[#303030] text-3xl font-bold mb-6 font-roboto">
                Leaderboard
              </TranslatedText>

              {/* Filters: dropdowns + tabs */}
              <LeaderboardFilter
                selectedLeague={selectedLeague}
                selectedMatch={selectedMatch}
                selectedTab={selectedTab}
                onSelectLeague={() => {}}
                onSelectMatch={() => {}}
                onSelectTab={setSelectedTab}
              />
            </View>
          }
          renderItem={({ item }) =>
            refreshing ? (
              <LeaderboardCardSkeleton />
            ) : (
              <LeaderboardCard
                match={item}
                onViewLeaderboard={setActiveDetail}
              />
            )
          }
          ListEmptyComponent={
            !refreshing ? (
              <View className="items-center py-20">
                <TranslatedText className="text-[#686868] text-base font-roboto">
                  No leaderboards found.
                </TranslatedText>
              </View>
            ) : null
          }
        />
      </View>
    </LinearGradient>
  );
}
