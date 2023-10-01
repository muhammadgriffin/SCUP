import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import AddFormModal from './components/AddFormModal'; // Adjust the path accordingly

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [watcher, setWatcher] = useState(null);
  // Adding form variables
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const startLocationTracking = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Location permission denied");
        return;
      }
      
      const locationWatcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 10, // Gets updates every 10 meters.
          timeInterval: 1000,   // or every 1 second
        },
        location => {
          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            speed: location.coords.speed || 0
          });
        }
      );

      setWatcher(locationWatcher);
    };

    startLocationTracking();

    return () => {
      if (watcher) {
        watcher.remove(); // Stop watching location
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={currentLocation && {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.010,
          longitudeDelta: 0.010,
        }}
      >
        {currentLocation && (
          <Marker coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }} />
        )}
      </MapView>
        <View style={styles.speedContainer}>
          <Text style={styles.speedText}>{currentLocation ? `${currentLocation.speed} m/s` : 'Speed not available'}</Text>
        </View>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.addButtonText}>Report</Text>
          </TouchableOpacity>
        </View>
        <AddFormModal location={currentLocation} visible={modalVisible} onClose={() => setModalVisible(false)} />

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  speedContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 8,
  },
  speedText: {
    color: 'white',
    fontSize: 18,
  },
  addButtonContainer: {
    position: 'absolute',
    top: 5,
    right: 16,
  },
  addButton: {
      backgroundColor: '#2196F3',
      padding: 10,
      borderRadius: 50,
      elevation: 2, // for Android
      shadowColor: '#000', // for iOS
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
  },
});

export default MapScreen;
