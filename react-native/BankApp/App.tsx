
import React from 'react';
import { Platform } from 'react-native';

import App23 from './App23'
import App22 from './App22'

export default function App() {
  return (
        
           <App22 />  // web reanimated 2.2.0 and mobile (https://github.com/software-mansion/react-native-reanimated/issues/2699)
        //    <App23 />  // web reanimated 2.3.0 and mobile 
  )
}
