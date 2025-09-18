import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../context/SessionContext';

export default function Login(){
  const { loginVisual } = useSession();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    if(!email) return alert('Ingresa tu correo');
    loginVisual({ email, role });
    navigate(role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard');
  }

  return (
    <div className="login-hero">
      <div className="hero-left">
        <div>
          <img src="src/assets/logo.png" alt="Logo" />
        </div>
        <h1 className="hero-title">Sistema de Gestión</h1>
        <p className="hero-sub">Plataforma integral para la gestión de pagos, garantías y reembolsos en subastas industriales.</p>

        <div className="actions-hero">
          <button className="btn ghost" onClick={()=>{setRole('USER'); setEmail('demo.user@bob.com'); loginVisual({ email:'demo.user@bob.com', role:'USER' }); navigate('/user/dashboard'); }}>Ver Demo Cliente</button>
          <button className="btn" onClick={()=>{setRole('ADMIN'); setEmail('demo.admin@bob.com'); loginVisual({ email:'demo.admin@bob.com', role:'ADMIN' }); navigate('/admin/dashboard'); }}>Ver Demo Admin</button>
        </div>

        <div className="or">— o ingresa con tu correo —</div>
      </div>

      <div className="hero-right">
        <div className="auth-card">
          <h3>Acceder</h3>
          <form onSubmit={handleSubmit} className="form">
            <label className="label">Correo</label>
            <input className="input" type="email" placeholder="tu@empresa.com" value={email} onChange={e=>setEmail(e.target.value)} required />
            <label className="label">Entrar como</label>
            <div className="role-select">
              <label><input type="radio" name="role" value="USER" checked={role==='USER'} onChange={()=>setRole('USER')} /> Usuario</label>
              <label><input type="radio" name="role" value="ADMIN" checked={role==='ADMIN'} onChange={()=>setRole('ADMIN')} /> Admin</label>
            </div>
            <button className="btn primary" type="submit">Ingresar</button>
            <p className="muted note">Este login es visual — los datos son de demostración.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
