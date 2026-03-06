import { BackButton } from "@/components/ui/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useMemo } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const CONFETTI_COLORS = ["#16467A", "#FFC107", "#22C55E", "#EF4444", "#5091D5"];
const PARTICLE_COUNT = 30;

function ConfettiParticle({ index }: { index: number }) {
  const translateY = useSharedValue(-20);
  const translateX = useSharedValue(Math.random() * SCREEN_WIDTH);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const rotateZ = useSharedValue(0);
  const scale = useSharedValue(1);

  // Randomize initial position and timing for a "party" burst feel
  const delay = index * 120;
  const duration = 3000 + Math.random() * 3000;
  const horizontalFactor = (Math.random() - 0.5) * 200;

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(SCREEN_HEIGHT + 100, {
          duration,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
        -1,
        false,
      ),
    );

    translateX.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(translateX.value + horizontalFactor, {
            duration: duration / 2,
            easing: Easing.inOut(Easing.sin),
          }),
          withTiming(translateX.value, {
            duration: duration / 2,
            easing: Easing.inOut(Easing.sin),
          }),
        ),
        -1,
        false,
      ),
    );

    // High energy "party" 3D rotations
    rotateX.value = withRepeat(
      withTiming(360, { duration: 800 + Math.random() * 1000 }),
      -1,
      false,
    );
    rotateY.value = withRepeat(
      withTiming(360, { duration: 1000 + Math.random() * 1000 }),
      -1,
      false,
    );
    rotateZ.value = withRepeat(
      withTiming(360, { duration: 1200 + Math.random() * 1000 }),
      -1,
      false,
    );

    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 500 }),
        withTiming(0.8, { duration: 500 }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
      { rotateZ: `${rotateZ.value}deg` },
      { scale: scale.value },
    ],
  }));

  const color = useMemo(
    () => CONFETTI_COLORS[index % CONFETTI_COLORS.length],
    [index],
  );
  const shapeType = useMemo(() => index % 3, [index]); // 0: rect, 1: square/circle, 2: small dot

  const size = useMemo(
    () => (shapeType === 2 ? 6 : 10 + Math.random() * 8),
    [shapeType],
  );
  const width = useMemo(
    () => (shapeType === 0 ? size * 1.5 : size),
    [shapeType, size],
  );
  const borderRadius = useMemo(
    () => (index % 4 === 0 ? size / 2 : 2),
    [index, size],
  );

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: -30,
          left: 0,
          width: width,
          height: size,
          backgroundColor: color,
          borderRadius: borderRadius,
          zIndex: 1,
        },
        animatedStyle,
      ]}
    />
  );
}

export default function PredictionSuccess() {
  const insets = useSafeAreaInsets();

  const confettiItems = useMemo(
    () => Array.from({ length: PARTICLE_COUNT }).map((_, i) => i),
    [],
  );

  return (
    <LinearGradient
      colors={["#BEE3FF", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.238, 0.9525]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.45, y: 1 }}
      className="flex-1"
    >
      {/* Celebration Confetti Layer */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 5,
        }}
      >
        {confettiItems.map((id) => (
          <ConfettiParticle key={id} index={id} />
        ))}
      </View>

      <View
        className="flex-1 px-6"
        style={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
          zIndex: 10,
        }}
      >
        <BackButton
          onPress={() => router.replace("/(protected)/" as any)}
          style={{ marginBottom: 48 }}
        />

        <View className="flex-1 items-center justify-center -mt-20">
          <Image
            source={require("../../../assets/images/champion.png")}
            className="w-72 h-72 mb-10"
            resizeMode="contain"
          />

          <Text className="text-4xl font-bold text-primary mb-4 text-center">
            Congratulations!
          </Text>
          <Text className="text-base text-gray-600 text-center px-6 leading-6">
            Your prediction has been submitted successfully. Good luck!
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}
