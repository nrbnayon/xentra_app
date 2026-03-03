import { Pressable, Text, type PressableProps } from "react-native";
import { cn } from "../../lib/utils";

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  className?: string;
}

export function Button({
  children,
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={cn(
        "items-center justify-center rounded-full px-6 py-3.5",
        variant === "default" && "bg-primary/90 active:opacity-80",
        variant === "outline" && "border border-primary/90",
        variant === "ghost" && "bg-transparent",
        className,
      )}
      {...props}
    >
      <Text
        className={cn(
          "text-base font-bold",
          variant === "default" && "text-white",
          variant === "outline" && "text-primary/90",
          variant === "ghost" && "text-primary/90",
        )}
      >
        {children}
      </Text>
    </Pressable>
  );
}
