//------------ * IMPORT LIBS * ------------------------
import React from 'react';
import { Component } from 'react';

import { 
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Button,
  Alert,
  TextInput
} from 'react-native';

import {  RadioButton  } from 'react-native-paper';

import { globalStyles } from '../globalStyles';
import { Avatar, Divider, Chip  } from 'react-native-paper';
import { TemplateScreen } from './TemplateScreen';
import { Question } from '../Question.js'
import { RoundedText } from '../components/RoundedText';

import {AssessmentData} from '../AssessmentData'
import {QuestionData} from '../QuestionData'

import {sendEmail} from '../sendEmail'


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

      currentQuestion: 0,
      // maxQuestions: 10,
  
      questionsObj:[new Question(require('../img/ship.png'), 'Ship'), new Question(require('../img/shark.png'), 'Shark'), new Question(require('../img/shoe.png'),'Shoe'),
       new Question(require('../img/shovel.png'), 'Shovel'), new Question(require('../img/shirt.png'), 'Shirt'),new Question(require('../img/shadow.png'), 'Shadow'),
       new Question(require('../img/shrimp.png'), 'Shrimp'),new Question(require('../img/sheep.png'), 'Sheep'),  new Question(require('../img/shapes.png'), 'Shapes'),
       new Question(require('../img/shorts.png'), 'Shorts')],  


      grading:[],

      scaffolding: 0,

      notes:'',

      modalNotesVisible:false,

      questionsData:[], //Used for each question to build question Data

      firstRun: true, //check if ran through render loop at least once

      img: "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg",

      resultsScreen: false,

      totalScaffolding: 0,

      score:0,

      textEAddress:'',
      modalVisible:false,

      updatedAssessmentData:[],

      radioBtnAttention: '1',
      radioBtnPerformance: '1',
      radioBtnPlanning: '1',
      radioBtnAwareness: '1',
      radioBtnMotivation: '1',
      radioBtnInteraction: '1',
    };

    this.init();
  }

  init()
  {
    // this.setState({maxQuestions: global.questions.length})
    //this.state.maxQuestions = globa
  }

  componentDidMount()
  {
    //this.setState({maxQuestions: global.questions.length})
  }

  // setRadioAttention(val)
  // {
  //   this.setState({radioBtnAttention: val});
  // }

  toggleModalEmail(visible) {
    this.setState({ modalVisible: visible });
    this.setState({textEAddress: ''})
}

  modifyScaffolding(val){

    var num = this.state.scaffolding+val;

    if (num < 0)
      num = 0;

    this.setState( {scaffolding: num})

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

  renderImage = (questionsData) =>
  {
    var imgVal = global.parsedQuestions[ questionsData[this.state.currentQuestion].id ].img;

    if (imgVal != -1)
    {
      return(
        <View style={styles.imgContainer}>
          <Image style={styles.img} resizeMode={'cover'} source={{uri: imgVal}}  />
        </View>
        
      )
    }    
  }

  renderReviewModeText = (reviewMode) =>
  {
    if (reviewMode == true)
    {
      return(
        <View style={[globalStyles.flex1, globalStyles.flexHoriEnd]}>
          <Text style={[styles.reviewModeText, globalStyles.dangerText]}> {"REVIEW MODE"}</Text>
        </View>
        
      )
    }    
  }

  renderGradeButtons = (questionsData, student, updateStudent, assessmentData, reviewMode) =>
  {
    if (reviewMode == true)
    {
      return(
        <View style={[globalStyles.flexRow]}>
          <View style={styles.bottomButton}>
            <Button
                title="Next Question"
                onPress={() => this.grade(true, questionsData[this.state.currentQuestion].id, student, updateStudent, assessmentData, reviewMode)}>
            </Button>    
          </View>
        </View>        
      )
    }    

    else{
      return(
        <View style={[globalStyles.flexRow]}>

          <View style={styles.bottomButton}>
            <Button
                title="Correct"
                onPress={() => this.grade(true, questionsData[this.state.currentQuestion].id, student, updateStudent, assessmentData, reviewMode)}>
            </Button>    
          </View>
             
          <View style={styles.bottomButton}>
            <Button
                color="#ff5c5c"
                title="Incorrect"
                onPress={() => this.grade(false, questionsData[this.state.currentQuestion].id, student, updateStudent, assessmentData, reviewMode)}
                >
            </Button>    
          </View>

        </View>
      )
    }
  }

  renderAssessment = (questionsData, student, updateStudent, assessmentData, reviewMode) =>
  {

    if (this.state.resultsScreen == false)
    {
      return(
        <View style={[styles.container]}>
     
        <View style={[globalStyles.flexRow]}>

            {/* NOTES BUTTON */}
            <View style={globalStyles.flexRow, globalStyles.flex1}>

              <View style={[globalStyles.flex1]}>
                  <Text style={[styles.h2, globalStyles.flexAlignStart]}> { (this.state.currentQuestion+1) + " of " + assessmentData.questionData.length + " Questions"}</Text>
              </View>


              <View style={[globalStyles.flexHoriCenter]}>
                <View style={styles.topButton}>
                  <Button
                      title="Notes"
                      onPress={() => this.toggleModalNotes(true)}>
                    </Button>
                </View>

              </View>

              {/* Display Review Mode Text */}
              {
                this.renderReviewModeText(reviewMode)
              }

        </View>

        </View>     



      {/* QUESTIONS IMG & TEXT & SIDES*/}
      <View style={[globalStyles.flexRow, globalStyles.flex4]}>

          {/* LEFT SIDE */}
        <View style={[styles.flexCol, globalStyles.flex1]}>
            <View style={[globalStyles.test]}>

            </View>
        </View>
        
        {/* MIDDLE! */}
        <View style={[styles.container, globalStyles.flex8]}>

          <Text style={styles.question}>{ global.parsedQuestions[ questionsData[this.state.currentQuestion].id ].text }</Text>

          {this.renderImage(questionsData)}
          {/* <Image style={styles.img}    source={{uri: this.state.img}}  /> */}

        </View>

        {/* Right SIDE */}
        <View style={[globalStyles.flexCol, globalStyles.flex1, globalStyles.center]}>

        <View style={[styles.sideButton]}>
          <Button
                title="  +  "
                color='#6600cc'
                onPress={() => this.modifyScaffolding(1)}
                disabled={reviewMode}
                >
          </Button>
        </View>


          <Text style={styles.number}>{this.state.scaffolding}</Text>

          <View style={[styles.sideButton]}>
          <Button
                title="  -  "
                color='#6600cc'
                onPress={() => this.modifyScaffolding(-1)}
                disabled={reviewMode}
                >
          </Button>
        </View>

        </View>

      </View>


     {/* Bottom Buttons */}
      <View style={[globalStyles.flexVertEnd, globalStyles.flex1]}>        

        <View style={[globalStyles.flexRow]}>

          {
            this.renderGradeButtons(questionsData, student, updateStudent, assessmentData, reviewMode)
          }

        </View>

      </View>

      {/* <View style={styles.side}>
        <Text>Centered text</Text>
      </View> */}


    {/* ********************** | NOTES MODAL | ********************* */}
    <Modal animationType="slide"  transparent={true} visible={this.state.modalNotesVisible}  >

      <View style={styles.container}>

        <View style={styles.modalView}>

          <Text style={styles.modalHeader}>Notes</Text> 
          
          <View style={globalStyles.flexRow}>
            <TextInput style={[
              styles.textInput]}
               label=""
                multiline={true}
                 numberOfLines={5}
                  value={this.state.notes}
                   onChangeText={text => this.setState( {notes: text})} 
                   disabled={reviewMode}
                   />        
          </View>


        <View style={[globalStyles.flexRow, globalStyles.flexAlignEnd]}>

          <View style={[styles.bottomButton, styles.modalButton]}>
            <Button
              title="Submit"
              onPress={() => this.toggleModalNotes(false)}>
            </Button>
          </View>

          <View style={[styles.bottomButton, styles.modalButton]}>
            <Button
              color="#ff5c5c"
              title="Cancel"
              onPress={() => this.toggleModalNotes(false)}>
            </Button>
          </View>

        </View>   
        </View>
      </View>
    </Modal>


    </View>
        
      )
    }    
  }

  toggleModalNotes(visible) {
    this.setState({ modalNotesVisible: visible });
  }

  grade(val, questionID, student, updateStudent, assessmentData, reviewMode)
  {
    var grading = this.state.grading;

    if (reviewMode == false)
    {
      this.state.grading.push(val);      
    }

    //If last question!
    if ((this.state.currentQuestion+1) >= assessmentData.questionData.length)
    {
      if (reviewMode == false)
      {
        //Refactor : copied from else
        var questionData = new QuestionData( questionID, val, this.state.notes, this.state.scaffolding);
        this.state.questionsData.push(questionData);

        //Record to student Data!
        var questionsCopy = this.state.questionsData.slice();

        // Create Assessment Data
        var newAssessmentData = new AssessmentData(questionsCopy, assessmentData.dateTaken );

        // Push data into new assessment data
        newAssessmentData.score = this.getPercent(grading);
        newAssessmentData.grading = this.state.grading.slice();


        this.state.updatedAssessmentData = newAssessmentData;

        //console.log(this.state.grading);
        this.state.score = this.getPercent(this.state.grading);

        // var copyStudent = student;
        // // var copyStudent = Object.assign({}, student);
        // copyStudent.assessmentData.push( newAssessmentData);

        // this.setState({student: copyStudent});
        // updateStudent(copyStudent); 

        //Clear
        this.setState({questionsData: [] });
      }

      //this.props.navigation.navigate('ResultScreen', {grading});
      this.setState({resultsScreen: true});
    }

    else
    {
      if (reviewMode != true)
      {
        //Copy questions data into array
        var questionData = new QuestionData( questionID, val, this.state.notes, this.state.scaffolding);
        this.state.questionsData.push(questionData);
      }

      //Clear and go to next question
      var nextQuestion = this.state.currentQuestion + 1;
      this.state.currentQuestion = nextQuestion;

      this.state.totalScaffolding += this.state.scaffolding;

      this.setState({scaffolding: 0});
      this.setState({notes: ''});

      //Load data if in review mode
      if (reviewMode == true)
      {      
        var questionsData = assessmentData.questionData;
        this.setState({ notes: questionsData[this.state.currentQuestion].notes });
        this.setState({ scaffolding: questionsData[this.state.currentQuestion].scaffolding });
        this.state.firstRun = false;
      }

    }
  }


  renderScoringSection = (reviewMode) =>
  {
    return(
      <View>
          {/* ATTENTION */}
          <RadioButton.Group style={[globalStyles.scrollView]} onValueChange={newValue => this.setState({radioBtnAttention: newValue})} value={this.state.radioBtnAttention}>
          <View style={globalStyles.center, globalStyles.flexRow}>
            <View style={styles.scoringTextContainer}>
              <Text style={styles.h2}>Attention:</Text>
            </View>

            <View style={styles.radioContainer}>
                <Text>1</Text>
                <RadioButton disabled={reviewMode} value="1" />
            </View>
            <View style={styles.radioContainer}>
              <Text>2</Text>
              <RadioButton disabled={reviewMode} value="2" />
            </View>
            <View style={styles.radioContainer}>
              <Text>3</Text>
              <RadioButton disabled={reviewMode} value="3" />
            </View>
            <View style={styles.radioContainer}>
              <Text>4</Text>
              <RadioButton disabled={reviewMode} value="4" />
            </View>
            <View style={styles.radioContainer}>
              <Text>5</Text>
              <RadioButton disabled={reviewMode} value="5" />
            </View>
          </View>
          </RadioButton.Group>

          {/* ATTENTION */}
          <RadioButton.Group style={[globalStyles.scrollView]} onValueChange={newValue => this.setState({radioBtnPerformance: newValue})} value={this.state.radioBtnPerformance}>
          <View style={globalStyles.center, globalStyles.flexRow}>
            <View style={styles.scoringTextContainer}>
              <Text style={styles.h2}>Performance:</Text>
            </View>
            <View style={styles.radioContainer}>
                <Text>1</Text>
                <RadioButton disabled={reviewMode} value="1" />
            </View>
            <View style={styles.radioContainer}>
              <Text>2</Text>
              <RadioButton disabled={reviewMode} value="2" />
            </View>
            <View style={styles.radioContainer}>
              <Text>3</Text>
              <RadioButton disabled={reviewMode} value="3" />
            </View>
            <View style={styles.radioContainer}>
              <Text>4</Text>
              <RadioButton disabled={reviewMode} value="4" />
            </View>
            <View style={styles.radioContainer}>
              <Text>5</Text>
              <RadioButton disabled={reviewMode} value="5" />
            </View>
          </View>
          </RadioButton.Group>

          {/* Planning */}
          <RadioButton.Group style={[globalStyles.scrollView]} onValueChange={newValue => this.setState({radioBtnPlanning: newValue})} value={this.state.radioBtnPlanning}>
          <View style={globalStyles.center, globalStyles.flexRow}>
            <View style={styles.scoringTextContainer}>
              <Text style={styles.h2}>Planning:</Text>
            </View>
            <View style={styles.radioContainer}>
                <Text>1</Text>
                <RadioButton disabled={reviewMode} value="1" />
            </View>
            <View style={styles.radioContainer}>
              <Text>2</Text>
              <RadioButton disabled={reviewMode} value="2" />
            </View>
            <View style={styles.radioContainer}>
              <Text>3</Text>
              <RadioButton disabled={reviewMode} value="3" />
            </View>
            <View style={styles.radioContainer}>
              <Text>4</Text>
              <RadioButton disabled={reviewMode} value="4" />
            </View>
            <View style={styles.radioContainer}>
              <Text>5</Text>
              <RadioButton disabled={reviewMode} value="5" />
            </View>
          </View>
          </RadioButton.Group>

          {/* Awareness */}
          <RadioButton.Group style={[globalStyles.scrollView]} onValueChange={newValue => this.setState({radioBtnAwareness: newValue})} value={this.state.radioBtnAwareness}>
          <View style={globalStyles.center, globalStyles.flexRow}>
            <View style={styles.scoringTextContainer}>
              <Text style={styles.h2}>Awareness:</Text>
            </View>
            <View style={styles.radioContainer}>
                <Text>1</Text>
                <RadioButton disabled={reviewMode} value="1" />
            </View>
            <View style={styles.radioContainer}>
              <Text>2</Text>
              <RadioButton disabled={reviewMode} value="2" />
            </View>
            <View style={styles.radioContainer}>
              <Text>3</Text>
              <RadioButton disabled={reviewMode} value="3" />
            </View>
            <View style={styles.radioContainer}>
              <Text>4</Text>
              <RadioButton disabled={reviewMode} value="4" />
            </View>
            <View style={styles.radioContainer}>
              <Text>5</Text>
              <RadioButton disabled={reviewMode} value="5" />
            </View>
          </View>
          </RadioButton.Group>

          {/* Motivation */}
          <RadioButton.Group style={[globalStyles.scrollView]} onValueChange={newValue => this.setState({radioBtnMotivation: newValue})} value={this.state.radioBtnMotivation}>
          <View style={globalStyles.center, globalStyles.flexRow}>
            <View style={styles.scoringTextContainer}>
              <Text style={styles.h2}>Motivation:</Text>
            </View>
            <View style={styles.radioContainer}>
                <Text>1</Text>
                <RadioButton disabled={reviewMode} value="1" />
            </View>
            <View style={styles.radioContainer}>
              <Text>2</Text>
              <RadioButton disabled={reviewMode} value="2" />
            </View>
            <View style={styles.radioContainer}>
              <Text>3</Text>
              <RadioButton disabled={reviewMode} value="3" />
            </View>
            <View style={styles.radioContainer}>
              <Text>4</Text>
              <RadioButton disabled={reviewMode} value="4" />
            </View>
            <View style={styles.radioContainer}>
              <Text>5</Text>
              <RadioButton disabled={reviewMode} value="5" />
            </View>
          </View>
          </RadioButton.Group>

          {/* Interaction */}
          <RadioButton.Group style={[globalStyles.scrollView]} onValueChange={newValue => this.setState({radioBtnInteraction: newValue})} value={this.state.radioBtnInteraction}>
          <View style={globalStyles.center, globalStyles.flexRow}>
            <View style={styles.scoringTextContainer}>
              <Text style={styles.h2}>Interaction:</Text>
            </View>
            <View style={styles.radioContainer}>
                <Text>1</Text>
                <RadioButton disabled={reviewMode} value="1" />
            </View>
            <View style={styles.radioContainer}>
              <Text>2</Text>
              <RadioButton disabled={reviewMode} value="2" />
            </View>
            <View style={styles.radioContainer}>
              <Text>3</Text>
              <RadioButton disabled={reviewMode} value="3" />
            </View>
            <View style={styles.radioContainer}>
              <Text>4</Text>
              <RadioButton disabled={reviewMode} value="4" />
            </View>
            <View style={styles.radioContainer}>
              <Text>5</Text>
              <RadioButton disabled={reviewMode} value="5" />
            </View>
          </View>
          </RadioButton.Group>

      </View>    
    )

  }

  renderResults = (props, student, updateStudent, reviewMode) =>
  {

    if (this.state.resultsScreen == true)
    {
      var grading = this.state.grading;

      return(
        <View style={styles.container}>

 
        {/* QUESTIONS IMG & TEXT */}
        <View style={[styles.container, globalStyles.flex3]}>

        <Text style={styles.percentText}>{this.state.score}%</Text>
        <Text style={styles.scaffoldingText}>{this.state.totalScaffolding + " scaffoldings used"}</Text>

        </View>

        {/* QUESTION BUBBLES */}

        {/* <View style={[styles.scrollView]}> */}


          {this.renderScoringSection(reviewMode)}


        {/* </View> */}
        

       {/* Bottom Buttons */}
        <View style={[globalStyles.flexVertEnd, globalStyles.flex1]}>        

          <View style={[globalStyles.flexRow]}>

            <View style={[styles.bottomButton]}>
              <Button
                title="Complete"
                onPress={() => 
                  {
                    if (reviewMode == true)
                      return;

                    var copyStudent = student;
                    
                    //Add scores to assessment data
                    this.state.updatedAssessmentData.attention = this.state.radioBtnAttention;
                    this.state.updatedAssessmentData.performance = this.state.radioBtnPerformance;
                    this.state.updatedAssessmentData.planning = this.state.radioBtnPlanning;
                    this.state.updatedAssessmentData.awareness = this.state.radioBtnAwareness;
                    this.state.updatedAssessmentData.motivation = this.state.radioBtnMotivation;
                    this.state.updatedAssessmentData.interaction = this.state.radioBtnInteraction;


                    copyStudent.assessmentData.push( this.state.updatedAssessmentData);
            
                    this.setState({student: copyStudent});
                    updateStudent(copyStudent); 

                    Alert.alert(
                      "Saved!",
                      "The assessment has been saved!",
                      [
                        { text: "OK", onPress: () => props.navigation.goBack() }
                      ]
                    );

                    //props.navigation.goBack()
                  }

                }>
              </Button>
            </View>

            <View style={[styles.bottomButton]}>
              <Button
                title="Email"
                style={[styles.bottomButton]}
                onPress={() => this.toggleModalEmail(true)}>
              </Button>
            </View>


          </View>

          </View>

          {/* ********************** | EMAIL MODAL | ********************* */}
          <Modal animationType="slide"  transparent={true} visible={this.state.modalVisible}  >

          <View style={styles.container}>

            <View style={styles.modalView}>

              <Text style={styles.modalHeader}>Email Student Profile</Text> 
              
              <View style={globalStyles.flexRow}>
                <TextInput style={[styles.textEInput, styles.emailAddress]} label="Email Address" value={this.state.textEAddress} onChangeText={text => this.setState( {textEAddress: text})}placeholder={"Email Address"}/>
                
              </View>

              <View style={[globalStyles.flexRow, globalStyles.flexAlignEnd]}>
              
              <View style={[styles.bottomButton, styles.modalButton]}>
                <Button
                  title="Submit"
                  onPress={() => {

                    var subject = "Dynamic Assessment Results for " + student.fullName;
                    var body = "";

                    body = "Score: " + this.state.updatedAssessmentData.score + " \t Total Scaffolding: " + this.state.totalScaffolding + '\n';

                    for (var i = 0; i < this.state.updatedAssessmentData.questionData.length; i++)
                    {                
                      body += global.parsedQuestions[this.state.updatedAssessmentData.questionData[i].id].text + " - Scaffolding Amount: " + this.state.updatedAssessmentData.questionData[i].scaffolding + '\t Notes: ' + this.state.updatedAssessmentData.questionData[i].notes+ '\n';
                    }

                    sendEmail(this.state.textEAddress, subject, body);

                    this.toggleModalEmail(false);
                  }}>
                </Button>
              </View>


              <View style={[styles.bottomButton, styles.modalButton]}>
                <Button
                  title = "Cancel"
                  color="#ff5c5c"
                  onPress={() => this.toggleModalEmail(false)}>
                </Button>
              </View>

            </View>   
            </View>
          </View>
          </Modal>


      </View>
        
      )
    }    
  }

// ------------ * RENDER * ------------------------
  render(){
    const { route, navigation } = this.props;
    const { assessmentData, student , updateStudent, reviewMode } = route.params;

    this.state.maxQuestions = assessmentData.questionData.length;

    // console.log(assessmentData);

    var questionsData = assessmentData.questionData;

    //For first question, make sure to set up notes and scafolding value for loading
    if (reviewMode == true && this.state.firstRun == true)
    {      
      // this.setState({totalScaffolding: assessmentData.totalScaffolding});
      this.state.totalScaffolding = assessmentData.totalScaffolding;      
      this.state.score = assessmentData.score;
      this.state.grading = assessmentData.grading.slice();

      //Load Scores
      this.state.radioBtnAttention = assessmentData.attention;
      this.state.radioBtnPerformance = assessmentData.performance;
      this.state.radioBtnPlanning = assessmentData.planning;
      this.state.radioBtnAwareness = assessmentData.awareness;
      this.state.radioBtnMotivation = assessmentData.motivation;
      this.state.radioBtnInteraction = assessmentData.interaction;

      this.state.notes = questionsData[this.state.currentQuestion].notes;
      this.state.scaffolding = questionsData[this.state.currentQuestion].scaffolding;
      this.state.firstRun = false;
    }

      return(      
      <View style={styles.container}>
        {this.renderAssessment(questionsData, student, updateStudent, assessmentData, reviewMode)}

        {this.renderResults(this.props, student, updateStudent, reviewMode)}
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

  scrollView:{
    // flex: 1,
    // width: '45%',
    // paddingVertical: 5,
    // // height: '100%',
    // // justifyContent: "center",
    // // alignItems: "center",
    // // flexDirection: 'column',
    borderWidth : 2,
    borderColor: "#00bcd4"
  },

  chipContainer: {
    flexGrow: 1, 
    justifyContent: 'center',
    // flex: 1,
    // width: '100%',
    // height: '100%',
    // // justifyContent: "center",
    alignItems: "center",
    // flexDirection: 'column',
  },

  reviewModeText:{
    fontSize: 36,
    fontWeight: 'bold',
    margin: 5,
    marginRight: 35
  },

  h2:{
    fontSize: 18,
    fontWeight: 'bold'
  },

  radioContainer:
  {
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#e6e6e6"
  },


  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 10,
    marginVertical: 12,
    // backgroundColor: "#00bcd4"
  },

  topButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 44,
    // paddingVertical: 30,
    marginHorizontal: 140,
    marginTop: 12,
    // width: "20%",
    // height: 25,
    // maxWidth: 200,
    // backgroundColor: "#00bcd4"

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
    marginBottom: 55,
    marginTop: 0
  },

  buttonText:{
    fontSize: 17,
    fontWeight: 'bold',
    color: "white",
    // fontFamily: 'tahoma'
  },

  sideButton:{
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "#6600cc",
    width: 60,
    height: 60,
    padding: 14,
    marginVertical: 10
  },

  sideDisabledButton:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    width: 60,
    height: 60,
    padding: 14,
    marginVertical: 10
  },

  imgContainer:{
    width: 256*scale,
    height: 192*scale,
    // backgroundColor: "red"
  },

  img:{
    // maxWidth: 256*scale,
    // maxHeight: 192*scale,
    // aspectRatio: (256*scale)/(192*scale),
    // width: 256*scale,
    // height: 192*scale
    width: '100%',
    height: undefined,
    aspectRatio: (256*scale)/(192*scale),
    resizeMode: 'contain',
  },

  side:{
    position: 'absolute', 
    right: 0,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  test:{
    backgroundColor: "red",
    height: "100%",

  },

  number:{
    fontSize: 36,
    fontWeight: "bold",
    margin: 10
  },

 ////// MODAL STUFF : ToDo: Seperate component

 modalView: {
  margin: 25,
  backgroundColor: "white",
  borderRadius: 7,
  paddingVertical: 0,
  paddingHorizontal: 25,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  maxWidth: "60%",
  maxHeight:"60%",
},

textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},

