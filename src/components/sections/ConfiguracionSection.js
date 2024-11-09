import React, { useState } from 'react';
import { Bell, MapPin, LogOut } from 'lucide-react'; 
import { useAuth } from '../context/AuthContext'; // Importamos el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate

export default function ConfiguracionSection() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true);

  // Obtenemos las funciones de autenticación y la función de navegación
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Lógica para manejar el cierre de sesión
  const handleLogout = () => {
    logout(); // Desconectar al usuario
    navigate('/auth'); // Redirigir a la página de autenticación
  };

  const handleToggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
  const handleToggleLocationAccess = () => setLocationAccess(!locationAccess);

  return (
    <div className="space-y-8 max-w-md mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-gray-800">Configuración</h2>
      
      {/* Sección de Notificaciones */}
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
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
      </div>
      
      {/* Sección de Acceso a Ubicación */}
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
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
      </div>

      {/* Botón de Cerrar Sesión */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleLogout}
          className="py-3 px-8 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 flex items-center space-x-3"
        >
          <LogOut className="w-5 h-5" /> {/* Icono de LogOut */}
          <span className="text-lg">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}
