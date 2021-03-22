//------------ * IMPORT LIBS * ------------------------
import React from 'react';
import { Component } from 'react';

import { 
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { globalStyles } from '../styles/global';
import { Button, Avatar, Chip  } from 'react-native-paper';
import { TemplateScreen } from './TemplateScreen';

import { RoundedText } from '../components/RoundedText';

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

    return (correct / array.length) * 100;
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
    Host: "smtp.gmail.com",
    Username: "stackunderflow2021@gmail.com",
    Password: "password",
    To: "example@gmail.com",
    From: "stackunderflow2021@gmail.com",
    Subject: "results",
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
  }

// ------------ * RENDER * ------------------------
  render(){
    const { route, navigation } = this.props;
    const { grading } = route.params;

      return(      
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
              onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Review</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.bottomButton]}
              onPress={() => this.sendEmail()}>
              <Text style={styles.buttonText}>Email Results</Text>
            </TouchableOpacity>

          </View>

          </View>




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
  }




});
