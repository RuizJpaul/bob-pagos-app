import React, { createContext, useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('bob_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) localStorage.setItem('bob_user', JSON.stringify(user));
    else localStorage.removeItem('bob_user');
  }, [user]);

  async function login(email) {
    // call backend route exactly: POST /api/auth/login
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
    // backend returns { user }
    const u = res.user || res;
    setUser(u);
    return u;
  }

  function logout() {
    setUser(null);
    navigate('/'); // back to login
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
