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
import { createImageMetadata } from '../src/graphql/mutations';

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
    try {
        const { status: existingStatus } = await ImagePicker.getCameraPermissionsAsync();

        if (existingStatus !== 'granted') {
            Alert.alert(
                'Permission required',
                'You need to grant camera permissions to use this feature.',
                [
                    { 
                        text: 'OK', 
                        onPress: async () => {
                            const { status } = await ImagePicker.requestCameraPermissionsAsync();
                            if (status !== 'granted') {
                                console.log("Permission not granted");
                                return;
                            } else {
                                console.log("permission is granted");
                                let result = await ImagePicker.launchCameraAsync({
                                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                                    allowsEditing: false,
                                    quality: 1,
                                });

                                if (!result.canceled) {
                                    setImage(result.assets[0].uri);
                                    setAsset(result.assets[0]);
                                }
                            }
                        }
                    },
                    { text: 'Cancel', onPress: () => console.log('Permission prompt cancelled by user'), style: 'cancel' }
                ],
                { cancelable: false } // This makes it non-cancelable outside of the alert box
            );
        } else {
            console.log("permission is already granted");
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false,
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setAsset(result.assets[0]);
            }
        }
    } catch (error) {
        console.error("Error when taking photo:", error);
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
        <Text style={styles.modalTitle}>Upload Situation Details</Text>
        <TouchableOpacity onPress={takePhoto} style={styles.button}>
                <Icon name="camera" size={20} color="#FFF" style={styles.iconLeft} />
                <Text style={styles.buttonText}>TAKE PHOTO</Text>
        </TouchableOpacity>
        {/* Description */}
        <Text style={styles.fieldTitle}>Description:</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Enter a brief description for the image"
          style={styles.inputField}
          multiline={true}
          numberOfLines={4}
        />

        {/* Location Data */}
        <Text style={styles.fieldTitle}>Location Data:</Text>
        <TextInput 
          value={latitude ? `Latitude: ${latitude.toString()}` : ''} 
          editable={false} 
          style={styles.inputField}
        />
        <TextInput 
          value={longitude ? `Longitude: ${longitude.toString()}` : ''} 
          editable={false} 
          style={styles.inputField}
        />

        {/* Image Type */}
        <Text style={styles.fieldTitle}>Image Type:</Text>
                <Picker
                    selectedValue={imageType}
                    onValueChange={(itemValue) => setImageType(itemValue)}
                    style={styles.inputField}
                >
                    <Picker.Item label="Select a Type..." value="" />
                    <Picker.Item label="Accident (Human)" value="Accident (Human)" />
                    <Picker.Item label="Accident (Material)" value="Accident (Material)" />
                    <Picker.Item label="Accident (Both)" value="Accident (Both)" />
                    <Picker.Item label="Obstacle (Potholes)" value="Obstacle (Potholes)" />
                    <Picker.Item label="Obstacle (Fallen Tree)" value="Obstacle (Fallen Tree)" />
                    <Picker.Item label="Climatic (Heavy Rain)" value="Climatic (Heavy Rain)" />
                    <Picker.Item label="Climatic (Fog)" value="Climatic (Fog)" />
                    <Picker.Item label="Climatic (Snow)" value="Climatic (Snow)" />
                </Picker>
                {asset?.uri && <Image source={{ uri: asset?.uri }} style={{ width: 100, height: 100, borderRadius: 20, marginTop: 10,marginBottom: 10 }} />}
                {asset && (
                    <TouchableOpacity onPress={() => setAsset(null)} style={styles.cancelButton}>
                        <Text style={styles.buttonText}>Remove Selected Image</Text>
                    </TouchableOpacity>
                )}
                {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
                {/*<ProgressBar progress={progress} width={200} color="#2196F3" style={styles.progressBar} />*/}
                {/*<View style={styles.progressBarContainer}>
                    <View style={{...styles.progressBarFill, width: `${progress * 100}%`}} />
                </View>*/}
  
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={{ ...styles.button, marginTop: 10, backgroundColor: '#E0E0E0' }}
                        onPress={onClose}
                    >
                        <Text style={{...styles.buttonText, color: '#000'}}>Close</Text>
                    </TouchableOpacity>
                    {asset && (
                        <TouchableOpacity onPress={uploadResource}  style={{ ...styles.button, marginTop: 10}}>
                            <Icon name="upload" size={20} color="#FFF" style={styles.iconLeft} />
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    )}
                </View>
                
                <Animated.View style={{ opacity: uploadSuccessOpacity, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <Icon name="check-circle" size={20} color="green" />
                    <Text style={{ color: 'green', marginLeft: 5 }}>Upload Successful!</Text>
                </Animated.View>
                <TouchableOpacity onPress={takePhoto}>
                <Icon name="camera" size={20} color="#FFF" style={styles.iconLeft} />
                <Text style={styles.buttonText}>TAKE PHOTO</Text>
            </TouchableOpacity>
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
      backgroundColor: 'rgba(0,0,0,0.5)',  // Adding a semi-transparent background
  },
  modalView: {
    width: '90%',  // Increased width to 90%
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
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

  modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: "#333",  // Dark gray for a softer look
  },
  inputField: {
      width: '100%',  // Making it full width
      borderColor: '#E0E0E0',
      borderWidth: 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
      marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
},
button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 5,
    width: '46%',  // give the button the ability to grow
    marginRight: 10,  // margin to provide spacing between the buttons
    justifyContent: 'center',
},
cancelButton: {
    backgroundColor: "#E94E77",
    padding: 12,
    borderRadius: 5,
    //flex: 1,  // give the button the ability to grow
    marginLeft: 10,  // margin to provide spacing between the buttons
    justifyContent: 'center',
},

  buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
  },
  iconLeft: {
      marginRight: 10,  // More spacing between the icon and text
  },
  fieldTitle: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
});


export default AddFormModal;
