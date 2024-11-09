import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import NavBar from '../components/common/NavBar';
import MapSection from '../components/sections/MapSection';
import AlertsSection from '../components/sections/AlertsSection';
import ReportSection from '../components/sections/ReportSection';
import ConfiguracionSection from '../components/sections/ConfiguracionSection';

export default function Home() {
  const [activeSection, setActiveSection] = useState(() => {
    // Recuperamos el valor guardado en el localStorage, si existe
    const savedSection = localStorage.getItem('activeSection');
    return savedSection ? savedSection : 'map';  // Si no existe, usamos 'map' como valor predeterminado
  });
  const [symptoms, setSymptoms] = useState('');
  const [reports, setReports] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Guardar el estado de activeSection en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('activeSection', activeSection);
  }, [activeSection]);

  const handleSymptomReport = (e) => {
    e.preventDefault();
    const newReport = { id: Date.now(), symptoms, location: 'Ciudad Ejemplo' };
    setReports([...reports, newReport]);
    setSymptoms('');

    setTimeout(() => {
      if (symptoms.toLowerCase().includes('fiebre')) {
        setAlerts([...alerts, { id: Date.now(), message: 'Posible brote de gripe en tu área' }]);
      }
    }, 1000);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'map':
        return <MapSection />;
      case 'alerts':
        return <AlertsSection alerts={alerts} />;
      case 'report':
        return <ReportSection symptoms={symptoms} setSymptoms={setSymptoms} handleSymptomReport={handleSymptomReport} />;
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
