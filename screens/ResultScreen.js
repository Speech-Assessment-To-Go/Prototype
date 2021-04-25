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

import { globalStyles } from '../styles/global';
import { Button, Avatar, Chip ,Provider } from 'react-native-paper';
import { TemplateScreen } from './TemplateScreen';
import { AssessmentScreen } from './AssessmentScreen';

import { RoundedText } from '../components/RoundedText';
import {StudentScreen} from './StudentScreen'

//------------ * FUNCTIONS/VAR * ------------------------  
function alertFunc(msg)
{
  alert(msg);
}


var schools = []


export class ResultScreen extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {

      // grading:props.grading,
      maxQuestions:10
    }
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
  
  state = {
    modalVisible:true,        
        //Email MODAL
        textEAddress:'',
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
          var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t 
      } 
};
    Email.send({
    Host: "smtp.elasticemail.com",
    Username: "stackunderflow2021@gmail.com",
    Password: "7637EF12FF54E310A2824C17E3D6F629342D",
    To: this.state.textEAddress,
    From: "stackunderflow2021@gmail.com",
    Subject: "Results",
    Body: "These are the results of the assessment. Please do not respond to this email.",
    //use when we have the pdf/attachment
    // Attachments:[
    // {
    //     Name: studentname.pdf,
    //     Data: studentdata
    // }]
  }).then(
        alert("Email sent successfully")
    );
    this.toggleModalEmail(false)
  }

  clearInput(){
    this.state.textEAddress = '';
  }

// ------------ * RENDER * ------------------------
  render(){
    const { route, navigation } = this.props;
    const { grading } = route.params;

      return(      
        <Provider>

        <View style={styles.container}>

 
        {/* QUESTIONS IMG & TEXT */}
        <View style={[styles.container, globalStyles.flex8]}>

      <Text style={styles.percentText}>{this.getPercent(grading)}%</Text>

          {/* <View style={styles.box}></View> */}

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
              onPress={() => navigation.push('AssessmentScreen')}>
              <Text style={styles.buttonText}>Review</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.bottomButton]}
              onPress={() => this.toggleModalEmail(true)}>
              <Text style={styles.buttonText}>Email Results</Text>
            </TouchableOpacity>

          </View>

          </View>

      {/* ********************** | EMAIL MODAL | ********************* */}
      <Modal animationType="slide"  transparent={true} visible={this.state.modalVisible}  >

        <View style={styles.container}>

          <View style={styles.modalView}>

            <Text style={styles.modalHeader}>Email Assessment Results</Text> 
            
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
    paddingHorizontal: 60,
    paddingVertical: 25,
    marginHorizontal: 140,
    marginBottom: 12,
    height: 22,
    backgroundColor: "#00bcd4"

  },

  percentText:{
    fontSize: 185,
    fontWeight: '100',
    color: '#6bc46b'
  },

  buttonText:{
    fontSize: 17,
    fontWeight: 'bold',
    color: "white",
    // fontFamily: 'tahoma'
  },

  box:{
    flex: 1,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#00bcd4',
    width: "55%",
    padding: 15,
    marginBottom: 40
  },
  

  img:{
    maxWidth: 256*scale,
    maxHeight: 192*scale,
    aspectRatio: (256*scale)/(192*scale),
    width: 256*scale,
    height: 192*scale
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
  },

  ////// MODAL STUFF 
  
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
