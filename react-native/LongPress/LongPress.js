
import React, {useState }  from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';

import Animated from "react-native-reanimated"
const { 
  Value,
  event,
  cond,
  eq,
  set,
  block,
  useCode
}  = Animated

import { State, TapGestureHandler } from "react-native-gesture-handler"
import { progressAnimator } from './utils/Animators.js'
import { progressInterpolate,rProgressInterpolate } from './utils/Utils.js'
import { CircleProgressView ,ClipRectView} from 'react-native-jjkit'
import FingerPrint from './svgs/FingerPrint.js'
import CheckCircle from './svgs/CheckCircle.js';

const CircleProgress = Animated.createAnimatedComponent(CircleProgressView);
const ClipRect = Animated.createAnimatedComponent(ClipRectView);


 
const LongPress = () => {

    const state = new Value(State.UNDETERMINED)
    const gestureHandler =  onGestureEventListener({ state })
    const inTransitionIcon = new Value(false)
    const isBegan = cond(eq(inTransitionIcon,false),eq(state,State.BEGAN))
    const duration = cond(isBegan,700,350)
    const progress = progressAnimator(isBegan,duration)
    const progressClipper = cond(eq(inTransitionIcon,false),progress,0)

    const scale = progressInterpolate(progress,1,1.4)
    const scaleCheck = cond(inTransitionIcon,rProgressInterpolate(progress,0.5,1),1)
    const scaleFinger = cond(inTransitionIcon,rProgressInterpolate(progress,0.5,1),1)

    const isCheck  = new Value(false)
    const opacityCheck = cond(isCheck,1,0)
    const opacityFinger = cond(isCheck,0,1)

    useCode(()=> block([
      cond(eq(progress,1),
      cond(eq(inTransitionIcon,false),
      cond(eq(isCheck,false),set(isCheck,true),set(isCheck,false)))),
         cond(eq(progress,1),set(inTransitionIcon,true)),
         cond(eq(progress,0),set(inTransitionIcon,false))
    ]),
    [progress]
    )


   return (
      <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <TapGestureHandler {...gestureHandler}
            maxDurationMs={750}
            maxDist={500} 
              >
            <Animated.View style={ [styles.buttonContainer,{ transform: [{ scale }] } ]}>
            <CircleProgress style={styles.circle}   progress={progress} colors={["#7936d9","#7936d9"]} >
              <View style={styles.iconSize}  >

                <Animated.View style={{...styles.iconSize,position:'absolute', opacity: opacityCheck, transform : [{ scale: scaleCheck}]}} >
                   <CheckCircle style={{...styles.iconSize, color:"#7936d9"}} />
                </Animated.View>

                <Animated.View style={{...styles.iconSize,position:'absolute', opacity: opacityFinger,transform : [{ scale: scaleFinger}] }} >
                    <FingerPrint  style={{...styles.iconSize, color:"#CCCCCC"}} />
                    <ClipRect style={styles.iconSize} progress={progressClipper} inset={6} >
                          <FingerPrint  style={{...styles.iconSize, color:"#7936d9"}} />
                    </ClipRect>

                 </Animated.View>
              </View>

            </CircleProgress>
            
            </Animated.View>
          </TapGestureHandler>
      
      </View>
      </>
      )
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems : "center",
    backgroundColor: "#ccc"
  },
  buttonContainer: {
    width: 130,
    height: 130,
    backgroundColor: 'white',
    borderRadius: 65,
    padding: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    elevation: 20

  },
  circle: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  iconSize: {
    width:80,
    height: 80,
  },

})




export default LongPress
