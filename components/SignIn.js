import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { useAuth } from './AuthContext'; // Assuming AuthContext.js is in the same directory
import { CommonStyles } from '../styles/CommonStyles';

function SignIn({ navigation }) {
  const { isAuthenticated, isAnonymous,setIsAuthenticated, setIsAnonymous } = useAuth();
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
        setIsAuthenticated(true);
         // Setting isAuthenticated to true arfter successful sign-in
      }
    } catch (error) {
      console.log('Error signing in:', error);
      Alert.alert('Sign in error', error.message || 'An error occurred while signing in.');
    }
  };

  const handleAnonymousLogin = async () => {
    try {
        // Get unauthenticated credentials
        await Auth.signOut();
        const credentials = await Auth.currentCredentials();
        
        if (credentials) {
          setIsAuthenticated(true);
          setIsAnonymous(true);  // Set anonymous state to true
      }
    } catch (error) {
        console.log('Error signing in anonymously:', error);
        Alert.alert('Anonymous sign in error', error.message || 'An error occurred while signing in anonymously.');
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
      <TouchableOpacity style={CommonStyles.button} onPress={handleAnonymousLogin}>
        <Text style={CommonStyles.buttonText}>Sign In Anonymously</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignIn;