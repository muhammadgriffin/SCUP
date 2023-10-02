import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { CommonStyles } from '../styles/CommonStyles';

function VerificationScreen({ route, navigation }) {
  const [code, setCode] = useState('');
  const { username } = route.params;

  const handleVerification = async () => {
    try {
      await Auth.confirmSignUp(username, code);
      Alert.alert("Verification Successful", "You can now sign in with your credentials.");
      navigation.navigate("SignIn");
    } catch (error) {
      Alert.alert("Verification Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <TextInput
        style={CommonStyles.input}
        placeholder="Enter Verification Code"
        value={code}
        onChangeText={setCode}
      />
      <Button
        title="Verify"
        onPress={handleVerification}
        color={CommonStyles.button.backgroundColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Add spacing between title and input
  },
});

export default VerificationScreen;
