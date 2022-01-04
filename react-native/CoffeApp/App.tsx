import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import List from './List'
import Home from './Home'
import Details from './Details'
import { Easing, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createSharedElementStackNavigator()


const App = () => {


  return (
    <GestureHandlerRootView style={{flex:1}}>

<NavigationContainer >
          <Stack.Navigator initialRouteName="Home" 
          screenOptions={{
              headerShown:false,
              presentation:"card",
            
              
          }}>
            <Stack.Screen name="Home" component={Home} 
            sharedElements={(route, otherRoute, showing) => {
              const { sharedItem } = route.params;
              return sharedItem;
            }}
             />
            <Stack.Screen
              name="List"
              component={List}
              sharedElements={(route, otherRoute, showing) => {
                const { sharedItem } = route.params;
                return sharedItem;
              }}
            />
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
      
    </GestureHandlerRootView>
  );
};

export default App