import { LinearGradient } from "expo-linear-gradient";
import { X } from "lucide-react-native";
import { useEffect, useMemo } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
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
import { BackButton } from "../../../components/ui/BackButton";
import { ActionButton, PRIMARY } from "./Common";
import { TranslatedText } from "@/components/ui/TranslatedText";

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
  const shapeType = useMemo(() => index % 3, [index]);

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

interface Props {
  status: "success" | "failure";
  amount: string;
  method: string;
  accountNumber: string;
  onDone: () => void;
}

export function WithdrawSuccess({
  status,
  amount,
  method,
  accountNumber,
  onDone,
}: Props) {
  const insets = useSafeAreaInsets();
  const last4 = useMemo(
    () => accountNumber.replace(/\D/g, "").slice(-4) || "----",
    [accountNumber],
  );

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
      {status === "success" && (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
          }}
        >
          {confettiItems.map((id) => (
            <ConfettiParticle key={id} index={id} />
          ))}
        </View>
      )}

      <View
        style={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 20,
          marginBottom: 8,
          zIndex: 10,
        }}
      >
        <BackButton onPress={onDone} />
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 40,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {status === "success" ? (
          <Image
            source={require("../../../../assets/images/champion.png")}
            style={{ width: 260, height: 260, marginBottom: 8 }}
            resizeMode="contain"
          />
        ) : (
          /* Layered Circles for Failure State */
          <View className="items-center justify-center my-8">
            <View className="w-48 h-48 rounded-full items-center justify-center bg-[#FEE2E2]">
              <View className="w-36 h-36 rounded-full items-center justify-center bg-[#FECACA]">
                <View
                  className="rounded-full items-center justify-center shadow-lg bg-[#EF4444] shadow-red-400"
                  style={{ width: 88, height: 88 }}
                >
                  <X size={44} color="white" strokeWidth={3.5} />
                </View>
              </View>
            </View>
          </View>
        )}

        <Text
          style={{
            fontSize: 28,
            fontWeight: "800",
            color: status === "success" ? PRIMARY : "#EF4444",
            marginBottom: 8,
            textAlign: "center",
            marginTop: status === "success" ? -10 : 0,
          }}
        >
          {status === "success" ? "Congratulations!" : "Transaction Failed"}
        </Text>
        <TranslatedText
          style={{
            fontSize: 14,
            color: "#6B7280",
            textAlign: "center",
            marginBottom: 28,
            lineHeight: 20,
            paddingHorizontal: 10,
          }}
        >
          {status === "success"
            ? "Your transaction request has been submitted successfully."
            : "Something went wrong with your transaction. Please try again later."}
        </TranslatedText>

        <View
          style={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: 20,
            marginBottom: 32,
            shadowColor: "#656565",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 30,
            elevation: 4,
          }}
        >
          {[
            { label: "Withdrawal Amount:", value: `${amount} HTG` },
            { label: "Selected Method:", value: method },
            { label: "Last 4 digits of account number:", value: last4 },
            {
              label: "Estimated processing time:",
              value: "Within 1 business day",
            },
          ].map((row) => (
            <View
              key={row.label}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 8,
              }}
            >
              <TranslatedText style={{ fontSize: 14, color: "#6B7280", flex: 1 }}>
                {row.label}
              </TranslatedText>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#EB6D00",
                  textAlign: "right",
                  flex: 1,
                }}
              >
                {row.value}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ width: "100%" }}>
          <ActionButton label="Done" onPress={onDone} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
