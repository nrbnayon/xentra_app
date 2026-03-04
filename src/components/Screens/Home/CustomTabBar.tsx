import { SHADOWS } from "@/lib/shadows";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Home, LineChart, Trophy, User, Wallet } from "lucide-react-native";
import { Platform, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Mock translation func inside component purely for layout mapping, though 'AnimatedSplashOverlay' isn't needed here.
export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingBottom: insets.bottom + (Platform.OS === "ios" ? -10 : 15),
      }}
      className="bg-transparent absolute bottom-0 w-full flex-row justify-between items-center px-4 pt-4 pb-2 pb-safe"
    >
      {/* Background layer gradient underneath if needed, currently transparent as tabs float over the screen */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        // Skip rendering hidden tabs
        const navOptions = options as any;
        if (
          navOptions.href === null ||
          route.name === "match-details/[id]" ||
          route.name === "prediction-success"
        )
          return null;

        const label = route.name; // Keep it simple; we'll translate inside if necessary

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const renderIcon = (color: string) => {
          const size = 24;
          switch (route.name) {
            case "index":
              return (
                <Home
                  size={size}
                  color={color}
                  fill={isFocused ? color : "transparent"}
                />
              );
            case "prediction":
              return <LineChart size={size} color={color} />; // Wavy chart line
            case "trophy":
              return (
                <Trophy
                  size={size}
                  color={color}
                  fill={isFocused ? color : "transparent"}
                />
              );
            case "wallet":
              return (
                <Wallet
                  size={size}
                  color={color}
                  fill={isFocused ? color : "transparent"}
                />
              );
            case "profile":
              return (
                <User
                  size={size}
                  color={color}
                  fill={isFocused ? color : "transparent"}
                />
              );
            default:
              return <Home size={size} color={color} />;
          }
        };

        // If inactive, it's a white circle with a shadow. If active, it's a dark rounded rectangle.
        if (isFocused) {
          return (
            <Pressable
              key={index}
              onPress={onPress}
              className="bg-primary flex-row items-center px-5 py-3.5 rounded-full"
              style={SHADOWS.floating}
            >
              {renderIcon("#FFFFFF")}
              {/* Only show text on active tab (or if it's explicitly wide) as per images */}
              <Text className="text-white font-bold ml-2 capitalize text-sm">
                {route.name === "index" ? "Home" : route.name}
              </Text>
            </Pressable>
          );
        }

        return (
          <Pressable
            key={index}
            onPress={onPress}
            className="w-14 h-14 bg-white rounded-full items-center justify-center"
            style={SHADOWS.tab} // Soft floating shadow for circles
          >
            {renderIcon("#16467A")}
          </Pressable>
        );
      })}
    </View>
  );
}
