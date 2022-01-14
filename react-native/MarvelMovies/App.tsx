import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import List from './List'
import Details from './Details'
import {  Easing, Platform } from 'react-native';

const Stack = createSharedElementStackNavigator()



const App = () => {


  return (

    <NavigationContainer  >
      <Stack.Navigator initialRouteName="Home" 
      
      screenOptions={{
          headerShown:false,
          presentation: Platform.OS === 'android' ? 'transparentModal' : 'card',
          gestureEnabled:false,
         transitionSpec:{
             open:{ 
                animation:'timing',
                config:{
                  duration:400,
                  easing: Easing.bezier(.51,.37,.33,1.3)
                  
                }
             },
             close:{
                animation:'timing',
                config:{
                  duration:400,
                  easing: Easing.bezier(.67,-0.3,.49,0.63),
                }
             }
         },
         cardStyleInterpolator: Platform.OS == 'ios' ? undefined : (props)=>{
           return {}
         }
       
        
        
  
      }}>
        <Stack.Screen name="List" component={List}  />
        <Stack.Screen
          name="Details"
          component={Details}
          sharedElements={(route, otherRoute, showing) => {
            const { sharedItem } = route.params;
            return sharedItem;
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App