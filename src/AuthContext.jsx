import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('tokenAnswerly');
    if (savedToken) {
      setToken(savedToken);
      // Optionally load user info from token or elsewhere
    }
  }, []);

  const value = { token, user, setToken, setUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
