// ProfileScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  // Fetch user data here using Amplify or directly from Cognito

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Name: John Doe</Text> {/* Replace with actual data */}
      <Text>Email: john.doe@example.com</Text> {/* Replace with actual data */}
      {/* Add more fields as required */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#264653',
  },
});
