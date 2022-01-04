import React from 'react'
import { View ,StyleSheet,Image ,Dimensions , Text as TextReact} from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { Painter,Text } from 'react-native-painter'
import { SharedElement } from 'react-navigation-shared-element'
import ShadowDecoration from './ShadowDecoration'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const itemHeight = windowHeight * 0.4 
const offsetY = itemHeight * 0.6


const ListSnapShot = (props:any)=>{
 

    return(
    <TapGestureHandler onGestureEvent={(e:any)=>{
        e.stopPropagation();
    }}>

      
        <View style={[{backgroundColor:'white'},StyleSheet.absoluteFill]}>  

            <ShadowDecoration />
            
            <View style={{width:'100%',height:80}} />
            <View style={{width:'100%',height:windowHeight * 0.1,justifyContent:'center',alignItems:'center'}}>
                 <TextReact style={{fontSize:24, fontWeight:'bold'}}>Coffe 9</TextReact>
            </View>
            <View style={{width:'100%',height:18}} />
            <View style={{width:'100%',height:windowHeight * 0.05,display:'flex',justifyContent:'center',alignItems:'center'}} >

                <Painter style={{width:'100%',height:'100%'}}
                        viewBox={[0,0,100,100]} >
                    <Text x={50} y={50}
                        horizontalOffset={-0.5} baseline="middle"
                        fontSize={60} 
                        // font={"Birthstone-Regular"}
                        text="$9.0" /> 
                </Painter>

            </View>

            <View style={[StyleSheet.absoluteFill]}>  

                <SharedElement id="item.7.photo" style={{transform:[{scale:0.5}], opacity:0.5,
                    width:windowWidth,height:itemHeight,position:'absolute',bottom:itemHeight * 0.71,left:0}} >

                    <Image style={{width:'100%',height:'100%'}}
                        source={require('./assets/7.png')}
                        resizeMode='contain'
                    />

                </SharedElement>

                <SharedElement id="item.8.photo" style={{ transform:[{scale:0.8}],
                    width:windowWidth,height:itemHeight,position:'absolute',bottom:itemHeight*0.46,left:0}} >

                    <Image  style={{width:'100%',height:'100%'}}
                            source={require('./assets/8.png')}
                            resizeMode='contain'
                    />

                </SharedElement>

                <SharedElement id="item.9.photo" style={[{
                    width:'100%',height:itemHeight,position:'absolute',bottom:itemHeight*0.15,left:0,transform:[{scale:1.2}]}]} >

                    <Image  style={{width:'100%',height:'100%'}}
                            source={require('./assets/9.png')}
                            resizeMode='contain'
                    />

                </SharedElement>

            </View>

        </View>
    </TapGestureHandler>
    )

}


export default ListSnapShot