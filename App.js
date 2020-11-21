import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { 
  StyleSheet, 
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import { Card, Button, Appbar } from 'react-native-paper';

import { Student } from './Student.js';
const test = new Student('Test');
let schools = [];
for (var i = 0; i < 100; i++)
  schools[i] = "School " + (i+1);

import { SchoolScreen } from './screens/SchoolScreen';
import { TemplateScreen } from './screens/TemplateScreen';

const Nav = createStackNavigator();


export default function App() {
  return (

    <NavigationContainer>
      <Nav.Navigator initialRouteName="SchoolScreen">

        <Nav.Screen name="SchoolScreen" component = {SchoolScreen} />
        <Nav.Screen name="TemplateScreen" component = {TemplateScreen} />


      </Nav.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollview: {
    backgroundColor: 'orange',
    width: '50%'

  },

  text: {
    padding: 4,
    margin: 8,
    backgroundColor: "blue",

  },

  bottom: {
    width: "100%"
  },

});
