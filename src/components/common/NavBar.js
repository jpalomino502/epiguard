import React from 'react';
import { Map, AlertTriangle, FileText, Settings } from 'lucide-react';

export default function NavBar({ activeSection, setActiveSection }) {
  return (
    <nav className="bg-white border-t p-1">
      <ul className="flex justify-around">
        <li>
          <button
            onClick={() => setActiveSection('map')}
            className={`p-2 flex flex-col items-center rounded-lg ${activeSection === 'map' ? 'text-[#4A628A] bg-[#bfe4f8]' : 'text-gray-600'}`}
          >
            <Map className="w-6 h-6" />
            <span className="text-xs">Mapa</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection('alerts')}
            className={`p-2 flex flex-col items-center rounded-lg ${activeSection === 'alerts' ? 'text-[#4A628A] bg-[#bfe4f8]' : 'text-gray-600'}`}
          >
            <AlertTriangle className="w-6 h-6" />
            <span className="text-xs">Alertas</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection('report')}
            className={`p-2 flex flex-col items-center rounded-lg ${activeSection === 'report' ? 'text-[#4A628A] bg-[#bfe4f8]' : 'text-gray-600'}`}
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs">Reportar</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection('configuracion')}
            className={`p-2 flex flex-col items-center rounded-lg ${activeSection === 'configuracion' ? 'text-[#4A628A] bg-[#bfe4f8]' : 'text-gray-600'}`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs">Configuración</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
