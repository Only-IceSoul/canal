import React from 'react'
import { Platform } from "react-native"
import { MaskG } from "react-native-painter"
import Animated from "react-native-reanimated"


const AnimatedComp = Platform.OS === 'web' ? MaskG : Animated.createAnimatedComponent(MaskG)


const ReMaskG = (props)=>{

    const { animatedProps,...others} = props

    return ( 
        Platform.OS === 'web' ? 
            <AnimatedComp {...others} {...animatedProps} />
        :
        <AnimatedComp {...others} animatedProps={animatedProps}  />
    )
}


export default ReMaskG