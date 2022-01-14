
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { View ,StyleSheet, Text, Dimensions, Image,TouchableOpacity,TouchableWithoutFeedback, Platform} from 'react-native';
import { Color, DrawableView } from 'react-native-drawableview';
import { LinearGradient } from 'react-native-gradientview';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ZView from 'react-native-translatezview';
import { SharedElement } from 'react-navigation-shared-element';
import { BaseScrollView, DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';


const AnimatedSharedElement = Animated.createAnimatedComponent(SharedElement)
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const colorArrow = Color('#FFC425')

var Items = [
    {img: require('./assets/spiderman-a.png'), color:'red',title:'spider',title2:'man',name:'peter parker',colorInt:Color('red')},
    {img: require('./assets/captain-b.png'), color:'#DC8C05',title:'iron',title2:'man',name:'tony stark',colorInt:Color('#DC8C05')},
    {img: require('./assets/hulk-b.png'), color:'green',title:'hulk',title2:'man',name:'bruce banner',colorInt:Color('green')},
    {img: require("./assets/thor-c.png"), color:'blue',title:'thor',title2:'',name:'thor',colorInt:Color('blue')},
    {img: require("./assets/hawkeye.png"), color:'purple',title:'hawk',title2:'eye',name:'clint barton',colorInt:Color('purple')}
    
  
   
  ]
const colorWhite = Color('white')

const FowardScrollView = React.forwardRef((props,ref)=>{

 //@ts-ignore
 return <Animated.ScrollView {...props} 
 alwaysBounceHorizontal={false}
    //@ts-ignore
 ref={ref}
 alwaysBounceVertical={false}
 bounces={false}
 showsVerticalScrollIndicator={false}
 showsHorizontalScrollIndicator={false}
 scrollEventThrottle={1}
 overScrollMode='never'
 pagingEnabled={true} 
 onTouchStart={(e)=>{

     //@ts-ignore
     if(props.refBlock.current === false){
     //@ts-ignore
     props.animatedScrollEvent.value = ScrollState.BEGIN
    }
 }}
 onTouchEnd={()=>{
     //@ts-ignore
     if(props.refBlock.current === false){
           //@ts-ignore
         props.animatedScrollEvent.value = ScrollState.END
     }
 }}
 /> 
})


class ExternalScrollView extends BaseScrollView {
    scrollTo(scrollInput: { x: number; y: number; animated: boolean; }): void {}
    render() {
        //@ts-ignore
        return <FowardScrollView ref={this.props.refScroll} {...this.props} />
    
    }
}

const ScrollState = {
    BEGIN : 0,
    END : 1,
    UNDEFINED: -1 
}

const List =  (props:any)=> {

    const currentPage = useSharedValue(0)
    const currentScrollState = useSharedValue(ScrollState.UNDEFINED)
    const onScroll =  useAnimatedScrollHandler({
        onScroll: (event,ctx)=>{
            const {x} = event.contentOffset;
            var vi = x / windowWidth
            currentPage.value = vi
        },
      onEndDrag:  (event,ctx)=>{
        currentScrollState.value = ScrollState.END
      }
    
   
  })  
  const refScroll = useRef(null)
  const refBlock = useRef(false)
  const avoidDoubleTouch = useRef(false)
  const {navigation } = props

 
    const RendererItem = (props:any)=>{

        const animStyle = useAnimatedStyle(()=>{
         const  result =  currentPage.value - props.index 
          const rotation  = interpolate(result,
            [-1,0,1,2] ,
               [0,
                0,
                -45,
                0])
      
            const transY  = interpolate(result,
               [-2,-1,0,1,2,3] ,
              [0,
                0,
                0,
                windowHeight*0.15,
                0,
                0]
              )
      
              const transX  = interpolate(result,
                [-1,0,1,2] ,
               [-windowWidth,
                 0,
                 -windowWidth*0.7,
                 0]
               )
            
      
          return {
              transform:[{translateY:transY},{translateX:transX},{rotateZ:`${rotation}deg`}],
             
         
          }
        })

        const animatedStyleContent = useAnimatedStyle(()=>{
            const  shouldTransform =  currentScrollState.value === ScrollState.BEGIN 
            return{
                left: shouldTransform ? windowWidth*0.05 : 0,
                width: shouldTransform ? windowWidth*0.9: windowWidth
            
            }
        })

        const animatedStyleImage = useAnimatedStyle(()=>{
            const  result =  currentPage.value - props.index 
            const scale  = interpolate(result,
                [-1,-0.5,0,1] ,
                   [0,
                    0,
                    1,
                   1])
        
            return { 
                transform:[{scale:scale}],
                opacity:scale
            }
        })
        
         return  <ZView style={{width:windowWidth,height:windowHeight}}   
         translateZ={Platform.OS === 'ios' ? 0 : Items.length - props.index  }
          translateZParent={Platform.OS === 'ios' ? Items.length - props.index : 0 } >
        
         <Animated.View style={[{width:windowWidth,height:windowHeight,position:'absolute',left:0,top:0},animStyle]}
       >
               <AnimatedSharedElement id={`item.bg${props.index}.color`} style={[{position:'absolute',top:windowHeight*0.38,
               height:windowHeight*0.68,borderRadius:windowWidth*0.09,overflow:'hidden'
              },animatedStyleContent]}>
                        <LinearGradient style={{width:'100%',height:'100%'}}
                        colors={[props.item.colorInt,colorWhite]}
                        positions={[1,1.2]}
                        />
                   </AnimatedSharedElement>
                           
                         
                <View style={styles.containerContent}>
                    <View style={{height:windowHeight*0.6,width:windowWidth}} />
                    <SharedElement id={`item.title${props.index}.text`}>
                   <Text style={[styles.cardTitle]}>{props.item.title}</Text>
                   </SharedElement>
                    {props.item.title2 !== '' && 
                        <SharedElement id={`item.title2${props.index}.text`}>
                                <Text style={styles.cardTitle}>{props.item.title2}</Text>
                        </SharedElement>
                    }
                     <SharedElement id={`item.name${props.index}.text`}>     
                            <Text style={styles.cardName}>{props.item.name}</Text>
                    </SharedElement>
                          
                            <TouchableWithoutFeedback style={{alignSelf:'flex-start'}}
                            onPress={()=>{
                                if(!avoidDoubleTouch.current){
                                    avoidDoubleTouch.current = true
                                    navigation.push('Details', { sharedItem:
                                      [
                                        {id:`item.bg${props.index}.color`}  ,
                                        {id:`item.main${props.index}.photo` },
                                        {id:`item.title${props.index}.text`},
                                        {id:`item.title2${props.index}.text`},
                                        {id:`item.name${props.index}.text`}
                                        
                                      ] ,
                                      item: props.item,
                                      index: props.index
                                    })
                          
                                    setTimeout(() => {
                                      avoidDoubleTouch.current = false
                                    }, 500);
                                 }
                            }}>
                            <View style={styles.cardContainerMore} 
                            onTouchStart={(e)=>{
                                 refBlock.current = true
                                   //@ts-ignore
                                 refScroll.current?.setNativeProps({
                                    scrollEnabled: false
                                });
                            }} 
                            onTouchEnd={(e)=>{
                                        //@ts-ignore
                                        refScroll.current?.setNativeProps({
                                            scrollEnabled: true
                                        });
                                        refBlock.current = false
                            }}
                             >
                                        <Text style={styles.cardMore}>Know more</Text>
                                        
                                        <DrawableView style={styles.cardMoreArrow}
                                        d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"
                                        viewBox={[0,0,24,24]}
                                        fill={colorArrow}
                                        
                                        />
                            </View>
                            </TouchableWithoutFeedback>
                      
                          
                </View>

                <AnimatedSharedElement id={`item.main${props.index}.photo`} style={[{position:'absolute', top:windowHeight*0.12, left:windowWidth*0.1, width:windowWidth*0.8,height:windowHeight*0.55},,animatedStyleImage]}>
                <Image style={[{width:'100%',height:'100%'} ]}
                       source={props.item.img}
                       resizeMethod="resize"
                       resizeMode="contain"
                      />
                </AnimatedSharedElement>
               
               </Animated.View>
              
          
        </ZView>
      
            
      }
      const MemoItem = React.memo(RendererItem,(prev:any,next:any)=>{
        return prev.item === next.item
      })
   
      

  return (
        <View style={styles.container}>

            <Text style={styles.title}>Movies</Text>
            <View style={styles.recycler}>
                <RecyclerListView 
                    externalScrollView={ExternalScrollView}
                      //@ts-ignore
                     animatedEvent={onScroll}
                     animatedScrollEvent={currentScrollState}
                    refBlock={refBlock}
                    refScroll={refScroll}
                    dataProvider={new DataProvider((r1:any,r2:any)=>{
                    return r1 === r2
                    }).cloneWithRows(Items)}
                    layoutProvider={ new LayoutProvider(
                    () => {
                        return 'VSEL'
                    },
                    (type, dim, index) => {
                        dim.width = windowWidth
                        dim.height = styles.recycler.height
                        
                    }
                    )}
                    
                    isHorizontal={true}
                    renderAheadOffset={ styles.recycler.width*2}
                    rowRenderer={(type:any,item:number,index:number)=>{
                    return  <MemoItem  index={index} item={item} />
                    }}

                
                />
            </View>
          

        </View>
  
  );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'white'
    },
    title:{
        fontSize:26,
        marginTop:windowHeight * 0.07
        
    },
    recycler:{
        position:'absolute',
        bottom:0,
        left:0,
        width:windowWidth,
        height:windowHeight
   
    },
    containerContent:{
        position:'absolute',
        left:0,top:0, 
        width:windowWidth,
        height:windowHeight ,
        paddingHorizontal:windowWidth*0.15,
        backgroundColor:'transparent',
        display:'flex'
    },
    cardTitle:{
        fontSize:52,
        fontWeight:'bold',
        color:'white',
        lineHeight: 52 * 1.1
    },
    cardName:{
        fontSize:22,
        color:'white'
    },
    cardContainerMore:{
        display:'flex',
       alignSelf:'flex-start',
       marginTop:windowHeight*0.02,
       flexDirection:'row',
     
    },
    cardMore:{
        color:'#ffb300',
        fontSize:18,
        marginRight:5
    },
    cardMoreArrow:{
      width:windowWidth* 0.07,
      height:windowWidth* 0.07,
      transform:[{translateY:1}],
    }
})


export default List