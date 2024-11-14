import React from 'react';
import { Map, AlertTriangle, FileText, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NavBar({ activeSection, setActiveSection }) {
  return (
    <nav className="bg-white border-t p-1">
      <ul className="flex justify-around">
        <li>
          <motion.button
            onClick={() => setActiveSection('map')}
            className={`p-2 flex flex-col items-center rounded-lg ${activeSection === 'map' ? 'text-[#4A628A] bg-[#bfe4f8]' : 'text-gray-600'}`}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Map className="w-6 h-6" />
            <span className="text-xs">Mapa</span>
          </motion.button>
        </li>
        <li>
          <motion.button
            onClick={() => setActiveSection('alerts')}
            className={`p-2 flex flex-col items-center rounded-lg ${activeSection === 'alerts' ? 'text-[#4A628A] bg-[#bfe4f8]' : 'text-gray-600'}`}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <AlertTriangle className="w-6 h-6" />
            <span className="text-xs">Alertas</span>
          </motion.button>
        </li>
        <li>
          <motion.button
            onClick={() => setActiveSection('report')}
            className={`p-2 flex flex-col items-center rounded-lg ${activeSection === 'report' ? 'text-[#4A628A] bg-[#bfe4f8]' : 'text-gray-600'}`}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs">Reportar</span>
          </motion.button>
        </li>
        <li>
          <motion.button
            onClick={() => setActiveSection('configuracion')}
            className={`p-2 flex flex-col items-center rounded-lg ${activeSection === 'configuracion' ? 'text-[#4A628A] bg-[#bfe4f8]' : 'text-gray-600'}`}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs">Configuración</span>
          </motion.button>
        </li>
      </ul>
    </nav>
  );
}
