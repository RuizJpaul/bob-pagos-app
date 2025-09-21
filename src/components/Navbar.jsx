import React from 'react';
import { AuthContext } from '../contexts/authContext';

export default function Navbar() {
  const { user, logout } = React.useContext(AuthContext);

  return (
    <div className="bg-white shadow p-4 flex items-center justify-between">
      <div className="text-gray-600">BOB Subastas</div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="font-semibold">{user?.name || user?.email}</div>
          <div className="text-xs text-gray-500">{user?.role}</div>
        </div>
        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Cerrar Sesión</button>
      </div>
    </div>
  );
}
