import { TranslatedText } from "@/components/ui/TranslatedText";
import { MatchCompetition } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, Pressable, Text, View } from "react-native";

interface Props {
  match: MatchCompetition;
  onPredict: (matchId: string) => void;
}

export default function MatchCard({ match, onPredict }: Props) {
  return (
    <View className="w-full bg-white rounded-t-xl rounded-bl-xl overflow-hidden mb-6 shadow-none">
      <ImageBackground
        source={
          typeof match.backgroundImage === "string"
            ? { uri: match.backgroundImage }
            : match.backgroundImage
        }
        className="w-full overflow-hidden"
        resizeMode="cover"
      >
        {/* Dark Overlay Gradient to improve text visibility */}
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
          className="w-full px-5 pt-6 pb-0"
        >
          {/* Top Titles */}
          <View className="items-center mb-6">
            <TranslatedText className="text-white text-2xl font-bold tracking-wide">
              {match.title}
            </TranslatedText>
            <Text className="text-white text-lg font-medium tracking-wider mt-1">
              {match.teamA.name} VS {match.teamB.name}
            </Text>
          </View>

          {/* Middle Stats */}
          <View className="flex-row justify-center gap-10 mb-8 items-center">
            <View className="items-center">
              <TranslatedText className="text-white/90 text-sm font-semibold mb-1">
                Entry Fee
              </TranslatedText>
              <Text className="text-white text-3xl font-extrabold">
                {match.entryFee} HTG
              </Text>
            </View>
            <View className="items-center">
              <TranslatedText className="text-white/90 text-sm font-semibold mb-1">
                Prize Pool
              </TranslatedText>
              <Text className="text-white text-3xl font-extrabold">
                {match.prizePool} HTG
              </Text>
            </View>
          </View>

          {/* Bottom Footer Row */}
          <View className="flex-row justify-between items-end">
            <Text className="text-white/80 text-xs font-medium pb-5">
              {match.dateTime}
            </Text>

            {/* The distinctive 'Predict Now' Button Layout */}
            <View className="bg-white rounded-tl-2xl pl-3 pt-3 pb-0 pr-0 -mr-5 border-0">
              <Pressable
                onPress={() => onPredict(match.id)}
                className={`px-6 py-3.5 rounded-md ${
                  match.status === "upcoming" ? "bg-gray-300" : "bg-primary"
                }`}
                disabled={match.status === "upcoming"}
              >
                <TranslatedText
                  className={`font-semibold ${
                    match.status === "upcoming"
                      ? "text-secondary"
                      : "text-white"
                  }`}
                >
                  Predict Now
                </TranslatedText>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
