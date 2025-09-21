import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { apiFetch } from '../../services/api';

export default function Users(){
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiFetch('/users').then(res => setUsers(res.users || res)).catch(()=>{});
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <Navbar />
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {users.map(u => (
              <div key={u.id} className="bg-white p-4 rounded shadow">
                <div className="font-semibold">{u.name} — {u.email}</div>
                <div className="text-sm text-gray-500">Rol: {u.role}</div>
                <div className="text-sm text-gray-500">Balance: ${Number(u.account?.balance || 0).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
