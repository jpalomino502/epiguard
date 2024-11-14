import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/common/Header';
import NavBar from '../components/common/NavBar';
import MapSection from '../components/sections/MapSection';
import AlertsSection from '../components/sections/AlertsSection';
import ReportSection from '../components/sections/ReportSection';
import ConfiguracionSection from '../components/sections/ConfiguracionSection';

export default function Home() {
  const [activeSection, setActiveSection] = useState(() => {
    const savedSection = localStorage.getItem('activeSection');
    return savedSection || 'map';
  });

  const [alerts, setAlerts] = useState([]);

  // Este useEffect limpia el localStorage y las alertas al recargar la página o cambiar de sección
  useEffect(() => {
    if (!sessionStorage.getItem('pageReloaded')) {
      localStorage.removeItem('alertedLocations');  // Limpiar alertas guardadas
      sessionStorage.setItem('pageReloaded', 'true');
      console.log("alertedLocations limpiado");
    }
  }, []);

  // Guardar la sección activa en localStorage
  useEffect(() => {
    localStorage.setItem('activeSection', activeSection);
  }, [activeSection]);

  // Función para añadir nuevas alertas
  const addAlert = useCallback((alertMessage) => {
    setAlerts((prevAlerts) => {
      // Verifica si el mensaje ya existe en la lista de alertas
      const exists = prevAlerts.some(alert => alert.message === alertMessage);
      if (!exists) {
        // Si no existe, agrega la nueva alerta
        const newAlert = { id: Date.now(), message: alertMessage };
        console.log("Alerta añadida:", newAlert);
        return [...prevAlerts, newAlert];
      } else {
        // Si la alerta ya existe, no hace nada
        console.log("Alerta ya existe, no se añade.");
        return prevAlerts;
      }
    });
  }, []);

  // Función que renderiza la sección activa
  const renderSection = () => {
    switch (activeSection) {
      case 'map':
        return <MapSection addAlert={addAlert} />;
      case 'alerts':
        return <AlertsSection alerts={alerts} />;
      case 'report':
        return <ReportSection />;
      case 'configuracion':
        return <ConfiguracionSection />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow overflow-y-auto">
        {renderSection()}
      </main>
      <NavBar activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  );
}
