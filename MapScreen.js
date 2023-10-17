import React, { useEffect, useState } from 'react';
import { Alert, Modal, TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AddFormModal from './components/AddFormModal';
import LocationDetailsModal from './components/LocationDetailsModal';
import { API, graphqlOperation } from 'aws-amplify';
import { listImageMetadata } from './src/graphql/queries';
import carAccidentIcon from './Icons/MapIcons/accident.png';
import treeIcon from './Icons/MapIcons/obstacle.png';
import { MaterialIcons } from '@expo/vector-icons';
import { Storage } from 'aws-amplify';

const CHECK_DISTANCE = 2000; // in meters, adjust as necessary

function haversineDistance(coords1, coords2) {
  const R = 6371e3; // Earth radius in meters
  const lat1Rad = coords1.latitude * (Math.PI/180);
  const lat2Rad = coords2.latitude * (Math.PI/180);
  const deltaLat = (coords2.latitude - coords1.latitude) * (Math.PI/180);
  const deltaLng = (coords2.longitude - coords1.longitude) * (Math.PI/180);

  const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}



const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [watcher, setWatcher] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [locations, setLocations] = useState([]);
  const [mapRegion, setMapRegion] = useState(null);
  const [alertedLocations, setAlertedLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    async function fetchImageLocations() {
      try {
        const imageMetadataData = await API.graphql(graphqlOperation(listImageMetadata));
        setLocations(imageMetadataData.data.listImageMetadata.items);
      } catch (error) {
        console.error("Error fetching image locations: ", error);
      }
    }
    fetchImageLocations();

    const startLocationTracking = async () => {
      const userResponse = await Alert.alert(
        'Location Permission',
        'We need access to your location only while you\'re using the app to show it on the map. Please grant permission.',
        [
          { text: 'OK', onPress: async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            setHasPermission(status === 'granted');

            if (status !== 'granted') {
              Alert.alert('Permission Denied', 'You need to grant location permissions to use this feature.');
              return;
            }

            const locationWatcher = await Location.watchPositionAsync(
              {
                accuracy: Location.Accuracy.BestForNavigation,
                distanceInterval: 10,
                timeInterval: 1000,
              },
              location => {
                setCurrentLocation({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  speed: location.coords.speed ? location.coords.speed * 3.6 : 0 // Convert m/s to km/h
                });
              }
            );

            setWatcher(locationWatcher);
          }},
          { text: 'Cancel', onPress: () => {} }
        ]
      );
    };

    startLocationTracking();

    return () => {
      if (watcher) {
        watcher.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {hasPermission ? (
        <MapView
          showsUserLocation={true}
          style={styles.map}
          onRegionChangeComplete={region => setMapRegion(region)}
          region={currentLocation && {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.010,
            longitudeDelta: 0.010,
          }}
        >
          {mapRegion && mapRegion.latitudeDelta < 0.03 && locations.map((location) => (
            <Marker 
              key={location.id}
              coordinate={{ 
                latitude: location.latitude, 
                longitude: location.longitude 
              }}
              onPress={() => setSelectedLocation(location)}
            >
              <Image 
                source={location.imageType === 'type1' ? carAccidentIcon : (location.imageType === 'Obstacle (Potholes)' ? treeIcon : null)}
                style={{ width: 24, height: 24 }}
              />
            </Marker>
          ))}
        </MapView>
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Location permissions are not granted.</Text>
      )}

      <View style={styles.speedContainer}>
        <Text style={styles.speedText}>{currentLocation ? `${currentLocation.speed.toFixed(2)} km/h` : 'Speed not available'}</Text>
      </View>

      <View style={styles.reportButtonContainer}>
        <TouchableOpacity 
          style={styles.reportButton} 
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <MaterialIcons name="report" size={24} color="white" />
          <Text style={styles.reportButtonText}>Report</Text>
        </TouchableOpacity>
      </View>

      <LocationDetailsModal 
        location={selectedLocation} 
        onClose={() => setSelectedLocation(null)} 
      />

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
  reportButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 16,
    backgroundColor: '#2196F3',
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  reportButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapScreen;
