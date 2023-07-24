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
  // display the progress of the upload
  const [progressText, setProgressText] = useState('');
  //help disable our buttons from performing any action while the image is getting uploaded
const [isLoading, setisLoading] = useState(false);
const [images, setImages] = useState([]); // Store images from S3 bucket
const [imageIndex, setImageIndex] = useState(0); // For tracking the current image index
  
useEffect(() => {
  (async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  })();
  fetchImagesFromS3(); // Fetch images when the app loads or whenever you want to update the slider
}, []);

  const fetchResourceFromURI = async uri => {
    const response = await fetch(uri);
    //console.log(response);
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

    // New function to fetch images from S3 bucket
    const fetchImagesFromS3 = async () => {
      try {
        const imageKeys = await Storage.list('');
        const imageUrls = await Promise.all(
          imageKeys.map(async (key) => {
            const url = await Storage.get(key.key);
            return url;
          })
        );
        setImages(imageUrls);
      } catch (error) {
        console.log('Error fetching images from S3:', error);
      }
    };
  return (
    <View style={styles.container}>
      {/* Image Slider */}
      {images.length > 0 && (
        <ImageSlider
          images={images}
          currentImageEmitter={(index) => setImageIndex(index)} // Track the current image index
          customSlide={({ index, item, style, width }) => (
            // Customize the slider's individual image display here if needed
            <View key={index} style={{ flex: 1 }}>
              <Image source={{ uri: item }} style={{ width: width, flex: 1 }} />
            </View>
          )}
          sliderBoxHeight={200}
          currentImage={imageIndex} // Set the current image index
        />
      )}

      {/* Selected Image */}
      {asset?.uri && <Image source={{ uri: asset?.uri }} style={{ width: 200, height: 200 }} />}
      {asset && <Text>Here is the image type : {asset?.type} and blob {testv} </Text>}

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

      {/* Buttons */}
      {asset && (
        <>
          <TouchableOpacity onPress={uploadResource} disabled={isLoading}>
            <Text style={styles.button}>UPLOAD</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAsset(null)} disabled={isLoading}>
            <Text style={styles.cancelButton}>Remove Selected Image</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Progress */}
      {isLoading && <Text>{progressText}</Text>}
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