modalHeader: {
  alignSelf: 'flex-start',
  marginBottom: 50,
  marginTop: 35,
  fontSize: 22,
  fontWeight: 'bold',
  textAlign: "left"
},

textInput:{
  textAlignVertical: "top",
  flex:1,
  height: 200,
  marginHorizontal: 7,
  marginVertical: 7,
  maxWidth: "90%",
  fontSize: 25,
  padding: 25,
  backgroundColor: "#e6e6e6"
},

schoolID:{
  maxWidth: 100,
},

textBox: {
  marginVertical: 10,
  borderLeftWidth: 4,
  borderRightWidth: 4,
  borderTopWidth: 4,
  borderBottomWidth: 4,
  borderColor: '#00bcd4',
  height: 180,
  width: '100%',
  padding: 15
},

modalButton:{
  backgroundColor: 'white',
  marginTop: 3
},

modalText:{
  fontSize: 15,
  fontWeight: 'bold',
  color: "#00bcd4"
},

///RESULTS SCREEN

percentText:{
  fontSize: 155,
  fontWeight: '100',
  color: '#6bc46b'
},

scaffoldingText:{
  fontSize: 25,
  fontWeight: '100',
  color: '#262626'
},

scoringTextContainer:
{
  width: 170,
  backgroundColor: "#bababa",
  paddingLeft: 20,
  justifyContent: "flex-start",
  // alignItems: "flex-end"
},

