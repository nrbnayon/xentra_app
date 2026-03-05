import { TranslatedText } from "@/components/ui/TranslatedText";
import { SHADOWS } from "@/lib/shadows";
import { TrendingDown, TrendingUp } from "lucide-react-native";
import { Image, Pressable, ScrollView, View } from "react-native";

interface Props {
  selectedStatus: "all" | "latest" | "won" | "lose";
  onSelectStatus: (status: "all" | "latest" | "won" | "lose") => void;
}

const TABS = [
  { id: "all", label: "All" },
  { id: "latest", label: "Latest", type: "badge" },
  { id: "won", label: "Won", type: "trendUp" },
  { id: "lose", label: "Lose", type: "trendDown" },
] as Array<{
  id: string;
  label: string;
  type?: "badge" | "trendUp" | "trendDown";
}>;

export default function PredictionTabs({
  selectedStatus,
  onSelectStatus,
}: Props) {
  return (
    <View className="mb-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{
          gap: 12,
          paddingRight: 40,
          paddingVertical: 12,
          paddingHorizontal: 4,
        }}
      >
        {TABS.map((tab) => {
          const isSelected = selectedStatus === tab.id;

          const renderIcon = () => {
            if (tab.type === "badge") {
              return (
                <Image
                  source={require("../../../../assets/icons/new_latest.png")}
                  className="w-5 h-5 mr-2"
                  resizeMode="contain"
                />
              );
            }
            if (tab.type === "trendUp") {
              return (
                <View className="mr-2">
                  <TrendingUp
                    size={16}
                    color={isSelected ? "white" : "#22C55E"}
                  />
                </View>
              );
            }
            if (tab.type === "trendDown") {
              return (
                <View className="mr-2">
                  <TrendingDown
                    size={16}
                    color={isSelected ? "white" : "#EF4444"}
                  />
                </View>
              );
            }
            return null;
          };

          return (
            <Pressable
              key={tab.id}
              onPress={() => onSelectStatus(tab.id as any)}
              className={`flex-row items-center px-5 py-2.5 rounded-full border ${
                isSelected
                  ? "bg-[#1C5898] border-[#1C5898]"
                  : "bg-white border-white"
              }`}
              style={isSelected ? {} : SHADOWS.tabInactive}
            >
              {renderIcon()}
              <TranslatedText
                className={`font-medium ${
                  isSelected ? "text-white" : "text-[#181818]"
                }`}
              >
                {tab.label}
              </TranslatedText>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
