import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listUsers } from '../src/graphql/queries';
import { useAuth } from './AuthContext'; // Import the useAuth hook
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the Icon component

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const { isAnonymous } = useAuth(); // Get the isAnonymous value

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAnonymous) { 
          // If the user is anonymous, skip the fetching part
          return;
        }
        
        const authUser = await Auth.currentAuthenticatedUser();
        const userEmail = authUser.attributes.email;

        const filter = { email: { eq: userEmail } };
        const result = await API.graphql(graphqlOperation(listUsers, { filter }));

        if (result.data.listUsers.items.length > 0) {
          setUserData(result.data.listUsers.items[0]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [isAnonymous]);

  if (isAnonymous) {
    return (
      <View style={styles.container}>
        <Icon name="incognito" size={50} color="#000" />
        <Text style={styles.title}>Anonymous User</Text>
        <Text>You are connected anonymously. Your data is secure.</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      <View style={styles.pointsCircle}>
        <Text style={styles.pointsText}>{userData.points}</Text>
      </View>
      
      <Text style={styles.emailText}>Email: {userData.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f8',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 40,
    color: '#264653',
  },
  pointsCircle: {
    width: 150,
    height: 150,
    borderRadius: 75, // Half of width and height to get a circle
    backgroundColor: '#2a9d8f',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // for Android shadow
  },
  pointsText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#f4f4f8',
  },
  emailText: {
    fontSize: 18,
    marginTop: 20,
    color: '#264653',
  },
});
