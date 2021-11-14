import React from "react";
import { Dimensions, Platform } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
  withDelay,
  runOnJS,
} from "react-native-reanimated";
import { Circle, Color } from "react-native-painter";


import { center, RADIUS } from "./Quadrant";

import AnimatedPainter from "./ReanimatedPainter";


const { width } = Dimensions.get("window");
const r = 8;
const cx = width - (center.x - RADIUS);
const cy = center.y - RADIUS - 50;


const colorBlack = Color('black')
const colorWhite = Color('white')
const colorRed = Color('red')

interface Digit {
  tries: Animated.SharedValue<number>;
  i: number;
}

const Digit = ({ tries, i ,...others}: Digit) => {
  
  const transition = useSharedValue(0);
  const endTransition = useSharedValue(0);
  const origin = { x: cx - i * 3 * r, y: cy };
  const [animatedProps,setAnimatedProps] = AnimatedPainter.getAnimatedProps<any>({},useAnimatedProps(() => ({
    opacity: transition.value,
      sc: transition.value , 
     scOx: origin.x , 
     scOy:origin.y 
  }))
  )
  const [animatedProps2,setAnimatedProps2] = AnimatedPainter.getAnimatedProps<any>({} ,useAnimatedProps(() => ({
    opacity: endTransition.value
  
  }))
  )

  if(Platform.OS === "web"){
    useAnimatedReaction(()=> transition.value ,(v)=>{
         runOnJS(setAnimatedProps!)({
          opacity: v,
            sc: v , 
           scOx: origin.x , 
           scOy:origin.y 
        })
    },[])
    useAnimatedReaction(()=> endTransition.value ,(v)=>{
      runOnJS(setAnimatedProps2!)({
       opacity: v,
     })
 },[])

  }


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
    
    },[]
  );

  return (
    <>
      <Circle {...others}
        cx={origin.x}
        cy={origin.y}
        r={r}
        fill={colorBlack}
        stroke={colorBlack}
        strokeWidth={4}
      />
      <AnimatedPainter.Circle
      {...others}
        cx={origin.x}
        cy={origin.y}
        r={r - 2}
        fill={colorWhite}
        animatedProps={animatedProps}
      />
      <AnimatedPainter.Circle
      {...others}
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

const Status = ({ tries,...others }: StatusProps) => {

  return (
    <>
      {new Array(4).fill(0).map((_, i) => (
        <Digit {...others} key={i} i={i} tries={tries} />
      ))}
    </>
  );
};

export default Status;