import React, { useEffect, useRef, useState } from 'react'
import { View,StyleSheet,Image, Dimensions ,Text, TouchableWithoutFeedback} from 'react-native'
import { DrawableView } from 'react-native-drawableview'
import { Color, LinearGradient } from 'react-native-gradientview'
import Animated, { Easing, runOnJS, useAnimatedProps, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { SharedElement } from 'react-navigation-shared-element'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const linearHeight = windowHeight * 1.2
const colorWhite = Color('white')
const AnimatedShared = Animated.createAnimatedComponent(SharedElement)
const AnimatedLinear = Animated.createAnimatedComponent(LinearGradient)
const MemoItem = React.memo((props:any)=>{
        return  <LinearGradient style={styles.wh100} 
        colors={[props.colorInt,colorWhite]}
        // positions={[0.8,1]}
     />
},(r1:any,r2:any)=>{
    return r1.colorInt === r2.colorInt
})

const Details = (props:any)=>{
    const {route , navigation } = props

    const sharedLinearTransY = useSharedValue(0)
    const sharedLinearToBg = useSharedValue(false)
    const sharedColorText = useSharedValue(false)
    const animatedStyle = useAnimatedStyle(()=>{
        return {
            transform:[{translateY:sharedLinearTransY.value * -linearHeight}]
        }
    })
  const animatedLinearProps = useAnimatedProps(()=>{
      return {
          positions:sharedLinearToBg.value ? [1,1.2] : [0.8,1]
      }
  })

  const [colorText,setColorText] = useState('white')

    useEffect(()=>{
            setTimeout(()=>{
                sharedLinearTransY.value = withTiming(1,{duration:600,easing:Easing.out(Easing.exp)})
            },600)
    },[])

    useAnimatedReaction(()=>sharedLinearTransY.value,
    (v)=>{
        var result = v >= 0.55
        if(result !== sharedColorText.value ){
            sharedColorText.value = result
            runOnJS(setColorText)(result ? 'black' : 'white' )
        }
         
    })

    const navigateBack = (action:any)=>{
        sharedLinearToBg.value = true
        allowBack.current = true
        navigation.dispatch(action)
    }

    const allowBack = useRef(false)
    const isAnimatingClose = useRef(false)
    useEffect(
        () =>
          navigation.addListener('beforeRemove', (e:any) => {
           if(allowBack.current) {
                allowBack.current = false
                return
           }

           e.preventDefault(); 
            
            if(!isAnimatingClose.current) {
                isAnimatingClose.current = true
               
                sharedLinearTransY.value = withTiming(0,{duration:600,easing:Easing.out(Easing.exp)},()=>{
                    runOnJS(navigateBack)(e.data.action)
                })
            }
               
          }),

        [navigation]
      );

    return (
        <View style={styles.container}>
            
            <AnimatedShared id={`item.bg${route.params.index}.color`} style={[styles.bg,animatedStyle]}>
                <AnimatedLinear style={[{width:'100%',height:'100%'}]} 
                    colors={[route.params.item.colorInt,colorWhite]}
                    animatedProps={animatedLinearProps}
                    // positions={[0.8,1]}
                />
              
            </AnimatedShared>
           
            <SharedElement id={`item.main${route.params.index}.photo`} style={styles.mainPhoto}>
                <Image style={styles.wh100}
                    source={route.params.item.img}
                    resizeMethod="resize"
                    resizeMode="contain"
                    fadeDuration={0}
                />
            </SharedElement>
            <View style={styles.topSpace}></View>
            <SharedElement id={`item.title${route.params.index}.text`}>
                <Text style={[styles.title,{color:colorText}]}>{route.params.item.title}</Text>
            </SharedElement>
            {route.params.item.title2 !== '' &&  
                <SharedElement id={`item.title2${route.params.index}.text`}>
                        <Text style={[styles.title,{color:colorText}]}>{route.params.item.title2}</Text>
                </SharedElement>
            }
            <SharedElement id={`item.name${route.params.index}.text`}>
                 <Text style={[styles.name,{color:colorText}]}>{route.params.item.name}</Text>
            </SharedElement>

            <TouchableWithoutFeedback onPress={(e)=>{
                 props.navigation.goBack();
            }}>
                <View style={styles.buttonback} >
                <DrawableView style={styles.wh100}
                                        d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"
                                        viewBox={[0,0,24,24]}
                                        rot={-180}
                                        rotO={0.5}
                                        rotPercentageValue={true}
                                        
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingHorizontal:windowWidth*0.15,
    },
    wh100:{
        width:'100%',
        height:'100%'
    },
    bg:{
      width: windowWidth,
      height:windowHeight*1.2,
      position:'absolute',
      left:0,
      top:0
    },
    mainPhoto:{
        width:windowWidth,
        height:windowHeight*0.5,
        position:'absolute',
        left:0,
        top:10
    },
    title:{
        fontSize:52,
        fontWeight:'bold',
        lineHeight: 52 * 1.1
    },
    name:{
        fontSize:22,
    },
    topSpace:{
        width:windowWidth,
        height:windowHeight*0.52
    },
    buttonback:{
        position:'absolute',
        left:40,
        top:60,
        width:40,
        height:40,

    }
})

export default Details