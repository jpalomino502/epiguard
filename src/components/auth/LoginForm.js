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

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>} {/* Mostrar el error */}

          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Iniciar sesión
          </button>

          <div className="mt-4">
            <button
              type="button"
              onClick={switchToForgotPassword}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              ¿Olvidaste tu contraseña?
            </button>
            <div className="text-sm mt-2">
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={switchToRegister}
                className="text-blue-500 hover:text-blue-600"
              >
                Regístrate aquí
              </button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
