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

import * as ScreenOrientation from 'expo-screen-orientation';

import { Provider  } from 'react-native-paper';

import { Card, Button, Appbar } from 'react-native-paper';

import { Student } from './Student.js';
const test = new Student('Test');
let schools = [];
for (var i = 0; i < 100; i++)
  schools[i] = "School " + (i+1);

import { SchoolScreen } from './screens/SchoolScreen';
import { StudentScreen } from './screens/StudentScreen';
import { TopicScreen } from './screens/TopicScreen';
import { AssessmentScreen } from './screens/AssessmentScreen';
import { TemplateScreen } from './screens/TemplateScreen';
import { ResultScreen } from './screens/ResultScreen';

import './global'

const Nav = createStackNavigator();

//Force Screen Orientation to Landscape
ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);


export default function App() {
  return (
  // <Provider>
    <NavigationContainer>
      <Nav.Navigator initialRouteName="SchoolScreen" >

        <Nav.Screen name="SchoolScreen" component = {SchoolScreen} options= {optionStyle}/>
        <Nav.Screen name="StudentScreen" component = {StudentScreen} options= {optionStyle}/>
        <Nav.Screen name="TopicScreen" component = {TopicScreen} options= {optionStyle}/>
        <Nav.Screen name="AssessmentScreen" component = {AssessmentScreen} options= {optionStyle}/>
        <Nav.Screen name="TemplateScreen" component = {TemplateScreen} options= {optionStyle}/>
        <Nav.Screen name="ResultScreen" component = {ResultScreen} options= {optionStyle}/>

      </Nav.Navigator>
    </NavigationContainer>
    // </Provider>
  );
}

const optionStyle = {

  title:"Speech Assessment To-Go", 

  headerStyle: 
  {
    backgroundColor: '#0a2ea3',
  },

  headerTitleStyle: 
  {
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 25
  }
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
