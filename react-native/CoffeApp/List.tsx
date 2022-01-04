
import React, { useEffect, useRef, useState } from 'react';
import  { View ,StyleSheet, Dimensions,Image,Text, Platform,TouchableWithoutFeedback} from 'react-native';

import Animated, {  Easing, interpolate, scrollTo, useAnimatedProps, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { Painter, Text  as TextPainter } from 'react-native-painter';
import { BaseScrollView, DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import { DrawableImage} from 'react-native-cached-imageview'
import ListSnapShot from './ListSnapShot';
import ShadowDecoration from './ShadowDecoration';
import ZView from 'react-native-translatezview';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';
import { DrawableView } from 'react-native-drawableview';

 
const PrepareState = {
   START: 100,
   END:200,
   UNDEFINED: 0
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

var Names = [
  "Coffe Coke",
  "Parag Coffe",
  "Iced Moti",
  "Coffe 4",
  "Coffe 5",
  "Coffe 6",
  "Coffe 7",
  "Coffe 8",
  "Coffe 9",
  "Coffe 10",
  "Coffe 11",
  "Coffe 12",

]
var Prices = [
  "$1.0",
  "$2.0",
  "$3.0",
  "$4.0",
  "$5.0",
  "$6.0",
  "$7.0",
  "$8.0",
  "$9.0",
  "$10.0",
  "$11.0",
  "$12.0",

]
var Items = [
  require('./assets/1.png'),
  require('./assets/2.png'),
  require("./assets/3.png"),
  require("./assets/4.png"),
  require("./assets/5.png"),
  require("./assets/6.png"),
  require("./assets/7.png"),
  require("./assets/8.png"),
  require("./assets/9.png"),
  require("./assets/10.png"),
  require("./assets/11.png"),
  require("./assets/12.png"),
]

const itemHeight = windowHeight * 0.8
const AnimatedTextPainter = Animated.createAnimatedComponent(TextPainter);


class ExternalScrollView extends BaseScrollView {
  scrollTo(scrollInput: { x: number; y: number; animated: boolean; }): void {

  }
  render() {
    
     //@ts-ignore
    return  <Animated.ScrollView  {...this.props} ref={this.props.animatedRef} 
    alwaysBounceHorizontal={false}
    alwaysBounceVertical={false}
    bounces={false}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    scrollEventThrottle={1}
    overScrollMode='never' 
    pagingEnabled={true}

    /> 
  }
}

const App =  (props:any) =>{


  const currentPage = useSharedValue(0)
  const currentNameIndex = useSharedValue(8)
  const refListName = useAnimatedRef<any>()
  const refListProducts = useAnimatedRef<any>()

  const firstTime = useSharedValue(true)
  
  const onScroll =  useAnimatedScrollHandler((event,ctx)=>{
    const {y} = event.contentOffset;
    var vi =   y / itemHeight
    currentPage.value = vi
    
    if(vi < 0  || vi >= Items.length - 1) return
    var intNumber = vi | 0x0
    if((vi - intNumber) >= 0.99 || vi === 0 || (vi - intNumber) <= 0.01){
      var i = (vi+0.01) | 0x0
      if(currentNameIndex.value !== i){
        currentNameIndex.value = i
          scrollTo(refListName,windowWidth*i,0,true)   
      }
    }
   
      
    
   
})



const preventMultipleTouchs = useRef(false)

const RendereItem = (props:any)=>{

  const animStyle = useAnimatedStyle(()=>{
    const  result =  currentPage.value - props.index 
    const scale  = interpolate(result,
      [-1,0,1,2,3,4] ,
         [1.4,
          1.2,
          0.8,
          0.5,
          0.5,1])

      const transY  = interpolate(result,
        [-1,0,1,2,3,4],
        [-(itemHeight/2)*0.9,
          -(itemHeight/2)*0.25
          ,itemHeight * 0.82
          ,itemHeight * 1.77,
          itemHeight * 2.95,
          0]
        )


        const opac = interpolate(result,
          [-2,-1,1,3],
          [0,1,
            1,
            0]
          )

    return {
        transform:[{translateY:transY},{scale:scale}],
        opacity:opac
    }
  })

 
   return  <ZView
       style={{width:windowWidth,height:itemHeight}}  
       translateZ={Platform.OS === 'android' ? props.index : 0}
        translateZParent={Platform.OS === 'ios' ? props.index : 0}>
            
              <Animated.View       style={[{width:'100%',height:'100%'},animStyle]}   >
                <TapGestureHandler onHandlerStateChange={(e)=>{
                 if(props.index === currentNameIndex.value && e.nativeEvent.state === State.ACTIVE){
                          if(!preventMultipleTouchs.current){
                            preventMultipleTouchs.current = true
                            route.params.sharedItem = [{id:`item.main${props.index}.photo` },]
                            navigation.push('Details', { sharedItem:
                              [
                                {id:`item.main${props.index}.photo` },
                              ] ,
                              item: props.item,
                              index: props.index
                            })
                  
                            setTimeout(() => {
                              preventMultipleTouchs.current = false
                            }, 500);
                        }
                 }
                }}
                >
                  <SharedElement id={`item.main${props.index}.photo`}
                  style={{position:'absolute',left:0,bottom:0}} >
                 
                 {/* aspect ratio */}
                    <DrawableImage 
                  style={{width:windowWidth,height:itemHeight/2}}
                  source={{uri:`static;${Image.resolveAssetSource(props.item).uri}`
                  ,width:300,height:300,resizeMode:'contain'}}  
                  
                
                  scaleType="contain" />

                  </SharedElement>
                  </TapGestureHandler>
          </Animated.View>

       </ZView>
  

      
}
const MemoItem = React.memo(RendereItem,(prev:any,next:any)=>{
  return prev.item === next.item
})
const sharedMsg = useSharedValue<string>(Prices[8])
const sharedOpacity = useSharedValue(1)
const prepareState = useSharedValue(PrepareState.UNDEFINED)
const animatedTextProps = useAnimatedProps(()=>{
  return{
    text:sharedMsg.value,
    opacity:sharedOpacity.value
  }
})

useAnimatedReaction(()=>currentNameIndex.value,
( i )=>{
  
  if(prepareState.value === PrepareState.END) {
  
    sharedOpacity.value = 0
    sharedMsg.value =  Prices[i]
    sharedOpacity.value = withTiming(1,{duration:300,easing:Easing.linear})
  }
})

useAnimatedReaction(()=> prepareState.value,
(v) =>{
  if(prepareState.value === PrepareState.START){
    scrollTo(refListName,windowWidth*8,0,false)   
     scrollTo(refListProducts,0,itemHeight*8,false)
  }
 
})

const { route, navigation } = props
const allowBack = useRef(false)


useEffect(
  () =>
    navigation.addListener('beforeRemove', (e:any) => {
      // Prevent default behavior of leaving the screen
      if(allowBack.current){
        if(Platform.OS === 'android'){
          route.params.sharedItem = []
        }
         
        return
      }
      e.preventDefault();
    }),
  [navigation]
);




useEffect(()=>{

  let isMounted = true;   
    setTimeout(() => {
      if(isMounted) prepareState.value = PrepareState.START
    },800);
    setTimeout(() => {
      if(isMounted) setIsAnimating(false)
    }, 1000);
    setTimeout(() => {
      if(isMounted){
        prepareState.value = PrepareState.END
        allowBack.current = true
      }
    }, 1200);
    return ()=>{ isMounted = false}
},[])


const [isAnimating,setIsAnimating] = useState(true)

  return (
        <View style={styles.container}>
            <View style={[StyleSheet.absoluteFillObject,{flexDirection:'column'}]} >  
    
              <ShadowDecoration />
              <View style={{width:windowWidth, height:windowHeight - itemHeight}}></View>
              <RecyclerListView  
                style={{ opacity: isAnimating ? 0 : 1}}
                externalScrollView={ExternalScrollView}
                //@ts-ignore
                animatedRef={refListProducts}
                animatedEvent={onScroll}
                dataProvider={new DataProvider((r1:any,r2:any)=>{
                return r1 === r2
                }).cloneWithRows(Items)}
                layoutProvider={ new LayoutProvider(
                () => {
                  return 'VSEL'
                },
                (type, dim, index) => {
                    dim.width = windowWidth
                    dim.height = itemHeight
                  
                }
                )}
                
                renderAheadOffset={itemHeight*3}
                rowRenderer={(type:any,item:number,index:number)=>{
                return  <MemoItem  index={index} item={item} />
                }}

              />
     
            </View>
            <View style={[StyleSheet.absoluteFillObject,{display:'flex',flexDirection:'column'}]} pointerEvents="none" >

                <View style={{width:'100%',height:80}} />
                <View style={{width:'100%',height:windowHeight * 0.1}}>

                    <RecyclerListView 
                      externalScrollView={ExternalScrollView}
                      isHorizontal={true}

                      //@ts-ignore
                      animatedRef={refListName}
                      dataProvider={new DataProvider((r1:any,r2:any)=>{
                      return r1 === r2
                      }).cloneWithRows(Names)}
                      layoutProvider={ new LayoutProvider(
                      () => {
                        return 'VSEL'; //Since we have just one view type
                      },
                      (type, dim, index) => {
                          dim.width = windowWidth
                          dim.height = windowHeight * 0.1
                        
                      }
                      )}

                      rowRenderer={(type:any,item:number,index:number)=>{
                      return <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}} > 
                              <Text style={styles.name}>{item}</Text>
                      </View>
                      }}

                    />
         
                </View>
                <View style={{width:'100%',height:18}} />
                <View style={{width:'100%',height:windowHeight * 0.05,display:'flex',justifyContent:'center',alignItems:'center'}} >

                     <Painter style={{width:'100%',height:'100%'}}
                      viewBox={[0,0,100,100]} >
                        <AnimatedTextPainter x={50} y={50}
                         horizontalOffset={-0.5} baseline="middle"
                          fontSize={60} 
                          // font={"Birthstone-Regular"}
                        animatedProps={animatedTextProps} />
                     </Painter>
                </View>
            </View>
            {isAnimating && <ListSnapShot /> }

            <TouchableWithoutFeedback onPress={(e)=>{
                 
                 route.params.sharedItem = []
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

        </View>
  
   
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      display:'flex',

    },
    price:{
      fontSize:21,
      color:'black'

    },
    name:{
      fontSize:24,
      fontWeight:'bold'
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

  
  });
  

  
  export default App

