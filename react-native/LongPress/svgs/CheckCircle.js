import Svg, {
    Path,
  } from 'react-native-svg';

  import React from 'react';
  import {View } from "react-native";
import Animated from 'react-native-reanimated';

  export default (props) =>{
      const width = props.style.width
      const height = props.style.height
      const zIndex = props.style.zIndex
      const elevation = props.style.elevation
      const color = props.style.color
      const scX = width / 24
      const scY = height / 24
    return (
        <View style={{ width, height, alignItems:'center',justifyContent:'center',position:'absolute',zIndex,elevation }}>
            <Svg  style={{ transform: [{ scaleX:scX || 1 },{ scaleY:scY || 1 }] }}
                    height="24" 
                    width="24" 
                   >
              <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
               fill={color || "black"}
              />
            </Svg>
        </View>
      
    )
  }