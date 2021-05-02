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
  Alert
} from 'react-native';

import { globalStyles } from '../globalStyles';
import { Button, Avatar, Divider, TextInput, Badge, Provider, Menu  } from 'react-native-paper';
import { TemplateScreen } from './TemplateScreen';

import { RoundedText } from '../components/RoundedText';
import { School } from '../School'
import { Student } from '../Student'
import Database from '../Database.js';

import AsyncStorage from '@react-native-async-storage/async-storage';



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
    
        }

        // this.handlerUpdateStudentData = this.handlerUpdateStudentData.bind(this)

        this.init();

      }


  //Initialize
  init ()
  {
    // console.log("Loaded from init!");
    // this.loadSchools();
    this.loadStudents();
  }

  handlerUpdateStudent(studentData)
  {
    //this.forceUpdate();
    // let copy = this.state.studentsObjs.slice(); //Create copy

    // copy[global.selectedStudent] = studentData;

    // this.setState({studentsObjs: copy})

    this.state.studentsObjs[global.selectedStudent] = studentData;

    //Save assessments
    this.saveStudentsData(this.state.studentsObjs);
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
          this.setState({studentsObjs: parsedStudents})
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
        var selected = this.state.selectedStudent;
        this.state.selectedStudent = -1;
    
    
        let copy = this.state.studentsObjs.slice(); //Create copy
        copy.splice(selected, 1);
        this.setState({studentsObjs: copy});
        
    
        this.saveStudentsData(this.state.studentsObjs);
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


  renderRecentAssessments = (props) =>
  {
    //console.log(this.state.studentsObjs[this.state.selectedStudent]);

    if (this.state.selectedStudent == -1) return;

    if (this.state.studentsObjs[this.state.selectedStudent].assessmentData.length == 0)
    {  
      return(
        <Text style={[globalStyles.flexAlignCenter]}>No recent assessments</Text>
      )

    }

    else{

      return(
        <ScrollView style={styles.assessmentsPanel}>
          <Text style={[globalStyles.flexAlignCenter]}>ASSESSMENTS EXISTS!</Text>


        {       
          //console.log(student.assessmentData[0].slp)   
          // //this.state.recentAssessments.map((assessment,index) => (
            this.state.studentsObjs[this.state.selectedStudent].assessmentData.map((assessment, index) => (
            <View key={"assessment"+index}>
            

            {/* <View style={styles.recentAssessments}>

              <Text style={styles.h2}>{assessment.dateTaken} </Text>

            </View> */}

            
            <TouchableOpacity
              style={styles.recentAssessmentButton}
              onPress={ () => {

                //Get saved information of the assessmentData
                //var assessmentData = this.state.studentsObjs[this.state.selectedStudent].assessmentData[index];
                
                props.navigation.navigate('AssessmentScreen', {assessmentData:assessment, student:this.state.studentsObjs[this.state.selectedStudent], updateStudent: this.handlerUpdateStudent.bind(this), reviewMode:true});

                }}>
              {/* <Text style={styles.buttonText}>Add</Text> */}
              <Text style={styles.h2}>{assessment.dateTaken} </Text>
            </TouchableOpacity>



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


        {
         
          this.state.studentsObjs.map((student,index) => (
            <View key={"student"+index}>
            
            <TouchableOpacity
              style={[styles.mainButton, (index == this.state.selectedStudent)? styles.selectedBG: styles.unselectedBG]}
              onPress={() => this.selectStudent(index)}>

              <View style={globalStyles.flexRow}>
              
              <RoundedText
                    title = {student.firstName[0]}
                    color = "black"
                    backgroundColor = "#cccccc"
                    fontSize={18}
                    size={43}
                />
                
                {/* <Badge size={43}>{school[0]}</Badge> */}


                <View style={globalStyles.flexCol}>              

                  <Text style={styles.h2}>{student.firstName + " " + student.lastName}</Text>
                  <Text>Grade {student.grade}</Text>

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

            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => this.toggleModalStudent(true)}>
              <Text style={styles.buttonText}>Add Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomButton, globalStyles.danger]}
              onPress={() => 
                this.removeStudent()
              }>
              <Text style={styles.buttonText}>Remove Student</Text>
            </TouchableOpacity>

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

            <TouchableOpacity
              style={styles.bottomButton}
              onPress={ () => navigation.push('TopicScreen', {student: this.state.studentsObjs[this.state.selectedStudent], updateStudent: this.handlerUpdateStudent.bind(this) })}>
              <Text style={styles.buttonText}>Take Assessment</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={[styles.bottomButton, globalStyles.danger]}
              onPress={() => alert("Bottom!")}>
              <Text style={styles.buttonText}>Remove Student</Text>
            </TouchableOpacity> */}

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
              <TextInput style={styles.textInput} label="Ethnicity" value={this.state.textEthnicity} onChangeText={text => this.setState( {textEthnicity: text.replace(/[^A-Za-z\s]/g, '')})}/>
            </View>

            <View style={globalStyles.flexRow}>
              <TextInput style={styles.textInput} label="Grade" value={this.state.textGrade} onChangeText={text => this.setState( {textGrade: text})}/>
              <TextInput style={styles.textInput} label="Birth Year" value={this.state.textBirth} keyboardType="number-pad" onChangeText={text => this.setState( {textBirth: text})}/>
              <TextInput style={styles.textInput} label="Language" value={this.state.textLanguage} onChangeText={text => this.setState( {textLanguage: text.replace(/[^A-Za-z]/g, ''),})}/>
            </View>

            <View style={globalStyles.flexRow}>
              <TextInput style={styles.textBox} value={this.state.textbox} onChangeText={text => this.setState( {textbox: text})} placeholder={"Notes"}/>
            </View>

          <View style={[globalStyles.flexRow, globalStyles.flexAlignEnd]}>
            <TouchableOpacity
              style={[styles.bottomButton, styles.modalButton]}
              onPress={() => this.addStudent(this.state.textFName, this.state.textLName,this.state.textEthnicity, "??? School",
                                              this.state.textBirth,this.state.textLanguage, this.state.textGrade)}>
              <Text style={styles.modalText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomButton, styles.modalButton]}
              onPress={() => this.toggleModalStudent(false)}>
              <Text style={styles.modalText}>Cancel</Text>
            </TouchableOpacity>
          </View>   

          </View>
        </View>
      </Modal>

      {/* ********************** | SCHOOL MODAL | ********************* */}
      {/* <Modal animationType="slide"  transparent={true} visible={this.state.modalSchoolVisible}  >

        <View style={styles.container}>

          <View style={styles.modalView}>

            <Text style={styles.modalHeader}>Add School</Text> 
            
            <View style={globalStyles.flexRow}>
              <TextInput style={[styles.textInput]} label="School Name" value={this.state.textFName} onChangeText={text => this.setState( {textFName: text})}/>
              

              <TextInput style={[styles.textInput, styles.schoolID]} label="ID" keyboardType="number-pad" value={this.state.textLName} onChangeText={text => this.setState( {textLName: text})}/>              
            </View>


            <View style={[globalStyles.flexRow, globalStyles.flexAlignEnd]}>
            <TouchableOpacity
              style={[styles.bottomButton, styles.modalButton]}
              onPress={() => this.addSchool(this.state.textFName,this.state.textLName)}>
              <Text style={styles.modalText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomButton, styles.modalButton]}
              onPress={() => this.toggleModalSchool(false)}>
              <Text style={styles.modalText}>Cancel</Text>
            </TouchableOpacity>
          </View>   
          </View>
        </View>
      </Modal> */}


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
    flex:1,
    // backgroundColor: "red",
    height: "100%",
    borderRightColor: '#00bcd4',
    borderRightWidth: 3,

  },

  studentsPanel:{
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

  recentAssessments:{
    justifyContent: "flex-end",
    width: "100%",
    height: 32,
    backgroundColor: "red",
    margin: 0,
    padding: 0
    // borderBottomWidth: 1
  },

  recentAssessmentButton:{
    justifyContent: "flex-end",
    width: "100%",
    height: 32,
    backgroundColor: "red",
    margin: 0,
    padding: 0
    // borderBottomWidth: 1
  },

  ////// MODAL STUFF : ToDo: Seperate component

  modalView: {
    margin: 35,
    backgroundColor: "white",
    borderRadius: 7,
    paddingVertical: 15,
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
    flex:1,
    height: 50,
    marginHorizontal: 10,
    marginVertical: 20,
    maxWidth: 350
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
    marginTop: 35
  },

  modalText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: "#00bcd4"
  }


});
