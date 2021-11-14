import React from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
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

const { width, height} = Dimensions.get('window')

import { Painter,Circle, Color, G ,Mask, MaskG,Rect, Line, PainterH, GH } from "react-native-painter";
import Title from "./Title";
import Status from "./Status";
import Gesture from "./Gesture";

import AnimatedPainter, { getAnimatedProps }  from "./ReanimatedPainter";





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
const colorBlack = Color('black')
const Digit = ({ cx, cy, i,...others }: DigitProps) => {

  return (
    <Circle
    painterKey={`circleDigit${i}`}
    {...others}
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
  const [animatedProps,setAnimatedProps] = getAnimatedProps<any>({},useAnimatedProps(() => {
    return {
      rot: toDegrees(theta.value), 
    };
  }))
  const [animatedProps2,setAnimatedProps2] = getAnimatedProps<any>({},useAnimatedProps(() => {
    return {
      rot: toDegrees(theta.value), 
    };
  }))

  if(Platform.OS === "web" ){
     useAnimatedReaction(()=>theta.value,(v)=>{
        runOnJS(setAnimatedProps!)({rot:toDegrees(v)})
        runOnJS(setAnimatedProps2!)({rot:toDegrees(v)})
     },[])
  }


  return (
    <View style={{width:width,height:height,    backgroundColor: "green",}}>
      <Painter style={styles.container} 
     
      >
      <Mask name="mask"  >
              <AnimatedPainter.MaskG 
              animatedProps={animatedProps2} 
              rotOx={ width/2 } 
              rotOy={  height/2} 
           
         
               >
                  {DIGITS.slice(0, 10).map(({ x, y }, i) => (
                  <Digit key={i} i={i} cx={x} cy={y} />
                ))}
              </AnimatedPainter.MaskG >
          </Mask>
        <Quadrant />
  
        <Circle  
        painterKey="circle1"
          fill={colorWhite}
          cx={center.x}
          cy={center.y}
          r={RADIUS - STROKE_WIDTH}
         
        />
        <AnimatedPainter.Circle
           painterKey="circle2"
        fill={coloTransparent}
        cx={center.x}
        cy={center.y}
        r={r}
        strokeWidth={STROKE_WIDTH - PADDING}
        stroke={colorWhite}
        strokeCap="round"
        dashArray={820}
        animatedProps={animatedProps}
        rotOx={width/2 } 
        rotOy={  height/2} 
        strokeStart={0.3}
        />
        <G mask="mask">
          <Quadrant  />
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
    width:'100%',
    height:'100%',
    position:'absolute',
    left:0,
    top:0

  },
});


export default RotaryPainter;