import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, HeatmapLayer } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 19.4326, // Example: Mexico City
  lng: -99.1332, // Example: Mexico City
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

  useEffect(() => {
    if (isLoaded && window.google) {
      // Generating the heatmap data
      const outbreakPoints = [
        new window.google.maps.LatLng(19.4326, -99.1332),
        new window.google.maps.LatLng(19.4426, -99.1532),
        new window.google.maps.LatLng(19.4526, -99.1432),
      ];
      setHeatmapData(outbreakPoints);
    }
  }, [isLoaded]);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className="bg-gray-200 h-full rounded">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        options={options}
      >
        {heatmapData.length > 0 && (
          <HeatmapLayer data={heatmapData} />
        )}
      </GoogleMap>
    </div>
  );
}
