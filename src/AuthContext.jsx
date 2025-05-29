import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api.js';

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const savedToken = localStorage.getItem('tokenAnswerly');
  if (savedToken && savedToken !== 'undefined' && savedToken !== 'null') {
    setToken(savedToken);
    fetchUserDetails(savedToken);
  } else {
    localStorage.removeItem('tokenAnswerly');
  }
}, []);


  const fetchUserDetails = async (authToken) => {
    try {
      const res = await API.get('/auth/user', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUserDetails(res.data);
    } catch (err) {
      console.error('Failed to fetch user', err);
      logout(); // auto-logout on error
    }
  };

  const setTokenAndStore = (newToken) => {
    setToken(newToken);
    localStorage.setItem('tokenAnswerly', newToken);
    fetchUserDetails(newToken);
  };

  const logout = () => {
    setToken(null);
    setUserDetails(null);
    localStorage.removeItem('tokenAnswerly');
    navigate('/');
  };

  const value = {
    token,
    userDetails,
    setToken: setTokenAndStore,
    setUserDetails, // optional if you want to update manually
    logout,
    refreshUser: () => fetchUserDetails(token),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
