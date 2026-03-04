import { TranslatedText } from "@/components/ui/TranslatedText";
import { Pressable, View } from "react-native";

type TabStatus = "latest" | "upcoming" | "completed";

interface Props {
  selectedStatus: TabStatus;
  onSelectStatus: (status: TabStatus) => void;
}

export default function MatchTabs({ selectedStatus, onSelectStatus }: Props) {
  const tabs: { label: string; value: TabStatus }[] = [
    { label: "Latest", value: "latest" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Completed", value: "completed" },
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
