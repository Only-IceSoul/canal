/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
  Animated
} from 'react-native';


import { TapGestureHandler,PanGestureHandler, State } from 'react-native-gesture-handler';
import { Rect, Cropper } from 'react-native-jjkit'
import Preview from './Preview.js'


const ch = Dimensions.get("window").height * 0.8
const cw = Dimensions.get("window").width 
const hs = Dimensions.get("window").height

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      preview : null,
      transCropX: new Animated.Value(0),
      transCropY: new Animated.Value(0),
      rotate: new Animated.Value(0),
      scale : new Animated.Value(1)
    }
    const url = require('./meme.jpg')
    const image = Image.resolveAssetSource(url)
    this.imageRect = Rect.fitCenterRect(image.width,image.height,cw,ch)
    this.cropRect = Rect.inset(Rect.centerRect(100,100,cw,ch),1,1)

    //crop
    this.transCY = 0
    this.transCX = 0  
    this.lastTransCY = 0
    this.lastTransCX = 0
    this.currentRotation = 0
    this.currentScale = 1
    this.rotate = this.state.rotate.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg']
    })
    this.handleButton = this.handleButton.bind(this)
    this.handleCropGesture = this.handleCropGesture.bind(this)
    this.handleCropState = this.handleCropState.bind(this)
    this.handleButtonRotate = this.handleButtonRotate.bind(this)
    this.handleButtonScale = this.handleButtonScale.bind(this)
  }

  handleCropGesture({nativeEvent }){
    const ty = nativeEvent.translationY
    const tx = nativeEvent.translationX

    var dy = 0
    var dx = 0
    if(tx > 0){
      dx = tx - this.lastTransCX
     this.lastTransCX = tx
     this.transCX += dx

 }else if(tx < 0){
     dx = tx + (this.lastTransCX * -1)
     this.lastTransCX = tx
     this.transCX += dx
 }
    if(ty > 0){
       dy = ty - this.lastTransCY
      this.lastTransCY = ty
      this.transCY += dy

  }else if(ty < 0){
       dy = ty + (this.lastTransCY * -1)
      this.lastTransCY = ty
      this.transCY += dy
  }

     this.state.transCropY.setValue(this.transCY)
     this.state.transCropX.setValue(this.transCX)
     this.cropRect = Rect.offset(this.cropRect,dx,dy)

  }
  handleCropState({ nativeEvent }) {
    const state = nativeEvent.state
    if(state == State.END || state == State.CANCELLED ){
        this.lastTransCY = 0
        this.lastTransCX = 0
       
    }
  }

  handleButton({nativeEvent}){
      if(nativeEvent.state == State.ACTIVE){
          const url = require('./meme.jpg')
          const image = Image.resolveAssetSource(url)
          const rotated = Rect.rotate(this.imageRect,this.currentRotation)
          const scaled = Rect.scale(rotated,this.currentScale)
    
          if (Rect.contains(scaled,this.cropRect)){    
              let data = {
                image : image.uri,
                rect: scaled,
                cw: cw,
                ch: ch,
                crop: this.cropRect,
                quality: 1,
                format: 0,
                width: -1,
                height: -1,
                rotate : this.currentRotation
              }

              Cropper.makeCropStatic(data).then(res => {
                this.setState({ preview: res  })
              })

          }
      }
  }

  handleButtonScale({nativeEvent}){
    if(nativeEvent.state == State.ACTIVE){
       if (this.currentScale == 1) {
           this.currentScale = 2
       }else{
           this.currentScale = 1
       }
       this.state.scale.setValue(this.currentScale)
    }
 }


 handleButtonRotate({nativeEvent}){
  if(nativeEvent.state == State.ACTIVE){
     this.currentRotation += 45
     if (this.currentRotation > 360) {
       this.currentRotation %= 360
     }
     this.state.rotate.setValue(this.currentRotation)
  }
}

  render(){
  
    return (
      <>
        <StatusBar backgroundColor={"#7936d9"} />
    
        <SafeAreaView style={{ width: cw,height:hs}} >
        
        

         <View style={{flex:1}} >

              <View style={styles.container}>
                  <Animated.View style={{...styles.image, transform: [ {rotate: this.rotate },{ scale: this.state.scale }]}}>
                      <Image style={styles.image} source={require("./meme.jpg")} resizeMode={'contain'} />
                  </Animated.View>

                  <PanGestureHandler 
                  onGestureEvent={this.handleCropGesture}
                  onHandlerStateChange={this.handleCropState}>
                      <Animated.View style={{ width:100,height:100, transform: [ { translateY: this.state.transCropY }, {  translateX: this.state.transCropX}] }}>
                          <View style={{...styles.crop}} />
                      </Animated.View>
                  </PanGestureHandler>
              </View>
          
              <View style={styles.containerButtons}>
                    <TapGestureHandler onHandlerStateChange={this.handleButton}>
                      <View style={styles.button}>
                        <Text style={styles.text}>Make Crop</Text>
                      </View>
                    </TapGestureHandler>
                    <TapGestureHandler onHandlerStateChange={this.handleButtonRotate}>
                      <View style={styles.button}>
                        <Text style={styles.text}>Rotate</Text>
                      </View>
                    </TapGestureHandler>
                    <TapGestureHandler onHandlerStateChange={this.handleButtonScale}>
                      <View style={styles.button}>
                        <Text style={styles.text}>Scale</Text>
                      </View>
                    </TapGestureHandler>
              </View>
          
          </View>
              
          { this.state.preview ? 
              <Preview style={styles.preview} image={this.state.preview} 
                close={()=>{ 
                  this.setState({ preview: null }) 
                }}  /> 
                : null
          }
          
        </SafeAreaView>
       
      </>
    );
  }
};



const styles = StyleSheet.create({
  preview:{
    position: 'absolute' ,
    backgroundColor: '#ccc',
    width:'100%', 
    height: '100%' ,
     left: 0,
      top: 0
  },
  container :{
    width: cw,
    height: ch,
    backgroundColor:'#ccc',
    justifyContent: 'center',
    alignItems:'center'
  },
  containerButtons:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 50,
    width:'100%',
    marginTop: 20,
    justifyContent:'center'
  },
  image: {
    backgroundColor: 'blue',
    position:'absolute',
    left: 0,
    top: 0,
    width: cw,
    height: ch
  },
  crop:{
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'red',
    flex:1
  },
  text: {
    fontSize: 15,
    fontFamily: 'helvetica',
    color:'white'
  
  },
  button : {
    backgroundColor: '#7936d9',
    borderRadius: 25,
    width: 100,
    height:50,
    justifyContent:'center',
    alignItems: 'center',
    marginHorizontal: 5

  }
  
});

export default App;