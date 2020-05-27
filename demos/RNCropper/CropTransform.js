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
      rotate: new Animated.Value(0),
      flipX : new Animated.Value(1),
      flipY : new Animated.Value(1)
      
    }
    //crop
    this.currentRotation = 0
    this.currentFlipX = 1
    this.currentFlipY = 1
    this.rotate = this.state.rotate.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg']
    })
    this.handleButton = this.handleButton.bind(this)
    this.handleButtonRotate = this.handleButtonRotate.bind(this)
    this.handleButtonFlipX = this.handleButtonFlipX.bind(this)
    this.handleButtonFlipY = this.handleButtonFlipY.bind(this)
  }

  handleButton({nativeEvent}){
      if(nativeEvent.state == State.ACTIVE){
          const url = require('./meme.jpg')
          const image = Image.resolveAssetSource(url)
              let data = {
                image : `static;${image.uri}`,
                rotate : this.currentRotation,
                flipVertically: this.currentFlipY == -1 ? true : false,
                flipHorizontally: this.currentFlipX == -1 ? true : false,
                output:{
                    quality: 1,
                    format: 0,
                    width: 500,
                    height: 500,
                }
               
              }

              Cropper.transform(data).then(res => {
                  this.setState({ preview: res  })
              })

          
      }
  }
  handleButtonFlipX({nativeEvent}){
    if(nativeEvent.state == State.ACTIVE){
       if (this.currentFlipX == 1) {
           this.currentFlipX = -1
       }else{
           this.currentFlipX = 1
       }
       this.state.flipX.setValue(this.currentFlipX)
    }
 }

 handleButtonFlipY({nativeEvent}){
  if(nativeEvent.state == State.ACTIVE){
     if (this.currentFlipY == 1) {
         this.currentFlipY = -1
     }else{
         this.currentFlipY = 1
     }
     this.state.flipY.setValue(this.currentFlipY)
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
                  <Animated.View style={{...styles.image, transform: [ {rotate: this.rotate },{ scaleX: this.state.flipX}, { scaleY: this.state.flipY }]}}>
                      <Image style={styles.image} source={require("./meme.jpg")} resizeMode={'contain'} />
                  </Animated.View>

              </View>
          
              <View style={styles.containerButtons}>
                    <TapGestureHandler onHandlerStateChange={this.handleButton}>
                      <View style={styles.button}>
                        <Text style={styles.text}>Make Trans</Text>
                      </View>
                    </TapGestureHandler>
                    <TapGestureHandler onHandlerStateChange={this.handleButtonRotate}>
                      <View style={styles.button}>
                        <Text style={styles.text}>Rotate</Text>
                      </View>
                    </TapGestureHandler>
                    <TapGestureHandler onHandlerStateChange={this.handleButtonFlipX}>
                      <View style={styles.button}>
                        <Text style={styles.text}>flipX</Text>
                      </View>
                    </TapGestureHandler>
                    <TapGestureHandler onHandlerStateChange={this.handleButtonFlipY}>
                      <View style={styles.button}>
                        <Text style={styles.text}>flipY</Text>
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
    marginTop: 10,
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
    marginHorizontal: 5,
    marginTop: 5

  }
  
});

export default App;