import React from 'react'
import { Platform } from "react-native"
import { Rect } from "react-native-painter"
import Animated from "react-native-reanimated"


const AnimatedComp = Platform.OS === 'web' ? Rect : Animated.createAnimatedComponent(Rect)


const ReRect = (props)=>{

    const { animatedProps,...others} = props

    return ( 
        Platform.OS === 'web' ? 
            <AnimatedComp {...others} {...animatedProps} />
        :
        <AnimatedComp {...others} animatedProps={animatedProps}  />
    )
}


export default ReRect