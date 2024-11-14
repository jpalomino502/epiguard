// src/components/auth/ForgotPasswordForm.js
import React from 'react';
import { Mail } from 'lucide-react';

export default function ForgotPasswordForm({ formData, handleInputChange, handleSubmit, switchToLogin }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-6"
        >
          Enviar instrucciones
        </button>
        <div className="mt-4 text-center">
          <button type="button" onClick={switchToLogin} className="text-blue-500 hover:underline">
            Volver al inicio de sesión
          </button>
        </div>
      </form>
    </>
  );
}
