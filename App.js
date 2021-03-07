import React from 'react';
import Navigator from './routes/HomeStack';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Navigator/>
  );
}


