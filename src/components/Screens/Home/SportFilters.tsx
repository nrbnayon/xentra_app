import { TranslatedText } from "@/components/ui/TranslatedText";
import { useLanguage } from "@/context/LanguageContext";
import { mockLeagues } from "@/data/mock";
import { SHADOWS } from "@/lib/shadows";
import { SportCategory } from "@/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, Check, ChevronDown } from "lucide-react-native";
import { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  sports: SportCategory[];
  selectedSportId: string;
  onSelectSport: (id: string) => void;
  date: Date | null;
  onSelectDate: (date: Date | null) => void;
  selectedLeagueName: string;
  onSelectLeague: (name: string) => void;
}

export default function SportFilters({
  sports,
  selectedSportId,
  onSelectSport,
  date,
  onSelectDate,
  selectedLeagueName,
  onSelectLeague,
}: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const [showLeaguePicker, setShowLeaguePicker] = useState(false);
  const { currentLanguage } = useLanguage();

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) onSelectDate(selectedDate);
  };

  const formatDate = (dateValue: Date) => {
    return dateValue.toLocaleDateString(currentLanguage.code, {
      month: "short",
      day: "numeric",
    });
  };

  const handleSelectLeague = (leagueName: string) => {
    onSelectLeague(leagueName);
    setShowLeaguePicker(false);
  };

  return (
    <View className="mb-6">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pl-6 my-5 -mx-6 pr-6"
      >
        <View className="flex-row gap-3 pr-8 py-2">
          {sports.map((sport) => {
            const isActive = sport.id === selectedSportId;
            return (
              <Pressable
                key={sport.id}
                onPress={() => onSelectSport(sport.id)}
                style={[!isActive && SHADOWS.soft]}
                className={`flex-row items-center justify-center px-5 py-2.5 rounded-full ${
                  isActive ? "bg-primary" : "bg-white border border-border"
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
          onPress={() => setShowLeaguePicker(true)}
          className="flex-row items-center justify-between flex-1 bg-white px-4 py-3 rounded-full border border-gray-100"
        >
          <Text
            className="text-secondary font-medium truncate flex-shrink"
            numberOfLines={1}
          >
            {selectedLeagueName === "Select League" ? (
              <TranslatedText skip={false}>Select League</TranslatedText>
            ) : (
              <TranslatedText skip={false}>{selectedLeagueName}</TranslatedText>
            )}
          </Text>
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

      {/* League Selection Modal */}
      <Modal visible={showLeaguePicker} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-center px-6"
          activeOpacity={1}
          onPress={() => setShowLeaguePicker(false)}
        >
          <View className="bg-white rounded-2xl overflow-hidden shadow-lg p-2 max-h-[70%]">
            <View className="px-4 py-4 border-b border-gray-100">
              <TranslatedText className="text-lg font-bold text-primary">
                Select League
              </TranslatedText>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {[{ id: "all", name: "All Leagues" }, ...mockLeagues].map(
                (league) => {
                  const isSelected =
                    selectedLeagueName === league.name ||
                    (selectedLeagueName === "Select League" &&
                      league.id === "all");
                  return (
                    <Pressable
                      key={league.id}
                      onPress={() => handleSelectLeague(league.name)}
                      className={`flex-row items-center justify-between px-4 py-4 border-b border-gray-50 active:bg-gray-50 ${isSelected ? "bg-primary/5" : ""}`}
                    >
                      <TranslatedText
                        className={`text-base ${isSelected ? "font-bold text-primary" : "font-medium text-[#111111]"}`}
                      >
                        {league.name}
                      </TranslatedText>
                      {isSelected && <Check size={20} color="#16467A" />}
                    </Pressable>
                  );
                },
              )}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
