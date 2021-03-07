
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../pages/Home';
import Comics from '../pages/Comics';
import HeroSearch from '../pages/HeroSearch';


const Stack = createStackNavigator()

export default Navigator = () => {
  return (
    <NavigationContainer initialRouteName='Home'>
      <Stack.Navigator>
        <Stack.Screen name = 'Home' component = {Home}/>
        <Stack.Screen name = 'HeroSearch' component = {HeroSearch}/>
        <Stack.Screen name = 'Comics' component = {Comics}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}
