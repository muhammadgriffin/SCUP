import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { useAuth } from './AuthContext'; // Assuming AuthContext.js is in the same directory
import { CommonStyles } from '../styles/CommonStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  <View style={styles.container}>
      <Text style={styles.loginTitle}>Login</Text>
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
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity 
          style={[CommonStyles.button, styles.anonymousButton]} 
          onPress={handleAnonymousLogin}
      >
          <Icon name="incognito" size={20} color="#fff" />  
          <Text style={[CommonStyles.buttonText, styles.anonymousButtonText]}>Sign In Anonymously</Text>
      </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  ...CommonStyles.container,
  paddingHorizontal: 20, // Add horizontal padding for breathing space
  paddingTop: 0, // Added some top padding to shift the content a bit down
},
input: {
  ...CommonStyles.input,
  marginBottom: 15, // Spacing between the inputs and buttons
  borderWidth: 1,  // Optional: To give border to inputs
  borderColor: '#ddd', // Light gray border color
  borderRadius: 5,  // Rounded corners
  padding: 10, // Inner padding
},
signInButton: {
  ...CommonStyles.button,
  backgroundColor: '#2a9d8f', // Choose a color that suits your theme
  marginBottom: 10, // Spacing between the two buttons
},
anonymousButton: {
  ...CommonStyles.button,
  backgroundColor: '#f4a261', // Different color for anonymous sign in
},
buttonText: {
  ...CommonStyles.buttonText,
},
loginTitle: {
  fontSize: 24,
  fontWeight: '700',
  color: '#264653',
  marginBottom: 15,
  marginLeft: 5,
  alignSelf: 'flex-start',  // Aligns the title to the left
},
anonymousButton: {
  backgroundColor: '#A5A5A5',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 0,
},
anonymousButtonText: {
  marginLeft: 10,
},
});

export default SignIn;