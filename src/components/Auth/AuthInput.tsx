import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import { cn } from "../../lib/utils";

interface AuthInputProps extends TextInputProps {
  label: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  isPassword?: boolean;
  containerClassName?: string;
}

export default function AuthInput({
  label,
  icon,
  rightIcon,
  error,
  isPassword = false,
  containerClassName = "",
  ...props
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={cn("gap-2 mb-4", containerClassName)}>
      <Text className="text-base font-semibold text-foreground">{label}</Text>

      <View
        className={cn(
          "flex-row items-center h-14 rounded-xl border px-3.5 gap-2 bg-white",
          error
            ? "border-red-500"
            : isFocused
              ? "border-primary/80"
              : "border-gray-200",
        )}
      >
        {icon && <View className="mr-1">{icon}</View>}

        <TextInput
          {...props}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 text-base text-foreground h-full"
          placeholderTextColor="#9CA3AF"
          style={{ includeFontPadding: false }}
        />

        {isPassword ? (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {showPassword ? (
              <Eye size={18} color="#6C6C6C" />
            ) : (
              <EyeOff size={18} color="#6C6C6C" />
            )}
          </Pressable>
        ) : (
          rightIcon && <View className="ml-1">{rightIcon}</View>
        )}
      </View>

      {error ? (
        <Text className="text-red-500 text-xs px-1 mt-[-4px]">{error}</Text>
      ) : null}
    </View>
  );
}
