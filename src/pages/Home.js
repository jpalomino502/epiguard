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

  useEffect(() => {
    const savedSection = localStorage.getItem('activeSection');
    if (savedSection && savedSection !== activeSection) {
      setActiveSection(savedSection);
    }
  }, []);

  useEffect(() => {
    if (activeSection) {
      localStorage.setItem('activeSection', activeSection);
    }
  }, [activeSection]);

  // Modificamos addAlert para que esté memoizado y evite renderizados innecesarios
  const addAlert = useCallback((alertMessage) => {
    setAlerts((prevAlerts) => {
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
