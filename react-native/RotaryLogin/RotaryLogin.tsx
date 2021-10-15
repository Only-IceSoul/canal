import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { PI } from "react-native-redash";

import Quadrant, {
  STROKE_WIDTH,
  RADIUS,
  center,
  DIGITS,
  PADDING,
} from "./Quadrant";

import { Painter,Circle, Color, G ,Mask, MaskG,Rect, Line, PainterH, GH } from "react-native-painter";
import Title from "./Title";
import Status from "./Status";
import Gesture from "./Gesture";


const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedMaskG = Animated.createAnimatedComponent(MaskG)

const toDegrees = (value:number) : number => {
  "worklet";
  return value * ( 180 / PI);
}

interface DigitProps {
  cx: number;
  cy: number;
  i: number;
}
const colorWhite = Color('white');
const coloTransparent = Color('transparent');
const colorRed = Color('red')
const Digit = ({ cx, cy, i }: DigitProps) => {

  return (
    <Circle
      key={i}
      cx={cx}
      cy={cy}
      r={STROKE_WIDTH / 2 - PADDING}
      fill={colorWhite}
    />
  );
};


const RotaryPainter = () => {
  const passcode = useSharedValue(-1);
  const theta = useSharedValue(0);
  const r = RADIUS - STROKE_WIDTH / 2;
  const animatedProps = useAnimatedProps(() => {
    return {
      rot: toDegrees(theta.value), 
    };
  });
  const animatedProps2 = useAnimatedProps(() => {
    return {
      rot: toDegrees(theta.value), 
     
    };
  });
  return (
    <View style={{ flex: 1}}>
      <Painter style={styles.container} 
     
      >
      <Mask name="mask"  >
              <AnimatedMaskG 
              // style={animatedStyle2}
              animatedProps={animatedProps2} 
              rotOx={0.5} 
              rotOy={0.5} 
              rotPercentageValue={true }
               >
                  {DIGITS.slice(0, 10).map(({ x, y }, i) => (
                  <Digit key={i} i={i} cx={x} cy={y} />
                ))}
              </AnimatedMaskG>
          </Mask>
        <Quadrant />
  
        <Circle
          fill={colorWhite}
          cx={center.x}
          cy={center.y}
          r={RADIUS - STROKE_WIDTH}
        />
        <AnimatedCircle
        fill={coloTransparent}
        cx={center.x}
        cy={center.y}
        r={r}
        strokeWidth={STROKE_WIDTH - PADDING}
        stroke={colorWhite}
        strokeCap="round"
        animatedProps={animatedProps}
        rotOx={0.5} 
        rotOy={0.5} 
        rotPercentageValue={true }
        strokeStart={0.3}
        />
        <G mask="mask">
          <Quadrant />
        </G>
        <Title />
        <Status tries={passcode} />
      </Painter>
      <Gesture theta={theta} passcode={passcode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "green",
  },
});


export default RotaryPainter;