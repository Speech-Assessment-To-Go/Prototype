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
} from 'react-native';

import {  TextInput  } from 'react-native-paper';

import { globalStyles } from '../globalStyles';
import { Button, Avatar, Divider, Chip  } from 'react-native-paper';
import { TemplateScreen } from './TemplateScreen';
import { Question } from '../Question.js'
import { RoundedText } from '../components/RoundedText';

import {AssessmentData} from '../AssessmentData'
import {QuestionData} from '../QuestionData'


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

      resultsScreen: false


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


              <View style={[globalStyles.flex1, globalStyles.flexHoriCenter]}>
                <TouchableOpacity
                    style={styles.topButton}
                    onPress={() => this.toggleModalNotes(true)}>
                    <Text style={styles.buttonText}>Notes</Text>
                  </TouchableOpacity>
              </View>

              {/* Display Review Mode Text */}
              {
                this.renderReviewModeText(reviewMode)
              }

        </View>

        </View>     



      {/* QUESTIONS IMG & TEXT & SIDES*/}
      <View style={[globalStyles.flexRow, globalStyles.flex10]}>

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

          <TouchableOpacity
              style={[styles.sideButton]}
              onPress={() => this.modifyScaffolding(1)}
              disabled={reviewMode}
              >
              <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

          <Text style={styles.number}>{this.state.scaffolding}</Text>

          <TouchableOpacity
              style={[styles.sideButton]}
              onPress={() => this.modifyScaffolding(-1)}
              disabled={reviewMode}
              >
              <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

        </View>

      </View>


     {/* Bottom Buttons */}
      <View style={[globalStyles.flexVertEnd, globalStyles.flex1]}>        

        <View style={[globalStyles.flexRow]}>

          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => this.grade(true, questionsData[this.state.currentQuestion].id, student, updateStudent, assessmentData, reviewMode)}>
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bottomButton, globalStyles.danger]}
            onPress={() => this.grade(false, questionsData[this.state.currentQuestion].id, student, updateStudent, assessmentData, reviewMode)}            
            >
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>

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
          <TouchableOpacity
            style={[styles.bottomButton, styles.modalButton]}
            onPress={() => this.toggleModalNotes(false)}>
            <Text style={styles.modalText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bottomButton, styles.modalButton]}
            onPress={() => this.toggleModalNotes(false)}>
            <Text style={styles.modalText}>Cancel</Text>
          </TouchableOpacity>

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
    //Prevent from updating grades if loading results screen
    if ((this.state.currentQuestion) < assessmentData.questionData.length)
    {
      var copy = this.state.grading.slice();
      copy.push(val);
      this.setState({grading: copy})

    }    

    var grading = this.state.grading;

    //If last question!
    if ((this.state.currentQuestion+1) >= assessmentData.questionData.length)
    {
      //Refactor : copied from else
      var questionData = new QuestionData( questionID, val, this.state.notes, this.state.scaffolding);
      this.state.questionsData.push(questionData);

      //Record to student Data!
      var questionsCopy = this.state.questionsData.slice();

      // console.log(this.state.questionsData);
      var newAssessmentData = new AssessmentData(questionsCopy, assessmentData.dateTaken );
      // console.log(assessmentData);
      newAssessmentData.score = this.getPercent(grading);

      var copyStudent = student;
      // var copyStudent = Object.assign({}, student);
      copyStudent.assessmentData.push( newAssessmentData);

      this.setState({student: copyStudent});
      updateStudent(copyStudent); 

      //Clear
      this.setState({questionsData: [] });


      //this.props.navigation.navigate('ResultScreen', {grading});
      this.setState({resultsScreen: true});
    }

    else
    {
      //Copy questions data into array
      var questionData = new QuestionData( questionID, val, this.state.notes, this.state.scaffolding);
      this.state.questionsData.push(questionData);

      //Clear and go to next question
      var nextQuestion = this.state.currentQuestion + 1;
      this.state.currentQuestion = nextQuestion;
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

  renderResults = (props) =>
  {

    if (this.state.resultsScreen == true)
    {
      var grading = this.state.grading;

      return(
        <View style={styles.container}>

 
        {/* QUESTIONS IMG & TEXT */}
        <View style={[styles.container, globalStyles.flex8]}>

      <Text style={styles.percentText}>{this.getPercent(grading)}%</Text>

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
              onPress={() => props.navigation.goBack()}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomButton]}
              onPress={() => props.navigation.goBack()}>
              <Text style={styles.buttonText}>Email</Text>
            </TouchableOpacity>

          </View>

          </View>

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
      this.setState({ notes: questionsData[this.state.currentQuestion].notes });
      this.setState({ scaffolding: questionsData[this.state.currentQuestion].scaffolding });
      this.state.firstRun = false;
    }

      return(      
      <View style={styles.container}>
        {this.renderAssessment(questionsData, student, updateStudent, assessmentData, reviewMode)}

        {this.renderResults(this.props)}
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

  topButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 44,
    paddingVertical: 30,
    marginHorizontal: 140,
    marginTop: 12,
    height: 25,
    maxWidth: 200,
    backgroundColor: "#ffbcd4"

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
    backgroundColor: "#6600cc",
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
  margin: 35,
  backgroundColor: "white",
  borderRadius: 7,
  paddingVertical: 0,
  paddingHorizontal: 55,
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

textInput:{
  textAlignVertical: "top",
  flex:1,
  height: 220,
  marginHorizontal: 10,
  marginVertical: 20,
  maxWidth: "90%",
  fontSize: 25
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
  marginTop: 19
},

modalText:{
  fontSize: 18,
  fontWeight: 'bold',
  color: "#00bcd4"
},

///RESULTS SCREEN

percentText:{
  fontSize: 185,
  fontWeight: '100',
  color: '#6bc46b'
},


chip:{
  flex:1,
  // backgroundColor: '#d4d4d4',
  // backgroundColor: '#76db76',
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
  backgroundColor: '#76db76',
},

chipIncorrect:{
  backgroundColor: '#ff6f6b',
}



});
