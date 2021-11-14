import React from 'react'
import { Platform } from "react-native"
import { Ellipse } from "react-native-painter"
import Animated from "react-native-reanimated"


const AnimatedComp = Platform.OS === 'web' ? Ellipse : Animated.createAnimatedComponent(Ellipse)


const ReEllipse = (props)=>{

    const { animatedProps,...others} = props

    return ( 
        Platform.OS === 'web' ? 
            <AnimatedComp {...others} {...animatedProps} />
        :
        <AnimatedComp {...others} animatedProps={animatedProps}  />
    )
}


export default ReEllipse