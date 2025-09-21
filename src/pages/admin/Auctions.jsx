import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { apiFetch } from '../../services/api';

export default function AdminAuctions(){
  const [auctions, setAuctions] = useState([]);

  useEffect(()=> {
    apiFetch('/auctions').then(res => setAuctions(res.auctions || res)).catch(()=>{});
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <Navbar />
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Subastas</h2>
          <div className="space-y-3">
            {auctions.map(a => (
              <div key={a.id} className="bg-white p-4 rounded shadow flex justify-between">
                <div>
                  <div className="font-semibold">{a.title}</div>
                  <div className="text-sm text-gray-500">{a.status} — {new Date(a.startAt).toLocaleString()}</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded bg-green-500 text-white">Habilitar</button>
                  <button className="px-3 py-1 rounded bg-yellow-500 text-white">Deshabilitar</button>
                  <button className="px-3 py-1 rounded bg-gray-200">Ver estado</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
