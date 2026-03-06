import { ChevronDown, Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COUNTRIES, Country } from "../../constants/countries";
import { cn } from "../../lib/utils";

interface CountryPickerProps {
  selectedCountry: Country;
  onSelect: (country: Country) => void;
  error?: boolean;
}

export default function CountryPicker({
  selectedCountry,
  onSelect,
  error,
}: CountryPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState("");
  const insets = useSafeAreaInsets();

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.dial.includes(query),
  );

  return (
    <>
      <Pressable
        onPress={() => setModalVisible(true)}
        className={cn(
          "flex-row items-center justify-center px-2 h-14 rounded-xl border border-gray-200 bg-white",
          error && "border-red-500",
        )}
      >
        <Text className="text-[22px] leading-7">{selectedCountry.flag}</Text>
        <Text className="text-sm text-foreground font-medium ml-1.5 mr-1">
          {selectedCountry.dial}
        </Text>
        <ChevronDown size={13} color="#505050" />
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/45"
          onPress={() => setModalVisible(false)}
        >
          <Pressable className="mt-auto" onPress={(e) => e.stopPropagation()}>
            <View
              className="bg-white rounded-t-3xl min-h-[50%] w-full"
              style={{
                paddingBottom: insets.bottom + 16,
              }}
            >
              {/* Handle */}
              <View className="items-center pt-3 pb-2">
                <View className="w-10 h-1 rounded-full bg-gray-200" />
              </View>

              {/* Title */}
              <Text className="text-lg font-bold text-primary text-center pb-3">
                Select Country
              </Text>

              {/* Search */}
              <View className="mx-4 mb-3 flex-row items-center gap-2 px-3 rounded-xl border bg-gray-50 border-gray-200 focus-within:border-primary/80">
                <Search size={16} color="#9CA3AF" />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Search country or code..."
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 py-3 text-sm text-foreground"
                />
              </View>

              {/* List */}
              <FlatList
                data={filtered}
                keyExtractor={(item) => item.code}
                keyboardShouldPersistTaps="handled"
                className="max-h-[400px]"
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      onSelect(item);
                      setModalVisible(false);
                      setQuery("");
                    }}
                    className={cn(
                      "flex-row items-center justify-between px-5 py-3",
                      item.code === selectedCountry.code
                        ? "bg-primary/5"
                        : "active:bg-gray-50",
                    )}
                  >
                    <View className="flex-row items-center gap-3">
                      <Text className="text-2xl w-8 text-center">
                        {item.flag}
                      </Text>
                      <Text
                        numberOfLines={1}
                        className={cn(
                          "text-base text-foreground",
                          item.code === selectedCountry.code
                            ? "font-semibold text-primary"
                            : "font-normal",
                        )}
                      >
                        {item.name}
                      </Text>
                    </View>
                    <Text className="text-sm text-secondary font-medium">
                      {item.dial}
                    </Text>
                  </Pressable>
                )}
                ItemSeparatorComponent={() => (
                  <View className="h-[1px] bg-gray-100 mx-5" />
                )}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
