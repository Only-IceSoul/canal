import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image
} from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const ch = Dimensions.get("window").height * 0.8
const cw = Dimensions.get("window").width 

const preview = (props)=> (

    <View>
        <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${props.image}`}} resizeMode={'contain'}/>

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
      width: cw,
      height: ch,
      backgroundColor : 'red'
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
      },
      text: {
        fontSize: 15,
        fontFamily: 'helvetica',
        color:'white'
      
      },
  });


export default preview