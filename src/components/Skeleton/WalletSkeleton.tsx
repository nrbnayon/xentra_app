import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function WalletSkeleton() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#FFF0CE", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.1559, 0.9525]}
      start={{ x: 0.48, y: 0 }}
      end={{ x: 0.52, y: 1 }}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 160,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View className="h-8 w-40 bg-gray-100 rounded-md mb-6" />

        {/* Large Stat Card */}
        <View
          style={{
            backgroundColor: "#75C57122",
            borderRadius: 16,
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
            marginBottom: 12,
          }}
        >
          <View className="w-11 h-11 rounded-xl bg-gray-200" />
          <View className="gap-2">
            <View className="h-6 w-32 bg-gray-200 rounded" />
            <View className="h-4 w-20 bg-gray-200 rounded" />
          </View>
        </View>

        {/* Small Stat Cards Row */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 28 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFA82811",
              borderRadius: 16,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <View className="w-10 h-10 rounded-lg bg-gray-200" />
            <View className="gap-1.5">
              <View className="h-5 w-20 bg-gray-200 rounded" />
              <View className="h-3 w-14 bg-gray-200 rounded" />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#DFEEFF88",
              borderRadius: 16,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <View className="w-10 h-10 rounded-lg bg-gray-200" />
            <View className="gap-1.5">
              <View className="h-5 w-20 bg-gray-200 rounded" />
              <View className="h-3 w-14 bg-gray-200 rounded" />
            </View>
          </View>
        </View>

        {/* Table Title */}
        <View className="h-6 w-48 bg-gray-100 rounded-md mb-3" />

        {/* Table Mockup */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#F0F0F0",
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#F0F0F0",
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <View key={i} className="flex-1 h-4 bg-gray-200 rounded mx-1" />
            ))}
          </View>

          {/* Rows */}
          {[1, 2, 3, 4, 5].map((i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderBottomWidth: i === 5 ? 0 : 1,
                borderBottomColor: "#F5F5F5",
              }}
            >
              <View className="flex-1 h-3 bg-gray-100 rounded mr-2" />
              <View className="flex-1 h-3 bg-gray-100 rounded mr-2" />
              <View className="flex-1 h-3 bg-gray-100 rounded mr-2" />
              <View className="w-16 h-6 bg-gray-100 rounded-full" />
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View
          style={{
            flexDirection: "row",
            gap: 14,
            marginTop: 60,
          }}
        >
          <View style={{ flex: 1 }} className="h-14 bg-gray-100 rounded-xl" />
          <View style={{ flex: 1 }} className="h-14 bg-gray-100 rounded-xl" />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
