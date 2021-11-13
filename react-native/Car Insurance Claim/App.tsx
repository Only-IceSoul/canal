
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View,Image as ImageReact, Text as TextReact, Platform } from 'react-native';
import {ClipPathView} from 'react-native-clippathview';
import { GestureHandlerRootView, HandlerStateChangeEvent, State, TapGestureHandler, TapGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { BlurRootView, BlurView } from 'react-native-realtimeblurview';
import Animated, { Easing, runOnJS , useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { DrawableView,Color } from 'react-native-drawableview';
import Fish from './icons/Fish';
import Shower from './icons/Shower';
import Wheel from './icons/Wheel';
import Car from './icons/Car';
import Marker from './icons/Marker';

const colorGray = Color('gray')
const colorWhite = Color('white')

var roundedRectData = function (w:number, h:number, tlr:number, trr:number, brr:number, blr:number,offsetX:number,offsetY:number) {
  return 'M '+ offsetX + ' '  + (tlr + offsetY)
    + ' A ' + tlr + ' ' + tlr  + ' 0 0 1 ' + (tlr + offsetX) + ' ' + offsetY
    + ' L ' + ((w - trr) + offsetX) + ' ' + offsetY
    + ' A ' + trr + ' ' + trr + ' 0 0 1 ' + (w + offsetX) + ' ' + (trr + offsetY)
    + ' L ' + (w + offsetX)  + ' ' + ((h - brr) + offsetY)
    + ' A ' + brr + ' ' + brr + ' 0 0 1 ' + ((w - brr) + offsetX) + ' ' + (h + offsetY)
    + ' L ' + (blr + offsetX) + ' ' + (h + offsetY)
    + ' A ' + blr + ' ' + blr + ' 0 0 1 '+ offsetX + ' ' + ((h - blr) + offsetY)
    + ' Z';
};



const WindowWidth =   Dimensions.get('window').width
const windowHeight =  Dimensions.get('window').height
const MarkWidth = WindowWidth * 0.8
const MarkHeight = windowHeight * 0.55

const IconScale = 0.5

const heightCar = 180
const widthCar = WindowWidth
const App = () => {

  const [isAnimating,setIsAnimating] = useState(true)
  const [damageDetail,setDamageDetail] = useState(false)
  const isScalingCar = useRef(false)

  const handleTapImage = (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      if(event.nativeEvent.state == State.ACTIVE){
          animateImageScale()
      }
  }
  
  const sharedScale = useSharedValue(0)

  const AnimatedScale = useAnimatedStyle(()=>{
    return{
      transform:[{ translateX:widthCar* 0.5 }, {scale:1 + (sharedScale.value * 0.5) },{ translateX:-widthCar* 0.5 }]
    }
  })

  const setIsScalingCar = (value:boolean)=>{
    isScalingCar.current = value;
  }


  const animateImageScale = ()=>{
      if(sharedScale.value === 0){

        if(!isScalingCar.current) { 
           setDamageDetail(true)
            isScalingCar.current = true
            
            sharedScale.value = withTiming(1,{duration:1000,easing:Easing.out(Easing.exp)},(f)=>{
             runOnJS(setIsScalingCar)(false)
           })
       }
    }else{
         if(!isScalingCar.current) { 
            isScalingCar.current = true,
            setDamageDetail(false)
           sharedScale.value =  withTiming(0,{duration:1000,easing:Easing.out(Easing.exp)},(f)=>{
                  runOnJS(setIsScalingCar)(false)
            })
         }
    }
    
  }


  const iconsEndPosition = WindowWidth * 0.15
  const iconsStartPosition = WindowWidth * 0.5
  const sharedTransY = useSharedValue(-heightCar)
  const sharedIcon = useSharedValue(0)
  const sharedIconOpacity = useSharedValue(0)
  const sharedMarker = useSharedValue(0)
  const animatedStyleBlur = useAnimatedStyle(()=>{
  
    return{
      transform:[{translateY:sharedTransY.value}]
    }
  })



  const animatedStyleIcons = useAnimatedStyle(()=>{
    return {
      transform:[{translateX: iconsStartPosition - ( sharedIcon.value * (iconsStartPosition - iconsEndPosition) )}],
      opacity: sharedIconOpacity.value
    }
  })

  const animatedStyleMarker = useAnimatedStyle(()=>{
    return {
      opacity: sharedMarker.value
    }
  })



  useEffect(()=>{
    if(Platform.OS === 'web'){
      document.body.style.overflowX = "hidden"
    }
    sharedTransY.value =  withDelay(1000,withTiming(0,{duration:250,easing:Easing.linear},(f)=>{
      sharedTransY.value = withDelay(1000, withTiming(heightCar,{duration:250,easing:Easing.linear},(finish)=>{
        sharedIconOpacity.value = withDelay(2000,withTiming(1,{duration:1000,easing:Easing.linear}))
        sharedIcon.value = withDelay(2000,withTiming(1,{duration:1000,easing:Easing.out(Easing.exp)}))
        sharedMarker.value = withDelay(2000,withTiming(1,{duration:1200,easing:Easing.linear},(finish)=>{
            sharedMarker.value =withDelay(1000, withTiming(0,{duration:1000,easing:Easing.linear},(finish)=>{
              runOnJS(setIsAnimating)(false)
          }))
         }))
      }))
    }))
 
    
  },[])


    return (
      <GestureHandlerRootView style={{flex:1}}>
        <View style={styles.container} >
       
          <BlurRootView style={styles.blurRoot} name="myNode" >


          <TapGestureHandler onHandlerStateChange={handleTapImage}>
               <Animated.View style={[styles.carImage,AnimatedScale]} >
                  <ImageReact  style={{width:'90%',height:'100%'}}
                    source={require('./car.png')}  resizeMode="contain" />
                   {isAnimating &&
                   <Animated.View style={[styles.blurCar,animatedStyleBlur]}>
                      <BlurView style={[{width:'100%',height:'100%'}]}
                        blurNode="myNode"
                        radius={11}
                      >
                        <View style={{width:'100%',height:'100%',backgroundColor:'rgba(255,255,255,0.2)'}}/>
                        </BlurView>
                      </Animated.View>
                    }  
               </Animated.View>
          </TapGestureHandler>

          <View style={[StyleSheet.absoluteFillObject,{justifyContent:'center',alignItems:'center'}]} pointerEvents="none" >
                 {isAnimating &&
                  <Animated.View style={[{width:MarkWidth,height:MarkHeight},animatedStyleMarker]}>
                      <Marker />

                  </Animated.View>
                  }

                  <Animated.View style={[styles.options,animatedStyleIcons]}>
                       <DrawableView style={StyleSheet.absoluteFillObject} 
                          d={ roundedRectData(WindowWidth* 0.95,windowHeight * 0.13 * 0.9,10,10,10,10,WindowWidth * 0.025,windowHeight * 0.13*0.05)}
                          fill={Color('transparent')}
                          stroke={colorGray}
                          strokeOpacity={0.3}
                         /> 
                      { [<Fish sc={IconScale} />,<Shower sc={IconScale} />,<Car sc={IconScale} />,<Wheel sc={IconScale} />] .map((v,index)=>{
                         return <View   key={index} style={{flex:1,display:'flex'}}>
                                        {v}
                                </View>
                      })}
                  </Animated.View>
          </View>
 
              { damageDetail && 
                <View  style={styles.blurDamageContainer}>
                     <View style={styles.blurDamageSpace} />

                   
                     <View style={styles.blurDamage}>
                          <ClipPathView style={{flex:1}}
                            d={roundedRectData(100,100,10,10,10,10,0,0)}
                            viewBox={[0,0,100,100]}
                            align="none"
                          >
                              <BlurView  style={{width:'100%',height:'100%'}}
                                blurNode="myNode"
                              >
                                
                              </BlurView>

                          </ClipPathView>

                          <View style={styles.blurDamageBorder} >
                               <TextReact style={styles.damageTitle} >Damage Detect</TextReact>
                               <TextReact style={styles.damageDesc} >Side Mirror damage - Heavy</TextReact>
                               <TextReact style={styles.damageDesc} >Your claim will be covered by 20%</TextReact>
                          </View>
                       </View>

             
                         <View  style={styles.blurDamageIcon} >
                                <Fish sc={0.7} color={colorWhite}/>
                           </View>
                       
                  </View>
              }
          </BlurRootView>

          {isAnimating &&
              <TapGestureHandler onGestureEvent={(e:any)=>{
              
              }}>
                     <View style={StyleSheet.absoluteFillObject}  />
              </TapGestureHandler>
             
           }
        

        </View>
        </GestureHandlerRootView>
    )
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display:'flex',
    flexDirection:'column'
  },
  blurRoot:{
    flex:1,
    display:'flex',
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center'
  },
  carImage:{
    width: widthCar,
    height:heightCar,
    overflow:'hidden',
    justifyContent:'center',
    alignItems:'center'
  
  },
  blurCar:{
    height:'100%',
    width:'100%',
    position:'absolute',
    left:0,
    top:0
  },
  blurDamageContainer:{
     position:'absolute',
     left: WindowWidth * 0.38,
     top:windowHeight * 0.15,
     width: WindowWidth * 0.5,
     height: WindowWidth * 0.33 ,
    display:'flex',
    flexDirection:'column'
  },
  blurDamageSpace:{
   width:'100%',
   height:'23%',
  },
  blurDamage:{
     flex:1,
     display:'flex',
     padding:0.5
  },
  blurDamageIcon:{
    width:'20%',
    height:'45%',
    left:5,
    top:0,
    position:'absolute',
    backgroundColor:'#26c789',
    display:'flex',
    borderRadius:20

  },
  blurDamageBorder:{
      ...StyleSheet.absoluteFillObject,
      borderRadius: 18,
      borderWidth:0.3,
      borderColor:'gray',
      display:'flex',
      paddingTop:38,
      paddingHorizontal:13

  },
  damageTitle:{
      color:'black',
      fontSize:12,
      fontWeight:'bold',
      marginBottom:5
  },
  damageDesc:{
    color:'black',
    fontSize:10,

  },
  options:{
    position:'absolute',
    left:0,
    bottom:windowHeight*0.02,
    width:WindowWidth,
    height:windowHeight * 0.13,
    display:'flex',
    flexDirection:'row',
  
  }

});



export default App