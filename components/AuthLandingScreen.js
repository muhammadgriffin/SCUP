// AuthLandingScreen.js

import React from 'react';
import { View, Button } from 'react-native';

const AuthLandingScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
};

export default AuthLandingScreen;
