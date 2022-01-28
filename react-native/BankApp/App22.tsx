import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Platform, ScaledSize, StyleSheet, View } from 'react-native'
//@ts-ignore
import faker from 'faker'
import { StatusBar } from 'expo-status-bar';
import { BaseScrollView, DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import Animated, { Easing, runOnJS, useAnimatedProps, useAnimatedReaction, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Header from './Header';
import SectionTitle from './SectionTitle';
import Cell from './Cell';
import { Color, Painter ,Text as TextPainter, TextProps} from 'react-native-painter';
import { getAnimatedProps } from './reanimated';


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
const SectionScale = 1.2
const ItemSectionHeight = ItemHeight * SectionScale
const HeaderOptions = height * 0.25
const HeaderHeight = HeaderOptions + ItemHeight
const colorWhite = Color('white')



const AnimatedTextPainter = Animated.createAnimatedComponent(TextPainter)

type SectionOffset = {
    up:number,
    down:number,
    mid:number
}

function sectionedArr(data:any[]):{arr:any[] , 
    sectionIndices:number[],
    allPositions:number[],
    sectionPositionsUpDown:SectionOffset[]

}{
   
    var arr:any[] = []
    var sectionIndices:number[] = [] // index on data, ascendent
    var allPositions:number[] = []  // position scroll with cells , order cell index
    var sectionPositionsUpDown: SectionOffset[] = [] // position scroll down up mid, just sections, ascendent

    let currentDate = ""
    let currentSectionIndex = 0
    let currentOffsetValue = 0



    arr.push({type:'sticky', title: 'sticky'})
    currentOffsetValue  = 3.5 //sticky
    allPositions.push(0)

    for(var i = 0; i < data.length; i++) {
       let v = data[i]
       if(currentDate !== v.date ){
            
            arr.push({type:'title', title: currentDate.length > 0 ? v.date : 'Last Transaction',date : v.date})
            currentSectionIndex += 1
            sectionIndices.push(i+currentSectionIndex)
            allPositions.push(currentOffsetValue)
            //starting animation up down
            // sectionPositionsUpDown.push({up:currentOffsetValue-1,mid:currentOffsetValue,down:currentOffsetValue+1.2})
            sectionPositionsUpDown.push({up:currentOffsetValue-0.2,mid:currentOffsetValue,down:currentOffsetValue+0.2})
            currentOffsetValue += 1.2
            currentDate = v.date
       }
        arr.push(v)
        allPositions.push(currentOffsetValue)  
        currentOffsetValue += 1
    }

    return {arr, sectionIndices ,sectionPositionsUpDown,allPositions}
   
}

class ExternalScrollView extends BaseScrollView {
    scrollTo(scrollInput: { x: number; y: number; animated: boolean; }): void {  }
    render() {
       //@ts-ignore
      return  <Animated.ScrollView  {...this.props}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={1}
      nestedScrollEnabled={true}
      overScrollMode='never' 
      /> 
    }
  }

const MemoCell = React.memo(Cell,(r1:any,r2:any)=>{
   return r1.index === r2.index
})
const MemoSectionTitle = React.memo(SectionTitle,(r1:any,r2:any)=>{
    return r1.index === r2.index
 })

const App = (props:any)=>{


    const sharedIndex = useSharedValue(0)
    const [data,setData] = useState<any[]>([])
    const [SectionIndices,setSectionIndices] = useState<number[]>([])
    const [allPositions,setAllPositions] = useState<number[]>([])
    const [SectionPositionsUpDown,setSectionPositionsUpDown] =  useState<SectionOffset[]>([])
    const fetchData = ()=>{
        
        faker.seed(10);
        var counter = 0
        var currentDate = 'April'
        let arr = [...Array(80).keys()].map((_, i) => {
            return {
                type: 'user',
                image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.datatype.number(60)}.jpg`,
                name: faker.name.findName(),
                ammount: faker.datatype.number(200),
            }
        }).map((v:any,i)=>{
            counter += 1
            v.date = currentDate
            if(counter === 10){
                currentDate = 'March 18'
            }
            if(counter === 20){
                currentDate = 'March 17'
            }

            if(counter === 40){
                currentDate = 'March 16'
            }

            if(counter === 50){
                currentDate = 'March 15'
            }
            return v
        })

        let sectioned = sectionedArr(arr)
     
        setAllPositions(sectioned.allPositions)
        setSectionIndices(sectioned.sectionIndices)
        setSectionPositionsUpDown(sectioned.sectionPositionsUpDown)
        setData(sectioned.arr)
    }

    useEffect(()=>{
        let isMounted = true
        if(isMounted) fetchData();
        return ()=>{
            isMounted = false
        }
    },[])

 
    const getDataTitleOfssetUp = (index:number) :{text:string,current:SectionOffset | null,next:SectionOffset | null , nexIndex:number} =>{
        'worklet'
        let ni = index+1
        let condIndex = index >= 0 && index < SectionIndices.length 
        let condIndex2 = ni >= 0 && ni < SectionPositionsUpDown.length 

        let next = condIndex2  ? SectionPositionsUpDown[ni] : null
        let nexIndex = condIndex2  ? ni : SectionPositionsUpDown.length

        let current = condIndex ? SectionPositionsUpDown[index] : null
        let text = condIndex  ? data[SectionIndices[index]].date : ''
        
        return {text,current, next,nexIndex} 
    }

    const getDataTitleOffsetDown = (index:number) :{text:string,current:SectionOffset | null,next:SectionOffset | null,nexIndex:number} =>{
        'worklet'
          let ni = index-1
          let ci = index-2

        let condIndex = ci >= 0 && ci < SectionIndices.length 
        let condIndex2 = ni >= 0 && ni < SectionPositionsUpDown.length 
        
        let next = condIndex2  ? SectionPositionsUpDown[ni] : null
        let nexIndex = condIndex2  ? ni : SectionPositionsUpDown.length

        let current = condIndex ? SectionPositionsUpDown[ci] : null
        let text = condIndex  ? data[SectionIndices[ci]].date : ''

        return {text,current, next,nexIndex} 
    }

    const eventProps:any =  { 
        onScroll:(e:any,ox:number,oy:number)=>{
            sharedIndex.value = oy / ItemHeight
          }
    } 
    
  

    const sharedText = useSharedValue("")
    const sharedTextOpacity = useSharedValue(1)
    const [animatedTextProps,setAnimatedTextProps] = getAnimatedProps({},useAnimatedProps(()=>{
            return{
                text: sharedText.value,
                opacity: sharedTextOpacity.value
            }
         })
    )

    if(Platform.OS === 'web'){
        useAnimatedReaction(()=>[sharedText.value,sharedTextOpacity.value],(v)=>{
            runOnJS(setAnimatedTextProps!)({
                text: v[0],
                opacity:v[1]
            })
        },[])
    }

  
    
    const sharedIsAnimating = useSharedValue(false)
    const changeSharedText = (t:string,anim:boolean)=>{
        'worklet'
        sharedText.value = t
        if(anim){
            if(!sharedIsAnimating.value){
                sharedIsAnimating.value = true
                sharedTextOpacity.value = 0
                sharedTextOpacity.value = withTiming(1,{duration:200,easing:Easing.in(Easing.ease)},(f)=>{
                    sharedIsAnimating.value = false
                })
            }
        }
    }
    
    const currentTitleOffsetNextUp = useSharedValue(-100) 
    const currentTitleOffsetNextDown = useSharedValue(-100) //the more negative (beware ios bounce)
    const currentTitleIndex = useSharedValue(-1) //initial index - sectionsindices
    useAnimatedReaction(()=> sharedIndex.value,
    (res,prev)=>{
     
        let ds = res - (prev === null ? 0 : prev)

        //up
        if(ds > 0){

            if(res > currentTitleOffsetNextUp.value){
                let t = getDataTitleOfssetUp(currentTitleIndex.value)
                currentTitleOffsetNextUp.value = t.next?.up || data.length * 2
                currentTitleOffsetNextDown.value = t.current?.down || -100
                if(t.text.length > 0){
                
                    changeSharedText(t.text,ds < 1)
                }
                
                currentTitleIndex.value = t.nexIndex
            }
            
        } 
        //down
        if(ds < 0){
            if(res < currentTitleOffsetNextDown.value){
                let t = getDataTitleOffsetDown(currentTitleIndex.value)
                currentTitleOffsetNextDown.value = t.current?.down || -100
                currentTitleOffsetNextUp.value = t.next!.up
                if(t.text !== sharedText.value){
                    
                        changeSharedText(t.text,ds > -1)
                }

                currentTitleIndex.value = t.nexIndex
                
            }
        }
    
    },[data])


    return <View style={styles.viewport}>
    <View style={styles.containerViewPort}>
    
       <View style={styles.container}>
             <View style={[styles.containerRecycler]}>
                    { data.length > 0 ? (
                
                        <RecyclerListView
                        externalScrollView={ExternalScrollView}
                        {...eventProps}

                        dataProvider={new DataProvider((r1:any,r2:any)=>{
                            return r1 === r2
                        }).cloneWithRows(data)}

                        layoutProvider={ new LayoutProvider(
                                (i) => {
                                    let item = data[i]
                                    return item.type 
                                },
                                (type, dim, index) => {
                                    dim.width = width
                                    dim.height = type === 'title' ? ItemSectionHeight : ItemHeight 
                                    dim.height = type === 'sticky' ? HeaderHeight : dim.height
                                }
                        )}
                        renderAheadOffset={ItemHeight*3}
                        rowRenderer={(type:any,item:any,index:number)=>{
                            switch(type){
                                    case 'title' : return <MemoSectionTitle 
                                                                allPositions={allPositions}
                                                                index={index} item={item}  animatorValue={sharedIndex} 
                                                            /> ;
                                    case 'sticky' : return <View style={{width:'100%',height:'100%'}}/> ;
                                    default:
                                        return  <MemoCell 
                                                    allPositions={allPositions}
                                                    index={index} item={item}
                                                    animatorValue={sharedIndex} 
                                                />
                            }
                        
                        
                        }}
                    />
                    ): null
                }

            </View>

            <Header animatorValue={ sharedIndex }/>

            <View style={{width:width,height:ItemHeight,position:'absolute',left:0,top:0,paddingHorizontal:width*0.05}} pointerEvents='none'>
                <View style={{width:'100%',height:'100%'}}>
                    <Painter style={{width:'100%',height:'100%'}}
                        
                            
                        >
                    
                        {Platform.OS === 'web' ? 
                                <TextPainter   y={5} baseline='ascender' 
                      
                                    fontSize={height*0.04} fill={colorWhite} fontStyle='bold'  
                                    {...animatedTextProps}
                                />
                            :
                            <AnimatedTextPainter  y={5} baseline='ascender' 
                      
                                    fontSize={height*0.04} fill={colorWhite} fontStyle='bold' 
                                
                                    animatedProps={animatedTextProps} 
                            />    
                    }
                    </Painter>
                </View>
                
            </View>


            <StatusBar style="light" translucent={false}/>
        </View>
   
    </View>
    </View>
}


const styles = StyleSheet.create({
    viewport:{
        width:ScreenSize.width,
        height: ScreenSize.height,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ccc'
    },
    containerViewPort:{

        width:Platform.OS === 'web'? width : '100%',
        height: Platform.OS === 'web' ? height : '100%',
        overflow:'hidden'
    },

    container:{
        flex:1,
        backgroundColor:'black',
    },
    containerRecycler:{
        flex:1,
    },
   
    size100:{
        width:'100%',
        height:'100%',
    },
    
   
    centerChild:{
        justifyContent:'center',
        alignItems:'center'
    },
   
})

export default App


