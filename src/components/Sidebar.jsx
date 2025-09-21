import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

export default function Sidebar() {
  const { user } = React.useContext(AuthContext);

  return (
    <aside className="w-64 bg-white h-screen fixed left-0 top-0 p-6 shadow">
      <div className="mb-6">
        <div className="text-2xl font-bold text-teal-700">BOB</div>
        <div className="text-sm text-gray-500">Subastas - Demo</div>
      </div>

      <nav className="space-y-2">
        {user?.role === 'ADMIN' ? (
          <>
            <Link to="/admin/dashboard" className="block p-2 rounded hover:bg-gray-100">Dashboard</Link>
            <Link to="/admin/users" className="block p-2 rounded hover:bg-gray-100">Usuarios</Link>
            <Link to="/admin/auctions" className="block p-2 rounded hover:bg-gray-100">Subastas</Link>
            <Link to="/admin/transactions" className="block p-2 rounded hover:bg-gray-100">Movimientos</Link>
          </>
        ) : (
          <>
            <Link to="/cliente/dashboard" className="block p-2 rounded hover:bg-gray-100">Dashboard</Link>
            <Link to="/cliente/auctions" className="block p-2 rounded hover:bg-gray-100">Subastas</Link>
            <Link to="/cliente/payments" className="block p-2 rounded hover:bg-gray-100">Pagos</Link>
            <Link to="/cliente/transactions" className="block p-2 rounded hover:bg-gray-100">Transacciones</Link>
          </>
        )}
      </nav>
    </aside>
  );
}
