import { SHADOWS } from "@/lib/shadows";
import { ChevronDown } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export type LeaderboardTab = "all" | "latest" | "upcoming" | "completed";

interface Props {
  selectedTab: LeaderboardTab;
  onSelectTab: (tab: LeaderboardTab) => void;
  selectedLeague?: string;
  selectedMatch?: string;
  onSelectLeague?: () => void;
  onSelectMatch?: () => void;
}

const TABS: { id: LeaderboardTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "latest", label: "Latest" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
];

export default function LeaderboardFilter({
  selectedTab,
  onSelectTab,
  selectedLeague = "Select League",
  selectedMatch = "Select Match",
  onSelectLeague,
  onSelectMatch,
}: Props) {
  return (
    <View className="gap-[18px]">
      {/* Dropdowns row */}
      <View className="flex-row items-center justify-end gap-[6px]">
        {/* Select League */}
        <Pressable
          onPress={onSelectLeague}
          className="flex-row items-center gap-[6px] px-[12px] py-[6px] rounded-[50px] bg-white"
          style={SHADOWS.tabInactive as object}
        >
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 14,
              color: "#181818",
              lineHeight: 18,
            }}
          >
            {selectedLeague}
          </Text>
          <ChevronDown size={14} color="#181818" />
        </Pressable>

        {/* Select Match */}
        <Pressable
          onPress={onSelectMatch}
          className="flex-row items-center gap-[6px] px-[12px] py-[6px] rounded-[50px] bg-white"
          style={SHADOWS.tabInactive as object}
        >
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 14,
              color: "#181818",
              lineHeight: 18,
            }}
          >
            {selectedMatch}
          </Text>
          <ChevronDown size={14} color="#181818" />
        </Pressable>
      </View>

      {/* Underline tabs */}
      <View className="flex-row items-center h-[26px]">
        {TABS.map((tab) => {
          const isActive = selectedTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              onPress={() => onSelectTab(tab.id)}
              className="flex-1 items-center justify-center px-[10px] py-[4px]"
              style={
                isActive
                  ? {
                      borderBottomWidth: 1,
                      borderBottomColor: "#0d2947",
                    }
                  : undefined
              }
            >
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 14,
                  color: "#1c5898",
                  lineHeight: 18,
                }}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
