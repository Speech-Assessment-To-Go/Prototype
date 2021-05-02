//------------ * IMPORT LIBS * ------------------------
import React from 'react';
import { Component } from 'react';

import { 
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';

import {  TextInput, Checkbox, RadioButton  } from 'react-native-paper';

import { globalStyles } from '../globalStyles';
import { Button, Divider,   } from 'react-native-paper';
import { TemplateScreen } from './TemplateScreen';

import { RoundedText } from '../components/RoundedText';
import { Assessment } from '../Assessment'
import { Structure } from '../Structure'
import { Topic } from '../Topic'
import { Question } from '../Question'

import Database from '../Database.js';
import { cos } from 'react-native-reanimated';

import {AssessmentData} from '../AssessmentData'
import {QuestionData} from '../QuestionData'

import {filterQuestions} from '../filterQuestions'

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


export class TopicScreen extends Component
{

  constructor(props)
  {
    super(props);

    this.state = {

      // topics:[ new Topic('WH Questions'), new Topic('Repeat After Me'), new Topic('Audiotoruim Memory'), new Topic('Repeating Utterances'),
      //  new Topic('Creating Utterances'), new Topic('Following Directions'), new Topic('Phonemes'), new Topic('Articulation')],

      structures:[ new Structure("WH Questions", "wh"), new Structure("Repeat After Me", "repeat")],

      complexity:["Complexity 1","Complexity 2","Complexity 3","Complexity 4"],

      structureChecks:[true, false, false, false, false, false, false, false], //HARDCODED :)
      complexityChecks:[true, false, false, false], //Also HARDCODED :D

      numQuestions:'5',

      questions:[],//Question IDS


      selectedStructure:0,
      selectedComplexity:0,
    };

    
    this.init();
  }


  //HARDCODED
  init()
  {
    global.parsedQuestions = Database.LoadQuestions();
    global.questionIndex = 0;
    //console.log("LOADED!");
  }


  addQuestions(){
    //ToDo: Remove duplicate questions
    var num = parseInt(this.state.numQuestions);

    var pastQuestions = this.state.questions.slice();
    
    var newQuestions = filterQuestions(num, this.state.structures[this.state.selectedStructure].tag, this.state.selectedComplexity+1, pastQuestions);

    let copy = this.state.questions.slice();
    copy = copy.concat(newQuestions);

    this.setState({questions: copy});
    
  }

  setStructureCheckbox(index)
  {
    //Clear
    for (var i = 0; i < this.state.structureChecks.length; i++)
      this.state.structureChecks[i] = false;

    this.state.structureChecks[index] = !this.state.structureChecks[index];
    this.state.selectedStructure = index;
    this.forceUpdate();
  }

  setContentCheckbox(index)
  {
    //Clear
    for (var i = 0; i < this.state.complexityChecks.length; i++)
      this.state.complexityChecks[i] = false;

    this.state.selectedComplexity = index;
    this.state.complexityChecks[index] = !this.state.complexityChecks[index];
    this.forceUpdate();
  }

// ------------ * RENDER * ------------------------
  render(){
  const { route, navigation } = this.props;
  const { student, updateStudent } = route.params;

      return(      


        <View style={[styles.container, globalStyles.flexRow]}>       

        {/* LEFT | ASSESSMENTS */}      
      <View style={styles.column}>
 
        <View style={[styles.header]}>
        <Text style={[styles.h1]}>Structure</Text> 
        </View>

        <ScrollView style={[styles.structurePanel, globalStyles.flex3]}>
        {
          this.state.structures.map((structure,index) => (
            <View key={"assessment"+index}>
            
            <TouchableOpacity
              // style={[styles.mainButton, (index == this.state.selectedTopic)? styles.selectedBG: styles.unselectedBG]}
              style={[styles.mainButton, styles.unselectedBG]}
              onPress={() => this.setStructureCheckbox(index)}>

              <View style={globalStyles.flexRow}>
              

              <View style={styles.checkboxBlock}>
                <RadioButton
                status={this.state.structureChecks[index] ? 'checked' : 'unchecked'}
                onPress={() => {
                  this.setStructureCheckbox(index);
                }}
                  />
              </View>


                <View style={globalStyles.flexCol}>              
                  <Text style={styles.h2}>{structure.title}</Text>
                </View>

              </View>

            </TouchableOpacity>     
            <Divider/>
            </View>
          ) )
        }             
        </ScrollView>
        <View style={[styles.footer]}></View>

        {/* CONTENT */}
        <View style={[styles.header]}>
          <Text style={[styles.h1]}>Complexity</Text> 
        </View>

        <ScrollView style={[styles.contentPanel,globalStyles.flex1]}>
        {
          this.state.complexity.map((content,index) => (
            <View key={"topic"+index}>
            
            <TouchableOpacity
              // style={[styles.mainButton, (index == this.state.selectedTopic)? styles.selectedBG: styles.unselectedBG]}
              style={[styles.mainButton, styles.unselectedBG]}
              onPress={() => this.setContentCheckbox(index)}>

              <View style={globalStyles.flexRow}>
              

              <View style={styles.checkboxBlock}>
                <RadioButton
                status={this.state.complexityChecks[index] ? 'checked' : 'unchecked'}
                onPress={() => {
                  this.setContentCheckbox(index);
                }}
                />
              </View>


                <View style={globalStyles.flexCol}>              
                  <Text style={styles.h2}>{content}</Text>
                </View>

              </View>

            </TouchableOpacity>     
            <Divider/>
            </View>
          ) )
        }             
        </ScrollView>

        <View style={[globalStyles.flexRowReverse, globalStyles.flexHoriCenter]}>

            <TouchableOpacity
              style={styles.bottomButton}
              onPress={ () => {
                this.addQuestions();
                }}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>

            {/* <View style={[globalStyles.flexRow]}> */}
            <TextInput style={[styles.textInput]} keyboardType="number-pad" value={this.state.numQuestions} onChangeText={text => this.setState( {numQuestions: text})} />      
              <Text style={styles.textBottom}>Number: </Text>
            {/* </View> */}

        </View>   

        {/* END OF COLUMN */}
        </View> 


        {/* Right | ASSESSMENTS PANEL*/}
        <View style={styles.column}> 
        <View style={[styles.header]}>
        <Text style={[styles.h1]}>Questions</Text> 
        </View>
        
        <ScrollView style={styles.assessmentsPanel}>

        {


          this.state.questions.map( (questionID,index) => (
            <View key={"assessment"+index}>

            
            <View
              style={styles.mainButton}
              // onPress={ () => navigation.navigate('AssessmentScreen', {assessment} )}>
              // onPress={ () => 
              // {
              //     let copy = this.state.questions.slice(); //Create copy
              //     copy.splice(index, 1);
              //     this.setState({questions: copy});
              // } }
              >

              <View style={globalStyles.flexRow}>

              {/* <TouchableOpacity
              onPress={ () => 
                {
                    let copy = this.state.questions.slice(); //Create copy
                    copy.splice(index, 1);
                    this.setState({questions: copy});
                } }
              >
              <RoundedText
                    title = "-"
                    color = "black"
                    backgroundColor = "#ffaaaa"
                    fontSize={36}
                    size={43}
                />
                </TouchableOpacity> */}

                <TouchableOpacity
                  style={[styles.removeButton, globalStyles.danger]}
                  onPress={ () => 
                    {
                      let copy = this.state.questions.slice(); //Create copy
                      copy.splice(index, 1);
                      this.setState({questions: copy});
                    } }>
      
                  <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
     
                  <Text style={styles.h2}>{global.parsedQuestions[questionID].text}</Text>

              </View>

            </View>

            <Divider/>
            </View>
          ) )
        }               

        </ScrollView>

        <View style={globalStyles.flexRowReverse}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={ () => 
                {
                  if (this.state.questions.length == 0)
                  {
                    alert("Cannot start without questions!");
                    return;
                  }

                  //Get questions from premade assessments
                  global.questions = this.state.questions;
  
                  var questionsData = [];
                  for (var i = 0; i < global.questions.length; i++)
                    questionsData.push(new QuestionData(global.questions[i]));
  
                  var assessmentData = new AssessmentData(questionsData, (new Date()).toUTCString() );
              
                  //Pass update student to update recent assessments panel
                  navigation.navigate('AssessmentScreen', {assessmentData:assessmentData, student:student, updateStudent: updateStudent.bind(this), reviewMode:false});
                } }>
  
              <Text style={styles.buttonText}>Start Assessment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomButton, globalStyles.danger]}
              onPress={ () => 
                {
                  if (this.state.questions.length == 0)
                  {
                    alert("There is nothing to clear!");
                    return;
                  }

                  this.setState({questions: []});
                } }>
  
              <Text style={styles.buttonText}>Clear</Text>
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
    backgroundColor: 'white'
  },

  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginRight: 30,
    marginVertical: 12,
    height: 25,
    backgroundColor: "#00bcd4"
  },

  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginRight: 20,
    // marginVertical: 12,
    height: 25,
    backgroundColor: "#00bcd4"
  },

  icon:{

    marginTop: 7,
    marginLeft: 6,
    marginRight: 19
  },

  mainButton:
  {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingLeft: 40,
    marginVertical: 1,
    width: "60%",

  },

  column:{
    flex: 1,
    height: "100%",
    width: "50%"
  },

  h1:{
    fontSize: 24,
    fontWeight: 'bold',
    color: "white"
  },

  h2:{
    fontSize: 20,
    fontWeight: 'bold'
  },

  textBottom:{
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5
  },

  header:{
    backgroundColor: '#00bcd4',
    width:'100%',
    height:36,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 24
  },

  footer:{
    // backgroundColor: '#00bcd4',
    // width:'100%',
    // height:3,
  },

  textInput:{
    textAlignVertical: "top",
    flex:1,
    height: 45,
    marginHorizontal: 10,
    marginVertical: 20,
    maxWidth: 45,
    fontSize: 15,
    marginRight: 35,
    justifyContent: 'center',
    textAlign: 'center'
    // alignItems: 'center'
  },

  buttonText:{
    fontSize: 15,
    fontWeight: 'bold',
    color: "white"
  },

  spacing:  {
    margin: 25,
  },

  checkboxBlock:{
    marginRight: 25
  },


  structurePanel:{
    flex:1,
    // backgroundColor: "red",
    height: "100%",
    borderRightColor: '#00bcd4',
    borderRightWidth: 3,

  },

  contentPanel:{
    flex:1,
    // backgroundColor: "red",
    height: "100%",
    borderRightColor: '#00bcd4',
    borderRightWidth: 3,


  },

  assessmentsPanel:{
    flex:1,
    height: "100%",
    // borderLeftColor: '#00bcd4',
    // borderLeftWidth: 1,

  },
  
  selectedBG:{
    backgroundColor: "cyan"
  },

  unselectedBG:{
    padding:0
  },



});
