import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, HeatmapLayer, Marker } from '@react-google-maps/api';
import { db, collection, getDocs } from '../../firebaseConfig';
import userIcon from '../../assets/user.svg';

const MAP_LIBRARIES = ['visualization', 'geometry'];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 7.1195,
  lng: -73.1198,
};

const PROXIMITY_RADIUS = 500;

export default function MapSection({ addAlert }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: MAP_LIBRARIES,
  });

  const [heatmapData, setHeatmapData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [alertedLocations, setAlertedLocations] = useState({}); // Usar un objeto para un mejor control

  useEffect(() => {
    // Limpiar el localStorage cada vez que se recarga la página
    localStorage.removeItem('alertedLocations'); // Esto elimina las alertas almacenadas
  }, []); // Solo se ejecuta una vez al montar el componente

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setUserLocation(location);
          setCenter(location);
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

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    if (userLocation && heatmapData.length > 0 && window.google && window.google.maps.geometry) {
      heatmapData.forEach((point) => {
        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
          point
        );

        const pointKey = `${point.lat()}-${point.lng()}`;

        // Solo mostrar alerta si no se ha mostrado antes para esta ubicación
        if (distance < PROXIMITY_RADIUS && !alertedLocations[pointKey]) {
          const alertMessage = "Estás cerca de una zona de calor de epidemia";

          if (Notification.permission === 'granted') {
            new Notification(alertMessage);
          }

          addAlert(alertMessage);

          // Almacenamos las ubicaciones alertadas en el estado y en localStorage
          const newAlertedLocations = { ...alertedLocations, [pointKey]: true };
          setAlertedLocations(newAlertedLocations);

          // Opcionalmente, puedes guardar las ubicaciones alertadas en localStorage aquí si lo deseas
          localStorage.setItem('alertedLocations', JSON.stringify(newAlertedLocations));
        }
      });
    }
  }, [userLocation, heatmapData, alertedLocations, addAlert]);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className="bg-gray-200 h-full rounded">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={18}
        options={{ zoomControl: true, streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
      >
        {heatmapData.length > 0 && <HeatmapLayer data={heatmapData} />}
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
