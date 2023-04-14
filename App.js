import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Board from './screens/Board';
import 'react-native-gesture-handler'

const Stack = createNativeStackNavigator()
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Your boards' component={Home}/>
        <Stack.Screen name='Board' component={Board}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
