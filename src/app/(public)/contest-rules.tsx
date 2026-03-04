import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ContestRules() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#BEE3FF", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.238, 0.9525]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.45, y: 1 }}
      className="flex-1"
    >
      <StatusBar style="auto" />
      <View style={{ paddingTop: insets.top + 12 }} className="flex-1">
        {/* Header */}
        <View className="px-5 pb-4 flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            className="w-9 h-9 items-center justify-center bg-white/80 rounded-full shadow-sm border border-gray-100"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeft size={22} color="#1E3A8A" />
          </Pressable>
          <Text className="text-2xl font-bold text-primary ml-4">
            Contest Rules
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-5"
          contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-4">
            <Section
              number="1"
              title="Qualification"
              items={["Players must be 18 years or older to participate."]}
            />

            <Section
              number="2"
              title="How to Participate"
              content="Each contest requires players to:"
              items={[
                "Choose the team they think will win (Team A / Team B / Draw).",
                "Predict the exact final score of the match",
              ]}
            />

            <Section
              number="3"
              title="Ranking System"
              content="Rankings are determined as follows:"
              items={["Exact score + correct winning team = highest score."]}
              footer={`If no player predicts the exact score, rankings are based on the closest difference, using this formula:
• (|Predicted Team A score – Actual Team A score| + |Predicted Team B score – Actual Team B score|)
• The smallest total difference gives the best rank.`}
            />

            <Section
              number="4"
              title="Payment Structure"
              items={[
                "Only the Top 5 players for each match receive payment.",
                "The distribution of payments is based on the position in the ranking.",
              ]}
            />

            <Section
              number="5"
              title="Prize Fund"
              items={[
                "The total prize fund is calculated after deducting platform service fees.",
                "The remaining amount is distributed to the qualifying winners.",
              ]}
            />

            <Section
              number="6"
              title="Jackpot Rules"
              content="If no player predicts the exact score:"
              items={[
                "The prize fund may be transferred to the next qualifying match as a jackpot.",
              ]}
            />

            <Section
              number="7"
              title="Match Results"
              items={[
                "The administrator enters official results after the match ends.",
                "Rankings are automatically calculated based on the final results.",
              ]}
            />

            <Section
              number="8"
              title="Wallet Updates"
              items={[
                "Wallet balances are automatically updated once results are confirmed.",
              ]}
            />

            <Section
              number="9"
              title="Fraud & Abuse"
              content="XENTRA reserves the right to suspend or close accounts involved in:"
              items={[
                "Fraud",
                "Collusion",
                "System abuse",
                "Manipulation of contests",
              ]}
            />

            <Section
              number="10"
              title="Kind of Contests"
              items={[
                "All contests on XENTRA are skill-based prediction games and are not sports betting.",
                "By participating, you agree to these Contest Rules.",
              ]}
            />
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

function Section({
  number,
  title,
  content,
  items,
  footer,
}: {
  number: string;
  title: string;
  content?: string;
  items?: string[];
  footer?: string;
}) {
  return (
    <View className="mb-8">
      <Text className="text-base font-bold text-foreground mb-3">
        {number}. {title}
      </Text>
      {content ? (
        <Text className="text-base text-secondary leading-6 mb-2">
          {content}
        </Text>
      ) : null}
      {items &&
        items.map((item, idx) => (
          <View key={idx} className="flex-row items-start mb-2 ml-4">
            <Text className="text-base text-secondary leading-6 mr-2">•</Text>
            <Text className="text-base text-secondary leading-6 flex-1">
              {item}
            </Text>
          </View>
        ))}
      {footer ? (
        <Text className="text-base text-secondary leading-6 mt-2 ml-4">
          {footer}
        </Text>
      ) : null}
    </View>
  );
}
