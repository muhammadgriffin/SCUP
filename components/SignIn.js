import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { useAuth } from './AuthContext'; // Assuming AuthContext.js is in the same directory

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
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
}

export default SignIn;
