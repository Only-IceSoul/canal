import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { Data } from './Types'


const TitleScale = 1.2

const SectionTitle = (props:{
    item:Data,
    index:number,
    allPositions:number[],
    animatorValue:Animated.SharedValue<number> 
})=>{

    const offset = props.allPositions[props.index]

    const input = [-1,TitleScale]

    const animatedStyle = useAnimatedStyle(()=>{
        const result = props.animatorValue.value - offset
        const inte = interpolate(result,input,[1,0.2])
        return {
            opacity: inte
        }
    })
    


    return (
        <Animated.View style={[styles.size100,{flexDirection:'row',alignItems:'center'},animatedStyle]}>
            <Text style={styles.textTitle} >{props.item.title}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    size100:{
     width:'100%',
     height:'100%'
    },
    textTitle:{
        color:'white',
        fontSize:28,
    }
})

export default SectionTitle