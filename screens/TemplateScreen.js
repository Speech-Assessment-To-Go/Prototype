import React from 'react';

import { 
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  props,
  Button
} from 'react-native';


  
  const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
  );
  
  export const TemplateScreen = ({ navigation }) => (
    <ScreenContainer>
      <Text>Template Screen</Text>
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()} 
      />

    </ScreenContainer>
  );


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