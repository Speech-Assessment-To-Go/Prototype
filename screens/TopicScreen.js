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
import { Topic } from '../Topic'
import { Question } from '../Question'

import Database from '../Database.js';
import { cos } from 'react-native-reanimated';

import {AssessmentData} from '../AssessmentData'
import {QuestionData} from '../QuestionData'

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

// const questions = Database.LoadQuestions();


export class TopicScreen extends Component
{

  constructor(props)
  {
    super(props);

    this.state = {

      // topics:[ new Topic('WH Questions'), new Topic('Repeat After Me'), new Topic('Audiotoruim Memory'), new Topic('Repeating Utterances'),
      //  new Topic('Creating Utterances'), new Topic('Following Directions'), new Topic('Phonemes'), new Topic('Articulation')],

      structures:[ new Assessment('WH Questions', [0,1,2,3,4,5]), new Assessment('Repeat After Me',[6,7,8,9,10]), new Assessment('Following Directions',[22,13,15,12,14])],

      content:["Complexity 1","Complexity 2","Complexity 3","Complexity 4","Complexity 5"],

      structureChecks:[false, false, false, false, false, false, false, false], //HARDCODED :)
      contentChecks:[false, false, false, false, false, false, false, false], //Also HARDCODED :D

      numQuestions:'',

      // questions:[],//Question IDS



      selectedAssessment:0,
    };

    
    this.init();
  }


  //HARDCODED
  init()
  {
    // this.state.topics[0].assessments.push(new Assessment("SH- Prefix"));
    // this.state.topics[1].assessments.push(new Assessment("Colors & Shapes"));
    // this.state.topics[2].assessments.push(new Assessment("Single Syllable"));
    // this.state.topics[2].assessments.push(new Assessment("Double Syllables"));
    global.parsedQuestions = Database.LoadQuestions();
    //console.log(questions[ this.state.assessments[0].questions[0] ].text);

    global.questionIndex = 0;

    console.log("LOADED!");

  }

  selectTopic(index){
    this.state.selectedAssessment = index;
    this.setStructureCheckbox(index);
    //this.forceUpdate();
  }

  setStructureCheckbox(index)
  {
    //Clear
    for (var i = 0; i < this.state.structureChecks.length; i++)
      this.state.structureChecks[i] = false;

    this.state.structureChecks[index] = !this.state.structureChecks[index];
    this.forceUpdate();
  }

  setContentCheckbox(index)
  {
    //Clear
    for (var i = 0; i < this.state.contentChecks.length; i++)
      this.state.contentChecks[i] = false;

    this.state.contentChecks[index] = !this.state.contentChecks[index];
    this.forceUpdate();
  }

  // startAssessment(props)
  // {
  //   // var questions = this.state.assessments[this.state.selectedStructure].questions;

  //   //console.log(this.state.assessments[this.state.selectedAssessment]);

  //   global.questions = this.state.assessments[this.state.selectedAssessment];

  //   //console.log(global.questions);
  //   console.log(global.parsedQuestions[1].text);
  //   // props.navigation.navigate('AssessmentScreen');

  //   //Pass update student to update recent assessments panel
  //   props.navigation.navigate('AssessmentScreen', {questions:questions, updateStudent: updateStudent.bind(this)});
  // }


// ------------ * RENDER * ------------------------
  render(){
  const { route, navigation } = this.props;
  const { student, updateHomeStudent, updateStudent } = route.params;

      return(      


        <View style={[styles.container, globalStyles.flexRow]}>       

        {/* LEFT | ASSESSMENTS */}      
      <View style={styles.column}>
 
        <View style={[styles.header]}>
        <Text style={[styles.h1]}>Structure</Text> 
        </View>

        <ScrollView style={[styles.structurePanel, globalStyles.flex3]}>
        {
          this.state.structures.map((assessment,index) => (
            <View key={"assessment"+index}>
            
            <TouchableOpacity
              // style={[styles.mainButton, (index == this.state.selectedTopic)? styles.selectedBG: styles.unselectedBG]}
              style={[styles.mainButton, styles.unselectedBG]}
              onPress={() => this.selectTopic(index)}>

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
                  <Text style={styles.h2}>{assessment.name}</Text>
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
          <Text style={[styles.h1]}>Content</Text> 
        </View>

        <ScrollView style={[styles.contentPanel,globalStyles.flex1]}>
        {
          this.state.content.map((content,index) => (
            <View key={"topic"+index}>
            
            <TouchableOpacity
              // style={[styles.mainButton, (index == this.state.selectedTopic)? styles.selectedBG: styles.unselectedBG]}
              style={[styles.mainButton, styles.unselectedBG]}
              onPress={() => this.setContentCheckbox(index)}>

              <View style={globalStyles.flexRow}>
              

              <View style={styles.checkboxBlock}>
                <RadioButton
                status={this.state.contentChecks[index] ? 'checked' : 'unchecked'}
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

                let copy = student;
                copy.firstName = "25fe";

                 this.setState({student: copy})
                //  student.firstName = "SDJLK"; 
                updateStudent(copy); 
                updateHomeStudent(copy); 


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


          this.state.structures[this.state.selectedAssessment].questions.map( (questionID,index) => (
            <View key={"assessment"+index}>

            
            <TouchableOpacity
              style={styles.mainButton}
              // onPress={ () => navigation.navigate('AssessmentScreen', {assessment} )}>
              onPress={ () => 
              {
                //Get questions from premade assessments
                global.questions = this.state.structures[this.state.selectedAssessment].questions;

                var questionsData = [];
                for (var i = 0; i < global.questions.length; i++)
                  questionsData.push(new QuestionData(global.questions[i]));

                var assessmentData = new AssessmentData(questionsData, "DATE HERE");
            
                //Pass update student to update recent assessments panel
                navigation.navigate('AssessmentScreen', {assessmentData:assessmentData, student:student, updateStudent: updateStudent.bind(this), reviewMode:false});
              } }>

              <View style={globalStyles.flexRow}>

              <RoundedText
                    title = "+"
                    color = "black"
                    backgroundColor = "#cccccc"
                    fontSize={18}
                    size={43}
                />
     
                  <Text style={styles.h2}>{global.parsedQuestions[questionID].text}</Text>

              </View>

            </TouchableOpacity>     
            <Divider/>
            </View>
          ) )
        }               

        </ScrollView>

        <View style={globalStyles.flexRowReverse}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={ () => navigation.navigate('AssessmentScreen', {assessment} )}>
              <Text style={styles.buttonText}>Start</Text>
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
    fontSize: 18,
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
