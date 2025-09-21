import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { apiFetch } from '../../services/api';

export default function AdminTransactions(){
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    apiFetch('/transactions').then(res => setTransactions(res.transactions || res)).catch(()=>{});
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <Navbar />
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Movimientos</h2>
          <div className="space-y-3">
            {transactions.map(t => (
              <div key={t.id} className="bg-white p-3 rounded shadow">
                <div className="flex justify-between">
                  <div>{t.type}</div>
                  <div>${Number(t.amount).toFixed(2)}</div>
                </div>
                <div className="text-xs text-gray-500">{new Date(t.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
