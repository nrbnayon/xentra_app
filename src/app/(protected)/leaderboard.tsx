import LeaderboardCard from "@/components/Screens/Leaderboard/LeaderboardCard";
import LeaderboardDetail from "@/components/Screens/Leaderboard/LeaderboardDetail";
import LeaderboardFilter, {
  LeaderboardTab,
} from "@/components/Screens/Leaderboard/LeaderboardFilters";
import { LeaderboardCardSkeleton } from "@/components/Skeleton/LeaderboardSkeleton";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { mockLeagues, mockMatches } from "@/data/mock";
import { LeaderboardMatch, leaderboardMatches } from "@/data/mockLeaderboard";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import { Alert, FlatList, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LeaderboardTabScreen() {
  const insets = useSafeAreaInsets();
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<LeaderboardTab>("all");
  const [refreshing, setRefreshing] = useState(false);
  const [activeDetail, setActiveDetail] = useState<LeaderboardMatch | null>(
    null,
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const selectedLeagueName = useMemo(() => {
    return (
      mockLeagues.find((l) => l.id === selectedLeagueId)?.name ||
      "Select League"
    );
  }, [selectedLeagueId]);

  const selectedMatchName = useMemo(() => {
    return (
      mockMatches.find((m) => m.id === selectedMatchId)?.title || "Select Match"
    );
  }, [selectedMatchId]);

  // Options for picking
  const handleSelectLeague = () => {
    Alert.alert("Select League", "Choose a league to filter by", [
      {
        text: "All Leagues",
        onPress: () => {
          setSelectedLeagueId(null);
          setSelectedMatchId(null);
        },
      },
      ...mockLeagues.map((l) => ({
        text: l.name,
        onPress: () => {
          setSelectedLeagueId(l.id);
          setSelectedMatchId(null);
        },
      })),
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleSelectMatch = () => {
    // Filter matches by selected league if any
    const availableMatches = selectedLeagueId
      ? mockMatches.filter((m) => m.leagueId === selectedLeagueId)
      : mockMatches;

    Alert.alert("Select Match", "Choose a match to filter by", [
      { text: "All Matches", onPress: () => setSelectedMatchId(null) },
      ...availableMatches.map((m) => ({
        text: m.title,
        onPress: () => setSelectedMatchId(m.id),
      })),
      { text: "Cancel", style: "cancel" },
    ]);
  };

  // Filter based on selected tab, league, and match
  const filtered = leaderboardMatches.filter((m) => {
    const tabMatch = selectedTab === "all" || m.status === selectedTab;
    const leagueMatch = !selectedLeagueId || m.leagueId === selectedLeagueId;
    const specificMatch = !selectedMatchId || m.matchId === selectedMatchId;
    return tabMatch && leagueMatch && specificMatch;
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
                selectedLeague={selectedLeagueName}
                selectedMatch={selectedMatchName}
                selectedTab={selectedTab}
                onSelectLeague={handleSelectLeague}
                onSelectMatch={handleSelectMatch}
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
