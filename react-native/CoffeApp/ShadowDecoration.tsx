

import React from 'react'
import { View  ,Dimensions , Text as TextReact} from 'react-native'
import { Color, DrawableViewB } from 'react-native-drawableview'

var roundedRectData = function (w:number, h:number, tlr:number, trr:number, brr:number, blr:number,offsetX:number,offsetY:number) {
    return 'M '+ offsetX + ' '  + (tlr + offsetY)
      + ' A ' + tlr + ' ' + tlr  + ' 0 0 1 ' + (tlr + offsetX) + ' ' + offsetY
      + ' L ' + ((w - trr) + offsetX) + ' ' + offsetY
      + ' A ' + trr + ' ' + trr + ' 0 0 1 ' + (w + offsetX) + ' ' + (trr + offsetY)
      + ' L ' + (w + offsetX)  + ' ' + ((h - brr) + offsetY)
      + ' A ' + brr + ' ' + brr + ' 0 0 1 ' + ((w - brr) + offsetX) + ' ' + (h + offsetY)
      + ' L ' + (blr + offsetX) + ' ' + (h + offsetY)
      + ' A ' + blr + ' ' + blr + ' 0 0 1 '+ offsetX + ' ' + ((h - blr) + offsetY)
      + ' Z';
  };

const colorBrown = Color('#655353')
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const itemHeight = windowHeight * 0.35

const radiusShape = Math.min(windowWidth - 80 ,itemHeight) / 2

const ShadowDecoration = (props:any)=>{

    return(
        <DrawableViewB 
            style={{position:'absolute',left:0,right:0,bottom:0,height:itemHeight*2,transform:[{translateY:20},{scale:1.2}]}}  
            d={roundedRectData(windowWidth - 80,itemHeight,radiusShape,radiusShape,radiusShape,radiusShape,-windowWidth,0)}
            shadowOpacity={1}
            shadowOffsetX={windowWidth + 28}
            shadowOffsetY={(itemHeight)+itemHeight/2}
            shadow={colorBrown}
            shadowRadius={65}
      />
 
    )

}


export default ShadowDecoration