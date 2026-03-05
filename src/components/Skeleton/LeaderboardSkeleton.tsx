import { SHADOWS } from "@/lib/shadows";
import { View } from "react-native";

export function LeaderboardCardSkeleton() {
  return (
    <View
      className="bg-white rounded-2xl mb-8 overflow-hidden"
      style={SHADOWS.card}
    >
      {/* Status badge placeholder */}
      <View className="px-4 pt-3 pb-0 flex-row justify-end">
        <View className="w-24 h-6 bg-gray-100 rounded-full" />
      </View>

      <View className="px-4 py-3">
        {/* Title & date */}
        <View className="flex-row justify-between items-center mb-3">
          <View className="h-5 w-36 bg-gray-100 rounded" />
          <View className="h-4 w-28 bg-gray-100 rounded" />
        </View>

        {/* Teams row */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center gap-2 flex-1">
            <View className="w-7 h-7 bg-gray-100 rounded" />
            <View className="h-4 w-16 bg-gray-100 rounded" />
          </View>
          <View className="w-16 h-9 bg-gray-100 rounded" />
          <View className="flex-row items-center justify-end gap-2 flex-1">
            <View className="h-4 w-16 bg-gray-100 rounded" />
            <View className="w-7 h-7 bg-gray-100 rounded" />
          </View>
        </View>

        {/* Prize & Participants */}
        <View className="gap-1.5 mb-3">
          <View className="flex-row justify-between">
            <View className="h-4 w-20 bg-gray-100 rounded" />
            <View className="h-4 w-28 bg-gray-100 rounded" />
          </View>
          <View className="flex-row justify-between">
            <View className="h-4 w-24 bg-gray-100 rounded" />
            <View className="h-4 w-10 bg-gray-100 rounded" />
          </View>
        </View>
      </View>

      {/* Button skeleton */}
      <View
        className="h-14 bg-gray-100"
        style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
      />
    </View>
  );
}
