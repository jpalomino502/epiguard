import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import NavBar from '../components/common/NavBar';
import MapSection from '../components/sections/MapSection';
import AlertsSection from '../components/sections/AlertsSection';
import ReportSection from '../components/sections/ReportSection';
import ConfiguracionSection from '../components/sections/ConfiguracionSection';

export default function Home() {
  // Inicializar activeSection desde localStorage solo una vez
  const [activeSection, setActiveSection] = useState(() => {
    const savedSection = localStorage.getItem('activeSection');
    return savedSection || 'map'; // Valor predeterminado si no hay savedSection
  });

  const [alerts, setAlerts] = useState([]);

  // Usar useEffect para cargar el valor desde localStorage solo una vez (al montar)
  useEffect(() => {
    const savedSection = localStorage.getItem('activeSection');
    if (savedSection && savedSection !== activeSection) {
      setActiveSection(savedSection); // Solo actualiza si el valor es diferente
    }
  }, []); // Ejecuta solo una vez al montar el componente

  // Usar useEffect para guardar activeSection en localStorage solo cuando cambie
  useEffect(() => {
    if (activeSection) {
      localStorage.setItem('activeSection', activeSection); // Solo guarda en localStorage si activeSection tiene un valor válido
    }
  }, [activeSection]); // Solo ejecuta cuando activeSection cambie

  // Función para agregar alertas a la lista
  const addAlert = (alertMessage) => {
    setAlerts((prevAlerts) => [
      ...prevAlerts,
      { id: Date.now(), message: alertMessage },
    ]);
  };

  // Función para renderizar la sección activa
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
