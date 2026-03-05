import { useCallback, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Path, Svg } from "react-native-svg";

const BTN_H = 55;
const CARD_R = 16;
const NOTCH_R = 16;

export const MatchSkeleton = () => {
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });
  const [btnWidth, setBtnWidth] = useState(130); // fixed width for skeleton button

  const onCardLayout = useCallback((e: LayoutChangeEvent) => {
    setCardSize({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  }, []);

  const { width: W, height: H } = cardSize;
  const bW = btnWidth;
  const bL = W - bW;
  const bT = H - BTN_H;

  const notchFillPath =
    W && H
      ? [
          // Notch A: filler at top-right of button pocket
          `M ${W} ${bT}`,
          `L ${W - NOTCH_R} ${bT}`,
          `Q ${W} ${bT} ${W} ${bT - NOTCH_R}`,
          `Z`,

          // Notch B: filler at bottom-left of button pocket
          `M ${bL} ${H}`,
          `L ${bL} ${H - NOTCH_R}`,
          `Q ${bL} ${H} ${bL - NOTCH_R} ${H}`,
          `Z`,
        ].join(" ")
      : null;

  return (
    <View className="w-full mb-6" onLayout={onCardLayout}>
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: CARD_R,
          overflow: "hidden",
        }}
      >
        {/* Placeholder for ImageBackground */}
        <View
          className="bg-gray-100 px-5 pt-6 pb-0"
          style={{ width: "100%", height: 210 }}
        >
          {/* Top Section */}
          <View className="items-center mb-6">
            <View className="h-7 w-32 bg-gray-200 rounded-md mb-2" />
            <View className="h-5 w-48 bg-gray-200 rounded-md" />
          </View>

          {/* Middle Stats */}
          <View className="flex-row justify-center gap-10 mb-8 items-center">
            <View className="items-center">
              <View className="h-4 w-16 bg-gray-200 rounded mb-2" />
              <View className="h-8 w-24 bg-gray-200 rounded-md" />
            </View>
            <View className="items-center">
              <View className="h-4 w-16 bg-gray-200 rounded mb-2" />
              <View className="h-8 w-24 bg-gray-200 rounded-md" />
            </View>
          </View>

          {/* Bottom Footer placeholder */}
          <View className="flex-row justify-between items-end mb-4">
            <View className="h-4 w-32 bg-gray-200 rounded pb-5" />
          </View>
        </View>

        {/* SVG overlay — paints white quarter-circle fills */}
        {notchFillPath && W && H ? (
          <Svg
            width={W}
            height={H}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
            }}
          >
            <Path d={notchFillPath} fill="white" />
          </Svg>
        ) : null}
      </View>

      {/* Button Placeholder pocket */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        <View className="bg-white rounded-tl-xl pl-3 pt-3 pb-0 pr-0">
          <View
            style={{ width: 130, height: 48 }}
            className="rounded-lg bg-gray-200"
          />
        </View>
      </View>
    </View>
  );
};
