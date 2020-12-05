//------------ * IMPORT LIBS * ------------------------
import React from 'react';
import { Component } from 'react';

import { 
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import { globalStyles } from '../styles/global';
import { Button, Avatar, Divider  } from 'react-native-paper';
import { TemplateScreen } from './TemplateScreen';
import { Question } from '../Question.js'
import { RoundedText } from '../components/RoundedText';

//------------ * FUNCTIONS/VAR * ------------------------  
function alertFunc(msg)
{
  alert(msg);
}


export class AssessmentScreen extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {

      currentQuestion:0,
      maxQuestions: 10,
  
      questionsObj:[new Question(require('../img/ship.png'), 'Ship'), new Question(require('../img/shark.png'), 'Shark'), new Question(require('../img/shoe.png'),'Shoe'),
       new Question(require('../img/shovel.png'), 'Shovel'), new Question(require('../img/shirt.png'), 'Shirt'),new Question(require('../img/shadow.png'), 'Shadow'),
       new Question(require('../img/shrimp.png'), 'Shrimp'),new Question(require('../img/sheep.png'), 'Sheep'),  new Question(require('../img/shapes.png'), 'Shapes'),
       new Question(require('../img/shorts.png'), 'Shorts')],  


      grading:[],


    };
  }

  grade(val)
  {
    this.state.grading.push(val);

    var grading = this.state.grading;


    if ((this.state.currentQuestion+1) >= this.state.maxQuestions)
      this.props.navigation.navigate('ResultScreen', {grading});
    else
    {
      this.state.currentQuestion++;
      this.forceUpdate();
    }

  }


// ------------ * RENDER * ------------------------
  render(){
  const { navigation } = this.props;

      return(      
        <View style={styles.container}>

 
        {/* QUESTIONS IMG & TEXT */}
        <View style={[styles.container, globalStyles.flex8]}>

          <Text style={styles.question}>{this.state.questionsObj[this.state.currentQuestion].question}</Text>
          <Image style={styles.img}  source={this.state.questionsObj[this.state.currentQuestion].img} />


        </View>

       {/* Bottom Buttons */}
        <View style={[globalStyles.flexVertEnd, globalStyles.flex1]}>        

          <View style={[globalStyles.flexRow]}>

            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => this.grade(true)}>
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomButton, globalStyles.danger]}
              onPress={() => this.grade(false)}>
              <Text style={styles.buttonText}>Incorrect</Text>
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
    paddingHorizontal: 44,
    paddingVertical: 30,
    marginHorizontal: 140,
    marginVertical: 12,
    height: 25,
    backgroundColor: "#00bcd4"

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
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'column'
  },

  question:{
    fontSize: 85,
    fontWeight: '100',
    color: '#a1a1a1',
    marginBottom: 55
  },

  buttonText:{
    fontSize: 17,
    fontWeight: 'bold',
    color: "white",
    // fontFamily: 'tahoma'
  },

  

  img:{
    maxWidth: 256*scale,
    maxHeight: 192*scale,
    aspectRatio: (256*scale)/(192*scale),
    width: 256*scale,
    height: 192*scale
  },




});
