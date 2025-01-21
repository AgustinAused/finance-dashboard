'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { verifyToken } from '@/api/AuthApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const response = await verifyToken();
      setIsLoggedIn(response.isLoggedIn);
    };
    checkSession();
  }, []);

  const logoutUser = async () => {
    setIsLoggedIn(false);
  };

  const loginUser = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
