import React from 'react';

import { 
  Text,
  View,
  StyleSheet,
  Button
} from 'react-native';



  
  const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
  );
  
  export const SchoolScreen = ({ navigation }) => (
    <ScreenContainer>
        <Text> School Screen</Text>
        <Button title="Test" onPress={() => alert("todo!")}> </Button>
        <Button title="Go to Template" onPress={ () => navigation.push('TemplateScreen')}> </Button>
    </ScreenContainer>
  );

  function ChangeScreen(navigation)
  {
      navigation.push("TemplateScreen");
  }


// -------------- STYLE --------------------
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