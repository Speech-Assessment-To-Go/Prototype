//------------ * IMPORT LIBS * ------------------------
import React from 'react';
import { Component } from 'react';
// var fs = require('fs');

import { 
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Button,
  KeyboardAvoidingView
  // TextInput
} from 'react-native';

import {TextInput as ReactTextInput} from 'react-native';

import { globalStyles } from '../globalStyles';
import { TextInput, Avatar, Divider, Badge, Provider, Menu  } from 'react-native-paper';
import { TemplateScreen } from './TemplateScreen';

import { RoundedText } from '../components/RoundedText';
import { School } from '../School'
import { Student } from '../Student'
import Database from '../Database.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {filterStudents} from '../filterStudents';


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

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0


export class SchoolScreen extends Component
{

      constructor(props){
        super(props);

          this.state = {

            studentsObjs:[],
    
            modalVisible:false,

            // modalSchoolVisible:false,
            menuVisable:true,
            
            //Student MODAL
            textFName:'',
            textLName:'',
            textEthnicity:'',
            textGrade:'',
            textBirth:'',
            textLanguage:'',
    
            // selectedSchool:-1,
            selectedStudent:-1,


            textStudent:'',

            filteredStudents:[],

            modalNotesVisible:false,
            textNotes:''//for text input
    
        }

        // this.handlerUpdateStudentData = this.handlerUpdateStudentData.bind(this)

        this.init();

      }


  //Initialize
  init ()
  {
    // console.log("Loaded from init!");
    // this.loadSchools();
    global.parsedQuestions = Database.LoadQuestions();
    this.loadStudents();
    //this.searchStudents('');
  }

  handlerUpdateStudent(studentData)
  {
    //this.forceUpdate();
    let copy = this.state.studentsObjs.slice(); //Create copy
    copy[global.selectedStudent] = studentData;
    this.setState({studentsObjs: copy})

    // this.state.studentsObjs[global.selectedStudent] = studentData;

    //Save assessments
    this.saveStudentsData(copy);
  }

  // componentDidMount()
  // {
  //   console.log("Loaded from componentDidMount");
  // }

  toggleModalStudent(visible) {
    this.setState({ modalVisible: visible });
    this.clearInputs();
  }

  toggleModalNotes(visible, index = -1) {
    this.setState({ modalNotesVisible: visible });

    //Load notes for this student
    if (visible == true)
    {
      // console.log(this.state.studentsObjs);
      // console.log(this.state.studentsObjs[index]);
      var notes = this.state.studentsObjs[index].notes;
      this.setState({textNotes: notes});
    }

    //Save the notes for this student
    else
    {
      //Save notes to student!
      var student = this.state.studentsObjs[this.state.selectedStudent];
      // console.log(student);

      student.notes = this.state.textNotes;

      let copy = this.state.studentsObjs.slice(); //Create copy
      copy[this.state.selectedStudent] = student;
      this.state.studentsObjs = copy;

      this.saveStudentsData(copy);      
    }
  }

  saveStudentsData(data)
  {
    //Save schools
    var jsonData = JSON.stringify(data);
    // console.log(jsonData);
    console.log("SAVED!");
    AsyncStorage.setItem('students', jsonData);
  }

  loadStudents()
  {
    AsyncStorage.getItem('students')
    .then(
      (students) => 
      {
        if (students != null)
        {
          //Schools
          var parsedStudents = JSON.parse(students);
          console.log("LOADED!");
          this.setState({studentsObjs: parsedStudents});

          //Have all students on left side
          var allStudentIds = [];
          for (var i = 0; i < this.state.studentsObjs.length; i++)
            allStudentIds.push(i);

          this.setState({filteredStudents: allStudentIds})

            //console.log(this.state.filteredStudents);
        }
      })
  }


