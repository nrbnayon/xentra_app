import { SHADOWS } from "@/lib/shadows";
import React from "react";
import { View } from "react-native";

export const PredictionSkeleton = () => {
  return (
    <View
      className="w-full bg-white rounded-2xl mb-4 pt-4 pb-1"
      style={SHADOWS.card}
    >
      {/* Top row */}
      <View className="flex-row justify-between items-center px-4 mb-3">
        <View className="h-5 w-32 bg-gray-100 rounded" />
        <View className="flex-row items-center gap-2">
          <View className="h-5 w-12 bg-gray-100 rounded" />
          <View className="h-4 w-24 bg-gray-100 rounded" />
        </View>
      </View>

      {/* Middle row */}
      <View className="flex-row justify-between items-center px-4 mb-4">
        <View className="flex-row items-center gap-2 flex-1">
          <View className="w-8 h-8 rounded bg-gray-100" />
          <View className="h-5 w-16 bg-gray-100 rounded" />
        </View>

        <View className="bg-gray-50 px-5 py-3 rounded">
          <View className="h-6 w-12 bg-gray-100 rounded" />
        </View>

        <View className="flex-row items-center justify-end gap-2 flex-1">
          <View className="h-5 w-16 bg-gray-100 rounded" />
          <View className="w-8 h-8 rounded bg-gray-100" />
        </View>
      </View>

      {/* Rank Row */}
      <View className="flex-row justify-between items-center px-6 mb-3">
        <View className="h-4 w-10 bg-gray-100 rounded" />
        <View className="h-4 w-12 bg-gray-100 rounded" />
      </View>

      {/* Separator */}
      <View className="h-[1px] bg-gray-50 w-full mb-3" />

      {/* Bottom */}
      <View className="items-center pb-3">
        <View className="h-5 w-24 bg-gray-100 rounded" />
      </View>
    </View>
  );
};
