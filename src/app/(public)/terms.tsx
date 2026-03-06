import { BackButton } from "@/components/ui/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TermsAndConditions() {
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
          <BackButton onPress={() => router.back()} />
          <Text className="text-2xl font-bold text-primary ml-4">
            Terms and Conditions
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
              title="Eligibility"
              items={[
                "You must be 18 years or older to use XENTRA.",
                "By registering, you confirm you meet the legal age.",
              ]}
            />

            <Section
              number="2"
              title="Account Registration"
              items={[
                "Registration is completed using your phone number.",
                "You are responsible for keeping your login information secure.",
                "Each person is allowed only one account.",
                "XENTRA reserves the right to suspend or close accounts involved in fraud, abuse, or suspicious activity.",
              ]}
            />

            <Section
              number="3"
              title="Nature of the Platform"
              items={[
                "XENTRA is a skill-based prediction platform, not a traditional sportsbook.",
                "Users participate in contests with a shared prize pool.",
                "XENTRA does not provide betting odds.",
              ]}
            />

            <Section
              number="4"
              title="Wallet & Payments"
              items={[
                "Deposits are made via MonCash or Natcash.",
                "Wallet funds are used only within the app.",
                "Withdrawals are subject to verification.",
                "XENTRA may delay or cancel withdrawals if fraud is suspected.",
              ]}
            />

            <Section
              number="5"
              title="Platform Fees"
              items={[
                "A service fee is deducted before distributing prizes.",
                "The remaining amount forms the prize pool.",
              ]}
            />

            <Section
              number="6"
              title="Winners & Rankings"
              items={[
                "Winners are determined based on prediction accuracy.",
                "Only the top players receive payouts.",
                "Detailed rules are in the Contest Rules section.",
              ]}
            />

            <Section
              number="7"
              title="Fair Play"
              content="Any attempt to:"
              items={[
                "Manipulate results",
                "Abuse the system",
                "Use multiple accounts",
                "Exploit technical errors",
              ]}
              footer="May result in:\n• Account suspension\n• Loss of funds\n• Permanent ban"
            />

            <Section
              number="8"
              title="No Profit Guarantee"
              items={[
                "Participation involves risk.",
                "XENTRA does not guarantee profits.",
              ]}
            />

            <Section
              number="9"
              title="Service Availability"
              items={["XENTRA may modify or suspend services at any time."]}
            />

            <Section
              number="10"
              title="Changes to Conditions"
              items={[
                "These conditions may change at any time.",
                "Continued use of the app indicates acceptance of changes.",
              ]}
            />

            <Section
              number="11"
              title="Contact"
              items={[
                "These conditions may change at any time.",
                "For assistance, contact XENTRA through the app.",
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
        <Text className="text-base text-secondary leading-6 mt-2">
          {footer}
        </Text>
      ) : null}
    </View>
  );
}
