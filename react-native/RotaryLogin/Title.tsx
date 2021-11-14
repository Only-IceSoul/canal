import React from "react";
import { Color, G, Text } from "react-native-painter";

import { RADIUS, center } from "./Quadrant";

const fontSize = 26;
const colorBlack = Color('black')
const Title = (props:any) => {
  const { align , aspect } = props
  return (
    <G
    align={align} aspect={aspect}
    transY={ -RADIUS - 100}
    >
      <Text
        text="ENTER"
        fontStyle="bold"
        fontSize={fontSize}
        fill={colorBlack}
        x={center.x - RADIUS}
        y={center.y - fontSize / 2}
      />
        
   
      <Text
      text="PASSCODE"
        fontStyle="bold"
        fontSize={fontSize}
        fill={colorBlack}
        x={center.x - RADIUS}
        y={center.y + fontSize / 2}
        />
        
     
    </G>
  );
};

export default Title;