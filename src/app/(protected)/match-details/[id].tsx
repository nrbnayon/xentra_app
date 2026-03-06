import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { mockMatches } from "@/data/mock";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MatchDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const match = mockMatches.find((m) => m.id === id) || mockMatches[0];

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [teamAScore, setTeamAScore] = useState("");
  const [teamBScore, setTeamBScore] = useState("");

  const currentBalance = 200; // Mock current user balance
  const entryFee = match.entryFee;
  const remainingBalance = currentBalance - entryFee;

  const handlePredict = () => {
    if (!selectedTeam || !teamAScore || !teamBScore) return;

    if (currentBalance < entryFee) {
      router.replace("/(protected)/prediction-failed" as any);
      return;
    }

    // Navigate to success
    router.replace("/(protected)/prediction-success" as any);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#BEE3FF", "#FFFFFF", "#FFFFFF"]}
        locations={[0, 0.238, 0.9525]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.45, y: 1 }}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingTop: insets.top + 20,
            paddingHorizontal: 24,
            paddingBottom: insets.bottom + 20,
          }}
        >
          <BackButton
            onPress={() => router.back()}
            style={{ marginBottom: 24 }}
          />

          <Text className="text-2xl font-bold text-[#1F2937] mb-6">
            Select Your Team
          </Text>

          {/* Teams Selection / Display */}
          <View className="flex-row gap-4 mb-8">
            <Pressable
              onPress={() => setSelectedTeam(match.teamA.id)}
              className={`flex-1 bg-white border rounded-lg items-center p-6 shadow-sm ${
                selectedTeam === match.teamA.id
                  ? "border-primary"
                  : "border-[#DBDBDB]"
              }`}
            >
              <View className="w-16 h-12 mb-3 shadow-sm border border-gray-100 bg-white items-center justify-center rounded">
                <Image
                  source={{ uri: match.teamA.logo }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-[#374151] font-semibold text-lg">
                {match.teamA.name}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSelectedTeam(match.teamB.id)}
              className={`flex-1 bg-white border rounded-lg items-center p-6 shadow-sm ${
                selectedTeam === match.teamB.id
                  ? "border-primary"
                  : "border-[#DBDBDB]"
              }`}
            >
              <View className="w-16 h-12 mb-3 shadow-sm border border-gray-100 bg-white items-center justify-center rounded">
                <Image
                  source={{ uri: match.teamB.logo }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-[#374151] font-semibold text-lg">
                {match.teamB.name}
              </Text>
            </Pressable>
          </View>

          {/* Scores Inputs */}
          <View className="flex-row gap-4 mb-10">
            <View className="flex-1">
              <Text className="text-foreground mb-2">
                {match.teamA.name} Score
              </Text>
              <TextInput
                value={teamAScore}
                onChangeText={setTeamAScore}
                keyboardType="numeric"
                className="w-full bg-white border border-border rounded-lg px-4 py-3.5 text-[#111111] font-medium focus:border-primary/80"
              />
            </View>
            <View className="flex-1">
              <Text className="text-foreground mb-2">
                {match.teamB.name} Score
              </Text>
              <TextInput
                value={teamBScore}
                onChangeText={setTeamBScore}
                keyboardType="numeric"
                className="w-full bg-white border border-border rounded-lg px-4 py-3.5 text-[#111111] font-medium focus:border-primary/80"
              />
            </View>
          </View>

          {/* Balance summary */}
          <View className="mb-10">
            <View className="flex-row justify-between mb-4">
              <Text className="text-foreground">Current balance:</Text>
              <Text className="text-[#303030] font-bold">
                {currentBalance} HTG
              </Text>
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-foreground">Entry Fee:</Text>
              <Text className="text-[#303030] font-bold">{entryFee} HTG</Text>
            </View>

            {/* Separator */}
            <View className="h-[1px] bg-[#E5E7EB] w-full my-4" />

            <View className="flex-row justify-between">
              <Text className="text-foreground">Remaining Balance:</Text>
              <Text className="text-[#303030] font-bold">
                {remainingBalance} HTG
              </Text>
            </View>
          </View>

          {/* Submit Button */}
          <Button
            onPress={handlePredict}
            disabled={!selectedTeam || !teamAScore || !teamBScore}
            className={`w-full py-4 mt-auto rounded-xl ${
              !selectedTeam || !teamAScore || !teamBScore
                ? "bg-gray-300"
                : "bg-primary"
            }`}
          >
            Predict Now
          </Button>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
