import { TranslatedText } from "@/components/ui/TranslatedText";
import { MatchCompetition } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import {
  ImageBackground,
  LayoutChangeEvent,
  Pressable,
  Text,
  View,
} from "react-native";
import { Path, Svg } from "react-native-svg";

interface Props {
  match: MatchCompetition;
  onPredict: (matchId: string) => void;
}

const BTN_H = 55;
const BTN_R = 16;
const CARD_R = 16;

// Notch A — top-right of button pocket
const NOTCH_A_SIZE = 16; // bigger = larger arc
const NOTCH_A_MOVE_LEFT = 0; // + moves notch left,  - moves right
const NOTCH_A_MOVE_DOWN = 0; // + moves notch down,  - moves up

// Notch B — bottom-left of button pocket
const NOTCH_B_SIZE = 16; // bigger = larger arc
const NOTCH_B_MOVE_LEFT = 0; // + moves notch left,  - moves right
const NOTCH_B_MOVE_DOWN = 0; // + moves notch down,  - moves up

export default function MatchCard({ match, onPredict }: Props) {
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });
  const [btnWidth, setBtnWidth] = useState(0);

  const onCardLayout = useCallback((e: LayoutChangeEvent) => {
    setCardSize({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  }, []);

  const onBtnLayout = useCallback((e: LayoutChangeEvent) => {
    setBtnWidth(e.nativeEvent.layout.width);
  }, []);

  const { width: W, height: H } = cardSize;
  const bW = btnWidth;
  const bL = W - bW;
  const bT = H - BTN_H;

  // Notch A anchor: top-right corner of button (right card wall × button top)
  // Base position: (W, bT)
  const aX = W - NOTCH_A_MOVE_LEFT;
  const aY = bT + NOTCH_A_MOVE_DOWN;

  // Notch B anchor: bottom-left corner of button (button left × card bottom)
  // Base position: (bL, H)
  const bX = bL - NOTCH_B_MOVE_LEFT;
  const bY = H + NOTCH_B_MOVE_DOWN;

  const notchFillPath =
    W && H && bW
      ? [
          // Notch A: quarter-circle filler at top-right of button pocket
          `M ${aX} ${aY}`,
          `L ${aX - NOTCH_A_SIZE} ${aY}`,
          `Q ${aX} ${aY} ${aX} ${aY - NOTCH_A_SIZE}`,
          `Z`,

          // Notch B: quarter-circle filler at bottom-left of button pocket
          `M ${bX} ${bY}`,
          `L ${bX} ${bY - NOTCH_B_SIZE}`,
          `Q ${bX} ${bY} ${bX - NOTCH_B_SIZE} ${bY}`,
          `Z`,
        ].join(" ")
      : null;

  return (
    <View className="w-full mb-6" onLayout={onCardLayout}>
      {/* White card background — visible through notch cutouts */}
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: CARD_R,
          overflow: "hidden",
          borderWidth: 0,
        }}
      >
        <ImageBackground
          source={
            typeof match.backgroundImage === "string"
              ? { uri: match.backgroundImage }
              : match.backgroundImage
          }
          style={{ width: "100%" }}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingTop: 24,
              paddingBottom: 0,
            }}
          >
            {/* Top Titles */}
            <View className="items-center mb-6">
              <TranslatedText className="text-white text-2xl font-bold tracking-wide">
                {match.title}
              </TranslatedText>
              <Text className="text-white text-lg font-medium tracking-wider mt-1">
                {match.teamA.name} VS {match.teamB.name}
              </Text>
            </View>

            {/* Middle Stats */}
            <View className="flex-row justify-center gap-10 mb-8 items-center">
              <View className="items-center">
                <TranslatedText className="text-white/90 text-sm font-semibold mb-1">
                  Entry Fee
                </TranslatedText>
                <Text className="text-white text-3xl font-extrabold">
                  {match.entryFee} HTG
                </Text>
              </View>
              <View className="items-center">
                <TranslatedText className="text-white/90 text-sm font-semibold mb-1">
                  Prize Pool
                </TranslatedText>
                <Text className="text-white text-3xl font-extrabold">
                  {match.prizePool} HTG
                </Text>
              </View>
            </View>

            {/* Bottom Footer Row */}
            <View className="flex-row justify-between items-end">
              <Text className="text-white/80 text-xs font-medium pb-5">
                {match.dateTime}
              </Text>
              {/* Space reserved for the button so content doesn't overlap */}
              <View style={{ width: bW || 130, height: BTN_H }} />
            </View>
          </LinearGradient>
        </ImageBackground>

        {/* SVG overlay — paints white quarter-circle fills at Notch A and Notch B */}
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

      {/* PREDICT NOW BUTTON */}
      <View
        onLayout={onBtnLayout}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        <View className="bg-white rounded-tl-xl pl-3 pt-3 pb-0 pr-0 border-0">
          <Pressable
            onPress={() => onPredict(match.id)}
            disabled={match.status === "upcoming"}
            className={`px-6 py-3.5 rounded-lg ${
              match.status === "upcoming" ? "bg-gray-300" : "bg-primary"
            }`}
          >
            <TranslatedText
              className={`font-semibold ${
                match.status === "upcoming" ? "text-secondary" : "text-white"
              }`}
            >
              Predict Now
            </TranslatedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// import { TranslatedText } from "@/components/ui/TranslatedText";
