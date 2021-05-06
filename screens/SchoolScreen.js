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
  // TextInput
} from 'react-native';

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


export class SchoolScreen extends Component
{

      constructor(props){
        super(props);

          this.state = {

            schoolsObj:[  ],//DELETE!

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

            filteredStudents:[]
    
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

    console.log(allStudentIds);

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
        // this.setState({selectedStudent: -1})


        //Begin removal
        var selected = this.state.selectedStudent;
        //this.state.selectedStudent = -1;
    
        console.log(selected);
    
        let copy = this.state.studentsObjs.slice(); //Create copy
        copy.splice(selected, 1);
        this.setState({studentsObjs: copy});
        
    
        this.saveStudentsData(this.state.studentsObjs);

        //Clear filtered list
        var allStudentIds = [];
        for (var i = 0; i < copy.length; i++)
          allStudentIds.push(i);

        console.log(allStudentIds);

        //this.setState({filteredStudents: allStudentIds})
        this.state.filteredStudents = allStudentIds;
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
      // return(
      //   <Text style={[globalStyles.flexAlignCenter]}>No recent assessments</Text>
      // )

    }

    else{

      return(
        <ScrollView style={styles.assessmentsPanel}>
          <Text style={[globalStyles.flexAlignCenter]}> {this.state.studentsObjs[this.state.selectedStudent].assessmentData.length + " Assessments Taken"}</Text>


        {       
          //console.log(student.assessmentData[0].slp)   
          // //this.state.recentAssessments.map((assessment,index) => (
            this.state.studentsObjs[this.state.selectedStudent].assessmentData.map((assessment, index) => (
            <View key={"assessment"+index}>
            

            {/* <View style={styles.recentAssessments}>

              <Text style={styles.h2}>{assessment.dateTaken} </Text>

            </View> */}

            
            <View style={styles.recentAssessmentButton}>
              
              {/* <Text style={styles.buttonText}>Add</Text> */}
              <View style={[globalStyles.flexRow]}>

                  <TouchableOpacity style={[styles.reviewButton]}
                  onPress={ () => {                
                    props.navigation.navigate('AssessmentScreen', {assessmentData:assessment, student:this.state.studentsObjs[this.state.selectedStudent], updateStudent: this.handlerUpdateStudent.bind(this), reviewMode:true});
                    }}>
                      <Text style={styles.buttonText}>Review</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.retakeButton, globalStyles.danger, globalStyles.flexAlignEnd]}
                  onPress={ () => {                
                    props.navigation.navigate('AssessmentScreen', {assessmentData:assessment, student:this.state.studentsObjs[this.state.selectedStudent], updateStudent: this.handlerUpdateStudent.bind(this), reviewMode:false});
                    }}>
                      <Text style={styles.buttonText}>Retake</Text>
                  </TouchableOpacity>

                  <Text style={styles.h2}>{assessment.dateTaken + " \t-\t " + assessment.questionData.length + " Questions \t-\t " + assessment.score + "%"} </Text>


                  
              </View>

            </View>



            <Divider/>
            </View>
          ) )
        }      

        </ScrollView>
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


        <ScrollView style={styles.schoolsPanel}>

        <TextInput style={[styles.textInputStudent]} label="Student Name" value={this.state.textStudent} onChangeText={
          text => 
          {
            this.setState( {textStudent: text});
            this.searchStudents(text);
          }



            }/>
        <Divider/>


        {
         
          this.state.filteredStudents.map((index) => (
            <View key={"student"+index}>


            
            <TouchableOpacity
              style={[styles.mainButton, (index == this.state.selectedStudent)? styles.selectedBG: styles.unselectedBG]}
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


                <View style={globalStyles.flexCol}>              

                  <Text style={styles.h2}>{this.state.studentsObjs[index].firstName + " " + this.state.studentsObjs[index].lastName}</Text>
                  <Text>Grade {this.state.studentsObjs[index].grade}</Text>

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

            {/* <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => this.toggleModalSchool(true)}>
              <Text style={styles.buttonText}>Add School</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomButton, globalStyles.danger]}
              onPress={() => alert("Bottom!")}>
              <Text style={styles.buttonText}>Remove School</Text>
            </TouchableOpacity> */}

            {/* <Button
              style={styles.bottomButton}
              mode="contained" 
              onPress={() => this.toggleModalStudent(true)}>
              Add Student
            </Button> */}

            {/* <Button
              title="Press me"
              onPress={() => Alert.alert('Simple Button pressed')}/>
            </Button> */}

            <View style={styles.bottomButton}>
              <Button
                // style={styles.bottomButton}
                //styleDisabled={{color: 'red'}}
                onPress={() => this.toggleModalStudent(true)}
                title="Add Student"
                color="#1e90ff"
                >
                Press Me
              </Button>
            </View>

            <View style={styles.bottomButton}>
              <Button
                // style={{fontSize: 35}}
                color="#ff5c5c"
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
                color="#1e90ff"
                >

              </Button>
            </View>

          </View>   

        </View>



      {/* ********************** | STUDENT MODAL | ********************* */}
      <Modal animationType="slide"  transparent={true} visible={this.state.modalVisible}  >

        <View style={styles.container}>

          <View style={styles.modalView}>

            <Text style={styles.modalHeader}>Add Student</Text> 
            
            <View style={globalStyles.flexRow}>
              <TextInput style={styles.textInput} label="First Name" value={this.state.textFName} onChangeText={text => this.setState( {textFName: text.replace(/[^A-Za-z]/g, ''),})}/>
              <TextInput style={styles.textInput} label="Last Name" value={this.state.textLName} onChangeText={text => this.setState( {textLName: text.replace(/[^A-Za-z]/g, '')})}/>
              {/* <TextInput style={styles.textInput} label="Ethnicity" value={this.state.textEthnicity} onChangeText={text => this.setState( {textEthnicity: text.replace(/[^A-Za-z\s]/g, '')})}/> */}
              <TextInput style={styles.textInput} keyboardType="number-pad" label="Grade" value={this.state.textGrade} onChangeText={text => this.setState( {textGrade: text})}/>
            </View>

            {/* <View style={globalStyles.flexRow}>
              <TextInput style={styles.textInput} label="Grade" value={this.state.textGrade} onChangeText={text => this.setState( {textGrade: text})}/>
              <TextInput style={styles.textInput} label="Birth Year" value={this.state.textBirth} keyboardType="number-pad" onChangeText={text => this.setState( {textBirth: text})}/>
              <TextInput style={styles.textInput} label="Language" value={this.state.textLanguage} onChangeText={text => this.setState( {textLanguage: text.replace(/[^A-Za-z]/g, ''),})}/>
            </View> */}

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
                color="#1e90ff"
                >
              </Button>
            </View>


            <View style={[styles.bottomButton, styles.modalButton]}>
              <Button
                color="#ff5c5c"
                onPress={() => this.toggleModalStudent(false)}
                title="Cancel"
                >
              </Button>
            </View>

          </View>   

          </View>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white'
  },

  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginLeft: 30,
    marginVertical: 12,
    // width: "25%"
    // height: 25,
    // backgroundColor: "#1e90ff"
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
    paddingHorizontal: 7,
    paddingVertical: 12,
    marginLeft: 5,
    marginRight: 10,
    marginBottom: 8,
    // marginVertical: 12,
    height: 25,
    backgroundColor: "#ff5c5c"
  },

  reviewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 12,
    marginLeft: 10,
    marginRight: 5,
    // marginVertical: 12,
    height: 25,
    backgroundColor: "#1e90ff"
  },

  ////// MODAL STUFF : ToDo: Seperate component

  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 35,
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
    flex:1,
    height: 50,
    marginHorizontal: 10,
    marginVertical: 20,
    maxWidth: 350,
    backgroundColor: "#e6e6e6",
    paddingLeft: 15,
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
    backgroundColor: 'white',
    marginTop: 35
  },

  modalText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: "#1e90ff"
  }


});
