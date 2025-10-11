// client/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api, { setToken, getToken, clearToken } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    setToken(res.token);
    const me = await api.me();
    setUser(me);
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  useEffect(()=> {
    (async ()=> {
      const token = getToken();
      if(token) {
        try {
          const me = await api.me();
          setUser(me);
        } catch (err) {
          clearToken();
        }
      }
      setLoading(false);
    })();
  },[]);

  return <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>{children}</AuthContext.Provider>;
};
