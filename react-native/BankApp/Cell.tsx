import React, { useState } from 'react'
import { StyleSheet, View, Text, Dimensions, Platform, ScaledSize, Image } from 'react-native'

import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedReaction, useAnimatedStyle } from 'react-native-reanimated'
import { getAnimatedStyle } from './reanimated'
import { Data } from './Types'

const getWidth = (dim:ScaledSize):number=>{
    if(Platform.OS === 'web'){
        return dim.height * 0.5
    }
    return dim.width
}

const getHeight = (dim:ScaledSize):number=>{
    return dim.height
}


const ScreenSize = Dimensions.get(Platform.OS === 'web' ? 'window' : 'screen')
const width = getWidth(ScreenSize)


const Cell = (props:{
    item:Data,
    index:number,
    animatorValue:Animated.SharedValue<number>,
    allPositions:number[]
})=>{




    const offset = props.allPositions[props.index]

    const input = [-1,0]

    const [animatedStyle,setAnimatedStyle] = getAnimatedStyle({},useAnimatedStyle(()=>{
        const result = props.animatorValue.value - offset
        const inte = interpolate(result,input,[1,0.2],Extrapolate.CLAMP)
        return {
            opacity: inte
        }
    }))


    if(Platform.OS === 'web'){
        useAnimatedReaction(()=> props.animatorValue.value,(v)=>{
            const result = v - offset
            const inte = interpolate(result,input,[1,0.2],Extrapolate.CLAMP)
            runOnJS(setAnimatedStyle!)({
                opacity: inte
            })
        },[offset])
    }

    return (
        <Animated.View style={[styles.size100,styles.cell,animatedStyle]}>
            <Image style={styles.userImage}
              source={{uri:props.item.image}}
            />
            <View style={styles.textName}>
                  <Text style={{color:'white',fontSize:20}} >{props.item.name}</Text>
            </View>
            <Text style={styles.textAmmount}>{props.item.ammount}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    size100:{
     width:'100%',
     height:'100%'
    },
    cell:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
 
    },
    textName:{
        flex:1,
        display:'flex',
        height:'100%',
        justifyContent:'center',
        paddingHorizontal:10
    },
    textAmmount:{
        height:'100%',
        color:'white',
        fontSize:22,
        textAlign: 'center',
        textAlignVertical:'center'
    },
    userImage:{
        width:width * 0.12,
        height:'100%'
    },
})

export default Cell