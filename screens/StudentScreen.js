//------------ * IMPORT LIBS * ------------------------
import React from 'react';
import { Component } from 'react';

import { 
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,  
  TextInput,
  Modal
} from 'react-native';

import { globalStyles } from '../globalStyles';
import { Button, Avatar, Divider, Provider } from 'react-native-paper';
import { TemplateScreen } from './TemplateScreen';

import { RoundedText } from '../components/RoundedText';
import { Student } from '../Student'

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


export class StudentScreen extends Component
{
  constructor(props){
    super(props);
  }

  state = {
    modalVisible:false,        
        //Email MODAL
        textEAddress:'',

      recentAssessments:["4/12/21","4/13/21","4/14/21","4/15/21","4/16/21","4/17/21","4/18/21","4/19/21","4/13/21","4/14/21","4/15/21","4/16/21","4/17/21","4/18/21","4/19/21","4/13/21","4/14/21","4/15/21","4/16/21","4/17/21","4/18/21","4/19/21","4/13/21","4/14/21","4/15/21","4/16/21","4/17/21","4/18/21","4/19/21","4/13/21","4/14/21","4/15/21","4/16/21","4/17/21","4/18/21","4/19/21"],  
  }
  
    toggleModalEmail(visible) {
      this.setState({ modalVisible: visible });
      this.clearInput();
  }

