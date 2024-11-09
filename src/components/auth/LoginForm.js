// src/components/auth/LoginForm.js
import React from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginForm({ formData, handleInputChange, handleSubmit, showPassword, setShowPassword, switchToRegister, switchToForgotPassword }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-6"
        >
          Iniciar Sesión
        </button>
        <div className="mt-4 text-center">
          <button type="button" onClick={switchToForgotPassword} className="text-blue-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        <div className="mt-4 text-center">
          ¿No tienes una cuenta?{' '}
          <button type="button" onClick={switchToRegister} className="text-blue-500 hover:underline">
            Regístrate
          </button>
        </div>
      </form>
    </>
  );
}
