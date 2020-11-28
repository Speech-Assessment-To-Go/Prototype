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
import { Button, Avatar, Divider  } from 'react-native-paper';
import { TemplateScreen } from './TemplateScreen';

//------------ * FUNCTIONS/VAR * ------------------------  
function alertFunc(msg)
{
  alert(msg);
}



var schools = []


export class SchoolScreen extends Component
{

  state = {
    schools:['Adams', 'Allen', 'Allison', 'Alvin', 'Anderson',
     'Beech', 'Benton', 'Black', 'Bostic', 'Brooks', 'Byrant',
      'Buckner', 'Caldwell', 'Cessna', 'Chester', 'Chisholm', 'Christa', 'Clark',
       'Cleaveland', 'Cloud', 'Coleman', 'College Hill', 'Colvin', 'Curtis', 'Dodge'],

      students:['Adrin Anna', 'Allas Kong', 'Elyot Knives', 'Luigi Mario', 'Ramen Henshnop', 'Vinny Mayor', 'Punny Name', "Mark Ritaherta"]


  }


// ------------ * RENDER * ------------------------
  render(){
  const { navigation } = this.props;

      return(      
        <View style={styles.container}>
        

        {/* LEFT */}

      
      <View style={styles.column}>


        <ScrollView style={styles.schoolsPanel}>

        {
          this.state.schools.map(school => (
            <View>

            
            <TouchableOpacity
              style={styles.mainButton}
              onPress={() => alert("BRUH!")}>

              <View style={globalStyles.flexRow}>

              <Avatar.Icon size={42} icon="folder" style={styles.icon} />

                <View style={globalStyles.flexCol}>              
                  <Text style={styles.h2}>{school} Elementary School</Text>
                  <Text>USD 259</Text>
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
              onPress={() => alert("Bottom!")}>
              <Text style={styles.buttonText}>Add School</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomButton, globalStyles.danger]}
              onPress={() => alert("Bottom!")}>
              <Text style={styles.buttonText}>Remove School</Text>
            </TouchableOpacity>

          </View>          
        </View>


        {/* Right */}

        <View style={styles.column}> 

        <ScrollView style={styles.studentsPanel}>

        {
          this.state.students.map(student => (
            <View>

            
            <TouchableOpacity
              style={styles.mainButton}
              onPress={() => alert("BRUH!")}>

              <View style={globalStyles.flexRow}>

              <Avatar.Icon size={42} icon="folder" style={styles.icon} />

                <View style={globalStyles.flexCol}>              
                  <Text style={styles.h2}>{student}</Text>
                  <Text>5th Grader</Text>
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
              onPress={() => alert("Bottom!")}>
              <Text style={styles.buttonText}>Add Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomButton, globalStyles.danger]}
              onPress={() => alert("Bottom!")}>
              <Text style={styles.buttonText}>Remove Student</Text>
            </TouchableOpacity>

          </View>   

        </View>

        </View>


    );
  }
}


//------------ * STYLE * ------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
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
    marginLeft: 30,
    marginVertical: 1,
    width: "55%",
    // backgroundColor: "cyan"
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

  yellowBG:
  {
    backgroundColor: "red",
  },

  schoolsPanel:{
    flex:1,
    // backgroundColor: "red",
    height: "100%",
    borderRightColor: 'black',
    borderRightWidth: 1,

  },

  studentsPanel:{
    flex:2,
    // backgroundColor: "blue",
    height: "100%"

  }


});
