import React from 'react'
import { Platform } from "react-native"
import { Path } from "react-native-painter"
import Animated from "react-native-reanimated"


const AnimatedComp = Platform.OS === 'web' ? Path : Animated.createAnimatedComponent(Path)


const RePath = (props)=>{

    const { animatedProps,...others} = props

    return ( 
        Platform.OS === 'web' ? 
            <AnimatedComp {...others} {...animatedProps} />
        :
        <AnimatedComp {...others} animatedProps={animatedProps}  />
    )
}


export default RePath