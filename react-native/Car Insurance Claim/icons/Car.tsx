import React from 'react'
import { G, Painter, Path,Color } from 'react-native-painter'


const colorGray = Color('gray')


const Car = (props:any)=>{
                             
   const scale = props.sc || 1
    return    <Painter style={{flex:1}} 
    viewBox={[0,0,22.906,22.905]}
  >
      <G fill={colorGray} sc={scale} scO={0.5} scPercentageValue={true} >
   
  
      <Path  d="M90,362a1.342,1.342,0,0,0,2.684,0Z" 
         transX={4.026 - 90} transY={15.195 - 362} />
 
      <Path d="M22.316,9.243,13.663.59A2,2,0,0,0,12.239,0H2.013A2.015,2.015,0,0,0,0,2.013V20.892a2.015,2.015,0,0,0,2.013,2.013H12.795a.671.671,0,0,0,.6-.371,9.057,9.057,0,0,1,8.131-5h.708a.671.671,0,0,0,.671-.671v-6.2A2,2,0,0,0,22.316,9.243ZM8.053,16.195a2.684,2.684,0,0,1-5.368,0v-.671a.671.671,0,0,1,.671-.671H7.382a.671.671,0,0,1,.671.671Zm11.5-4.071H3.355a.671.671,0,0,1-.671-.671v-8.1a.671.671,0,0,1,.671-.671h8.327a.67.67,0,0,1,.474.2l7.867,7.867C20.384,11.108,20.294,12.124,19.55,12.124Z" />
   
      <Path  d="M97.379,90H90v6.755h14.134Z" 
      transX={4.026 - 90} transY={4.026 - 90}
        />
  

       </G>
  </Painter>
}

export default Car