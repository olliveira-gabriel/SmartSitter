import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- LÓGICA DE NOTIFICAÇÃO ---
  const [notification, setNotification] = useState({ message: '', type: '' });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };
  // --- FIM DA LÓGICA DE NOTIFICAÇÃO ---

  useEffect(() => {
    const tokenInStorage = localStorage.getItem('token');
    if (tokenInStorage) {
      try {
        const decodedUser = jwtDecode(tokenInStorage);
        if (decodedUser.exp * 1000 > Date.now()) {
          setToken(tokenInStorage);
          setUser(decodedUser);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const decodedUser = jwtDecode(newToken);
    setUser(decodedUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    token,
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    notification,
    showNotification,
    closeNotification,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};