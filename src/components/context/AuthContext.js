import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Leer el estado de autenticación desde localStorage
  const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const [isAuthenticated, setIsAuthenticated] = useState(storedIsAuthenticated);
  const [user, setUser] = useState(storedUser);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    // Guardar el estado en localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData)); // Guarda los datos del usuario
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // Limpiar el estado en localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  // Usar useEffect para limpiar el estado cuando el usuario cierre sesión
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
