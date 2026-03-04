import React, { useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { cn } from "../../lib/utils";

interface OtpInputProps {
  length?: number;
  value: string;
  onValueChange: (value: string) => void;
  error?: boolean;
}

export default function OtpInput({
  length = 6,
  value,
  onValueChange,
  error,
}: OtpInputProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);
  const inputs = useRef<TextInput[]>([]);

  const handleTextChange = (text: string, index: number) => {
    const newValue = value.split("");

    // Handle pasting multi-char input
    if (text.length > 1) {
      const pastedData = text.slice(0, length - index).split("");
      for (let i = 0; i < pastedData.length; i++) {
        newValue[index + i] = pastedData[i];
      }
      onValueChange(newValue.join(""));
      const nextIndex = Math.min(index + pastedData.length, length - 1);
      inputs.current[nextIndex]?.focus();
      return;
    }

    newValue[index] = text;
    onValueChange(newValue.join(""));

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (!value[index] && index > 0) {
        inputs.current[index - 1]?.focus();
        const newValue = value.split("");
        newValue[index - 1] = "";
        onValueChange(newValue.join(""));
      }
    }
  };

  return (
    <View className="flex-row justify-between w-full px-2">
      {Array.from({ length }).map((_, index) => (
        <View
          key={index}
          className={cn(
            "w-16 h-16 rounded-xl border-2 items-center justify-center bg-white",
            error
              ? "border-red-500"
              : focusedIndex === index
                ? "border-primary"
                : "border-gray-300",
          )}
        >
          <TextInput
            ref={(ref) => {
              if (ref) inputs.current[index] = ref;
            }}
            value={value[index] || ""}
            onChangeText={(text) => handleTextChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            keyboardType="number-pad"
            maxLength={1}
            className="text-2xl font-bold text-foreground text-center w-full h-full"
            style={{ includeFontPadding: false, textAlignVertical: "center" }}
            selectTextOnFocus
          />
        </View>
      ))}
    </View>
  );
}
