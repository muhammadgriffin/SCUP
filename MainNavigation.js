import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import VerificationScreen from './components/VerificationScreen';
import HomeScreen from './HomeScreen';
import UploadDisplay from './Upload_Display';
import MapScreen from './MapScreen';
import ProfileScreen from './components/ProfileScreen';
import AuthLandingScreen from './components/AuthLandingScreen';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useAuth } from './components/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import LeaderboardScreen from "./components/LeaderBoardScreen"
import RewardsCenterScreen from './components/RewardsCenterScreen';
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppStack = createDrawerNavigator();

export default function MainNavigation() {
    const { isAuthenticated, isAnonymous, logout } = useAuth();

    const screenOptionsWithLogout = {
      headerRight: () => (
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Icon name="sign-out" size={18} color="#E53935" style={styles.logoutIcon} />
              <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
      ),
  };

  const AppContent = () => {
    return (
        <AppStack.Navigator initialRouteName="Profile" screenOptions={screenOptionsWithLogout}>
            <AppStack.Screen name="MapScreen" component={MapScreen} />
            <AppStack.Screen name="Profile" component={ProfileScreen} />
            <AppStack.Screen name="Leaderboard" component={LeaderboardScreen} />
            <AppStack.Screen name="RewardsCenter" component={RewardsCenterScreen} />
        </AppStack.Navigator>
    );
};

    return (
        <NavigationContainer>
            {isAuthenticated ? (
                isAnonymous ? (
                    <AppContent />
                ) : (
                    <AppContent />
                )
            ) : (
                <AuthStack.Navigator>
                    <AuthStack.Screen name="AuthLanding" component={AuthLandingScreen} options={{ headerShown: false }} />
                    <AuthStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                    <AuthStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                    <AuthStack.Screen name="Verification" component={VerificationScreen} options={{ headerShown: false }} />
                </AuthStack.Navigator>
            )}
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
  logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      backgroundColor: '#ffffff',  // White background
      borderColor: '#E53935',     // Red border
      borderWidth: 2,             // Width of the border
  },
  logoutIcon: {
      marginRight: 5,
  },
  logoutText: {
      color: '#E53935',  // Using red for the text to match the border
      fontWeight: 'bold',
  },
});

