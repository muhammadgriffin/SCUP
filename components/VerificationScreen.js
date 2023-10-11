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
      navigation.navigate("AuthLanding");
    } catch (error) {
      Alert.alert("Verification Error", error.message);
    }
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>Please enter the verification code sent to your email.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Verification Code"
          keyboardType="numeric" // Ensure only numbers can be entered
          value={code}
          onChangeText={setCode}
          maxLength={6} // Assuming a 6-digit code
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Verify"
            onPress={handleVerification}
            color={CommonStyles.button.backgroundColor}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 10,
    color: '#264653',
  },
  subtitle: {
    fontSize: 16,
    color: '#264653',
    textAlign: 'center', // Center-align text
    marginBottom: 30, // Spacing between subtitle and input
  },
  input: {
    ...CommonStyles.input,
    width: '100%', // Take full width of the parent
    padding: 15,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%', // Ensure button takes the full width
    borderRadius: 8,
  }
});

export default VerificationScreen;
