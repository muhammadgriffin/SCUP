import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import SignOutButton from './components/SignOutHandle';

export default function HomeScreen ({navigation}){
  
  const navigateToImageUploader = () => {
    navigation.navigate('UploadDisplay');
  };

  const navigateToMapScreen = () => {
    navigation.navigate('MapScreen');
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to OurApp!</Text>
      <TouchableOpacity style={styles.customButton} onPress={navigateToImageUploader}>
        <Text style={styles.buttonText}>Go To Upload</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.customButton} onPress={navigateToMapScreen}>
        <Text style={styles.buttonText}>Go To Maps Screen</Text>
      </TouchableOpacity>
      <SignOutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f8', // A light background color
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 40,
    color: '#264653', // Dark cyan
  },
  customButton: {
    backgroundColor: '#2a9d8f', // Greenish teal
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10, // Space between the buttons
    width: '100%', // Make the button expand to full available width
    alignItems: 'center', // Center the text inside the button
  },
  buttonText: {
    color: '#fff', // White color for the button text
    fontSize: 18,
    fontWeight: '600',
  },
});

