import React from 'react'
import { Platform } from "react-native"
import { ClipPathView } from 'react-native-clippathview'
import Animated from "react-native-reanimated"


const AnimatedComp = Platform.OS === 'web' ? ClipPathView : Animated.createAnimatedComponent(ClipPathView)


const ReClipPath = (props)=>{

    const { animatedProps,...others} = props

    return ( 
        Platform.OS === 'web' ? 
            <AnimatedComp {...others} {...animatedProps} />
        :
        <AnimatedComp {...others} animatedProps={animatedProps}  />
    )
}


export default ReClipPath