  addStudent(firstName, lastName, ethnicity, school, birth, language, grade = 5){


    var student = new Student(firstName, lastName, ethnicity, school, birth, language, grade);

    let copy = this.state.studentsObjs.slice(); //Create copy
    copy.push(student);
    this.setState({studentsObjs: copy})

    this.saveStudentsData(copy);
    //this.state.schoolsObj[this.state.selectedSchool].students.push(student);

    this.setState({selectedStudent: this.state.studentsObjs.length})
    //this.state.studentsObj.push(new Student(text));
    this.toggleModalStudent(false);

    //Clear filtered list
    var allStudentIds = [];
    for (var i = 0; i < copy.length; i++)
      allStudentIds.push(i);

    // console.log(allStudentIds);

    //this.setState({filteredStudents: allStudentIds})
    this.state.filteredStudents = allStudentIds;
    this.setState({selectedStudent: -1})

    // this.setState({studentsObjsFiltered: copy});
  }

  removeStudent()
  {
    if (this.state.selectedStudent < 0)
    {
      alert("A student needs to be selected to be deleted.");
      return;
    }

    Alert.alert(
      "Warning",
      "Are you sure you want to delete this student! All files associated with this student will be lost!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => 
      {
        //Clear filtered students

        this.setState({filteredStudents: []})
        this.state.filteredStudents = [];



        //Begin removal
        var selected = this.state.selectedStudent;

    

    
        let copy = this.state.studentsObjs.slice(); //Create copy
        copy.splice(selected, 1);
        // this.setState({studentsObjs: copy});
        this.state.studentsObjs = copy;
        
    
        this.saveStudentsData(this.state.studentsObjs);

        //Clear filtered list
        var allStudentIds = [];
        for (var i = 0; i < copy.length; i++)
          allStudentIds.push(i);

        // console.log(allStudentIds);

        //this.setState({filteredStudents: allStudentIds})
        this.state.filteredStudents = allStudentIds;
        // this.state.selectedStudent = -1;
        this.setState({selectedStudent: -1})
      } }
      ]
    ) 


  }


  selectStudent(index)
  {
    this.setState({selectedStudent: index});
  }

  clearInputs(){
    this.state.textFName = '';
    this.state.textLName = '';
    this.state.textEthnicity = '';
    this.state.textGrade = '';
    this.state.textBirth = '';
    this.state.textLanguage = '';
    this.state.textbox = '';
  }


  setText(toModify, text) { 
    // this.setState( {textFName: tex})
    toModify = text;
  }

  searchStudents(text)
  {
    var filteredStudents = filterStudents(text, this.state.studentsObjs);

    if (text == '')
    {
      for (var i = 0; i < this.state.studentsObjs.length; i++)
      filteredStudents.push(i);
    }

    else
    {
      filteredStudents = filterStudents(text, this.state.studentsObjs);
    }

    this.state.filteredStudents = filteredStudents;
    //console.log(filteredStudents);
  }


  renderRecentAssessments = (props) =>
  {
    //console.log(this.state.studentsObjs[this.state.selectedStudent]);
    // return(
    // <Text style={[globalStyles.flexAlignCenter]}>Recent Assessments</Text>
    // )

    if (this.state.selectedStudent == -1) return;

    if (this.state.studentsObjs[this.state.selectedStudent].assessmentData.length == 0)
    {  
      return(
        <View style={styles.studentInfo}>
        <Text style={styles.h2}>Name:           {this.state.studentsObjs[this.state.selectedStudent].fullName}</Text>
        <Text style={styles.h2}>Ethnicity:     {this.state.studentsObjs[this.state.selectedStudent].ethnicity}</Text>
        <Text style={styles.h2}>Birth:             {this.state.studentsObjs[this.state.selectedStudent].birth}</Text>
        <Text style={styles.h2}>Language:   {this.state.studentsObjs[this.state.selectedStudent].language}</Text>
      </View>
      )

    }

    else{

      return(
        <View style={styles.assessmentsPanel}>

          <View style={styles.studentInfo}>
            <Text style={styles.h2}>Name:           {this.state.studentsObjs[this.state.selectedStudent].fullName}</Text>
            <Text style={styles.h2}>Ethnicity:     {this.state.studentsObjs[this.state.selectedStudent].ethnicity}</Text>
            <Text style={styles.h2}>Birth:             {this.state.studentsObjs[this.state.selectedStudent].birth}</Text>
            <Text style={styles.h2}>Language:   {this.state.studentsObjs[this.state.selectedStudent].language}</Text>
          </View>

          <ScrollView>
            <Text style={[globalStyles.flexAlignCenter]}> {this.state.studentsObjs[this.state.selectedStudent].assessmentData.length + " Assessments Taken"}</Text>


          {       
              this.state.studentsObjs[this.state.selectedStudent].assessmentData.map((assessment, index) => (
              <View key={"assessment"+index}>
              
              
              <View style={styles.recentAssessmentButton}>
                
                {/* <Text style={styles.buttonText}>Add</Text> */}
                <View style={[globalStyles.flexRow]}>
                    <View style={[styles.reviewButton, globalStyles.blue]}>
                      <Button 
                      color="#ffffff"
                      title = "Review"
                      onPress={ () => {                
                        props.navigation.navigate('AssessmentScreen', {assessmentData:assessment, student:this.state.studentsObjs[this.state.selectedStudent], updateStudent: this.handlerUpdateStudent.bind(this), reviewMode:true});
                        }}>
                      </Button>
                    </View>

                    <View style={[styles.retakeButton, globalStyles.danger, globalStyles.flexAlignEnd]}>
                      <Button 
                      color="#ffffff"
                      title="Retake"
                      onPress={ () => {                
                        props.navigation.navigate('AssessmentScreen', {assessmentData:assessment, student:this.state.studentsObjs[this.state.selectedStudent], updateStudent: this.handlerUpdateStudent.bind(this), reviewMode:false});
                        }}>
                      </Button>
                    </View>

                    <View style={globalStyles.center}>
                      <Text style={styles.h2}>{assessment.dateTaken + " - " + assessment.questionData.length + " Questions - " + assessment.score + "%"} </Text>
                    </View>



                    
                </View>

              </View>



              <Divider/>
              </View>
            ) )
          }      

          </ScrollView>
        </View>        
      )
    }
  }
  


