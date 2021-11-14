
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import RotaryLogin from './RotaryLogin';




export default function App() {
  



  return (
    <GestureHandlerRootView style={{flex:1}}>
           <RotaryLogin />
           <StatusBar  translucent={true} />
    </GestureHandlerRootView>

  );
}

