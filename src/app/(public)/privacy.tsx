import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-5"
          contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-4">
            <Text className="text-sm text-secondary mb-6 italic">
              Last Updated: March 04, 2026
            </Text>

            <Section
              title="1. Information We Collect"
              content="XENTRA collects necessary information to provide our skill-based prediction services:"
              items={[
                "Phone Number: Used for account identification and security.",
                "Display Name: To identify you on leaderboards.",
                "Device Information: To ensure platform integrity and prevent fraud.",
                "Transaction History: Keeping track of your wallet activities.",
              ]}
            />

            <Section
              title="2. How We Use Your Data"
              content="Your data is used specifically for:"
              items={[
                "Authenticating and securing your account.",
                "Processing wallet deposits and withdrawals.",
                "Calculating and displaying contest rankings.",
                "Improving app features and user experience.",
              ]}
            />

            <Section
              title="3. Data Security"
              content="We use industry-standard encryption and security protocols to protect your information. Your phone number is never shared with third parties for marketing purposes."
            />

            <Section
              title="4. User Rights & Account Deletion"
              content="You have full control over your data. You can request a summary of the data we hold or request its permanent removal."
              footer={`To Permanently Delete Your Account & Data:
1. Open the XENTRA app
2. Go to Profile Settings
3. Select 'Delete Account'
4. Confirm the deletion

Please note: Account deletion is permanent and will result in the loss of all wallet balances and history.`}
            />

            <Section
              title="5. Compliance"
              content="XENTRA complies with applicable data protection regulations. We do not participate in unauthorized data sharing or selling."
            />

            <Section
              title="6. Contact Us"
              content="If you have any questions regarding your privacy, please contact our support team through the app."
            />
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

function Section({
  title,
  content,
  items,
  footer,
}: {
  title: string;
  content?: string;
  items?: string[];
  footer?: string;
}) {
  return (
    <View className="mb-8">
      <Text className="text-lg font-bold text-foreground mb-2">{title}</Text>
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
        <View className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100">
          <Text className="text-sm text-red-700 leading-5">{footer}</Text>
        </View>
      ) : null}
    </View>
  );
}
