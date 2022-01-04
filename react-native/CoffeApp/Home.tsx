import React from 'react'
import { View,StyleSheet, Dimensions,Image } from "react-native";
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import { Color, LinearGradient } from "react-native-gradientview";
import { SharedElement } from 'react-navigation-shared-element';


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const itemHeight = windowHeight * 0.35

const App = (props :any) => {

  const { navigation } = props;

 
  return (
    <TapGestureHandler onHandlerStateChange={(event:any)=>{
       if(event.nativeEvent.state === State.ACTIVE){
          navigation.push('List', { sharedItem:
            [
              {id:"item.back.bg" ,animation:'fade'},
              {id:"item.7.photo",},
              {id:"item.8.photo",},
              {id:"item.9.photo"},
              {id:"item.title.text", animation:'fade'}
            ] 
          })
       }
    }}>

      <View   style={styles.container}  >

          <SharedElement  id="item.back.bg"   style={styles.linear}    >   

              <LinearGradient style={StyleSheet.absoluteFillObject}
                              colors={[Color('#A89276'),Color('white')]}
              />

          </SharedElement>

          <SharedElement id="item.7.photo" style={{
              width:windowWidth,height:itemHeight*1.5,position:'absolute',top:itemHeight*0.4,left:0,display:'flex'}} >

              <Image style={{width:'100%',height:'100%'}}
                  source={require('./assets/7.png')}
                  resizeMode='contain'
              />

          </SharedElement>

          <SharedElement id="item.8.photo" style={{
               width:windowWidth*2,height:itemHeight*2.2,position:'absolute',top:itemHeight * 0.8,left:-windowWidth * 0.5}} >

              <Image  style={{width:'100%',height:'100%'}}
                  source={require('./assets/8.png')}
                  resizeMode='contain'
              />

          </SharedElement>

          <SharedElement id="item.9.photo" style={{
               width:windowWidth*2,height:itemHeight*3,position:'absolute',bottom:-itemHeight*2.35,left:-windowWidth * 0.55}} >

              <Image  style={{width:'100%',height:'100%'}}
                      source={require('./assets/9.png')}
                      resizeMode='contain'
              />

          </SharedElement>

          <SharedElement  id="item.title.text" style={{
              width:windowWidth,height:itemHeight*0.6,position:'absolute',top:itemHeight * 1.5 ,left:0}}  >   

              <Image style={{width:'100%',height:'100%'}}
                  source={require('./assets/logo.png')}
                  resizeMode='contain'
               />

          </SharedElement>
      </View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  container:{
      flex:1,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
  },
  linear:{
      width: windowWidth,
      height: windowHeight,
  }
})

export default App