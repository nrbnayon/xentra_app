import { View } from "react-native";

export const MatchSkeleton = () => (
  <View className="w-full h-64 mb-6 overflow-hidden bg-white rounded-t-xl rounded-bl-xl shadow-none">
    {/* Background shimmer layer */}
    <View className="absolute inset-0 bg-gray-300 opacity-20" />

    <View className="flex-1 justify-between p-5">
      {/* Top Section */}
      <View className="items-center mt-2">
        <View className="h-6 w-1/2 bg-gray-300 rounded mb-3" />
        <View className="h-4 w-3/4 bg-gray-300 rounded" />
      </View>

      {/* Middle Stats */}
      <View className="flex-row justify-center gap-12">
        <View className="items-center">
          <View className="h-3 w-16 bg-gray-300 rounded mb-2" />
          <View className="h-8 w-20 bg-gray-300 rounded" />
        </View>

        <View className="items-center">
          <View className="h-3 w-16 bg-gray-300 rounded mb-2" />
          <View className="h-8 w-20 bg-gray-300 rounded" />
        </View>
      </View>

      <View className="h-4 w-32 bg-gray-300 rounded mb-4 mt-6" />
      {/* Bottom Section */}
      <View className="flex-row justify-between items-end ">
        {/* Date left */}
        <View></View>
        {/* Fake inverted button area */}
        <View className="bg-white rounded-tl-2xl pl-3 pt-3 pb-0 pr-0 -mr-5 border-0">
          <View className="h-14 w-28 bg-gray-300 rounded-md" />
        </View>
      </View>
    </View>
  </View>
);
