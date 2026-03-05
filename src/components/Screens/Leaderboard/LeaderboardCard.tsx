import { TranslatedText } from "@/components/ui/TranslatedText";
import { LeaderboardMatch } from "@/data/mockLeaderboard";
import { Image, Pressable, Text, View } from "react-native";

// Re-export so consumers can import the type from here too
export type { LeaderboardMatch };

interface Props {
  match: LeaderboardMatch;
  onViewLeaderboard?: (match: LeaderboardMatch) => void;
}

const STATUS_CONFIG = {
  upcoming: {
    label: "Upcoming",
    dotColor: "#FCC219",
    bg: "rgba(252,194,25,0.25)",
  },
  latest: {
    label: "Latest",
    dotColor: "#EF4444",
    bg: "rgba(239,68,68,0.15)",
  },
  completed: {
    label: "Completed",
    dotColor: "#43A047",
    bg: "rgba(67,160,71,0.18)",
  },
} as const;

export default function LeaderboardCard({ match, onViewLeaderboard }: Props) {
  const cfg = STATUS_CONFIG[match.status];

  return (
    <View
      className="w-full bg-white rounded-xl p-4 mb-6"
      style={{
        shadowColor: "#656565",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.18,
        shadowRadius: 45,
        elevation: 8,
      }}
    >
      {/* Status badge — right-aligned */}
      <View className="w-full items-end mb-2">
        <View
          className="flex-row items-center gap-1.5 px-3 py-1 rounded-full"
          style={{ backgroundColor: cfg.bg }}
        >
          <View
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: cfg.dotColor }}
          />
          <TranslatedText
            className="text-md font-medium"
            style={{ color: "#535353" }}
          >
            {cfg.label}
          </TranslatedText>
        </View>
      </View>

      {/* Title + Date */}
      <View className="flex-row justify-between items-center mb-4">
        <TranslatedText className="text-[#3e3e3e] font-semibold text-base flex-1 mr-2">
          {match.title}
        </TranslatedText>
        <Text className="text-[#686868] text-xs">{match.dateTime}</Text>
      </View>

      {/* Teams + Score */}
      <View className="flex-row items-center mb-4">
        {/* Team A */}
        <View className="flex-1 flex-row items-center gap-2">
          <Image
            source={{ uri: match.teamA.logo }}
            style={{ width: 28, height: 28 }}
            resizeMode="contain"
          />
          <Text className="text-[#3e3e3e] font-semibold text-md">
            {match.teamA.name}
          </Text>
        </View>

        {/* Score */}
        <View
          className="items-center justify-center px-4 py-1.5 rounded"
          style={{ backgroundColor: "#FDF4E0" }}
        >
          <Text
            className="font-bold text-xl tracking-widest"
            style={{ color: "#FFAC33" }}
          >
            {match.scoreA} : {match.scoreB}
          </Text>
        </View>

        {/* Team B */}
        <View className="flex-1 flex-row items-center justify-end gap-2">
          <Image
            source={{ uri: match.teamB.logo }}
            style={{ width: 28, height: 28 }}
            resizeMode="contain"
          />
          <Text className="text-[#3e3e3e] font-semibold text-md">
            {match.teamB.name}
          </Text>
        </View>
      </View>

      {/* Prize Pool */}
      <View className="flex-row justify-between items-center mb-2">
        <TranslatedText className="text-[#686868] text-md">
          Prize Pool:
        </TranslatedText>
        <Text className="text-[#303030] font-semibold text-md">
          {match.prizePool} HTG
        </Text>
      </View>

      {/* Participants */}
      <View className="flex-row justify-between items-center mb-5">
        <TranslatedText className="text-[#686868] text-md">
          Participants:
        </TranslatedText>
        <Text className="text-[#303030] font-semibold text-md">
          {match.participants}
        </Text>
      </View>

      {/* CTA Button */}
      <Pressable
        onPress={() => onViewLeaderboard?.(match)}
        className="w-full py-3.5 rounded-lg items-center justify-center bg-[#1C3F6E]"
        style={{ backgroundColor: "#1C3F6E" }}
      >
        <TranslatedText className="text-white font-bold text-base">
          View Leaderboard
        </TranslatedText>
      </Pressable>
    </View>
  );
}
