import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
  // State for isAuthenticated and userType
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');

  // Load authentication state from local storage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true);
    }

    const storedUserType = localStorage.getItem('userType');
    if (storedUserType && storedToken) {
      setUserType(storedUserType);
    }
  }, []);

  // Function to set isAuthenticated and userType and store in local storage
  const setAuth = (isAuth, type = '', token = '') => {
    setIsAuthenticated(isAuth);
    if (isAuth) {
      localStorage.setItem('token', token);
      setUserType(type);
      localStorage.setItem('userType', type);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
    }
  };

  // Context value
  const contextValue = {
    isAuthenticated,
    userType,
    setAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
