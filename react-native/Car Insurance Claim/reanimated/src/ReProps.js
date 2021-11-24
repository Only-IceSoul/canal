import React from 'react'
import { useState } from "react";
import { Platform } from "react-native";




 const  animatedProps = (web,mobile) =>{
    return Platform.OS === 'web' ? useState(web) : [mobile,undefined] ;
  }
  
  export default animatedProps