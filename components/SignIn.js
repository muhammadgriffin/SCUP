import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { useAuth } from './AuthContext'; // Assuming AuthContext.js is in the same directory
import { CommonStyles } from '../styles/CommonStyles';

function SignIn({ navigation }) {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Home');
    }
  }, [isAuthenticated]);
  const handleSignIn = async () => {
    try {
      const user = await Auth.signIn(username, password);
      if (user) {
        setIsAuthenticated(true); // Setting isAuthenticated to true after successful sign-in
      }
    } catch (error) {
      console.log('Error signing in:', error);
      Alert.alert('Sign in error', error.message || 'An error occurred while signing in.');
    }
  };


 
  return (
    <View style={CommonStyles.container}>
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
      <TouchableOpacity style={CommonStyles.button} onPress={handleSignIn}>
        <Text style={CommonStyles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignIn;