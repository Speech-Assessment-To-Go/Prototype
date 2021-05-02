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
import { Button, Avatar, Divider  } from 'react-native-paper';
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

      img: "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg"


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
      // var copyQuestion = this.state.questionsData.slice(); //Create copy
      // copyQuestion.push(questionData);
      // this.setState({questionsData: copyQuestion});
      this.state.questionsData.push(questionData);

      console.log(this.state.currentQuestion + " VS " + assessmentData.questionData.length);

      //Record to student Data!
      var questionsCopy = this.state.questionsData.slice();

      // console.log(this.state.questionsData);
      var newAssessmentData = new AssessmentData(questionsCopy, assessmentData.dateTaken );
      // console.log(assessmentData);

      var copyStudent = student;
      // var copyStudent = Object.assign({}, student);
      copyStudent.assessmentData.push( newAssessmentData);

      this.setState({student: copyStudent})
      //  student.firstName = "SDJLK"; 
      updateStudent(copyStudent); 
      // console.log(this.state.currentQuestion + " VS " + assessmentData.questionData.length);
      //Clear
      this.setState({questionsData: [] })


      this.props.navigation.navigate('ResultScreen', {grading});
    }

    else
    {
      //Copy questions data into array
      var questionData = new QuestionData( questionID, val, this.state.notes, this.state.scaffolding);
      // var copyQuestion = this.state.questionsData.slice(); //Create copy
      // copyQuestion.push(questionData);      
      // this.setState({questionsData: copyQuestion});
      this.state.questionsData.push(questionData);

      // console.log(JSON.stringify( this.state.questionsData ));
      // console.log(this.state.currentQuestion + " VS " + assessmentData.questionData.length);

      //Clear and go to next question
      var nextQuestion = this.state.currentQuestion + 1;
      // this.setState({currentQuestion: nextQuestion});
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

      // console.log(nextQuestion + " VS " + assessmentData.questionData.length);
      // console.log(this.state.currentQuestion + " VS " + assessmentData.questionData.length);

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
      <View style={[styles.container]}>

          {/* NOTES BUTTON */}
          <View style={globalStyles.flexRow, globalStyles.flex1}>
            <TouchableOpacity
              style={styles.topButton}
              onPress={() => this.toggleModalNotes(true)}>
              <Text style={styles.buttonText}>Notes</Text>
            </TouchableOpacity>

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
                onPress={() => this.modifyScaffolding(1)}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

            <Text style={styles.number}>{this.state.scaffolding}</Text>

            <TouchableOpacity
                style={[styles.sideButton]}
                onPress={() => this.modifyScaffolding(-1)}>
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
              onPress={() => this.grade(false, questionsData[this.state.currentQuestion].id, student, updateStudent, assessmentData, reviewMode)}>
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
              <TextInput style={[styles.textInput]} label="" multiline={true} numberOfLines={5} value={this.state.notes} onChangeText={text => this.setState( {notes: text})} />        
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

  topButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 44,
    paddingVertical: 30,
    marginHorizontal: 140,
    marginTop: 12,
    height: 25,
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
}


});
