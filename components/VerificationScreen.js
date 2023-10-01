import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Auth } from 'aws-amplify';

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
    <View>
      <TextInput
        placeholder="Enter Verification Code"
        value={code}
        onChangeText={setCode}
      />
      <Button title="Verify" onPress={handleVerification} />
    </View>
  );
}

export default VerificationScreen;
