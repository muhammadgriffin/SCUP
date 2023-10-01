import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageUploader from './ImageUploader';
import MapScreen from './MapScreen';
import HomeScreen from './HomeScreen';
const Stack = createNativeStackNavigator();

export default function ScreensNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Homescreen"
          component={HomeScreen}
          options={{ title: 'Home screen' }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ title: 'Map Screen' }}
        />
                <Stack.Screen
          name="Image Uploader"
          component={ImageUploader}
          options={{ title: 'Image Uploader' }}
        />
        <Stack.Screen
          name="ImageUploader"
          component={ImageUploader}
          options={{ title: 'Image Uploader' }}
        />
        
        {/* Add more screens here if needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
