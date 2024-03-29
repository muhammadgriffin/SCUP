import React, { useState, useEffect } from 'react';
import {  Button, Image, View, Platform, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Amplify, Storage} from 'aws-amplify';
import awsmobile from './src/aws-exports';
import ImageSlider from './ImageSlider';

Amplify.configure(awsmobile);

export default function UploadDisplay ({navigation}) {
  const [image, setImage] = useState(null);
  const [type,setType] = useState(null);
  const [asset,setAsset] = useState(null);
  const[testv,setTestv] = useState(null);
  const [objectUris, setObjectUris] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [labels, setLabels] = useState([]);
  const [boxed,setBoxed]= useState(null);
  // display the progress of the upload
  const [progressText, setProgressText] = useState('');
  //help disable our buttons from performing any action while the image is getting uploaded
const [isLoading, setisLoading] = useState(false);
useEffect(() => {
  (async () => {
    if (Platform.OS !== 'web') {
      const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (galleryStatus !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }

      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        alert('Sorry, we need camera permissions to capture photos!');
      }
    }
  })();
}, []);
// The following returns a blob from an uri  
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
// Lists the images from s3 storage  
  const listImages = async () => {
    try {
      const { results } = await Storage.list('images/',{pageSize: 1000, level: 'public'});
      console.log(results) // Replace 'photos/' with your desired prefix
      const urls = results.map(item => Storage.get(item.key));
      
      Promise.all(urls)
        .then(urls =>{ setImageUrls(urls); /*console.log("here are the urls",urls)*/ })
        .catch(err => console.log('Error fetching image URLs:', err));
    } catch (err) {
      console.log('Error listing images:', err);
    }
  };
// List boxed images
const listBoxedImages = async () => {
  try {
    const { results } = await Storage.list('boxed_images/',{pageSize: 1000, level: 'public'});
    console.log(results) // Replace 'photos/' with your desired prefix
    const urls = results.map(item => Storage.get(item.key));
    
    Promise.all(urls)
      .then(urls =>{ setImageUrls(urls); /*console.log("here are the urls",urls)*/ })
      .catch(err => console.log('Error fetching image URLs:', err));
  } catch (err) {
    console.log('Error listing images:', err);
  }
};
// uploads a selected image to S3  
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

    
      if (!result.canceled) {
        setImage(result.uri);
        setType(result.type);
        setAsset(result);
      }
    };
    // take photo function
    const takePhoto = async () => {
      let result = await ImagePicker.launchCameraAsync({
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
  
      
        if (!result.canceled) {
          setImage(result.uri);
          setType(result.type);
          setAsset(result);
        }

  };
// Object detection logic

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.button}>SELECT {asset ? 'ANOTHER' : ''} FILE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={takePhoto}>
        <Text style={styles.button}>TAKE PHOTO</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={listImages}>
        <Text style={styles.button}>Display Images</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={listBoxedImages}>
        <Text style={styles.button}>Display Boxed Images</Text>
      </TouchableOpacity>
      {asset?.uri && <Image source={{ uri: asset?.uri }} style={{ width: 200, height: 200 }} />}
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
      {imageUrls && <ImageSlider imageUrls={imageUrls} />}
      {labels.length > 0 && (
        <View style={styles.labelsContainer}>
          {labels.map((label, index) => (
            <Text key={index} style={styles.label}>
              {label.name}
            </Text>
          ))}
        </View>
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
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },  labelsContainer: {
    marginTop: 10,
    height : 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});
