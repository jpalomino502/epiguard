import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, HeatmapLayer, Marker } from '@react-google-maps/api';
import { db, collection, getDocs, doc, setDoc } from '../../firebaseConfig';
import { query, where } from 'firebase/firestore'; 
import { useAuth } from '../../context/AuthContext';
import userIcon from '../../assets/user.svg';

const haversineDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

const groupNearbyZones = (heatmapData, proximityThreshold = 0.5) => {
  const groups = [];
  const visited = new Set();

  for (let i = 0; i < heatmapData.length; i++) {
    if (visited.has(i)) continue;

    const group = [heatmapData[i]];
    visited.add(i);

    for (let j = i + 1; j < heatmapData.length; j++) {
      if (visited.has(j)) continue;

      const distance = haversineDistance(
        group[0].location.lat(),
        group[0].location.lng(),
        heatmapData[j].location.lat(),
        heatmapData[j].location.lng()
      );

      if (distance <= proximityThreshold) {
        group.push(heatmapData[j]);
        visited.add(j);
      }
    }

    groups.push(group);
  }

  return groups;
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 7.1195,
  lng: -73.1198,
};

const options = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

export default function MapSection() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['visualization'],
  });

  const [heatmapData, setHeatmapData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const { user } = useAuth();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.warn('Error al obtener la ubicación del usuario', error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.log("La geolocalización no es compatible con este navegador.");
    }
  }, []);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reports'));
        const points = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            location: new window.google.maps.LatLng(data.location.lt, data.location.lg),
            name: data.name,
          };
        });
        setHeatmapData(points);
      } catch (error) {
        console.error('Error al obtener datos de Firestore:', error);
      }
    };

    if (isLoaded && window.google) {
      fetchHeatmapData();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (userLocation && heatmapData.length > 0) {
      const groupedZones = groupNearbyZones(heatmapData);

      groupedZones.forEach(async (group) => {
        const centerOfGroup = group.reduce(
          (acc, point) => {
            acc.lat += point.location.lat();
            acc.lng += point.location.lng();
            return acc;
          },
          { lat: 0, lng: 0 }
        );

        centerOfGroup.lat /= group.length;
        centerOfGroup.lng /= group.length;

        const distance = haversineDistance(userLocation.lat, userLocation.lng, centerOfGroup.lat, centerOfGroup.lng);
        const proximityThreshold = 0.5;

        if (distance < proximityThreshold) {
          const notificationsRef = collection(db, 'users', user.uid, 'notifications');
          const notificationQuery = query(notificationsRef, where('zoneId', '==', group[0].id));

          const querySnapshot = await getDocs(notificationQuery);

          if (querySnapshot.empty) {
            const notification = {
              zoneId: group[0].id,
              message: '¡Alerta de zona de calor!, Te estás acercando a una zona con altos picos de enfermedades. Toma precauciones.',
              timestamp: new Date(),
            };

            try {
              await setDoc(
                doc(db, 'users', user.uid, 'notifications', group[0].id),
                notification
              );
              console.log('Notification added for user');
            } catch (error) {
              console.error('Error adding notification:', error);
            }
          } else {
            console.log('Notification for this group already exists, skipping...');
          }
        }
      });
    }
  }, [userLocation, heatmapData, user]);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className="bg-gray-200 h-full rounded">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={18}
        options={options}
      >
        {heatmapData.length > 0 && (
          <HeatmapLayer data={heatmapData.map((point) => point.location)} />
        )}

        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: userIcon,
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
