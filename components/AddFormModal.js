import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-native-progress';
import { ActivityIndicator, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Amplify, Storage, API, graphqlOperation } from 'aws-amplify';
import awsmobile from '../src/aws-exports';
import { createImageMetadata } from '../src/graphql/mutations';  // Adjust path based on your Amplify setup.

Amplify.configure(awsmobile);

const AddFormModal = ({ location, visible, onClose }) => {
  const [image, setImage] = useState(null);
  const [asset, setAsset] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [description, setDescription] = useState('');
  const [imageType, setImageType] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadSuccessOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (location) {
      setLatitude(location.latitude);
      setLongitude(location.longitude);
    }
  }, [location]);
  
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

  const saveMetadataToDB = async (s3Key) => {
    const metadata = {
        s3Key: s3Key,
        description: description,
        latitude: latitude,
        longitude: longitude,
        imageType: imageType
    };

    try {
        await API.graphql(graphqlOperation(createImageMetadata, { input: metadata }));
        console.log("Metadata saved successfully:", metadata);
    } catch (error) {
        console.log("Error saving metadata:", error);
    }
  }

  const uploadResource = async () => {
    if (!imageType) {
      Alert.alert("Error", "Please select an image type.");
      return;
    }
    if (isLoading) return;
    setisLoading(true);
    Animated.timing(uploadSuccessOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    const img = await fetchResourceFromURI(asset.uri);
    const extension = asset.uri.split('.').pop();
    const key = `images/my-image-${Date.now()}.${extension}`;

    return Storage.put(key, img, {
      level: 'public',
      contentType: asset.type,
      progressCallback(uploadProgress) {
        const calculatedProgress = uploadProgress.loaded / uploadProgress.total;
        setProgress(calculatedProgress);
    },
    })
      .then(res => {
        
        setProgressText('Upload Done: 100%');
        setAsset(null);
        setisLoading(false);

        setDescription('');
        setImageType('');
        Storage.get(res.key)
          .then(result => {
            setProgress(0);
            console.log(result);
            saveMetadataToDB(res.key);
            Animated.timing(uploadSuccessOpacity, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }).start();  // Save metadata to DynamoDB
          })
          .catch(err => {
            setProgress(0);
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

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setAsset(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setAsset(result.assets[0]);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={takePhoto} style={styles.button}>
            <Text style={styles.buttonText}>TAKE PHOTO</Text>
          </TouchableOpacity>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            style={styles.inputField}
          />
          <TextInput 
              value={latitude ? latitude.toString() : ''} 
              editable={false} 
              style={styles.inputField}
          />
          <TextInput 
              value={longitude ? longitude.toString() : ''} 
              editable={false} 
              style={styles.inputField}
          />
          <Picker
            selectedValue={imageType}
            onValueChange={(itemValue) => setImageType(itemValue)}
            style={styles.inputField}
          >
            <Picker.Item label="Select a Type..." value="" /> 
            <Picker.Item label="Type 1" value="type1" />
            <Picker.Item label="Type 2" value="type2" />
          </Picker>
          {asset?.uri && <Image source={{ uri: asset?.uri }} style={{ width: 200, height: 200, borderRadius: 20, marginTop: 10 }} />}
          {asset && (
            <TouchableOpacity onPress={() => setAsset(null)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Remove Selected Image</Text>
            </TouchableOpacity>
          )}
          {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
          <View style={styles.buttonRow}>
            
            <TouchableOpacity
              style={{ ...styles.button, marginTop: 10, backgroundColor: '#E0E0E0' }}
              onPress={onClose}
            >
              <Text style={{...styles.buttonText, color: '#000'}}>Close</Text>
            </TouchableOpacity>
            {asset && <TouchableOpacity onPress={uploadResource} style={styles.button}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>}
          </View>
          <Animated.View style={{ opacity: uploadSuccessOpacity, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Icon name="check-circle" size={20} color="green" />
              <Text style={{ color: 'green', marginLeft: 5 }}>Upload Successful!</Text>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 0,  // Add padding if necessary
      marginTop: 0,         // Add margin if necessary
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    inputField: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 5,
        width: 200,
    },
    button: {
        backgroundColor: "#2196F3",  // A blue shade, you can change this.
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
      },
      cancelButton: {
        backgroundColor: "#FF5733",  // A red shade for the cancel/remove button.
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
      },
      buttonText: {
        color: "#FFFFFF",  // White text color for better contrast.
        fontSize: 16,
        fontWeight: "600",
      },
});

export default AddFormModal;
