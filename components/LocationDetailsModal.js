import { Modal, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Storage } from 'aws-amplify';
import { CommonStyles } from '../styles/CommonStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  // Ensure you have this package installed
import React, { useState, useEffect } from 'react';
const LocationDetailsModal = ({ location, onClose }) => {
  const [s3ImageUrl, setS3ImageUrl] = useState(null);

  useEffect(() => {
    if (location && location.s3Key) {
      Storage.get(location.s3Key)
        .then(url => {
          setS3ImageUrl(url);
        })
        .catch(err => {
          console.error("Error getting image from S3:", err);
        });
    }
  }, [location]);
  const handleDeny = () => {
    // Handle the deny logic here
    // For now, we'll just close the modal
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={location !== null}
      onRequestClose={onClose}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.modalTitle}>Incident Details</Text>
          {s3ImageUrl && (
            <Image 
              source={{ uri: s3ImageUrl }}
              style={modalStyles.imageStyle}
            />
          )}
          <View style={modalStyles.infoSection}>
            <Icon name="alert-circle" size={20} color="#2a9d8f" />
            <Text style={modalStyles.label}>Type: {location?.imageType}</Text>
          </View>
          <Text style={modalStyles.description}>Description: {location?.description}</Text>
          
          <Text style={modalStyles.questionText}>Is the incident still there?</Text>

          <View style={modalStyles.buttonContainer}>
            <TouchableOpacity style={[CommonStyles.button, modalStyles.button]} onPress={onClose}>
              <Text style={CommonStyles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[CommonStyles.button, modalStyles.button, modalStyles.denyButton]} onPress={handleDeny}>
              <Text style={CommonStyles.buttonText}>Deny</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#264653',
    marginBottom: 15
  },
  imageStyle: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  label: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#2a9d8f'
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20
  },
  button: {
    flex: 1,
    marginHorizontal: 5
  },
  denyButton: {
    backgroundColor: '#e76f51'  // A different color for the deny button
  }
});

export default LocationDetailsModal;
