// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from './api.js';

// export const AuthContext = createContext(null);
// export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [userDetails, setUserDetails] = useState(null);
//   const navigate = useNavigate();

//   // Sync token/user from localStorage and refresh userDetails
//   useEffect(() => {
//     const savedToken = localStorage.getItem('tokenAnswerly');
//     const savedUser = localStorage.getItem('userAnswerly');

//     if (savedToken) {
//       setToken(savedToken);
//       refreshUser(savedToken); // ⬅ auto-refresh userDetails
//     }

//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       setUser(parsedUser);
//     }
//   }, []);

//   // Manual logout
//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     setUserDetails(null);
//     localStorage.removeItem('tokenAnswerly');
//     localStorage.removeItem('userAnswerly');
//     localStorage.removeItem('userDetailsAnswerly');
//     navigate('/login');
//   };

//   // Refresh userDetails from API and update state + localStorage
//   const refreshUser = async (existingToken) => {
//     try {
//       const res = await API.get('/auth/user', {
//         headers: {
//           Authorization: `Bearer ${existingToken || localStorage.getItem('tokenAnswerly')}`,
//         },
//       });
//       setUserDetails(res.data);
//       localStorage.setItem('userDetailsAnswerly', JSON.stringify(res.data));
//     } catch (err) {
//       console.error('Failed to refresh user', err);
//       logout(); // optional: force logout if token invalid
//     }
//   };

//   // Update localStorage whenever token/user changes
//   const setTokenAndStore = (newToken) => {
//     setToken(newToken);
//     localStorage.setItem('tokenAnswerly', newToken);
//   };

//   // const setUserAndStore = (newUser) => {
//   //   setUser(newUser);
//   //   localStorage.setItem('userAnswerly', JSON.stringify(newUser));
//   // };

//   const value = {
//     token,
//     user,
//     userDetails,
//     setToken: setTokenAndStore,
//     // setUser: setUserAndStore,
//     setUserDetails,
//     logout,
//     refreshUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }





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
    // Clean up any invalid token
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
    navigate('/login');
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
