import React from 'react'
import { Platform } from "react-native"
import { LinearGradient } from "react-native-painter"
import Animated from "react-native-reanimated"


const AnimatedComp = Platform.OS === 'web' ? LinearGradient : Animated.createAnimatedComponent(LinearGradient)


const ReLinearGradient = (props)=>{

    const { animatedProps,...others} = props

    return ( 
        Platform.OS === 'web' ? 
            <AnimatedComp {...others} {...animatedProps} />
        :
        <AnimatedComp {...others} animatedProps={animatedProps}  />
    )
}


export default ReLinearGradient