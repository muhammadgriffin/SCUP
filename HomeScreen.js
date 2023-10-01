import React from 'react';
import { View,Text ,Button, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

export default function HomeScreen ({navigation}){
  // const navigation = useNavigation();

  const navigateToImageUploader = () => {
    navigation.navigate('UploadDisplay');
  };

  const navigateToMapScreen = () => {
    navigation.navigate('MapScreen');
  };

  return (
    <View style={styles.container}>
      <Text>Hello This is Homescreen</Text>
      <Button title='Go To upload' onPress={navigateToImageUploader}/>
      <Button title='Go To Maps Screen' onPress={navigateToMapScreen}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

