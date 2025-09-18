import React, { createContext, useContext, useState, useEffect } from 'react';

const SessionContext = createContext();
export function useSession(){ return useContext(SessionContext); }

export function SessionProvider({ children }){
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bob_session')) || null; } catch { return null; }
  });

  useEffect(() => {
    localStorage.setItem('bob_session', JSON.stringify(session));
  }, [session]);

  // ahora login guarda directamente el email como id para conectar con backend
  const loginVisual = ({ email, role }) => {
    setSession({
      userId: email,               // email usado como identificador
      email,
      name: email.split('@')[0],   // "juan" de "juan@bob.com"
      role
    });
  };

  const logout = () => setSession(null);

  return (
    <SessionContext.Provider value={{ session, loginVisual, logout }}>
      {children}
    </SessionContext.Provider>
  );
}
