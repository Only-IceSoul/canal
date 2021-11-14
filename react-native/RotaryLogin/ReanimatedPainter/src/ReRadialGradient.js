import React from 'react'
import { Platform } from "react-native"
import { RadialGradient } from "react-native-painter"
import Animated from "react-native-reanimated"


const AnimatedComp = Platform.OS === 'web' ? RadialGradient : Animated.createAnimatedComponent(RadialGradient)


const ReRadialGradient = (props)=>{

    const { animatedProps,...others} = props

    return ( 
        Platform.OS === 'web' ? 
            <AnimatedComp {...others} {...animatedProps} />
        :
        <AnimatedComp {...others} animatedProps={animatedProps}  />
    )
}


export default ReRadialGradient