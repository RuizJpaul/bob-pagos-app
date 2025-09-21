import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';
import { AuthContext } from '../contexts/authContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const demo = ['admin@bob.com','jean@bob.com','paul@bob.com'];

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      // res is { user }
      const u = res.user || res;
      setUser(u);
      // save to localStorage so apiFetch sends headers on next calls
      localStorage.setItem('bob_user', JSON.stringify(u));
      if (u.role === 'ADMIN') navigate('/admin/dashboard');
      else navigate('/cliente/dashboard');
    } catch (err) {
      alert(err.message || 'Error');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow p-8 w-full max-w-3xl grid grid-cols-2 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-teal-700">BOB Subastas</h1>
          <p className="text-gray-600 mt-2">Ingresa tu correo (demo)</p>
          <form className="mt-6" onSubmit={handleSubmit}>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="correo@ejemplo.com" className="w-full p-3 rounded border" />
            <button className="w-full mt-4 py-3 rounded bg-teal-600 text-white">Entrar</button>
          </form>
          <div className="mt-4 text-sm text-gray-500">
            Correos demo:
            <div className="mt-2">
              {demo.map(d => <button key={d} onClick={()=>setEmail(d)} className="text-xs underline mr-2">{d}</button>)}
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded">
          <h3 className="font-semibold">Demo</h3>
          <p className="text-sm text-gray-600 mt-2">Interfaz visual. Datos persistidos en backend.</p>
        </div>
      </div>
    </div>
  );
}
