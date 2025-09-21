import React, { useEffect, useState, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { apiFetch } from '../../services/api';
import { AuthContext } from '../../contexts/authContext';

export default function Transactions(){
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!user) return;
    apiFetch(`/transactions/user/${user.id}`).then(res => {
      setTransactions(res.transactions || res);
    }).catch(()=>{});
  }, [user]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <Navbar />
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Mis transacciones</h2>
          <div className="space-y-3">
            {transactions.map(t => (
              <div key={t.id} className="bg-white rounded p-3 shadow">
                <div className="flex justify-between">
                  <div>{t.type}</div>
                  <div>${Number(t.amount).toFixed(2)}</div>
                </div>
                <div className="text-xs text-gray-500">{new Date(t.createdAt).toLocaleString()}</div>
              </div>
            ))}
            {transactions.length===0 && <div className="text-sm text-gray-500">Sin transacciones</div>}
          </div>
        </main>
      </div>
    </div>
  );
}
