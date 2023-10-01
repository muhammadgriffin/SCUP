import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Auth } from 'aws-amplify';

function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignUp = async () => {
    try {
      const { user } = await Auth.signUp({
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

  const handleSuccess = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
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
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
    
  );
}

export default SignUp;
