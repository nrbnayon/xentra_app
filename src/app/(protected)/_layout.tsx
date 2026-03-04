import { CustomTabBar } from "@/components/Screens/Home/CustomTabBar";
import { Tabs } from "expo-router";
import React from "react";

export default function ProtectedLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="prediction" options={{ title: "Prediction" }} />
      <Tabs.Screen name="trophy" options={{ title: "Trophy" }} />
      <Tabs.Screen name="wallet" options={{ title: "Wallet" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />

      {/* Hidden Screens inside the Tabs layout (or via Stack, but simple enough to hide from TabBar) */}
      <Tabs.Screen name="match-details/[id]" options={{ href: null }} />
      <Tabs.Screen name="prediction-success" options={{ href: null }} />
    </Tabs>
  );
}
