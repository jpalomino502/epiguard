import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, HeatmapLayer, Marker } from '@react-google-maps/api';
import { db, collection, getDocs } from '../../firebaseConfig';
import userIcon from '../../assets/user.svg';

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

  useEffect(() => {
    // Obtener la ubicación del usuario
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
    // Consultar puntos de calor desde Firestore
    const fetchHeatmapData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reports'));
        const points = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return new window.google.maps.LatLng(data.location.lt, data.location.lg);
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
          <HeatmapLayer data={heatmapData} />
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