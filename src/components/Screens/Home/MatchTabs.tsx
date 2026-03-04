import { TranslatedText } from "@/components/ui/TranslatedText";
import { Pressable, View } from "react-native";

type TabStatus = "all" | "latest" | "upcoming" | "complete";

interface Props {
  selectedStatus: TabStatus;
  onSelectStatus: (status: TabStatus) => void;
}

export default function MatchTabs({ selectedStatus, onSelectStatus }: Props) {
  const tabs: { label: string; value: TabStatus }[] = [
    { label: "All", value: "all" },
    { label: "Latest", value: "latest" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Complete", value: "complete" },
  ];

  return (
    <View className="flex-row items-center border-b border-gray-200 mb-6">
      {tabs.map((tab) => {
        const isActive = selectedStatus === tab.value;
        return (
          <Pressable
            key={tab.value}
            onPress={() => onSelectStatus(tab.value)}
            className={`flex-1 items-center pb-3 border-b-2 ${
              isActive ? "border-primary" : "border-transparent"
            }`}
          >
            <TranslatedText
              className={`font-semibold ${
                isActive ? "text-primary" : "text-secondary"
              }`}
            >
              {tab.label}
            </TranslatedText>
          </Pressable>
        );
      })}
    </View>
  );
}
