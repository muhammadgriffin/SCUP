import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import VerificationScreen from './components/VerificationScreen';
import HomeScreen from './HomeScreen';
import UploadDisplay from './Upload_Display';
import MapScreen from './MapScreen';
import ProfileScreen from './components/ProfileScreen';  // Import your ProfileScreen component
import AuthLandingScreen from './components/AuthLandingScreen';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useAuth } from './components/AuthContext';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppStack = createDrawerNavigator();  // Use DrawerNavigator for AppStack

export default function MainNavigation() {
  const { isAuthenticated, isAnonymous } = useAuth();

  const AppContent = () => {
    return (
      <AppStack.Navigator initialRouteName="Profile">
        {/* <AppStack.Screen name="Home" component={HomeScreen} />
        <AppStack.Screen name="UploadDisplay" component={UploadDisplay} /> */}
        <AppStack.Screen name="MapScreen" component={MapScreen} />
        <AppStack.Screen name="Profile" component={ProfileScreen} />
      </AppStack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        isAnonymous ? (
          // Optional: You can add a different flow or components for anonymous users if needed.
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
