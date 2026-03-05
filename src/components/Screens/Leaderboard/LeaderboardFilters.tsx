import { TranslatedText } from "@/components/ui/TranslatedText";
import { ChevronDown } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type Tab = "all" | "latest" | "upcoming" | "completed";

interface Props {
  selectedLeague: string;
  selectedMatch: string;
  selectedTab: Tab;
  onSelectLeague: () => void;
  onSelectMatch: () => void;
  onSelectTab: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "latest", label: "Latest" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
];

export default function LeaderboardFilters({
  selectedLeague,
  selectedMatch,
  selectedTab,
  onSelectLeague,
  onSelectMatch,
  onSelectTab,
}: Props) {
  return (
    <View className="mb-4">
      {/* Dropdowns row */}
      <View className="flex-row gap-3 mb-4">
        {/* League Picker */}
        <Pressable
          onPress={onSelectLeague}
          className="flex-1 flex-row items-center justify-between bg-white border border-gray-100 rounded-full px-4 py-2.5"
          style={{
            shadowColor: "#181818",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <Text
            className="text-[#303030] text-sm font-medium"
            numberOfLines={1}
          >
            {selectedLeague}
          </Text>
          <ChevronDown size={16} color="#686868" />
        </Pressable>

        {/* Match Picker */}
        <Pressable
          onPress={onSelectMatch}
          className="flex-1 flex-row items-center justify-between bg-white border border-gray-100 rounded-full px-4 py-2.5"
          style={{
            shadowColor: "#181818",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <Text
            className="text-[#303030] text-sm font-medium"
            numberOfLines={1}
          >
            {selectedMatch}
          </Text>
          <ChevronDown size={16} color="#686868" />
        </Pressable>
      </View>

      {/* Status Tabs */}
      <View className="flex-row">
        {TABS.map((tab) => {
          const isSelected = selectedTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              onPress={() => onSelectTab(tab.id)}
              className="mr-5 pb-1.5"
              style={
                isSelected
                  ? {
                      borderBottomWidth: 2,
                      borderBottomColor: "#1C5898",
                    }
                  : {}
              }
            >
              <TranslatedText
                className={`text-sm font-semibold ${
                  isSelected ? "text-primary" : "text-[#686868]"
                }`}
              >
                {tab.label}
              </TranslatedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
