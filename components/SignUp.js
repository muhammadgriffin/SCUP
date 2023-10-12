import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { CommonStyles } from '../styles/CommonStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'guest-';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleAnonymousSignUp = async () => {
    const generatedUsername = generateRandomString(10);
    const generatedPassword = generateRandomString(16);

    try {
      await Auth.signUp({
        username: generatedUsername,
        password: generatedPassword,
        attributes: {}
      });
      Alert.alert('Registration successful!', `Your username is ${generatedUsername} and password is ${generatedPassword}. Please note them down.`);
      navigation.navigate('Verification', { username: generatedUsername });
    } catch (error) {
      console.log('Error signing up:', error);
      Alert.alert('Registration error', error.message || 'An error occurred while registering.');
    }
  };

  const handleStandardSignUp = async () => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number: phone,
        }
      });
      Alert.alert('Registration successful!', 'Please check your email for verification instructions.');
      navigation.navigate('Verification', { username });
    } catch (error) {
      console.log('Error signing up:', error);
      Alert.alert('Registration error', error.message || 'An error occurred while registering.');
    }
  };

  return (
    <View style={CommonStyles.container}>
      {/* Standard Sign Up Inputs */}
      <TextInput
        style={CommonStyles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={CommonStyles.input}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={CommonStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={CommonStyles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
            <TouchableOpacity style={CommonStyles.button} onPress={handleStandardSignUp}>
        <Text style={CommonStyles.buttonText}>Standard Sign Up</Text>
      </TouchableOpacity>

      {/* Aesthetic "OR" Divider */}
      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.orLine} />
      </View>

      {/* Anonymous Sign Up Button */}
      <TouchableOpacity 
          style={[CommonStyles.button, styles.anonymousButton]} 
          onPress={handleAnonymousSignUp}
      >
          <Icon name="incognito" size={20} color="#fff" />  
          <Text style={[CommonStyles.buttonText, styles.anonymousButtonText]}>Sign Up Anonymously</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20, // provides some vertical spacing
  },
  orLine: {
    flex: 1, // this makes sure the line takes all available space on either side
    height: 1, // thickness of the line
    backgroundColor: 'grey', // color of the line
  },
  orText: {
    width: 40, // fixed width for the "OR" text container
    textAlign: 'center',
    marginHorizontal: 10, // provides some spacing from the lines
  },
  anonymousButton: {
    backgroundColor: '#A5A5A5',  // or any color you prefer for the anonymous sign up
    flexDirection: 'row',  // to lay out the icon and text side by side
    alignItems: 'center',  // to vertically center the content
    justifyContent: 'center',  // to horizontally center the content
  },
  anonymousButtonText: {
    marginLeft: 10,  // to provide some space between the icon and the text
  },
});


export default SignUp;


