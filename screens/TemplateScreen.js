//------------ * IMPORT LIBS * ------------------------
import React from 'react';
import { Component } from 'react';

import { 
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button
} from 'react-native';

//------------ * FUNCTIONS/VAR * ------------------------  





export class TemplateScreen extends Component
{



  // *Code Here*








// ------------ * RENDER * ------------------------
  render(){
  const { navigation } = this.props;

      return(
        <View style={styles.container}>
          <Text>Template Screen</Text>
          
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()} 
          />

        <Button title="Test" onPress={() => alert("todo!")}> </Button>
        <Button title="Go to Template" onPress={ () => navigation.push('TemplateScreen')}> </Button>

        </View>
    );
  }
}


//------------ * STYLE * ------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  }
});
