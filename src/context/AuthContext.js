import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return unsubscribe;
  }, []);

  const login = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw new Error(getFriendlyErrorMessage(error.code));
    }
  };

  const register = async ({ email, password, name }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
      });

    } catch (error) {
      console.error("Error al registrarse:", error);
      throw new Error(getFriendlyErrorMessage(error.code));
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return 'Correo de recuperación enviado. Revisa tu bandeja de entrada.';
    } catch (error) {
      console.error("Error al enviar correo de recuperación:", error);
      throw new Error(getFriendlyErrorMessage(error.code));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'El correo electrónico ingresado no es válido. Por favor, ingresa un correo válido.';
      case 'auth/user-disabled':
        return 'Tu cuenta ha sido desactivada. Contacta con soporte para más detalles.';
      case 'auth/user-not-found':
        return 'No se encontró una cuenta con ese correo electrónico.';
      case 'auth/wrong-password':
        return 'La contraseña ingresada es incorrecta. Intenta nuevamente.';
      case 'auth/email-already-in-use':
        return 'Este correo electrónico ya está en uso. Intenta con otro.';
      case 'auth/invalid-credential':
        return 'El correo electrónico o la contraseña no son válidos. Verifica e intenta de nuevo.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres. Intenta una contraseña más segura.';
      case 'auth/missing-email':
        return 'El correo electrónico es obligatorio. Por favor, ingrésalo.';
      case 'auth/too-many-requests':
        return 'Has intentado demasiadas veces. Por favor, espera unos minutos antes de intentarlo de nuevo.';
      default:
        return 'Ocurrió un error. Por favor, intenta nuevamente.';
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, resetPassword, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
