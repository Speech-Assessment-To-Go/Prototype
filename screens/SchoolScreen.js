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

import { globalStyles } from '../styles/global';
import { Button, Avatar, Divider, TextInput, Badge, Provider, Menu  } from 'react-native-paper';
import { TemplateScreen } from './TemplateScreen';

import { RoundedText } from '../components/RoundedText';
import { School } from '../School'
import { Student } from '../Student'
import Database from '../Database.js';

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

  state = {

      // studentsObj:[ new Student('Adrin Anna'), new Student('Allas Kong'), new Student('Elyot Knives'), new Student('Luigi Mario'), new Student('Ramen Henshnop'), new Student('Vinny Mayor'), new Student('Punny Name'), new Student("Mark Ritaherta")],

      schoolsObj:[ new School('Adams'), new School('Allen'), new School('Allison'), new School('Alvin'), new School('Anderson'),
       new School('Beech'), new School('Benton'),new School('Black'), new School('Bostic'),new School('Brooks'), new School('Byrant'),
        new School('Buckner'),new School('Caldwell'), new School('Cessna'),new School('Chester'), new School('Chisholm')],


      modalVisible:false,
      modalSchoolVisible:false,
      menuVisable:true,
      
      //Student MODAL
      textFName:'',
      textLName:'',
      textEthnicity:'',
      textGrade:'',
      textBirth:'',
      textLanguage:'',

      selectedSchool:0,

  }

  //Initialize
  // componentWillMount()
  // {
  //   var schools = Database.LoadSchools();
  //   this.setState({schoolsObj : schools});
  // }

  toggleModalStudent(visible) {
    this.setState({ modalVisible: visible });
    this.clearInputs();
  }

  toggleModalSchool(visible) {
    this.setState({ modalSchoolVisible: visible });
    this.clearInputs();
  }

  addSchool(name = "NULL", id = 259){
    this.state.schoolsObj.push(new School(name, id));
    this.toggleModalSchool(false);

  }

  
  toggleMenu(val)
  {
    this.state.menuVisable = !this.state.menuVisable;
    this.forceUpdate();
    console.log("MENU PRESSED!: " + this.state.menuVisable);
  }


  addStudent(firstName, lastName, ethnicity, school, birth, language, grade = 5){

    this.state.schoolsObj[this.state.selectedSchool].students.push(      
      new Student(firstName, lastName, ethnicity, school, birth, language, grade)      
      );

    //this.state.studentsObj.push(new Student(text));
    this.toggleModalStudent(false);
  }

  selectSchool(index){
    this.state.selectedSchool = index;
    this.forceUpdate();
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
          this.state.schoolsObj.map((school,index) => (
            <View key={"school"+index}>
            
            <TouchableOpacity
              style={[styles.mainButton, (index == this.state.selectedSchool)? styles.selectedBG: styles.unselectedBG]}
              onPress={() => this.selectSchool(index)}>

              <View style={globalStyles.flexRow}>
              
              <RoundedText
                    title = {school.name[0]}
                    color = "black"
                    backgroundColor = "#cccccc"
                    fontSize={18}
                    size={43}
                />
                
                {/* <Badge size={43}>{school[0]}</Badge> */}


                <View style={globalStyles.flexCol}>              
                  <Text style={styles.h2}>{school.name} Elementary School</Text>
                  <Text>USD {school.id}</Text>
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
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => this.toggleModalSchool(true)}>
              <Text style={styles.buttonText}>Add School</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomButton, globalStyles.danger]}
              onPress={() => alert("Bottom!")}>
              <Text style={styles.buttonText}>Remove School</Text>
            </TouchableOpacity>

          </View>          
        </View>


        {/* Right | STUDENT PANEL*/}
        <View style={styles.column}> 

        <ScrollView style={styles.studentsPanel}>

        {
          this.state.schoolsObj[this.state.selectedSchool].students.map( (student,index) => (
            <View key={"student"+index}>

            
            <TouchableOpacity
              style={styles.mainButton}
              onPress={ () => navigation.navigate('StudentScreen', {student} )}>

              <View style={globalStyles.flexRow}>

              <RoundedText
                    title = {student.firstName[0]}
                    color = "black"
                    backgroundColor = "#cccccc"
                    fontSize={18}
                    size={43}
                />

                <View style={globalStyles.flexCol}>              
                  <Text style={styles.h2}>{student.firstName}</Text>
                  <Text>{student.grade} Grader</Text>
                </View>

              </View>

            </TouchableOpacity>     
            <Divider/>
            </View>
          ) )
        }               

        </ScrollView>

        <View style={globalStyles.flexRow}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => this.toggleModalStudent(true)}>
              <Text style={styles.buttonText}>Add Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomButton, globalStyles.danger]}
              onPress={() => alert("Bottom!")}>
              <Text style={styles.buttonText}>Remove Student</Text>
            </TouchableOpacity>

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
              onPress={() => this.addStudent(this.state.textFName, this.state.textLName,this.state.textEthnicity,this.state.schoolsObj[this.state.selectedSchool].name + " Elementary School",
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
      <Modal animationType="slide"  transparent={true} visible={this.state.modalSchoolVisible}  >

        <View style={styles.container}>

          <View style={styles.modalView}>

            <Text style={styles.modalHeader}>Add School</Text> 
            
            <View style={globalStyles.flexRow}>
              <TextInput style={[styles.textInput]} label="School Name" value={this.state.textFName} onChangeText={text => this.setState( {textFName: text})}/>

           
              {/* <Menu
                visible={this.state.menuVisable}
                onDismiss={() => (this.state.menuVisable = false)}
                anchor={<Button onPress={() => (this.toggleMenu(true))}>Show menu</Button>}>
                <Menu.Item onPress={() => {}} title="Item 1" />
                <Menu.Item onPress={() => {}} title="Item 2" />
                <Divider />
                <Menu.Item onPress={() => {}} title="Item 3" />
              </Menu> */}

              

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
