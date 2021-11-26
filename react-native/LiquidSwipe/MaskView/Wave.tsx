import React, { ReactElement } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import { Color, Painter , Path } from "react-native-painter";
import { Vector } from "react-native-redash";

import { SlideProps } from "./Slide";
import {MaskView, MaskViewH} from "react-native-maskview";

export const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
export const MIN_LEDGE = 25;
export const MARGIN_WIDTH = MIN_LEDGE + 50;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const vec2 = (x: number, y: number) => {
  "worklet";
  return { x, y };
};
const curve = (c1: Vector, c2: Vector, to: Vector) => {
  "worklet";
  return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};

export enum Side {
  LEFT,
  RIGHT,
  NONE,
}

interface WaveProps {
  side: Side;
  position: Vector<Animated.SharedValue<number>>;
  children: ReactElement<SlideProps>;
  isTransitioning: Animated.SharedValue<boolean>;
}

const colorBlack =Color('black')
const Wave = (
  {
    side,
    position: { x, y },
    children,
    isTransitioning,
  }: WaveProps

) => {
  const R = useDerivedValue(() => {
    return Math.min(x.value - MIN_LEDGE, WIDTH / 2);
  });
  const ledge = useDerivedValue(() => {
    const minLedge = interpolate(
      x.value,
      [0, MIN_LEDGE],
      [0, MIN_LEDGE],
      Extrapolate.CLAMP
    );
    const baseLedge = minLedge + Math.max(0, x.value - MIN_LEDGE - R.value);
    return withSpring(isTransitioning.value ? x.value : baseLedge);
  });
  const animatedProps = useAnimatedProps(() => {
    const stepY = x.value - MIN_LEDGE; // R = 50
    const stepX = R.value / 2; // R/2
    // 0.5522847498 is taken from https://spencermortensen.com/articles/bezier-circle/
    const C = stepY * 0.5522847498;

    const p1 = { x: ledge.value, y: y.value - 2 * stepY };
    const p2 = vec2(p1.x + stepX, p1.y + stepY);
    const p3 = vec2(p2.x + stepX, p2.y + stepY);
    const p4 = vec2(p3.x - stepX, p3.y + stepY);
    const p5 = vec2(p4.x - stepX, p4.y + stepY);

    const c11 = vec2(p1.x, p1.y + C);
    const c12 = vec2(p2.x, p2.y);

    const c21 = vec2(p2.x, p2.y);
    const c22 = vec2(p3.x, p3.y - C);

    const c31 = vec2(p3.x, p3.y + C);
    const c32 = vec2(p4.x, p4.y);

    const c41 = vec2(p4.x, p4.y);
    const c42 = vec2(p5.x, p5.y - C);

    return {
      d: 
      [
        "M 0 0",
        `H ${p1.x}`,
        `V ${p1.y}`,
        curve(c11, c12, p2),
        curve(c21, c22, p3),
        curve(c31, c32, p4),
        curve(c41, c42, p5),
        `V ${HEIGHT}`,
        "H 0",
      ].join(" ")
      ,
    };
  });
  const maskElement = (

       <Painter
      style={[
        StyleSheet.absoluteFillObject,
        {
          transform: [{ rotateY: side === Side.RIGHT ? "180deg" : "0deg" }],
        }]
      }
    >
      <AnimatedPath
        fill={colorBlack}
        animatedProps={animatedProps}
      />
    </Painter>
 
  );

  return (

 
    <MaskView style={StyleSheet.absoluteFill} mask={maskElement}>
      {children}
    </MaskView>
  );
};

export default Wave;
