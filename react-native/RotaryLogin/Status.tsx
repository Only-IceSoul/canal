import React from "react";
import { Dimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { Circle, Color } from "react-native-painter";


import { center, RADIUS } from "./Quadrant";

const { width } = Dimensions.get("window");
const r = 8;
const cx = width - (center.x - RADIUS);
const cy = center.y - RADIUS - 50;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const colorBlack = Color('black')
const colorWhite = Color('white')
const colorRed = Color('red')

interface Digit {
  tries: Animated.SharedValue<number>;
  i: number;
}

const Digit = ({ tries, i }: Digit) => {
  const transition = useSharedValue(0);
  const endTransition = useSharedValue(0);
  const origin = { x: cx - i * 3 * r, y: cy };
  const animatedProps = useAnimatedProps(() => ({
    opacity: transition.value,
      sc: transition.value , 
     scOx: origin.x , 
     scOy:origin.y 
  }));
  const animatedProps2 = useAnimatedProps(() => ({
    opacity: endTransition.value
  
  }));
  useAnimatedReaction(
    () => tries.value,
    (l) => {
      if (l === i) {
        transition.value = withTiming(
          1,
          { duration: 650, easing: Easing.inOut(Easing.ease) }, ()=>{
            if(i === 3){
              tries.value = -5
            }

          } 
        );
      }
      if(l === -5){
        endTransition.value = withDelay(
              100 * i,
              withTiming(1, { duration: 150 } ,()=>{
                  if(i === 3){
                    tries.value = -10
                  }
              })
            );
      }
      if( l === -10){
        endTransition.value = 0;
        transition.value = withTiming(
          0,
          { duration: 350, easing: Easing.inOut(Easing.ease) }
         ,()=>{
          if(i === 3){
            tries.value = -1
          }
         }
        );
      }
    
    }
  );

  return (
    <>
      <Circle
        cx={origin.x}
        cy={origin.y}
        r={r}
        fill={colorBlack}
        stroke={colorBlack}
        strokeWidth={4}
      />
      <AnimatedCircle
        cx={origin.x}
        cy={origin.y}
        r={r - 2}
        fill={colorWhite}
        animatedProps={animatedProps}
      />
      <AnimatedCircle
        cx={origin.x}
        cy={origin.y}
        r={r - 2}
        fill={colorRed}
        animatedProps={animatedProps2}
      />
    </>
  );
};

interface StatusProps {
  tries: Animated.SharedValue<number>;
}

const Status = ({ tries }: StatusProps) => {
  return (
    <>
      {new Array(4).fill(0).map((_, i) => (
        <Digit key={i} i={i} tries={tries} />
      ))}
    </>
  );
};

export default Status;