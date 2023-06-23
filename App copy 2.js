import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {  Button, Image, View, Platform, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Amplify,{Storage} from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);
export default function App() {
  const [image, setImage] = useState(null);
  const [type,setType] = useState(null);
  const [asset,setAsset] = useState(null);
  const[testv,setTestv] = useState(null);
  // display the progress of the upload
  const [progressText, setProgressText] = useState('');
  //help disable our buttons from performing any action while the image is getting uploaded
const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
   
  }, []);
  const fetchResourceFromURI = async uri => {
    const response = await fetch(uri);
    console.log(response);
    const blob = await response.blob();
    console.log("HelloHelloHelloHelloHelloHelloHelloHello");
    return blob;
  };

  // The upload function 
  const uploadFile = async (file) => {
    const img = await fetchImageUri(file.uri);
    return Storage.put(`my-image-filename${Math.random()}.jpg`,img, {
      level:'public',
      contentType:file.type,
      progressCallback(uploadProgress){
        console.log('PROGRESS--', uploadProgress.loaded + '/' + uploadProgress.total);
      }
    })
    .then((res) => {
      Storage.get(res.key)
      .then((result) => {
        console.log('RESULT --- ', result);
        let awsImageUri = result.substring(0,result.indexOf('?'))
        console.log('RESULT AFTER REMOVED URI --', awsImageUri)
        setIsLoading(false)
      })
      .catch(e => {
        console.log(e);
      })
    }).catch(e => {
      console.log(e);
    })
  }
  // selection of the image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });
    
      //console.log(result);
      setAsset(result.assets[0])
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setType(result.assets[0].type)
      // updated line
      setAsset(result.assets[0]);
      //console.log(asset)
    }

    


  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.button}>SELECT {asset ? 'ANOTHER' : ''} FILE</Text>
      </TouchableOpacity>
      {asset?.uri && <Image source={{ uri: asset.uri }} style={{ width: 200, height: 200 }} />}
      {asset && <Text >Here is the image type : {asset.type} and blob {testv} </Text>} 

      {asset ? (
        asset.type.split('/')[0] === 'image' ? (
          <Image
            style={styles.selectedImage}
            source={{uri: asset?.uri ?? ''}}
          />
        ) : (
          <Video
            style={styles.selectedImage}
            source={{uri: asset?.uri ?? ''}}
          />
        )
        ) : null}
      {asset && (
        <>
          <TouchableOpacity onPress={uploadFile(asset)}>
            <Text style={styles.button}>UPLOAD</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAsset(null)}>
            <Text style={styles.cancelButton}>Remove Selected Image</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 20,
    color: '#fff',
    backgroundColor: 'blue',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#fff',
    color: 'blue',
  },
  selectedImage: {
    width: 175,
    height: 200,
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});