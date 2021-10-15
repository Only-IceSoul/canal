import React from "react";
import { StyleSheet, View } from "react-native";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { canvas2Cartesian, canvas2Polar, normalizeRad, PI } from "react-native-redash";

import { RADIUS, DELTA, STROKE_WIDTH, PADDING } from "./Quadrant";

const SIZE = RADIUS * 2;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  quadrant: {
    width: SIZE,
    height: SIZE,
  },
});
const blockValue = (oldVal: number, newVal: number) => {
  "worklet";
  if ((oldVal > 1.5 * PI && newVal < PI / 2) || oldVal === 0 ) {
    return 2 * PI;
  }
  if (oldVal < PI / 2 && newVal > 1.5 * PI) {
    return 0.01;
  }
  return newVal;
};
const computeSum = (last: number, newVal: number, sum:number) => {
  "worklet";
    const speed = 1
    if(last < PI * 0.25 && newVal > PI * 0.75){
      return    sum + ( ( last + ( ( 2 * PI ) -  newVal )  ) * speed )
    }
    else {
      return  sum + ( (last - newVal)  * speed );
   }
};

const calculateValue = (initial:number)=>{
  let r = 0.20;
  let offset = 0.08
  let pi2 = 2*PI

   switch(true){
        case (initial <= 0.20 && initial >= (pi2 - 0.20) ):
          return 1;
        case (initial >= (r+offset) && initial <= (r*3+offset)):
          return 2;
        case (initial >= (r*3+offset*2) && initial <= (r*5+offset*2) ):
          return 3;

        default:
          return 0;
   }
}


interface GestureProps {
  theta: Animated.SharedValue<number>;
  passcode: Animated.SharedValue<number>;
}

const Gesture = ({ theta, passcode }: GestureProps) => {
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { initial: number
      last: number
      final:number
     sumValue: number
     startCal: boolean }
  >({
    onStart: ({x,y}, ctx) => {
      const newVal = normalizeRad(
        canvas2Polar({ x, y }, { x: RADIUS, y: RADIUS }).theta
      );

      ctx.last = newVal
      ctx.initial = newVal;
      let piMax = (1.5 * PI)
      let pi360 = ( 2*PI)
      let sweep = Math.abs((newVal - piMax) % pi360);
       let sweepRange = pi360 - sweep
      ctx.final = sweepRange - ( 0.04 * PI)
      ctx.final = ctx.initial > (1.5 * PI) ?  sweep : ctx.final 
      ctx.sumValue = 0;
      ctx.startCal = false;
    },
    onActive: ({ x, y }, ctx) => {
      const newVal = normalizeRad(
        canvas2Polar({ x, y }, { x: RADIUS, y: RADIUS }).theta
      );
       if(newVal < ctx.last || (ctx.last < PI * 0.25 && newVal > PI * 0.75)){
          ctx.startCal = true
       }
      
      if(ctx.startCal){
       
        ctx.sumValue = computeSum(ctx.last,newVal, ctx.sumValue);
    
        ctx.sumValue = ctx.sumValue < 0 ? 0 : ctx.sumValue
        ctx.sumValue = ctx.sumValue > ctx.final ? ctx.final : ctx.sumValue
        theta.value = ctx.sumValue
 
        ctx.last = newVal
      }else{
        theta.value = 0
      }
    
    },
    onEnd: (_,ctx) => {
      if(theta.value > 0){
        passcode.value += 1;
   
        theta.value = withSpring(0);
      }
     
    },
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={styles.quadrant} />
      </PanGestureHandler>
    </View>
  );
};

export default Gesture;