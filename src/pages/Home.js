import React, { useState } from 'react'; 
import Header from '../components/common/Header';
import NavBar from '../components/common/NavBar';
import MapSection from '../components/sections/MapSection';
import AlertsSection from '../components/sections/AlertsSection';
import ReportSection from '../components/sections/ReportSection';
import ConfiguracionSection from '../components/sections/ConfiguracionSection';

export default function Home() {
  const [activeSection, setActiveSection] = useState('map');
  const renderSection = () => {
    switch (activeSection) {
      case 'map':
        return <MapSection />;
      case 'alerts':
        return <AlertsSection/>;
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
