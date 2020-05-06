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
  ScrollView,
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
      transCropY: new Animated.Value(0)
    }
    const url = require('./meme.jpg')
    const image = Image.resolveAssetSource(url)
    this.imageRect = Rect.fitCenterRect(image.width,image.height,cw,ch)
    this.cropRect = Rect.centerRect(100,100,cw,ch)
    //crop
    this.transCY = 0
    this.transCX = 0  
    this.lastTransCY = 0
    this.lastTransCX = 0

    this.handleButton = this.handleButton.bind(this)
    this.handleCropGesture = this.handleCropGesture.bind(this)
    this.handleCropState = this.handleCropState.bind(this)
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
     

        if (Rect.contains(this.imageRect,this.cropRect)){
     
          let data = {
            image : image.uri,
            rect: this.imageRect,
            cw: cw,
            ch: ch,
            crop: this.cropRect,
            quality: 1,
            format: 0,
            width: -1,
            height: -1
          }

          Cropper.makeCropStatic(data).then(res => {
          
            this.setState({ preview: res  })
          })

        }
      }
  }

  render(){
    return (
      <>
        <StatusBar backgroundColor={"#407936d9"} />
        <SafeAreaView style={{flex: 1}} >
        
        { this.state.preview ? 
         <Preview style={{position: 'absolute' ,width:cw, height: hs , left: 0, top: 0}} image={this.state.preview} 
          close={()=>{ 
            this.lastTransCX = 0
            this.lastTransCY = 0
            this.setState((old) => ( { preview: null
          }) )}}  /> : null
        }

         <View style={{flex:1}} >
              <View style={styles.container}>

                  <Animated.View style={styles.image}>
                      <Image style={styles.image} source={require("./meme.jpg")} resizeMode={'contain'} />
                  </Animated.View>

                  <PanGestureHandler 
                  onGestureEvent={this.handleCropGesture}>
                      <Animated.View style={{ width:100,height:100, transform: [ { translateY: this.state.transCropY }, {  translateX: this.state.transCropX}] }}>
                          <View style={{...styles.crop}} />
                      </Animated.View>
                  </PanGestureHandler>

            </View>
  
          
              <TapGestureHandler onHandlerStateChange={this.handleButton}>
                <View style={styles.button}>
                  <Text style={styles.text}>Make Crop</Text>
                </View>
              </TapGestureHandler>
          </View>
              
          
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container :{
  
    width: cw,
    height: ch,
    backgroundColor:'#ccc',
    justifyContent: 'center',
    alignItems:'center'
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
    alignSelf:'center',
    marginTop: 30
  }
  
});

export default App;
