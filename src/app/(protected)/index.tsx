import { TranslatedText } from "@/components/ui/TranslatedText";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeHeader from "@/components/Screens/Home/HomeHeader";
import MatchCard from "@/components/Screens/Home/MatchCard";
import MatchTabs from "@/components/Screens/Home/MatchTabs";
import SportFilters from "@/components/Screens/Home/SportFilters";
import { MatchSkeleton } from "@/components/Skeleton/MatchSkeleton";
import { mockMatches, mockSports } from "@/data/mock";

export default function ProtectedIndex() {
  const insets = useSafeAreaInsets();
  const [selectedSport, setSelectedSport] = useState(mockSports[0].id);
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "latest" | "upcoming" | "complete"
  >("all");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedLeagueName, setSelectedLeagueName] = useState("Select League");
  const [refreshing, setRefreshing] = useState(false);

  // Filtering matches based on all select filters
  const filteredMatches = mockMatches.filter((match) => {
    // Filter by status (ignore if 'all' is selected)
    if (
      selectedStatus !== "all" &&
      match.status !==
        ((selectedStatus === "complete" ? "completed" : selectedStatus) as any)
    )
      return false;

    // Filter by sport
    if (selectedSport !== "all" && match.sportId !== selectedSport)
      return false;

    // Filter by league
    if (
      selectedLeagueName !== "Select League" &&
      selectedLeagueName !== "All Leagues" &&
      match.title !== selectedLeagueName
    ) {
      return false;
    }

    // Filter by date (Compare only Year, Month, Day)
    if (selectedDate) {
      const matchDate = match.date;
      if (
        matchDate.getFullYear() !== selectedDate.getFullYear() ||
        matchDate.getMonth() !== selectedDate.getMonth() ||
        matchDate.getDate() !== selectedDate.getDate()
      ) {
        return false;
      }
    }

    return true;
  });

  const handlePredict = (matchId: string) => {
    // Navigate to match details screen matching Image 2
    router.push(`/(protected)/match-details/${matchId}` as any);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <LinearGradient
      colors={["#FFF0CE", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.1559, 0.9525]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.45, y: 1 }}
      className="flex-1"
    >
      {/* Light status bar for contrasting correctly */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View
        className="flex-1"
        style={{
          paddingTop: insets.top + 10,
          // Bottom padding logic to leave room for floating tab bar
          paddingBottom: 110,
        }}
      >
        <FlatList
          data={refreshing ? ([1, 2, 3] as any) : filteredMatches}
          keyExtractor={(item, index) =>
            refreshing ? `skeleton-${index}` : item.id
          }
          className="px-6 flex-1"
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListHeaderComponent={
            <View>
              <HomeHeader />
              <SportFilters
                sports={mockSports}
                selectedSportId={selectedSport}
                onSelectSport={setSelectedSport}
                date={selectedDate}
                onSelectDate={setSelectedDate}
                selectedLeagueName={selectedLeagueName}
                onSelectLeague={setSelectedLeagueName}
              />
              <MatchTabs
                selectedStatus={selectedStatus}
                onSelectStatus={setSelectedStatus}
              />
            </View>
          }
          renderItem={({ item }) =>
            refreshing ? (
              <MatchSkeleton />
            ) : (
              <MatchCard match={item} onPredict={handlePredict} />
            )
          }
          ListEmptyComponent={
            !refreshing ? (
              <View className="py-20 items-center justify-center">
                <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
                  <TranslatedText className="text-4xl">🔍</TranslatedText>
                </View>
                <TranslatedText className="text-secondary text-lg font-bold mb-1">
                  No data available
                </TranslatedText>
                <TranslatedText className="text-secondary/60 text-center px-10">
                  We couldn't find any matches matching your current filters.
                </TranslatedText>
              </View>
            ) : null
          }
        />
      </View>
    </LinearGradient>
  );
}
