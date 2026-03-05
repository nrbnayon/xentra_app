import { TranslatedText } from "@/components/ui/TranslatedText";
import { PredictionHistoryItem } from "@/data/mockPredictions";
import { SHADOWS } from "@/lib/shadows";
import { Image, Text, View } from "react-native";

interface Props {
  prediction: PredictionHistoryItem;
}

export default function PredictionCard({ prediction }: Props) {
  const { match, status, rank, actualWin } = prediction;

  // Determine styles and labels based on prediction status
  const badgeConfig = {
    won: { bg: "bg-[#22C55E]", text: "text-white", label: "Won" },
    lose: { bg: "bg-[#EF4444]", text: "text-white", label: "Lose" },
    pending: { bg: "bg-yellow-500", text: "text-white", label: "Latest" },
    latest: { bg: "bg-yellow-500", text: "text-white", label: "Latest" },
  } as const;

  const footerConfig = {
    won: { text: "text-green-600", val: `+${actualWin.toFixed(2)} HTG` },
    lose: { text: "text-red-500", val: `${actualWin.toFixed(2)} HTG` },
    pending: {
      text: "text-yellow-600",
      val: `${parseFloat("0").toFixed(2)} HTG`,
    },
    latest: {
      text: "text-yellow-600",
      val: `${parseFloat("0").toFixed(2)} HTG`,
    },
  } as const;

  const badge =
    badgeConfig[status as keyof typeof badgeConfig] || badgeConfig.pending;
  const footer =
    footerConfig[status as keyof typeof footerConfig] || footerConfig.pending;

  return (
    <View
      className="w-full bg-white rounded-2xl mb-4 pt-4 pb-1"
      style={SHADOWS.card}
    >
      {/* Top row: Title, Badge, Date */}
      <View className="flex-row justify-between items-center px-4 mb-3">
        <TranslatedText className="text-secondary text-sm font-semibold flex-1">
          {match.title}
        </TranslatedText>

        <View className="flex-row items-center gap-2">
          <View className={`px-2 py-0.5 rounded ${badge.bg}`}>
            <Text className={`text-xs font-bold ${badge.text}`}>
              {badge.label}
            </Text>
          </View>
          <Text className="text-secondary/60 text-xs text-right min-w-[100]">
            Date: 15 Jan, 2026
          </Text>
        </View>
      </View>

      {/* Middle row: Team A, Score box, Team B */}
      <View className="flex-row justify-between items-center px-4 mb-4">
        {/* Team A */}
        <View className="flex-row items-center gap-2 flex-1">
          <Image
            source={{ uri: match.teamA.logo }}
            className="w-8 h-8 rounded border border-gray-100"
            resizeMode="contain"
          />
          <Text className="text-secondary font-semibold text-sm">
            {match.teamA.name}
          </Text>
        </View>

        {/* Score Box */}
        <View className="bg-orange-50 px-4 py-2 rounded shadow-sm">
          <Text className="text-orange-300 font-bold text-xl tracking-widest">
            {prediction.predictedTeamAScore}:{prediction.predictedTeamBScore}
          </Text>
        </View>

        {/* Team B */}
        <View className="flex-row items-center justify-end gap-2 flex-1">
          <Image
            source={{ uri: match.teamB.logo }}
            className="w-8 h-8 rounded border border-gray-100"
            resizeMode="contain"
          />
          <Text className="text-secondary font-semibold text-sm">
            {match.teamB.name}
          </Text>
        </View>
      </View>

      {/* Rank Row */}
      <View className="flex-row justify-between items-center px-6 mb-3">
        <Text className="text-secondary/60 text-xs">Rank</Text>
        <Text className="text-secondary font-medium text-xs">
          {rank === "N/A" || !rank ? "" : rank}
        </Text>
      </View>

      {/* Separator line */}
      <View className="h-[1px] bg-gray-50 w-full mb-3" />

      {/* Bottom Result text */}
      <View className="items-center pb-3">
        <Text className={`text-sm font-bold ${footer.text}`}>{footer.val}</Text>
      </View>
    </View>
  );
}
