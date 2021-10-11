import React from 'react'
import { G, Painter, Path,Color } from 'react-native-painter'


const colorGray = Color('gray')


const Shower = (props:any)=>{
  const scale = props.sc || 1
    return    <Painter style={{flex:1}} 
    viewBox={[0,0,22.905,22.905]}
  >  
        <G fill={colorGray} sc={scale} scO={0.5} scPercentageValue={true} >
            <Path  d="M14.3.784A.955.955,0,0,0,13.363,0C5.995,0,0,5.137,0,11.453S5.995,22.905,13.363,22.905a.955.955,0,0,0,.939-.785l.1-.539a59.12,59.12,0,0,0,0-20.269Z" 
                transX={-0.001}
            />
            <Path  d="M363.117,108.424l4.772,2.863a.954.954,0,0,0,.982-1.637l-4.772-2.863a.954.954,0,0,0-.982,1.637Z"
            transX={-346.43}
            transY={-101.879}
            />
            <Path  d="M368.875,237.653,364.1,234.79a.954.954,0,0,0-.982,1.637l4.772,2.863a.954.954,0,0,0,.982-1.637Z" 
            transX={-346.433}
            transY={-224.156}
            />
            <Path  d="M368.875,365.653,364.1,362.79a.954.954,0,0,0-.982,1.637l4.772,2.863a.954.954,0,0,0,.982-1.637Z"
            transX={-346.433}
            transY={-346.429}
            />
       </G>
  </Painter>
}

export default Shower