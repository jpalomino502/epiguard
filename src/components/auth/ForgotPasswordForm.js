import React from 'react';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ForgotPasswordForm({
  formData, handleInputChange, handleSubmit, switchToLogin, error, successMessage
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
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

        <motion.button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-6"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Enviar instrucciones
        </motion.button>

        {error && (
          <motion.div
            className="mt-4 text-red-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            className="mt-4 text-green-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {successMessage}
          </motion.div>
        )}

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={switchToLogin}
            className="text-blue-500 hover:underline"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </form>
    </motion.div>
  );
}
