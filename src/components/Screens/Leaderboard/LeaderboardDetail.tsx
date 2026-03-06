// src\components\Screens\Leaderboard\LeaderboardDetail.tsx
import { BackButton } from "@/components/ui/BackButton";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { LeaderboardEntry, LeaderboardMatch } from "@/data/mockLeaderboard";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, Image, ImageBackground, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  match: LeaderboardMatch;
  onBack: () => void;
}

// Exact row background colors from Figma
const ROW_BG: Record<number, string> = {
  1: "#ffddb1",
  2: "#d5ffb1",
  3: "#b1e5ff",
};

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  const bg = ROW_BG[entry.rank] ?? "transparent";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: bg,
      }}
    >
      {/* Rank */}
      <Text className="font-roboto font-normal text-lg text-[#242424] w-10">
        #{entry.rank}
      </Text>

      {/* Player name */}
      <Text className="font-roboto font-normal text-lg text-[#242424] text-center flex-1">
        {entry.playerName}
      </Text>

      {/* Result */}
      <View style={{ width: 40, alignItems: "flex-end" }}>
        {entry.result ? (
          <TranslatedText className="font-roboto font-bold text-lg text-[#ff8001]">
            {entry.result}
          </TranslatedText>
        ) : null}
      </View>
    </View>
  );
}

export default function LeaderboardDetail({ match, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const BANNER_HEIGHT = 195;

  return (
    <LinearGradient
      colors={["#FFF0CE", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.1559, 0.9525]}
      start={{ x: 0.48, y: 0 }}
      end={{ x: 0.52, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, paddingTop: insets.top }}>
        {/* ── Header ── */}
        <View className="flex-row items-center gap-4 px-5 pt-2 pb-4">
          <BackButton onPress={onBack} />

          <TranslatedText className="text-[#303030] font-semibold text-xl">
            Leaderboard
          </TranslatedText>
        </View>

        {/* ── Hero Banner ── */}
        <View
          className="w-[90%] bg-white h-40 rounded-2xl mx-auto mb-8"
          style={{
            height: BANNER_HEIGHT,
            overflow: "hidden",
          }}
        >
          <LinearGradient
            colors={["rgba(119,119,119,0.2)", "rgba(0,0,0,0)"]}
            locations={[0.004, 0.2054]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />

          <ImageBackground
            source={
              typeof match.backgroundImage === "string"
                ? { uri: match.backgroundImage }
                : match.backgroundImage
            }
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          >
            {/* ── Bottom curve: white rounded bar to fake the curve cutout ── */}
            <View className="absolute -bottom-[120px] left-0 right-0 h-40 bg-white border-none rounded-full" />

            {/* ── Orange stripes — LEFT ── */}
            <View
              style={{
                position: "absolute",
                left: 10,
                top: 88,
              }}
            >
              <View
                className="bg-[#FFA238] rounded-full mb-1"
                style={{
                  height: 6,
                  width: 70,
                }}
              />
              <View
                className="bg-[#FFA238] rounded-full"
                style={{
                  height: 6,
                  width: 70,
                  marginLeft: 7,
                }}
              />
            </View>

            {/* ── Orange stripes — RIGHT ── */}
            <View
              style={{
                position: "absolute",
                right: 10,
                top: 88,
                alignItems: "flex-end",
              }}
            >
              <View
                className="bg-[#FFA238] rounded-full mb-1"
                style={{
                  height: 6,
                  width: 70,
                }}
              />
              <View
                className="bg-[#FFA238] rounded-full"
                style={{
                  height: 6,
                  width: 70,
                  marginRight: 7,
                }}
              />
            </View>

            <View
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                right: 0,
                alignItems: "center",
              }}
            >
              <BlurView
                intensity={90}
                tint="dark"
                style={{
                  width: 250,
                  height: 120,
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <LinearGradient
                  colors={["rgba(36,36,36,0.5)", "rgba(255,145,0,0.5)"]}
                  locations={[0.3787, 1]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={{
                    flex: 1,
                    padding: 16,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Teams Pill */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      backgroundColor: "#f4900c",
                      borderRadius: 30,
                      paddingHorizontal: 16,
                      paddingVertical: 5,
                    }}
                  >
                    <TranslatedText className="text-[#f3f3f3] font-bold text-2xl font-roboto text-shadow-xl">
                      {match.teamA.name}
                    </TranslatedText>

                    <Text
                      style={{
                        fontFamily: "Roboto_600SemiBold",
                        fontSize: 14,
                        color: "#f3f3f3",
                      }}
                    >
                      V/S
                    </Text>

                    <TranslatedText className="text-[#f3f3f3] font-bold text-2xl font-roboto text-shadow-xl">
                      {match.teamB.name}
                    </TranslatedText>
                  </View>

                  {/* Position */}
                  <Text
                    style={{
                      marginTop: 6,
                      color: "#ffffff",
                      textAlign: "center",
                    }}
                  >
                    <TranslatedText className="text-[#f3f3f3] font-bold text-xl font-roboto">
                      Your Position{" "}
                    </TranslatedText>
                    <TranslatedText className="text-[#f3f3f3] font-bold text-xl font-roboto">
                      #{match.userPosition} of {match.totalParticipants}
                    </TranslatedText>
                  </Text>

                  {/* Participants */}
                  <TranslatedText className="text-[#f3f3f3] font-medium text-xl font-roboto">
                    Total Participants: {match.totalParticipants}
                  </TranslatedText>
                </LinearGradient>
              </BlurView>
            </View>
          </ImageBackground>
        </View>

        {/* ===== BACKGROUND WAVE IMAGE (CORRECT WAY) ===== */}
        <Image
          source={require("../../../../assets/icons/leaderboard_bg.png")}
          style={{
            position: "absolute",
            width: "100%",
            height: "80%",
            opacity: 1,
            // top: 250,
            left: 0,
            right: 0,
            bottom: -50,
          }}
          resizeMode="cover"
        />

        {/* ── Rankings FlatList ── */}
        <FlatList
          data={match.entries}
          keyExtractor={(item) => String(item.rank)}
          renderItem={({ item }) => <LeaderboardRow entry={item} />}
          showsVerticalScrollIndicator={false}
          style={{ zIndex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 120,
            gap: 12,
          }}
        />
      </View>
    </LinearGradient>
  );
}