// import { MatchCompetition } from "@/types";
// import { LinearGradient } from "expo-linear-gradient";
// import { useCallback, useState } from "react";
// import {
//   ImageBackground,
//   LayoutChangeEvent,
//   Pressable,
//   Text,
//   View,
// } from "react-native";
// import { Path, Svg } from "react-native-svg";

// interface Props {
//   match: MatchCompetition;
//   onPredict: (matchId: string) => void;
// }

// const BTN_H = 55;
// const BTN_R = 16; // rounded-2xl
// const CARD_R = 16;
// const NOTCH_R = BTN_R;

// export default function MatchCard({ match, onPredict }: Props) {
//   const [cardSize, setCardSize] = useState({ width: 0, height: 0 });
//   const [btnWidth, setBtnWidth] = useState(0);

//   const onCardLayout = useCallback((e: LayoutChangeEvent) => {
//     setCardSize({
//       width: e.nativeEvent.layout.width,
//       height: e.nativeEvent.layout.height,
//     });
//   }, []);

//   const onBtnLayout = useCallback((e: LayoutChangeEvent) => {
//     setBtnWidth(e.nativeEvent.layout.width);
//   }, []);

//   const { width: W, height: H } = cardSize;
//   const bW = btnWidth;
//   const bL = W - bW; // button left x
//   const bT = H - BTN_H; // button top y

//   /*
//     SVG mask strategy:
//     We paint TWO small white quarter-circle "filler" shapes at exactly:
//       Notch A — top-right corner of button (right card wall × button top)
//       Notch B — bottom-left corner of button (button left × card bottom)

//     These white fillers sit ON TOP of the image, matching the card's white
//     background, creating the illusion of concave notches carved into the image.
//     The button itself is completely untouched — rendered separately below the SVG.
//   */
//   const notchFillPath =
//     W && H && bW
//       ? [
//           // Notch A: fills the corner between card right wall and button top
//           // A small square in that corner, with a quarter-circle cut out
//           // = full square MINUS the quarter circle = the "L" shaped filler
//           // Simpler: draw a filled quarter-circle ARC shape that "fills" the concave gap
//           // Arc from (W, bT) sweeping to fill the notch corner
//           `M ${W} ${bT}`,
//           `L ${W - NOTCH_R} ${bT}`,
//           `Q ${W} ${bT} ${W} ${bT - NOTCH_R}`,
//           `Z`,

//           // Notch B: fills the corner between button left and card bottom
//           `M ${bL} ${H}`,
//           `L ${bL} ${H - NOTCH_R}`,
//           `Q ${bL} ${H} ${bL - NOTCH_R} ${H}`,
//           `Z`,
//         ].join(" ")
//       : null;

