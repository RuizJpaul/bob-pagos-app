import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSession } from '../../context/SessionContext';

export default function Sidebar({ role }) {
  const { session, logout } = useSession();
  const navigate = useNavigate();

  const userLinks = [
    { to: '/user/dashboard', label: 'Dashboard', icon: '🏠' },
    { to: '/user/wallet', label: 'Mi Billetera', icon: '💼' },
    { to: '/user/subastas', label: 'Subastas', icon: '⚖️' },
    { to: '/user/recharge', label: 'Recargar Saldo', icon: '💳' }
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard Admin', icon: '📊' },
    { to: '/admin/movements', label: 'Movimientos', icon: '📑' },
    { to: '/admin/validate', label: 'Validar Pagos', icon: '✅' },
    { to: '/admin/auctions', label: 'Subastas', icon: '⚙️' },
    { to: '/admin/users', label: 'Usuarios', icon: '👥' }
  ];

  const items = role === 'ADMIN' ? adminLinks : userLinks;

  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/src/assets/logo.png" alt="logo" width={"70%"} />
      </div>

      <nav className="nav">
        {items.map(it => (
          <NavLink key={it.to} to={it.to} className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
            <span className="icon">{it.icon}</span>
            <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-mini">
          <div className="user-email">{session?.email}</div>
        </div>
      </div>
    </aside>
  );
}
