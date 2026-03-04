import { TranslatedText } from "@/components/ui/TranslatedText";
import { useLanguage } from "@/context/LanguageContext";
import { SHADOWS } from "@/lib/shadows";
import { SportCategory } from "@/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";

interface Props {
  sports: SportCategory[];
  selectedSportId: string;
  onSelectSport: (id: string) => void;
}

export default function SportFilters({
  sports,
  selectedSportId,
  onSelectSport,
}: Props) {
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const { currentLanguage } = useLanguage();

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  const formatDate = (dateValue: Date) => {
    return dateValue.toLocaleDateString(currentLanguage.code, {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <View className="mb-6">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pl-6 mb-4 -mx-6 pr-6"
      >
        <View className="flex-row gap-3 pr-8">
          {sports.map((sport) => {
            const isActive = sport.id === selectedSportId;
            return (
              <Pressable
                key={sport.id}
                onPress={() => onSelectSport(sport.id)}
                style={[!isActive && SHADOWS.soft]}
                className={`flex-row items-center justify-center px-5 py-2.5 rounded-full ${
                  isActive ? "bg-primary" : "bg-white border border-gray-100"
                }`}
              >
                {/* Simulated Icons based on name or ID */}
                {sport.icon ? (
                  <View className="mr-2">
                    <Text className="text-xl">
                      {sport.name === "Football"
                        ? "⚽"
                        : sport.name === "Basketball"
                          ? "🏀"
                          : "🏅"}
                    </Text>
                  </View>
                ) : null}

                <TranslatedText
                  className={`font-semibold ${isActive ? "text-white" : "text-secondary"}`}
                >
                  {sport.name}
                </TranslatedText>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Dropdowns row */}
      <View className="flex-row gap-3">
        <Pressable
          style={SHADOWS.soft}
          className="flex-row items-center justify-between flex-1 bg-white px-4 py-3 rounded-full border border-gray-100"
        >
          <TranslatedText className="text-secondary font-medium">
            Select League
          </TranslatedText>
          <ChevronDown size={18} color="#6B7280" />
        </Pressable>

        <Pressable
          style={SHADOWS.soft}
          onPress={() => setShowPicker(true)}
          className="flex-row items-center justify-start flex-1 bg-white px-4 py-3 rounded-full border border-gray-100"
        >
          <Calendar size={18} color="#6B7280" className="mr-2" />
          <Text className="text-secondary font-medium">
            {date ? (
              formatDate(date)
            ) : (
              <TranslatedText skip={false}>Pick a Date</TranslatedText>
            )}
          </Text>
        </Pressable>

        {showPicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>
    </View>
  );
}