//   return (
//     <View className="w-full mb-6" onLayout={onCardLayout}>
//       {/* White card background — visible through notch cutouts */}
//       <View
//         style={{
//           width: "100%",
//           backgroundColor: "white",
//           borderRadius: CARD_R,
//           overflow: "hidden",
//           borderWidth: 0,
//         }}
//       >
//         <ImageBackground
//           source={
//             typeof match.backgroundImage === "string"
//               ? { uri: match.backgroundImage }
//               : match.backgroundImage
//           }
//           style={{ width: "100%" }}
//           resizeMode="cover"
//         >
//           <LinearGradient
//             colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
//             style={{
//               width: "100%",
//               paddingHorizontal: 20,
//               paddingTop: 24,
//               paddingBottom: 0,
//             }}
//           >
//             {/* Top Titles */}
//             <View className="items-center mb-6">
//               <TranslatedText className="text-white text-2xl font-bold tracking-wide">
//                 {match.title}
//               </TranslatedText>
//               <Text className="text-white text-lg font-medium tracking-wider mt-1">
//                 {match.teamA.name} VS {match.teamB.name}
//               </Text>
//             </View>

//             {/* Middle Stats */}
//             <View className="flex-row justify-center gap-10 mb-8 items-center">
//               <View className="items-center">
//                 <TranslatedText className="text-white/90 text-sm font-semibold mb-1">
//                   Entry Fee
//                 </TranslatedText>
//                 <Text className="text-white text-3xl font-extrabold">
//                   {match.entryFee} HTG
//                 </Text>
//               </View>
//               <View className="items-center">
//                 <TranslatedText className="text-white/90 text-sm font-semibold mb-1">
//                   Prize Pool
//                 </TranslatedText>
//                 <Text className="text-white text-3xl font-extrabold">
//                   {match.prizePool} HTG
//                 </Text>
//               </View>
//             </View>

//             {/* Bottom Footer Row */}
//             <View className="flex-row justify-between items-end">
//               <Text className="text-white/80 text-xs font-medium pb-5">
//                 {match.dateTime}
//               </Text>
//               {/* Space reserved for the button so content doesn't overlap */}
//               <View style={{ width: bW || 130, height: BTN_H }} />
//             </View>
//           </LinearGradient>
//         </ImageBackground>

//         {/*
//           SVG overlay — paints white quarter-circle fills at Notch A and Notch B.
//           This sits on top of the image ONLY, does NOT cover the button area.
//           zIndex kept low so button renders above it.
//         */}
//         {notchFillPath && W && H ? (
//           <Svg
//             width={W}
//             height={H}
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               pointerEvents: "none",
//             }}
//           >
//             <Path d={notchFillPath} fill="white" />
//           </Svg>
//         ) : null}
//       </View>

//       {/*
//         PREDICT NOW BUTTON — completely outside the image View.
//         Absolutely positioned bottom-right of the card wrapper.
//         Original styling fully preserved: bg-primary, rounded-2xl, etc.
//       */}
//       <View
//         onLayout={onBtnLayout}
//         style={{
//           position: "absolute",
//           bottom: 0,
//           right: 0,
//           zIndex: 20,
//         }}
//       >
//         <View className="bg-white rounded-tl-xl pl-3 pt-3 pb-0 pr-0 border-0">

//         <Pressable
//           onPress={() => onPredict(match.id)}
//           disabled={match.status === "upcoming"}
//           className={`px-6 py-3.5 rounded-lg ${
//             match.status === "upcoming" ? "bg-gray-300" : "bg-primary"
//           }`}
//         >
//           <TranslatedText
//             className={`font-semibold ${
//               match.status === "upcoming" ? "text-secondary" : "text-white"
//             }`}
//           >
//             Predict Now
//           </TranslatedText>
//           </Pressable>
//           </View>
//       </View>
//     </View>
//   );
// }
