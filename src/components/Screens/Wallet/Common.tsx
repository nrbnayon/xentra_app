import { TranslatedText } from "@/components/ui/TranslatedText";
import { cn } from "@/lib/utils";
import { Pressable, Text, TextInput } from "react-native";

export const PRIMARY = "#16467A";

interface ActionButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export function ActionButton({ label, onPress, disabled }: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={cn(
        "bg-primary rounded-3 py-3 items-center rounded",
        disabled && "opacity-60 bg-[#8FAAC7]",
      )}
      style={({ pressed }) => [pressed && !disabled && { opacity: 0.8 }]}
    >
      <TranslatedText className="text-white text-base font-bold">{label}</TranslatedText>
    </Pressable>
  );
}

interface FormInputProps {
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  keyboardType?: "numeric" | "phone-pad" | "default";
}

export function FormInput({
  placeholder,
  value,
  onChangeText,
  keyboardType,
}: FormInputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#8A8A8A"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType ?? "default"}
      className="h-[52px] rounded-md border border-[#EDEDED] px-4 text-base text-[#303030] bg-white"
      style={{
        lineHeight: 20,
      }}
    />
  );
}
