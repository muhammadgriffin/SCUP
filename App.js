import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {  Button, Image, View, Platform, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Amplify, Storage} from 'aws-amplify';
import awsmobile from './src/aws-exports';

Amplify.configure(awsmobile);
export default function App() {
  const [image, setImage] = useState(null);
  const [type,setType] = useState(null);
  const [asset,setAsset] = useState(null);
  const[testv,setTestv] = useState(null);
  const [objectUris, setObjectUris] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
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
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = e => {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    return blob;
  };
  
  const fetchImageUrls = async () => {
    try {
      const { results } = await Storage.list('images/');
      console.log(results) // Replace 'photos/' with your desired prefix
      const urls = results.map(item => Storage.get(item.key));
      
      Promise.all(urls)
        .then(urls =>{ setImageUrls(urls); console.log("here are the urls",urls) })
        .catch(err => console.log('Error fetching image URLs:', err));
    } catch (err) {
      console.log('Error listing images:', err);
    }
  };
  
  const uploadResource = async () => {
    if (isLoading) return;
    setisLoading(true);
    const img = await fetchResourceFromURI(asset.uri);
    // Get the file extension from the image URI
    const extension = asset.uri.split('.').pop();
    // Set the key without any extension
    const key = `images/my-image-${Date.now()}.${extension}`;
    return Storage.put(key, img, {
      level: 'public',
      contentType: asset.type,
      progressCallback(uploadProgress) {
        setProgressText(
          `Progress: ${Math.round(
            (uploadProgress.loaded / uploadProgress.total) * 100,
          )} %`,
        );
        console.log(
          `Progress: ${uploadProgress.loaded}/${uploadProgress.total}`,
        );
      },
    })
      .then(res => {
        setProgressText('Upload Done: 100%');
        setAsset(null);
        setisLoading(false);
        Storage.get(res.key)
          .then(result => console.log(result))
          .catch(err => {
            setProgressText('Upload Error');
            console.log(err);
          });
      })
      .catch(err => {
        setisLoading(false);
        setProgressText('Upload Error');
        console.log(err);
      });
  };
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
      <TouchableOpacity onPress={fetchImageUrls}>
        <Text style={styles.button}>Display Images</Text>
      </TouchableOpacity>
      {asset?.uri && <Image source={{ uri: asset?.uri }} style={{ width: 200, height: 200 }} />}
      {asset && <Text >Here is the image type : {asset?.type} and blob {testv} </Text>} 

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
          <TouchableOpacity onPress={uploadResource}>
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