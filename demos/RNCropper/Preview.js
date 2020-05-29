import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { Image } from 'react-native-jjkit'

const ch = Dimensions.get("window").height * 0.8
const cw = Dimensions.get("window").width 

const preview = (props)=> (

    <View style={props.style}>
        <Image style={styles.image} data={{ url:`base64,${props.image}` , asGif: props.isGif , width: -1, height: -1,cache:true}} scaleType={1}/>

        <TapGestureHandler onHandlerStateChange={({nativeEvent}) => {
            if(nativeEvent.state == State.ACTIVE){
                props.close()
            }

        }}>
            <View style={styles.button}>
              <Text style={styles.text}>Close</Text>
            </View>
          </TapGestureHandler>
    </View>

)

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: '80%',
    },
    button : {
        backgroundColor: '#7936d9',
        borderRadius: 25,
        width: 100,
        height:50,
        justifyContent:'center',
        alignItems: 'center',
        alignSelf:'center',
        marginTop: 20
      },
      text: {
        fontSize: 15,
        fontFamily: 'helvetica',
        color:'white'
      
      },
  });


export default preview
