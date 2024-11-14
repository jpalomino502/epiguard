import React from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginForm({
  formData, handleInputChange, handleSubmit, showPassword, setShowPassword, switchToRegister, switchToForgotPassword, error
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}  
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}  
            animate={{ opacity: 1, x: 0 }}    
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}  
            animate={{ opacity: 1, x: 0 }}  
            transition={{ duration: 0.3, delay: 0.1 }}
          >
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
          </motion.div>
        </div>

        <motion.button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-6"
          whileHover={{ scale: 1.05 }} 
          transition={{ duration: 0.2 }}
        >
          Iniciar Sesión
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

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={switchToForgotPassword}
            className="text-blue-500 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <div className="mt-4 text-center">
          ¿No tienes una cuenta?{' '}
          <button
            type="button"
            onClick={switchToRegister}
            className="text-blue-500 hover:underline"
          >
            Regístrate
          </button>
        </div>
      </form>
    </motion.div>
  );
}
