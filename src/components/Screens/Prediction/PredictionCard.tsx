import { TranslatedText } from "@/components/ui/TranslatedText";
import { PredictionHistoryItem } from "@/data/mockPredictions";
import { SHADOWS } from "@/lib/shadows";
import { Image, View } from "react-native";

interface Props {
  prediction: PredictionHistoryItem;
}

const STATUS_CONFIG = {
  won: {
    badgeBg: "#148914",
    label: "Won",
    amountColor: "#148914",
    formatAmount: (v: number) => `+${v.toFixed(2)} HTG`,
  },
  lose: {
    badgeBg: "#cc3417",
    label: "Lose",
    amountColor: "#cc3417",
    formatAmount: (v: number) => `-${Math.abs(v).toFixed(2)} HTG`,
  },
  pending: {
    badgeBg: "#ffae00",
    label: "Latest",
    amountColor: "#f3b530",
    formatAmount: () => `0.00 HTG`,
  },
  latest: {
    badgeBg: "#ffae00",
    label: "Latest",
    amountColor: "#f3b530",
    formatAmount: () => `0.00 HTG`,
  },
} as const;

export default function PredictionCard({ prediction }: Props) {
  const { match, status, rank, actualWin, date: predictionDate } = prediction;

  const config =
    STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ??
    STATUS_CONFIG.pending;

  const displayRank = rank && rank !== "N/A" ? String(rank) : null;
  const displayDate =
    predictionDate ||
    (match.date instanceof Date
      ? match.date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : String(match.date));

  return (
    <View
      className="w-full bg-white rounded-xl overflow-visible"
      style={[
        SHADOWS.card,
        {
          shadowColor: "#656565",
          shadowOpacity: 0.18,
          shadowRadius: 45,
          shadowOffset: { width: 0, height: 0 },
          elevation: 8,
        },
      ]}
    >
      {/* Top badge — centered, hangs off top edge */}
      <View
        className="absolute self-center top-0 px-[10px] py-[4px] rounded-bl-[8px] rounded-br-[8px] z-10 items-center justify-center"
        style={{
          backgroundColor: config.badgeBg,
          left: "50%",
          transform: [{ translateX: -30 }],
        }}
      >
        <TranslatedText className="text-white text-sm font-semibold leading-[20px]">
          {config.label}
        </TranslatedText>
      </View>

      {/* Card content with top padding to clear the badge */}
      <View className="pt-4 px-4 pb-4 gap-3 items-center">
        {/* Inner content above separator */}
        <View
          className="w-full pb-3 gap-3 items-center"
          style={{ borderBottomWidth: 1, borderBottomColor: "#ededed" }}
        >
          {/* Title row */}
          <View className="flex-row justify-between items-center w-full">
            <TranslatedText className="text-md font-medium text-[#3E3E3E] font-roboto">
              {match.title}
            </TranslatedText>
            <TranslatedText className="text-md text-[#686868] font-roboto">
              {displayDate}
            </TranslatedText>
          </View>

          {/* Teams + Score */}
          <View className="flex-row items-center w-full gap-14">
            {/* Team A */}
            <View className="flex-1 flex-row items-center justify-center gap-2">
              <Image
                source={{ uri: match.teamA.logo }}
                className="w-7 h-7 rounded"
                resizeMode="contain"
              />
              <TranslatedText className="text-md font-semibold text-[#3e3e3e] font-roboto">
                {match.teamA.name}
              </TranslatedText>
            </View>

            {/* Score box */}
            <View
              className="items-center justify-center px-3 py-2 rounded-xs"
              style={{ backgroundColor: "#fdf4e0" }}
            >
              <TranslatedText
                className="text-[32px] font-semibold text-center font-roboto"
                style={{
                  color: "#ffac33",
                  lineHeight: 36,
                }}
              >
                {prediction.predictedTeamAScore}:
                {prediction.predictedTeamBScore}
              </TranslatedText>
            </View>

            {/* Team B */}
            <View className="flex-1 flex-row items-center justify-center gap-2">
              <Image
                source={{ uri: match.teamB.logo }}
                className="w-7 h-7 rounded"
                resizeMode="contain"
              />
              <TranslatedText className="text-md font-semibold text-[#3e3e3e] font-roboto">
                {match.teamB.name}
              </TranslatedText>
            </View>
          </View>

          {/* Rank row */}
          <View className="flex-row justify-between items-center w-full">
            <TranslatedText className="text-md text-[#686868] font-roboto">
              Rank
            </TranslatedText>
            {displayRank && (
              <TranslatedText className="text-base font-medium text-[#686868] font-roboto">
                {displayRank}
              </TranslatedText>
            )}
          </View>
        </View>

        {/* Amount */}
        <TranslatedText
          className="text-base font-semibold text-center font-roboto"
          style={{
            color: config.amountColor,
          }}
        >
          {config.formatAmount(actualWin)}
        </TranslatedText>
      </View>
    </View>
  );
}
