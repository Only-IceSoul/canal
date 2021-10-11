

import React from 'react'
import { Dimensions } from 'react-native'
import { G, Painter, Path,Color } from 'react-native-painter'

const WindowWidth =   Dimensions.get('window').width
const windowHeight =  Dimensions.get('window').height
const MarkWidth = WindowWidth * 0.8
const MarkHeight = windowHeight * 0.55
const colorBlack = Color('black')


const Marker = (props:any)=>{
                             
    const w = props.width || 0
    return   <Painter style={{width:MarkWidth,height:MarkHeight}}>

    <Path d="M8,38 L8,12 A 4 4 0 0 1 12 8 L38,8" fill={0} stroke={colorBlack} 
     strokeWidth={3.5} strokeCap="round" />
     <Path d={`M${MarkWidth - 8},38 L${MarkWidth - 8},12 A 4 4 0 0 0 ${MarkWidth - 12} 8 L${MarkWidth - 38},8`} fill={0} stroke={colorBlack} 
     strokeWidth={3.5} strokeCap="round" />
      <Path d={`M8,${MarkHeight - 38} L8,${MarkHeight - 12} A 4 4 0 0 0 12 ${MarkHeight - 8} L38,${MarkHeight - 8}`} fill={0} stroke={colorBlack} 
     strokeWidth={3.5} strokeCap="round" />
     <Path d={`M${MarkWidth - 8},${MarkHeight - 38} L${MarkWidth - 8},${MarkHeight - 12} A 4 4 0 0 1 ${MarkWidth - 12} ${MarkHeight - 8} L${MarkWidth - 38},${MarkHeight - 8}`} fill={0} stroke={colorBlack} 
     strokeWidth={3.5} strokeCap="round" />

</Painter>
}

export default Marker