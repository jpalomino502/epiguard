import React, { useState, useEffect } from 'react';
import { Bell, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ConfiguracionSection() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  useEffect(() => {
    if (Notification.permission === 'granted') {
      setNotificationsEnabled(true);
    } else if (Notification.permission === 'denied') {
      setNotificationsEnabled(false);
    } else {
      setNotificationsEnabled(false);
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationAccess(true);
      },
      () => {
        setLocationAccess(false);
      }
    );
  }, []);

  const handleToggleNotifications = () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false);
    } else {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          setNotificationsEnabled(true);
        } else {
          setNotificationsEnabled(false);
        }
      });
    }
  };

  const handleToggleLocationAccess = () => {
    if (locationAccess) {
      setLocationAccess(false);
    } else {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationAccess(true);
        },
        () => {
          setLocationAccess(false);
        }
      );
    }
  };

  return (
    <div className="space-y-8 max-w-md mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-gray-800">Configuración</h2>
      
      <motion.div
        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center space-x-3">
          <Bell className="text-gray-600 w-6 h-6" />
          <span className="text-lg text-gray-700 font-medium">Notificaciones</span>
        </div>
        <button
          onClick={handleToggleNotifications}
          className={`py-2 px-5 rounded-full text-sm font-medium transition duration-300 ${notificationsEnabled ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
        >
          {notificationsEnabled ? 'Activadas' : 'Desactivadas'}
        </button>
      </motion.div>
      
      <motion.div
        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center space-x-3">
          <MapPin className="text-gray-600 w-6 h-6" />
          <span className="text-lg text-gray-700 font-medium">Acceso a Ubicación</span>
        </div>
        <button
          onClick={handleToggleLocationAccess}
          className={`py-2 px-5 rounded-full text-sm font-medium transition duration-300 ${locationAccess ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
        >
          {locationAccess ? 'Activado' : 'Desactivado'}
        </button>
      </motion.div>

      <motion.div
        className="mt-6 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={handleLogout}
          className="py-3 px-8 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 flex items-center space-x-3"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-lg">Cerrar Sesión</span>
        </button>
      </motion.div>
    </div>
  );
}
