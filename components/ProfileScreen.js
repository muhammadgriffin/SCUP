import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Image } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listUsers } from '../src/graphql/queries';
import { useAuth } from './AuthContext'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import bronzeIcon from '../assets/icons/bronze-medal.png';
import goldIcon from '../assets/icons/gold-medal.png';
import silverIcon from '../assets/icons/silver-medal.png';
import CryptoJS from 'crypto-js';

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const [isDataCollectionEnabled, setDataCollectionEnabled] = useState(true);
  const { isAnonymous } = useAuth(); 
  const bronzeBadge = 500;
  const silverBadge = 1000;
  const goldBadge = 2000;

  const hashEmail = email => {
    return CryptoJS.SHA256(email).toString(CryptoJS.enc.Hex);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isDataCollectionEnabled || isAnonymous) {
        return;
      }
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        const userEmail = authUser.attributes.email;

        const hashedEmail = hashEmail(userEmail); 

        const filter = { email: { eq: hashedEmail } };
        const result = await API.graphql(graphqlOperation(listUsers, { filter }));

        if (result.data.listUsers.items.length > 0) {
          const encryptedData = result.data.listUsers.items[0];

          // Call the decryption backend API
          const decryptedData = await fetch('https://xj2jcf3ua4.execute-api.us-east-1.amazonaws.com/dev', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              encryptedUserId: encryptedData.id
            })
          }).then(res => res.json());
          console.log("Decrypted Data:", decryptedData);
          setUserData({
            ...encryptedData,
            id: decryptedData.userId,
            email: userEmail  // Use the email from Cognito, not from DynamoDB since it's hashed there
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [isAnonymous, isDataCollectionEnabled]);

  if (isAnonymous) {
    return (
      <View style={styles.container}>
        <Icon name="incognito" size={50} color="#2a9d8f" style={styles.icon} />
        <Text style={styles.title}>Anonymous User</Text>
        <Text style={styles.infoText}>You are connected anonymously. Your data is secure.</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Loading...</Text>
      </View>
    );
  }

  let totalPoints;
  if (userData.points < bronzeBadge) {
    totalPoints = bronzeBadge;
  } else if (userData.points < silverBadge) {
    totalPoints = silverBadge;
  } else {
    totalPoints = goldBadge;
  }

  let BadgeIconComponent;
  let badgeName;
  
  if (userData.points < bronzeBadge) {
    BadgeIconComponent = <Icon name="egg-outline" size={60} color="#2a9d8f" style={styles.badgeIcon} />;
    badgeName = "Beginner";
  } else if (userData.points < silverBadge) {
    BadgeIconComponent = <Image source={bronzeIcon} style={styles.badgeIcon} />;
    badgeName = "Bronze";
  } else if (userData.points < goldBadge) {
    BadgeIconComponent = <Image source={silverIcon} style={styles.badgeIcon} />;
    badgeName = "Silver";
  } else {
    BadgeIconComponent = <Image source={goldIcon} style={styles.badgeIcon} />;
    badgeName = "Gold";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {BadgeIconComponent}
      <Text style={styles.badgeName}>{badgeName}</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${(userData.points / totalPoints) * 100}%` }]}></View>
      </View>
      <Text style={styles.pointsText}>{userData.points} / {totalPoints} points</Text>
      <Text style={styles.emailText}>Email: {userData.email}</Text>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f8fa',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 25,
    color: '#2a2a2a',
  },
  infoText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
  },
  progressBarContainer: {
    width: '90%',
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2a9d8f',
  },
  pointsText: {
    fontSize: 18,
    color: '#2a2a2a',
    marginBottom: 15,
  },
  emailText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#2a2a2a',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  toggleText: {
    fontSize: 18,
    color: '#555',
  },
  icon: {
    marginBottom: 15,
  },
  badgeIcon: {
    width: 60,  // for the PNG icons
    height: 60, // for the PNG icons
    resizeMode: 'contain', // for the PNG icons
    marginBottom: 10,
  },
  badgeName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2a2a2a',
    marginBottom: 20,
  },
});
