import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from '@react-navigation/native';


import SchoolScreen from './screens/SchoolScreen';
import TemplateScreen from './screens/TemplateScreen';

const Stack = createStackNavigator();

export const ScreenManager = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="SchoolScreen" component={SchoolScreen} />
      <Stack.Screen name="TemplateScreen" component={TemplateScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
