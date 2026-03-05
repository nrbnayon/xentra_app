import { TranslatedText } from "@/components/ui/TranslatedText";
import { LeaderboardEntry, LeaderboardMatch } from "@/data/mockLeaderboard";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft } from "lucide-react-native";
import { FlatList, ImageBackground, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  match: LeaderboardMatch;
  onBack: () => void;
}

const RANK_COLORS: Record<number, string> = {
  1: "#FDE68A", // gold
  2: "#D1FAE5", // silver/green
  3: "#BAE6FD", // bronze/blue
};

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  const rowBg = RANK_COLORS[entry.rank] ?? "transparent";
  const isTopRank = entry.rank <= 3;

  return (
    <View
      className="flex-row items-center px-4 py-3.5"
      style={{ backgroundColor: rowBg }}
    >
      {/* Rank */}
      <Text
        className="font-bold text-sm w-10"
        style={{ color: isTopRank ? "#303030" : "#686868" }}
      >
        #{entry.rank}
      </Text>

      {/* Player Name */}
      <Text
        className="flex-1 text-sm font-medium"
        style={{ color: isTopRank ? "#303030" : "#686868" }}
      >
        {entry.playerName}
      </Text>

      {/* Result */}
      {entry.result && (
        <Text className="font-bold text-sm" style={{ color: "#FFAC33" }}>
          {entry.result}
        </Text>
      )}
    </View>
  );
}

export default function LeaderboardDetail({ match, onBack }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center px-4 pb-3 pt-2">
        <Pressable
          onPress={onBack}
          className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mr-3"
        >
          <ChevronLeft size={20} color="#303030" />
        </Pressable>
        <TranslatedText className="text-[#303030] text-xl font-bold">
          Leaderboard
        </TranslatedText>
      </View>

      {/* Hero Banner */}
      <View className="mx-4 rounded-2xl overflow-hidden mb-4">
        <ImageBackground
          source={
            typeof match.backgroundImage === "string"
              ? { uri: match.backgroundImage }
              : match.backgroundImage
          }
          style={{ width: "100%" }}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.45)", "rgba(0,0,0,0.7)"]}
            className="px-5 py-5"
          >
            {/* Team vs Team pill */}
            <View className="items-center mb-3">
              <View
                className="flex-row items-center px-4 py-1.5 rounded-full"
                style={{ backgroundColor: "#FFAC33" }}
              >
                <Text className="text-white font-bold text-sm">
                  {match.teamA.name}
                </Text>
                <Text className="text-white font-bold text-sm mx-2"> V/S </Text>
                <Text className="text-white font-bold text-sm">
                  {match.teamB.name}
                </Text>
              </View>
            </View>

            {/* Position */}
            <View className="items-center">
              <Text className="text-white font-extrabold text-xl">
                Your Position #{match.userPosition} of {match.totalParticipants}
              </Text>
              <Text className="text-white/80 text-sm mt-0.5">
                Total Participants: {match.totalParticipants}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      {/* Rankings List */}
      <FlatList
        data={match.entries}
        keyExtractor={(item) => String(item.rank)}
        renderItem={({ item }) => <LeaderboardRow entry={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        ItemSeparatorComponent={() => (
          <View className="h-[1px] bg-gray-50 mx-4" />
        )}
      />
    </View>
  );
}
