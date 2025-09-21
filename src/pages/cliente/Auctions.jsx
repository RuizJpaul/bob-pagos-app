import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { apiFetch } from '../../services/api';
import { Link } from 'react-router-dom';

export default function Auctions() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    apiFetch('/auctions').then(res => {
      const arr = res.auctions || res;
      setAuctions(arr);
    }).catch(err => console.error(err));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <Navbar />
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Subastas disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auctions.map(a => (
              <div key={a.id} className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-gray-600">{a.description}</p>
                <div className="mt-3">
                  <Link to={`/cliente/auctions/${a.id}`} className="px-3 py-1 bg-teal-600 text-white rounded">Ver</Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
