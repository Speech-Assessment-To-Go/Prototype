//------------ * IMPORT LIBS * ------------------------
import React from 'react';
import { Component } from 'react';

import { 
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,  
  TextInput
} from 'react-native';

import { globalStyles } from '../styles/global';
import { Button, Avatar, Divider  } from 'react-native-paper';
import { TemplateScreen } from './TemplateScreen';

import { RoundedText } from '../components/RoundedText';
import { Student } from '../Student'

//------------ * FUNCTIONS/VAR * ------------------------  
function alertFunc(msg)
{
  alert(msg);
}

//FOR ROUNDED TEXT BUTTON
const size = 43;
const fontSize = 18;
const borderWidth = 0;
const title = 'A';


export class StudentScreen extends Component
{

  state = {

  }

// ------------ * RENDER * ------------------------
  render(){
  const { route, navigation } = this.props;
  const { student } = route.params;

      return(      
        <View style={styles.container}>
        
        {/* LEFT */}      
        <View style={[styles.column, globalStyles.flex2]}>

          <View style={styles.leftPanel}>
          <View style={styles.box}>

          <View style={globalStyles.flexRow}>
            <View style={[styles.underline, globalStyles.flex1]}>            
              <Text style={styles.textUnderline}>{student.firstName + ' ' + student.lastName}</Text>
            </View>

            <View style={[styles.underline, globalStyles.flex1]}>     
              <Text style={styles.textUnderline}>{student.birth}</Text>
            </View>

          </View>


          <View style={[styles.underline]}>   
            <Text style={styles.textUnderline}>{student.school}</Text>
          </View>

          <View style={[styles.underline]}>   
            <Text style={styles.textUnderline}>{student.ethnicity}</Text>
          </View>

          <View style={[styles.underline]}>   
            <Text style={styles.textUnderline}>{student.language}</Text>
          </View>

          {/* BOTTOM */}
          <View style={[globalStyles.flex1, globalStyles.flexVertEnd]}>
            <TextInput style={styles.textInput} onChangeText={(text) => console.log(text)} placeholder={"Notes"}/>
            <TouchableOpacity
                style={styles.bottomButton}
                onPress={ () => navigation.push('TopicScreen')}>
                <Text style={[styles.buttonText]}>Edit</Text>
            </TouchableOpacity>
          </View>

          </View>
          
                  
          </View>

        </View>
      



        {/* Right */}

        <View style={[styles.column, globalStyles.flex3]}> 

        <View style={styles.rightPanel}>

          <View style={styles.box}>
            <Text style={[globalStyles.flexAlignCenter]}>No recent assessments</Text>
          </View>

        </View>

        <View style={globalStyles.flexRowReverse}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={ () => navigation.push('TopicScreen')}>
              <Text style={styles.buttonText}>Take Assessment</Text>
            </TouchableOpacity>


          </View>   

        </View>

        </View>


    );
  }
}


//------------ * STYLE * ------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
  },

  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginRight: 30,
    marginVertical: 12,
    height: 25,
    backgroundColor: "#00bcd4"

  },

  icon:{
    marginTop: 7,
    marginLeft: 6,
    marginRight: 19
  },

  textbox:{

  },

  mainButton:
  {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 30,
    marginVertical: 1,
    width: "55%",
    // backgroundColor: "cyan"
  },

  column:{
    flex: 1,
    height: "100%",
    width: "50%"
  },



  h2:{
    fontSize: 18,
    fontWeight: 'bold'
  },

  buttonText:{
    fontSize: 15,
    fontWeight: 'bold',
    color: "white"
  },

  spacing:  {
    margin: 25,
  },


  leftPanel:{
    flex:1,
    flexDirection: 'column',
    // backgroundColor: "red",
    height: "100%",
    borderRightColor: '#00bcd4',
    borderRightWidth: 3,
    // backgroundColor: 'red',
    padding: 15,
    paddingRight: 40
  },

  textUnderline:{
    // lineHeight: 14,
    color: 'black',
    fontSize: 22,
  },

  underline:{
    paddingBottom: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 22,
    marginHorizontal: 20,
    maxWidth: '65%'
  },

  rightPanel:{
    flex:3,
    flexDirection: 'column',
    // backgroundColor: "blue",
    height: "100%",
    // borderLeftColor: '#00bcd4',
    // borderLeftWidth: 1,
    width: '100%',
    padding: 40

  },

  box:{
    flex: 1,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#00bcd4',
    width: "100%",
    padding: 15,

  },

  textInput: {
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#00bcd4',
    height: 280,
    padding: 15
  },

  input: {
    height: 70,
    backgroundColor: '#ffffff',
    paddingLeft: 15,
    paddingRight: 15
  }


});
