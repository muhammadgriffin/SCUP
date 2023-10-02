import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { CommonStyles } from '../styles/CommonStyles';

const AuthLandingScreen = () => {
  const [mode, setMode] = useState('signIn');
  const fadeAnim = new Animated.Value(1);

  const switchMode = (newMode) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setMode(newMode);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SafeSense: The highway toward safety</Text>
      <Animated.View style={[styles.authContainer, { opacity: fadeAnim }]}>
        {mode === 'signIn' && (
          <>
            <SignIn />
            <TouchableOpacity onPress={() => switchMode('signUp')}>
              <Text style={styles.switchText}>
                Don't have an account? <Text style={styles.underlineText}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
        {mode === 'signUp' && (
          <>
            <SignUp />
            <TouchableOpacity onPress={() => switchMode('signIn')}>
              <Text style={styles.switchText}>
                Already have an account? <Text style={styles.underlineText}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f4f4f8',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 50,
    color: '#264653', // Dark cyan
  },
  authContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  switchText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 1.5,
  },
  underlineText: {
    textDecorationLine: 'underline',
    fontWeight: '700',
    color: '#2a9d8f', // Same as button's background color for consistency
  },
});

export default AuthLandingScreen;