// ------------ * RENDER * ------------------------
  render(){
    const { navigation } = this.props;

      return(      
        <Provider>

        <View style={[styles.container, globalStyles.flexRow]}>
        

        {/* LEFT | SCHOOL PANEL */}      
      <View style={styles.column}>

        <View style={styles.textInputBox}>
          <TextInput style={[styles.textInputStudent]} label="Student Name" value={this.state.textStudent} onChangeText={
            text => 
            {
              this.setState( {textStudent: text});
              this.searchStudents(text);
            }
              }/>
          <Divider/>
        </View>


        <ScrollView style={styles.schoolsPanel}>

        {
         
          this.state.filteredStudents.map((index) => (
            <View key={"student"+index}>


            
            <TouchableOpacity
              style={[styles.mainButton, (index == this.state.selectedStudent)? styles.selectedBG: styles.unselectedBG, globalStyles.flex1]}
              onPress={() => this.selectStudent(index)}>

              <View style={globalStyles.flexRow}>
              
              <RoundedText
                    title = {this.state.studentsObjs[index].firstName[0]}
                    color = "black"
                    backgroundColor = "#cccccc"
                    fontSize={18}
                    size={43}
                />
                
                {/* <Badge size={43}>{school[0]}</Badge> */}


                <View style={[globalStyles.flex1, globalStyles.flexCol]}>              

                  <Text style={styles.h2}>{this.state.studentsObjs[index].firstName + " " + this.state.studentsObjs[index].lastName}</Text>
                  <Text>Grade {this.state.studentsObjs[index].grade}</Text>

                </View>

                <View style={[ styles.notesButton,  globalStyles.flexAlignEnd]}>
                      <Button 
                      color="#ffffff"
                      title="Notes"
                      onPress={() => {
                        this.selectStudent(index);
                        this.toggleModalNotes(true, index);
                      }
                      }>
                      </Button>
                </View>

              </View>

            </TouchableOpacity>     
            <Divider/>
            </View>
          ) )
        }               


        </ScrollView>

        {/* Bottom Buttons */}

          <View style={globalStyles.flexRow}>

            <View style={styles.bottomButton}>
              <Button

                onPress={() => this.toggleModalStudent(true)}
                title="Add Student"
                color="#ffffff"
                >
                Press Me
              </Button>
            </View>

            <View style={[styles.bottomButton, styles.redBackground]}>
              <Button
                // style={{fontSize: 35}}
                color= {(Platform.OS === 'ios')? "#ffffff" : "00bcd4"}
                onPress={() => 
                  this.removeStudent()
                }
                title="Remove Student"
                >                
              </Button>
            </View>

          </View>          
        </View>


        {/* Right | STUDENT PANEL*/}
        <View style={styles.column}> 

        <ScrollView style={styles.studentsPanel}>

        {
          this.renderRecentAssessments(this.props)
        }

        </ScrollView>

        <View style={globalStyles.flexRow}>

          <View style={styles.bottomButton}>
              <Button                
                onPress={ () => {

                  if (this.state.selectedStudent == -1)
                  {
                    alert("A student must be selected!");
                    return;
                  }

                  navigation.push('TopicScreen', {student: this.state.studentsObjs[this.state.selectedStudent], updateStudent: this.handlerUpdateStudent.bind(this) })
                } }
                title="Take Assessment"
                color="#ffffff"
                >

              </Button>
            </View>

          </View>   

        </View>



      {/* ********************** | STUDENT MODAL | ********************* */}
      <Modal animationType="slide"  transparent={true} visible={this.state.modalVisible}  >

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>

          <View style={styles.modalView}>

            <Text style={styles.modalHeader}>Add Student</Text> 
            
            <View style={globalStyles.flexRow}>
              <TextInput style={styles.textInput} label="First Name" value={this.state.textFName} onChangeText={text => this.setState( {textFName: text.replace(/[^A-Za-z]/g, ''),})}/>
              <TextInput style={styles.textInput} label="Last Name" value={this.state.textLName} onChangeText={text => this.setState( {textLName: text.replace(/[^A-Za-z]/g, '')})}/>
              
              <TextInput style={styles.textInput} keyboardType="number-pad" label="Grade" value={this.state.textGrade} onChangeText={text => this.setState( {textGrade: text})}/>
            </View>

            <View style={globalStyles.flexRow}>
              <TextInput style={styles.textInput} label="Ethnicity" value={this.state.textEthnicity} onChangeText={text => this.setState( {textEthnicity: text.replace(/[^A-Za-z\s]/g, '')})}/>
              <TextInput style={styles.textInput} label="Birth Year" value={this.state.textBirth} keyboardType="number-pad" onChangeText={text => this.setState( {textBirth: text})}/>
              <TextInput style={styles.textInput} label="Language" value={this.state.textLanguage} onChangeText={text => this.setState( {textLanguage: text.replace(/[^A-Za-z]/g, ''),})}/>
            </View>

            {/* <View style={globalStyles.flexRow}>
              <TextInput style={styles.textBox} 
              value={this.state.textbox} 
              onChangeText={text => this.setState( {textbox: text})}
              label="Notes"
              multiline={true}
              numberOfLines={5}
              placeholder={"Notes"}/>
            </View> */}

          <View style={[globalStyles.flexRow, globalStyles.flexAlignEnd]}>

            <View style={[styles.bottomButton, styles.modalButton]}>
              <Button
                
                onPress={() => this.addStudent(this.state.textFName, this.state.textLName,this.state.textEthnicity, "??? School",
                                                this.state.textBirth,this.state.textLanguage, this.state.textGrade)}
                title="Submit"
                color="#ffffff"
                >
              </Button>
            </View>


            <View style={[styles.bottomButton, styles.modalButton, styles.redBackground]}>
              <Button
                color="#ffffff"
                onPress={() => this.toggleModalStudent(false)}
                title="Cancel"
                >
              </Button>
            </View>

          </View>   

          </View>
        </KeyboardAvoidingView>
      </Modal>


          {/* ********************** | NOTES MODAL | ********************* */}
          <Modal animationType="slide"  transparent={true} visible={this.state.modalNotesVisible}  >

          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 104 : 0}
            style={styles.container}>

            <View style={styles.modalView}>

              <Text style={styles.modalHeader}>Notes</Text> 
              
              <View style={globalStyles.flexRow}>
                <ReactTextInput style={[
                  styles.textInputBig]}
                  label=""
                    multiline={true}
                    numberOfLines={5}
                      value={this.state.textNotes}
                      onChangeText={text => this.setState( {textNotes: text})} 
                      />        
              </View>


              <View style={[globalStyles.flexRow, globalStyles.flexAlignEnd]}>

                <View style={[styles.bottomButton, styles.modalButton]}>
                  <Button
                    title="Confirm"
                    color="#ffffff"
                    onPress={() => this.toggleModalNotes(false)}>
                  </Button>
                </View>

                {/* <View style={[styles.bottomButton, styles.modalButton, styles.redBackground]}>
                  <Button
                    color="#ffffff"
                    title="Cancel"
                    onPress={() => this.toggleModalNotes(false)}>
                  </Button>
                </View> */}

              </View>   
              </View>
            </  KeyboardAvoidingView>
          </Modal>

    


    </View>
    </Provider>
    );
  }
}


