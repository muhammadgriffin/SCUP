import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Importing this for drawer toggle
import SignOutButton from './components/SignOutHandle';

export default function HomeScreen({ navigation }) {

  // We'll use this for the drawer toggle
  const nav = useNavigation();

  const navigateToImageUploader = () => {
    navigation.navigate('UploadDisplay');
  };

  const navigateToMapScreen = () => {
    navigation.navigate('MapScreen');
  };

  return (
    <View style={styles.container}>
      
      {/* Adding the drawer toggle button here */}


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
    backgroundColor: '#f4f4f8',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 40,
    color: '#264653',
  },
  customButton: {
    backgroundColor: '#2a9d8f',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  drawerToggle: {
    position: 'absolute',  // Position it to the top left corner
    top: 40,
    left: 20,
  },
  drawerToggleText: {
    fontSize: 24,
  },
});
