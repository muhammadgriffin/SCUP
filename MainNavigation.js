// MainNavigation.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerificationScreen from './components/VerificationScreen';
import HomeScreen from './HomeScreen';
import UploadDisplay from './Upload_Display';
import MapScreen from './MapScreen';
import AuthLandingScreen from './components/AuthLandingScreen';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useAuth } from './components/AuthContext';
import { AuthProvider } from './components/AuthContext'; // or wherever the file is located
import MainNavigation from './MainNavigation';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  const { isAuthenticated } = useAuth();

  return (
        <NavigationContainer>
            {isAuthenticated ? (
                <AppStack.Navigator>
                    <AppStack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} />
                    <AppStack.Screen name="UploadDisplay" component={UploadDisplay} />
                    <AppStack.Screen name="MapScreen" component={MapScreen} />
                </AppStack.Navigator>
            ) : (
                <AuthStack.Navigator>
                    <AuthStack.Screen name="AuthLanding" component={AuthLandingScreen} options={{ title: 'Authentication' }} />
                    <AuthStack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
                    <AuthStack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In' }} />
                    <AuthStack.Screen name="Verification" component={VerificationScreen} options={{ title: 'Verify Account' }} />
                </AuthStack.Navigator>
            )}
        </NavigationContainer>
  );
}
