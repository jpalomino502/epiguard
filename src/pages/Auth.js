// src/pages/AuthPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

export default function AuthPage() {
  const [authState, setAuthState] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const { isAuthenticated, login, register, resetPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/inicio');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authState === 'login') {
      await login(formData);
    } else if (authState === 'register') {
      await register(formData);
    } else if (authState === 'forgotPassword') {
      await resetPassword(formData.email);
    }
  };

  const renderForm = () => {
    switch (authState) {
      case 'login':
        return (
          <LoginForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            switchToRegister={() => setAuthState('register')}
            switchToForgotPassword={() => setAuthState('forgotPassword')}
          />
        );
      case 'register':
        return (
          <RegisterForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            switchToLogin={() => setAuthState('login')}
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPasswordForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            switchToLogin={() => setAuthState('login')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Bienvenido a Epiguard</h1>
        </div>
        {renderForm()}
      </div>
    </div>
  );
}