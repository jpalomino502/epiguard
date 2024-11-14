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

  useEffect(() => {
    if (!sessionStorage.getItem('pageReloaded')) {
      localStorage.removeItem('alertedLocations');
      sessionStorage.setItem('pageReloaded', 'true');
    }
  }, []);

  // Almacena la sección activa en el localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('activeSection', activeSection);
  }, [activeSection]);

  // Función de alerta optimizada, evita duplicados
  const addAlert = useCallback((alertMessage) => {
    setAlerts((prevAlerts) => {
      // Evitar duplicados comprobando si el mensaje ya existe
      const exists = prevAlerts.some(alert => alert.message === alertMessage);
      if (!exists) {
        const newAlert = { id: Date.now(), message: alertMessage };
        console.log("Alerta añadida:", newAlert);
        return [...prevAlerts, newAlert];
      }
      return prevAlerts;
    });
  }, []);

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