  sendEmail()
  {
    var Email = 
    { 
      send: function (a) 
      { 
          return new Promise(function (n, e) 
          { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) 
              { 
                  n(e) 
              }) 
          }) 
      }, ajaxPost: function (e, n, t) 
      { 
          var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () 
          { 
              var e = a.responseText; null != t && t(e) 
          }, a.send(n) 
      }, ajax: function (e, n) 
      { 
          var t = Email.createCORSRequest("GET", e); t.onload = function () 
          { 
              var e = t.responseText; null != n && n(e) 
          }, t.send() 
      }, createCORSRequest: function (e, n) 
      { 
          var t = new XMLHttpRequest; 
          return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t 
      } 
    };

    Email.send({
    Host: "smtp.elasticemail.com",
    Username: "stackunderflow2021@gmail.com",
    Password: "7637EF12FF54E310A2824C17E3D6F629342D",
    To: this.state.textEAddress,
    From: "stackunderflow2021@gmail.com",
    Subject: "Student Profile",
    Body: "This is the file sent for the speech assessment. Please do not respond to this email.",
    //use when we have the pdf/attachment
    // Attachments:[
    // {
    //     Name: studentname.pdf,
    //     Data: studentdata
    // }]
  }).then(
        alert("Email sent successfully")
    );
    this.toggleModalEmail(false);
  }


  handlerUpdateStudent(studentData)
  {
    this.setState({student: studentData})
  }

  clearInput(){
    this.state.textEAddress = '';
  }

  renderRecentAssessments = (props, student) =>
  {
    if (student.assessmentData.length == 0)
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
            student.assessmentData.map((assessment, index) => (
            <View key={"assessment"+index}>
            

            {/* <View style={styles.recentAssessments}>

              <Text style={styles.h2}>{assessment.dateTaken} </Text>

            </View> */}

            
            <TouchableOpacity
              style={styles.recentAssessmentButton}
              onPress={ () => {

                //Get saved information of the assessmentData
                var assessmentData = student.assessmentData[index];

                props.navigation.navigate('AssessmentScreen', {assessmentData:assessmentData, student:student, updateStudent: this.handlerUpdateStudent.bind(this), reviewMode:true});
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
  const { route, navigation } = this.props;
  const { student, updateHomeStudent } = route.params; //This is done so I don't have to type the long path

  //var student = schoolsObj[global.selectedSchool].students[global.selectedStudent];

      return(
        <Provider>
        <View style={styles.container}>
        
        {/* LEFT */}      
        <View style={[styles.column, globalStyles.flex2]}>

          <View style={styles.leftPanel}>
          <View style={styles.box}>

          <View style={globalStyles.flexRow}>
            <View style={[styles.underline, globalStyles.flex1]}>            
              <Text style={styles.textUnderline}>{student.firstName + ' ' + student.lastName}</Text>
            </View>

            <View style={[styles.underline, globalStyles.flex1]}>     
              <Text style={styles.textUnderline}>{student.birth}</Text>
            </View>

          </View>


          <View style={[styles.underline]}>   
            <Text style={styles.textUnderline}>{student.school}</Text>
          </View>

          <View style={[styles.underline]}>   
            <Text style={styles.textUnderline}>{student.ethnicity}</Text>
          </View>

          <View style={[styles.underline]}>   
            <Text style={styles.textUnderline}>{student.language}</Text>
          </View>

          {/* BOTTOM */}
          <View style={[globalStyles.flex1, globalStyles.flexVertEnd]}>
            <TextInput style={styles.textInput} onChangeText={(text) => console.log(text)} placeholder={"Notes"}/>

            {/* <TouchableOpacity
                style={styles.bottomButton}
                onPress={ () => navigation.push('TopicScreen', {student: student})}> 
                <Text style={[styles.buttonText]}>Edit</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
                style={styles.bottomButton}
                onPress={ () => {

                  console.log(student);
                  console.log(student.assessmentData.length);
                  // let copy = student;
                  // copy.firstName = "12364356";

                  //  this.setState({student: copy})
                  //  //student.firstName = "SDJLK"; 
                  //  updateHomeStudent(copy); 


                  }}>
                <Text style={[styles.buttonText]}>CHANGE</Text>
            </TouchableOpacity>

          </View>

          </View>
          
                  
          </View>

        </View>
      



        {/* Right */}

        <View style={[styles.column, globalStyles.flex3]}> 

        <View style={styles.rightPanel}>

          <View style={styles.box}>
            


          {
            this.renderRecentAssessments(this.props, student)
          }



          </View>

        </View>

        <View style={globalStyles.flexRowReverse}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={ () => navigation.push('TopicScreen', {student: student, updateHomeStudent: updateHomeStudent.bind(this), updateStudent: this.handlerUpdateStudent.bind(this) })}> 
              <Text style={styles.buttonText}>Take Assessment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomButton]}
              onPress={() => this.toggleModalEmail(true)}>
              <Text style={styles.buttonText}>Email Student Profile</Text>
            </TouchableOpacity>

          </View>   

        </View>


      {/* ********************** | EMAIL MODAL | ********************* */}
      <Modal animationType="slide"  transparent={true} visible={this.state.modalVisible}  >

        <View style={styles.container}>

          <View style={styles.modalView}>

            <Text style={styles.modalHeader}>Email Student Profile</Text> 
            
            <View style={globalStyles.flexRow}>
              <TextInput style={[styles.textInput, styles.emailAddress]} label="Email Address" value={this.state.textEAddress} onChangeText={text => this.setState( {textEAddress: text})}placeholder={"Email Address"}/>
              
            </View>

            <View style={[globalStyles.flexRow, globalStyles.flexAlignEnd]}>
            <TouchableOpacity
              style={[styles.bottomButton, styles.modalButton]}
              onPress={() => this.sendEmail(this.state.textEAddress)}>
              <Text style={styles.modalText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomButton, styles.modalButton]}
              onPress={() => this.toggleModalEmail(false)}>
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
    flexDirection: 'row',
  },

  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginRight: 30,
    marginVertical: 12,
    height: 25,
    backgroundColor: "#1e90ff"

  },

  icon:{
    marginTop: 7,
    marginLeft: 6,
    marginRight: 19
  },

  textbox:{

  },

  mainButton:
  {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 30,
    marginVertical: 1,
    width: "55%",
    // backgroundColor: "#1e90ff"
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


  leftPanel:{
    flex:1,
    flexDirection: 'column',
    // backgroundColor: "red",
    height: "100%",
    borderRightColor: '#1e90ff',
    borderRightWidth: 3,
    // backgroundColor: 'red',
    padding: 15,
    paddingRight: 40
  },

  textUnderline:{
    // lineHeight: 14,
    color: 'black',
    fontSize: 22,
  },

  underline:{
    paddingBottom: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 22,
    marginHorizontal: 20,
    maxWidth: '65%'
  },

  rightPanel:{
    flex:3,
    flexDirection: 'column',
    // backgroundColor: "blue",
    height: "100%",
    // borderLeftColor: '#1e90ff',
    // borderLeftWidth: 1,
    width: '100%',
    padding: 40

  },

  box:{
    flex: 1,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#1e90ff',
    width: "100%",
    // padding: 15,

  },

  textInput: {
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#1e90ff',
    height: 280,
    padding: 15
  },

  input: {
    height: 70,
    backgroundColor: '#ffffff',
    paddingLeft: 15,
    paddingRight: 15
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

  // assessmentsPanel:{
  //   width: "100%",
  //   margin: 0,
  //   padding: 0
  // },

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

  textInput:{
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