/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


const w = Dimensions.get('screen').width 
const buttonHeight = Dimensions.get('screen').height * 0.07

const App = () => {

  const [isScrollVisible,setIsScrollVisible] = useState(false)

  const scrollX = useSharedValue(0)
  const animatedStyleScroll = useAnimatedStyle(()=>(
    {
      transform: [{translateX:scrollX.value}]
    }
  ))

  const transY = useSharedValue(300)
  const animatedStyle = useAnimatedStyle(()=>(
    {
      transform: [{translateY:transY.value}]
    }
  ))

  const scale = useSharedValue(0.1)
  const animatedStyleScale = useAnimatedStyle(()=>(
    {
      transform: [{scale:scale.value}]
    }
  ))

  
  const transY2 = useSharedValue(300)
  const animatedStyle2 = useAnimatedStyle(()=>(
    {
      transform: [{translateY:transY2.value}]
    }
  ))

  const scale2 = useSharedValue(0.1)
  const animatedStyleScale2 = useAnimatedStyle(()=>(
    {
      transform: [{scale:scale2.value}]
    }
  ))

  
  const transY3 = useSharedValue(300)
  const animatedStyle3 = useAnimatedStyle(()=>(
    {
      transform: [{translateY:transY3.value}]
    }
  ))

  const scale3 = useSharedValue(0.1)
  const animatedStyleScale3 = useAnimatedStyle(()=>(
    {
      transform: [{scale:scale3.value}]
    }
  ))

  const showScrollView = (e:boolean)=>{
     setTimeout(() => {
          setIsScrollVisible(true)
     }, 700);
  }

  const toPage2 = (e:boolean) =>{
    setTimeout(() => {
      scale3.value = withTiming(1,{duration:300},(e)=>{
        if(e){
            transY3.value = withTiming(0,{duration:1000},(e)=>{
               if(e){
                  runOnJS(showScrollView)(e)
               }
            })
        }
      })
    }, 300);
  }
  const toPage1 = (e:boolean) =>{
    setTimeout(() => {
      scale2.value = withTiming(1,{duration:300},(e)=>{
        if(e){
            transY2.value = withTiming(0,{duration:1000},(e)=>{
               if(e){
                 scrollX.value = withTiming(-w*2,{duration:700},(e)=>{
                   runOnJS(toPage2)(e)
                 })
               }
            })
        }
      })
    }, 300);
  }

  const startAnimation = () =>{
    scale.value = withTiming(1,{duration:300},(e)=>{
      if(e){
          transY.value = withTiming(0,{duration:1000},(e)=>{
             if(e){
               scrollX.value = withTiming(-w,{duration:700},(e)=>{
                 runOnJS(toPage1)(e)
               })
             }
          })
      }
    })
  }

  useEffect(()=>{
      startAnimation()
  },[])


  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'}/>
      <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        
        <View style={styles.containerText}>
            <Text style={styles.text}>{'Discover great tips & advice from travellers'}</Text>
        </View>
        <View style={styles.span}/>
        <View style={styles.containerPages}>
              {isScrollVisible ? 
                  <ScrollView style={{flex:1,backgroundColor:'white'}} 
                  horizontal={true}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false} >
                      <View style={styles.page}>
                          <Image style={styles.image} source={require('./images/pag1.png')} resizeMode='cover' />
                          <Image  style={[styles.circle,{left:20,width:'30%'}]} source={require('./images/circle.png')} resizeMode='contain'/>
                          <View style={[styles.containerPerson,{left:30,width:'25%'}]}>
                              <Image style={{flex:1}} source={require('./images/person1.png')} resizeMode='contain' />
                          </View>
                      </View>
                      <View style={styles.page}>
                          <Image style={styles.image} source={require('./images/pag2.png')} resizeMode='cover' />
                          <Image  style={[styles.circle,{right:30,width:'55%'}]} source={require('./images/circle.png')} resizeMode='contain'/>
                          <View style={[styles.containerPerson,{right:45,width:'65%'}]}>
                              <Image style={{flex:1}} source={require('./images/person2.png')} resizeMode='contain' />
                          </View>
                      </View>
                      <View style={styles.page}>
                          <Image style={styles.image} source={require('./images/pag3.png')} resizeMode='cover' />
                          <Image  style={[styles.circle,{left:20,width:'30%'}]} source={require('./images/circle.png')} resizeMode='contain'/>
                          <View style={[styles.containerPerson,{left:40,bottom:6,width:'25%'}]}>
                              <Image style={{flex:1}} source={require('./images/person3.png')} resizeMode='contain' />
                          </View>
                      </View>
                  </ScrollView>
              :
                 <Animated.View style={[{flex:1,backgroundColor:'white',flexDirection:'row'},animatedStyleScroll]}>

                        <View style={styles.page}>
                          <Image style={styles.image} source={require('./images/pag1.png')} resizeMode='cover' />
                          <Animated.Image  style={[styles.circle,{left:20,width:'30%'},animatedStyleScale]} source={require('./images/circle.png')} resizeMode='contain'/>
                          <View style={[styles.containerPerson,{left:30,width:'25%'}]}>
                              <Animated.Image style={[{flex:1},animatedStyle]} source={require('./images/person1.png')} resizeMode='contain' />
                          </View>
                      </View>
                      <View style={styles.page}>
                          <Image style={styles.image} source={require('./images/pag2.png')} resizeMode='cover' />
                          <Animated.Image  style={[styles.circle,{right:30,width:'55%'},animatedStyleScale2]} source={require('./images/circle.png')} resizeMode='contain'/>
                          <View style={[styles.containerPerson,{right:45,width:'65%'}]}>
                              <Animated.Image style={[{flex:1},animatedStyle2]} source={require('./images/person2.png')} resizeMode='contain' />
                          </View>
                      </View>
                      <View style={styles.page}>
                          <Image style={styles.image} source={require('./images/pag3.png')} resizeMode='cover' />
                          <Animated.Image  style={[styles.circle,{left:20,width:'30%'},animatedStyleScale3]} source={require('./images/circle.png')} resizeMode='contain'/>
                          <View style={[styles.containerPerson,{left:40,bottom:6,width:'25%'}]}>
                              <Animated.Image style={[{flex:1},animatedStyle3]} source={require('./images/person3.png')} resizeMode='contain' />
                          </View>
                      </View>

                 </Animated.View>
              }

           
             
           


        </View>
        <View style={styles.containerButtons}>
              <View style={[styles.button,styles.button1]}>
                  <Text style={[styles.textButton,{color:'#85DB9E'}]}>Login</Text>
              </View>
              <View style={[styles.button,styles.button2]} >
                  <Text style={styles.textButton}>Create An Account</Text>
              </View>
        </View>
          
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerText:{
    width:'100%',
    height:'28%',
    paddingLeft:'5%',
    paddingRight:'19.5%',
    paddingTop:'5%'
  },
  text:{
    fontSize:38,
    fontFamily:'Comfortaa-Light'
  },
  containerButtons:{
    width:'100%',
    height:'13%',
  },
  span:{
    width:'100%',
    height:'5%'
  },
  containerPages:{
   flex:1,
   backgroundColor:'white'
  },
  button:{
    position:'absolute',
    width:'45%',
    top:20,
    height: buttonHeight,
    justifyContent:'center',
    alignItems:'center'
  },
  button1:{
    backgroundColor:'white',
    borderWidth:2,
    borderColor:'#85DB9E',
    borderTopRightRadius: buttonHeight / 2,
    borderBottomRightRadius: buttonHeight / 2,
  },
  button2:{
    right:0,
    backgroundColor:'#85DB9E',
    borderTopLeftRadius: buttonHeight / 2,
    borderBottomLeftRadius: buttonHeight / 2,
  },
  textButton:{
    fontSize:16,
    fontFamily:'Comfortaa-SemiBold',
    color:'white'
  },
  page:{
    width:w,
    height:'100%'
  },
  image:{
    width:'100%',
    height:'90%'
  },
  circle:{
    position:'absolute',
    height:25,
    bottom:6
  },
  containerPerson:{
    position:'absolute',
    height:'65%',
    bottom:15,
    overflow:'hidden'
  }
  
   
});

export default App;