//------------ * STYLE * ------------------------
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
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginHorizontal: 10,
    marginVertical: 12,
    backgroundColor: (Platform.OS === 'ios') ? "#1e90ff" : "#000000" 
  },

  redBackground:{
    backgroundColor: "#ff5c5c"
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
    width: "100%",

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


  schoolsPanel:{
    flex:2,
    // backgroundColor: "red",
    height: "100%",
    borderRightColor: '#1e90ff',
    borderRightWidth: 3,

  },

  studentsPanel:{
    flex:5,
    height: "100%",
    // backgroundColor: "blue",
    // borderLeftColor: '#1e90ff',
    // borderLeftWidth: 1,

  },
  
  selectedBG:{
    backgroundColor: "#1e90ff"
  },

  unselectedBG:{
    padding:0
  },

  recentAssessments:{
    justifyContent: "flex-end",
    width: "100%",
    height: 36,
    // backgroundColor: "red",
    margin: 0,
    padding: 0
    // borderBottomWidth: 1
  },

  recentAssessmentButton:{
    justifyContent: "flex-end",
    alignItems: 'flex-start',
    width: "100%",
    height: 44,
    backgroundColor: "#f0f0f0",
    margin: 0,
    padding: 0,
    borderBottomWidth: 2
  },

  retakeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 7,
    // paddingVertical: 12,
    marginLeft: 3,
    marginRight: 5,
    // marginBottom: 8,
    // marginVertical: 12,
    // height: 25,
    // backgroundColor: "#ff5c5c"
  },

  notesButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
    marginRight: 5,
    backgroundColor: (Platform.OS === 'ios') ? "#ff6666" : "#000000",
    width: 65,
 
  },

  reviewButton: {
    color: "white",
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 7,
    // paddingVertical: 12,
    marginLeft: 5,
    marginRight: 3,
    // marginVertical: 12,
    // height: 25,
    // backgroundColor: "#1e90ff"
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
    marginBottom: 10,
    marginTop: 15,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: "left"
  },

  textInput:{
    flex:1,
    height: 50,
    marginHorizontal: 10,
    marginVertical: 20,
    maxWidth: 350,
    backgroundColor: "#e6e6e6",
    paddingLeft: 15,
  },

  textInputBig:{
    textAlignVertical: "top",
    flex:1,
    height: 150,
    marginHorizontal: 7,
    marginVertical: 7,
    maxWidth: "90%",
    fontSize: 25,
    padding: 25,
    backgroundColor: "#e6e6e6"
  },

  textInputBox:{
    height: 90,
    borderRightColor: '#1e90ff',
    borderRightWidth: 3,
  },

  textInputStudent:{
    flex:1,
    height: 50,
    marginHorizontal: 10,
    marginVertical: 20,
    maxWidth: "100%",
    backgroundColor: "#e6e6e6",
    paddingLeft: 15,
  },
  

  schoolID:{
    maxWidth: 100,
  },

  studentInfo:{
    margin: 9,
    padding: 5,
    backgroundColor: "#e6e6e6"
  },

  textBox: {
    marginVertical: 10,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#1e90ff',
    height: 180,
    width: '100%',
    padding: 15
  },
  
  modalButton:{
    // backgroundColor: 'white',
    marginTop: 3,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginHorizontal: 5,
    marginVertical: 6,
  },

  modalText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: "#1e90ff"
  }


});
