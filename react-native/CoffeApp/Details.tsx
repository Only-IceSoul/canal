import React  from 'react'
import { View,StyleSheet, Dimensions,Image,TouchableWithoutFeedback } from "react-native";
import {  DrawableImage } from 'react-native-cached-imageview';
import { DrawableView } from 'react-native-drawableview';
import { SharedElement } from 'react-navigation-shared-element';


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const itemHeight = windowHeight * 0.8

const Details = (props :any) => {

  const {route, navigation } = props;

 
  return (
 
      <View   style={styles.container}  >

<TouchableWithoutFeedback onPress={(e)=>{
                 navigation.goBack();
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

          <SharedElement  id={`item.main${route.params.index}.photo`} style={{position:'absolute',
          left:0,top:(windowHeight - (itemHeight/2)) / 2,
             }}  >   

                    <DrawableImage 
                 style={{width:windowWidth,height:itemHeight/2,transform:[{scale:1.4}]}}
                  source={{uri:props.item !== -100 ? `static;${Image.resolveAssetSource(route.params.item).uri}` : "" 
                  ,width:300,height:300,resizeMode:'contain'}}  
                  
                
                  scaleType="contain" />

          </SharedElement>
      </View>
  
  );
};

const styles = StyleSheet.create({
  container:{
      flex:1,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'white'
  },
  buttonback:{
    position:'absolute',
    left:40,
    top:60,
    width:40,
    height:40,

},   wh100:{
  width:'100%',
  height:'100%'
},

})

export default Details