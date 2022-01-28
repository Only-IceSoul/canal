import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View,ScrollView, ScaledSize, Platform } from "react-native"
import Animated, { interpolate, runOnJS, useAnimatedReaction, useAnimatedStyle } from "react-native-reanimated"


const getWidth = (dim:ScaledSize):number=>{
    if(Platform.OS === 'web'){
        return dim.height * 0.5
    }
    return dim.width
}

const getHeight = (dim:ScaledSize):number=>{
    return dim.height
}


const ScreenSize = Dimensions.get(Platform.OS === 'web' ? 'window' : 'screen')
const width = getWidth(ScreenSize)
const height = getHeight(ScreenSize)

const ItemHeight = height * 0.1
const HeaderOptionsHeight = ItemHeight * 2.5
const HeaderHeight = HeaderOptionsHeight + ItemHeight

const HeaderHeightScrollValue = HeaderHeight / ItemHeight
const HeaderOptionsScrollValue = (HeaderOptionsHeight / HeaderHeight) * HeaderHeightScrollValue

const Header = (props:{animatorValue:Animated.SharedValue<number>})=>{

    const input = [-1,0,HeaderOptionsScrollValue,HeaderHeightScrollValue]
    const input2 = [-1,0,HeaderOptionsScrollValue*0.8,HeaderHeightScrollValue]
    const animatedHeaderStyle = useAnimatedStyle(()=>{
        const inter = interpolate(props.animatorValue.value,input,[1,1,0,0])
        const inter2 = interpolate(props.animatorValue.value,input2,[0,0,1,1])
        return{ 
            height: inter * HeaderOptionsHeight,
            transform: [{perspective: 400},{rotateX:`${(inter2)*90}deg`}]
        }
    })

    const [pointer,setPointer] = useState<any>('auto')

   useAnimatedReaction(()=> props.animatorValue.value,
   (v)=>{
    
       let p = v > 0.1 ? 'none' : 'auto'
        if(p !== pointer) runOnJS(setPointer)(p)
   },[])
    
    
    const animatedBalanceStyle = useAnimatedStyle(()=>{
        const inter = interpolate(props.animatorValue.value,input,[0,0,0,1])
     
        return{ 
            transform: [{translateY: -(inter * ItemHeight)}]
        }
    })
    return (
        <View style={{position:'absolute',left:0,top:0,width:'100%',height: HeaderHeight}} pointerEvents={pointer} >
            <Animated.View style={[styles.containerHeader,animatedHeaderStyle]} >
        

                <ScrollView style={styles.scrollView}
                 horizontal={true}  
                 nestedScrollEnabled={true}
                 showsHorizontalScrollIndicator={false}
                 
                 >
                     <View style={[styles.cardContainer,{width: width * 0.42,}]}>
                        <View style={[styles.card,{backgroundColor:'#454558'}]}>
                            <Image style={styles.icon} source={require('./assets/mastercard.png')}  
                              resizeMode="contain"
                            />
                            <Text style={styles.text}>$87,760</Text>
                            <Text style={[styles.subTitle,{color:'#8F8FB1'}]}>Main Account</Text>
                        </View> 

                     </View>

                     <View style={[styles.cardContainer,{width: width * 0.32,}]}>

                     <View style={[styles.card,{backgroundColor:'#262626'}]}>
                            <Image style={styles.icon} source={require('./assets/tree.png')}  
                              resizeMode="contain"
                            />
                            <Text style={styles.text}>$4,302</Text>
                            <Text style={[styles.subTitle,{color:'#6F6E7A'}]}>Vacation</Text>
                    </View> 
                    </View>
                    <View style={[styles.cardContainer,{width: width * 0.32}]}>
                    <View style={[styles.card,{backgroundColor:'#262626'}]}>
                           <Image style={styles.icon} source={require('./assets/lightning.png')}  
                              resizeMode="contain"
                            />
                         <Text style={styles.text}>$3,150</Text>
                         <Text style={[styles.subTitle,{color:'#6F6E7A'}]}>Buy Tesla</Text>
                    </View> 

                    </View>

                    <View style={[styles.cardContainer,{width: width * 0.32}]}>
                    <View style={[styles.card]}>
                           <View style={styles.icon}
                            />
                        <Text style={styles.text}>NEW</Text>
                        <Text style={[styles.subTitle,{color:'#6F6E7A'}]}>Space</Text>
                    </View> 

                    </View>

                    <View style={{width:width*0.1,height:'100%'}} />
                </ScrollView>
      
              
            </Animated.View>

            <Animated.View style={[styles.containerBalance,animatedBalanceStyle]} >
                <Text style={{color:'white',fontSize:24,marginTop:5}}>$26,712</Text>
                <Text style={{color:'gray',fontSize:10}}>Total balance</Text>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerHeader:{
        position:'absolute',
        left:0,
        top:ItemHeight,
        width:width,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:width*0.05,

    },
    containerBalance:{
        position:'absolute',
        left:0,
        top:0,
        width:'100%',
        height:ItemHeight,
        flexDirection:'column',
        paddingHorizontal:width*0.05,
    },
    scrollView:{
        height:HeaderOptionsHeight,
        paddingLeft:10,


    },
    cardContainer:{
        height:'100%',
        marginHorizontal:5,
        justifyContent:'center',
        alignItems:'center',
    },
    card:{
        width:'100%',
        height:'85%',
        borderRadius:10,
        padding:width*0.05
    },
    icon:{
        width:width*0.06,
        height:width*0.06,
    },
    text:{
        color:'white',
        fontSize:22,
        fontWeight:'bold',
        marginTop: HeaderOptionsHeight * 0.2
    },
    subTitle:{  
        fontSize:13,
        
    }
})

export default Header