chip:{
  flex:1,
  // backgroundColor: '#d4d4d4',
  // backgroundColor: '#76db76',
  justifyContent: 'center',
  maxWidth: 100,
  minWidth: 100,
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
  backgroundColor: '#76db76',
},

chipIncorrect:{
  backgroundColor: '#ff6f6b',
},

////// MODAL STUFF 

modalView: {
  margin: 35,
  backgroundColor: "white",
  borderRadius: 7,
  paddingVertical: 15,
  paddingHorizontal: 150,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
maxWidth: "80%",
maxHeight:"80%",
},

textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},

modalHeader: {
  alignSelf: 'flex-start',
  marginBottom: 50,
  marginTop: 35,
  fontSize: 22,
  fontWeight: 'bold',
  textAlign: "left"
},

textEInput:{
  flex:1,
  height: 50,
  marginHorizontal: 10,
  marginVertical: 20,
  maxWidth: 350
},

emailAddress:{
  maxWidth: 300,
},

textBox: {
  marginVertical: 10,
  borderLeftWidth: 10,
  borderRightWidth: 10,
  borderTopWidth: 10,
  borderBottomWidth: 10,
  borderColor: '#00bcd4',
  height: 180,
  width: '100%',
  padding: 15
},

modalButton:{
  backgroundColor: 'white',
  marginTop: 35
},

modalText:{
  fontSize: 18,
  fontWeight: 'bold',
  color: "#00bcd4"
}




});
