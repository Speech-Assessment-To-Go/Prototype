//------------ * IMPORT LIBS * ------------------------
import React from 'react';
import { Component } from 'react';

import { 
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { globalStyles } from '../globalStyles';
import { Button, Avatar, Chip  } from 'react-native-paper';
import { TemplateScreen } from './TemplateScreen';

import { RoundedText } from '../components/RoundedText';

//------------ * FUNCTIONS/VAR * ------------------------  
function alertFunc(msg)
{
  alert(msg);
}


var schools = []


export class ResultScreen extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {

      // grading:props.grading,
      maxQuestions:10
    }
  }

  getPercent(array)
  {
    var correct = 0;

    for (var i = 0; i < array.length; i++)
    {
      if (array[i] == true)
        correct++;
    }

    var ratio = (correct / array.length) * 100; 
    var rounded = Math.round(ratio * 10) / 10; //Rounded to 1 decimal place
    return rounded;
  }


// ------------ * RENDER * ------------------------
  render(){
    const { route, navigation } = this.props;
    const { grading } = route.params;

      return(      
        <View style={styles.container}>

 
        {/* QUESTIONS IMG & TEXT */}
        <View style={[styles.container, globalStyles.flex8]}>

      <Text style={styles.percentText}>{this.getPercent(grading)}%</Text>

          {/* <View style={styles.box}></View> */}

        </View>

        {/* QUESTION BUBBLES */}
        <View style={[styles.container, globalStyles.flex1]}>

          <View style={globalStyles.flexRow}>
            <Chip style={[styles.chip, (grading[0])? styles.chipCorrect: styles.chipIncorrect]} textStyle={styles.chipText} onPress={() => console.log('Pressed')}>Q1</Chip>
            <Chip style={[styles.chip, (grading[1])? styles.chipCorrect: styles.chipIncorrect]} textStyle={styles.chipText} onPress={() => console.log('Pressed')}>Q2</Chip>
            <Chip style={[styles.chip, (grading[2])? styles.chipCorrect: styles.chipIncorrect]} textStyle={styles.chipText} onPress={() => console.log('Pressed')}>Q3</Chip>
            <Chip style={[styles.chip, (grading[3])? styles.chipCorrect: styles.chipIncorrect]} textStyle={styles.chipText} onPress={() => console.log('Pressed')}>Q4</Chip>
            <Chip style={[styles.chip, (grading[4])? styles.chipCorrect: styles.chipIncorrect]} textStyle={styles.chipText} onPress={() => console.log('Pressed')}>Q5</Chip>
          </View>

          <View style={globalStyles.flexRow}>
            <Chip style={[styles.chip, (grading[5])? styles.chipCorrect: styles.chipIncorrect]} textStyle={styles.chipText} onPress={() => console.log('Pressed')}>Q6</Chip>
            <Chip style={[styles.chip, (grading[6])? styles.chipCorrect: styles.chipIncorrect]} textStyle={styles.chipText} onPress={() => console.log('Pressed')}>Q7</Chip>
            <Chip style={[styles.chip, (grading[7])? styles.chipCorrect: styles.chipIncorrect]} textStyle={styles.chipText} onPress={() => console.log('Pressed')}>Q8</Chip>
            <Chip style={[styles.chip, (grading[8])? styles.chipCorrect: styles.chipIncorrect]} textStyle={styles.chipText} onPress={() => console.log('Pressed')}>Q9</Chip>
            <Chip style={[styles.chip, (grading[9])? styles.chipCorrect: styles.chipIncorrect]} textStyle={styles.chipText} onPress={() => console.log('Pressed')}>Q10</Chip>
          </View>
          
        </View>

       {/* Bottom Buttons */}
        <View style={[globalStyles.flexVertEnd, globalStyles.flex1]}>        

          <View style={[globalStyles.flexRow]}>

            <TouchableOpacity
              style={[styles.bottomButton]}
              onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Review</Text>
            </TouchableOpacity>

          </View>

          </View>




      </View>


    );
  }
}


//------------ * STYLE * ------------------------
var scale = 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
  },

  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 60,
    paddingVertical: 25,
    marginHorizontal: 140,
    marginBottom: 12,
    height: 22,
    backgroundColor: "#1e90ff"

  },

  buttonText:{
    fontSize: 17,
    fontWeight: 'bold',
    color: "white",
    // fontFamily: 'tahoma'
  },

  box:{
    flex: 1,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#1e90ff',
    width: "55%",
    padding: 15,
    marginBottom: 40
  },
  

  img:{
    maxWidth: 256*scale,
    maxHeight: 192*scale,
    aspectRatio: (256*scale)/(192*scale),
    width: 256*scale,
    height: 192*scale
  },

  percentText:{
    fontSize: 185,
    fontWeight: '100',
    color: '#6bc46b'
  },


  chip:{
    flex:1,
    // backgroundColor: '#d4d4d4',
    // backgroundColor: '#6bc46b',
    justifyContent: 'center',
    maxWidth: 100,
    marginHorizontal: 10,
    marginBottom: 20,  
  },

  chipText:{
    fontWeight: 'bold',
    textAlign: 'center',
    width: '90%'
    // paddingHorizontal: 10
  },

  chipCorrect:{
    backgroundColor: '#6bc46b',
  },

  chipIncorrect:{
    backgroundColor: '#ff5c5c',
  }




});
