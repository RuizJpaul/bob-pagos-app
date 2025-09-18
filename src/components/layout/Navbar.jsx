import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../../context/SessionContext';

export default function Navbar({ role }) {
  const { session, logout } = useSession();
  const userShortcuts = [
    { to: '/user/subastas', label: 'Subastas' },
    { to: '/user/recharge', label: 'Recargar Saldo' },
  ];
  const adminShortcuts = [
    { to: '/admin/validate', label: 'Validar Movimientos' },
  ];
  const shortcuts = role === 'ADMIN' ? adminShortcuts : userShortcuts;

  return (
    <header className="navbar" style={{
      backgroundColor: "#e6f2f1"
    }}>
      <div className="center">
        {shortcuts.map(s => <Link key={s.to} to={s.to} className="nav-short">{s.label}</Link>)}
      </div>

      <div className="right">
        <div className="user-info">
          <div className="name">{session?.name}</div>
        </div>
        <button className="btn small ghost" onClick={()=>logout()}>Cerrar sesión</button>
      </div>
    </header>
  );
}
