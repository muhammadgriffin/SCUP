import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Amplify, Storage } from 'aws-amplify';
import { Rekognition } from 'aws-sdk'; // Import Rekognition from AWS SDK
import awsmobile from './src/aws-exports';

Amplify.configure(awsmobile);

export default function App() {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(null);
  const [asset, setAsset] = useState(null);
  const [testv, setTestv] = useState(null);
  const [progressText, setProgressText] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [imageURIs, setImageURIs] = useState([]);
  const [detectedLabels, setDetectedLabels] = useState(null); // State to store detected labels

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
   
    fetchImageURIs(); // Call the function to fetch image URIs when the component mounts
  }, []);

  const fetchResourceFromURI = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadResource = async () => {
    if (isLoading) return;
    setisLoading(true);
    const img = await fetchResourceFromURI(asset.uri);
    return Storage.put(asset.uri, img, {
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });
    
    setAsset(result.assets[0])
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setType(result.assets[0].type)
    }
  };

  const fetchImageURIs = async () => {
    try {
      const imageKeys = await Storage.list('');
      const uris = await Promise.all(
        imageKeys.map(async (imageKey) => {
          const url = await Storage.get(imageKey.key);
          return url;
        })
      );
      setImageURIs(uris);
    } catch (error) {
      console.log('Error fetching image URIs:', error);
    }
  };

  // Function to detect objects using Amazon Rekognition
  const detectObjects = async (imageUri) => {
    try {
      const s3ImageUri = imageUri.replace('file://', ''); // Removing 'file://' prefix
      const params = {
        Image: {
          S3Object: {
            Bucket: 'testamplifyb472bf0bf1514b5d91a9c4837a9c74a2204156-dev', // Replace with your actual S3 bucket name
            Name: s3ImageUri, // The key (filename) of the image in S3 bucket
          },
        },
      };

      const rekognition = new Rekognition(); // Create a new Rekognition instance
      const result = await rekognition.detectLabels(params).promise();
      setDetectedLabels(result.Labels);
    } catch (error) {
      console.log('Error detecting objects:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.button}>SELECT {asset ? 'ANOTHER' : ''} FILE</Text>
      </TouchableOpacity>
      {asset?.uri && <Image source={{ uri: asset?.uri }} style={{ width: 200, height: 200 }} />}
      {asset && <Text>Here is the image type: {asset?.type} and blob {testv}</Text>}

      {asset ? (
        asset.type.split('/')[0] === 'image' ? (
          <Image
            style={styles.selectedImage}
            source={{ uri: asset?.uri ?? '' }}
          />
        ) : (
          <Video
            style={styles.selectedImage}
            source={{ uri: asset?.uri ?? '' }}
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

      {/* Display Image URIs */}
      <Text style={styles.label}>Image URIs in S3 Bucket:</Text>
      {imageURIs.map((uri, index) => (
        <Text key={index}>{uri}</Text>
      ))}

      {/* Display Detected Labels */}
      {detectedLabels && (
        <View>
          <Text style={styles.label}>Detected Labels:</Text>
          {detectedLabels.map((label, index) => (
            <Text key={index}>{label.Name}</Text>
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
