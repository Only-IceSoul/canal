import React from 'react'
import { Platform } from "react-native"
import { Line } from "react-native-painter"
import Animated from "react-native-reanimated"


const AnimatedComp = Platform.OS === 'web' ? Line : Animated.createAnimatedComponent(Line)


const ReLine = (props)=>{

    const { animatedProps,...others} = props

    return ( 
        Platform.OS === 'web' ? 
            <AnimatedComp {...others} {...animatedProps} />
        :
        <AnimatedComp {...others} animatedProps={animatedProps}  />
    )
}


export default ReLine