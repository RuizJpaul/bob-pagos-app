import React, { useEffect, useState, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../contexts/authContext';
import { apiFetch } from '../../services/api';

export default function ClientDashboard() {
  const { user } = useContext(AuthContext);
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // get users to find account (backend endpoint /api/users returns { users })
    apiFetch('/users').then(res => {
      const users = res.users || res;
      const me = users.find(u => u.email === user.email);
      if (me) {
        setAccount(me.account);
        apiFetch(`/transactions/user/${me.id}`).then(r => {
          setTransactions(r.transactions || r);
        }).catch(()=>{});
      }
    }).catch(()=>{});
  }, [user]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <Navbar />
        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2 bg-white rounded-2xl shadow p-6">
              <h2 className="text-2xl font-bold">Hola, {user?.name || user?.email}</h2>
              <p className="text-gray-500">Panel de usuario</p>

              <div className="mt-6 p-4 rounded-lg" style={{background: 'linear-gradient(90deg,#2c8a8930,#1f6b6920)'}}>
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm text-gray-100">Saldo Total</div>
                    <div className="text-3xl font-bold text-white">${account ? Number(account.balance).toFixed(2) : '0.00'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-100">Retenido</div>
                    <div className="text-xl font-semibold text-yellow-300">${account ? Number(account.locked).toFixed(2) : '0.00'}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold">Movimientos recientes</h3>
                <ul className="mt-3 space-y-2">
                  {transactions.slice(0,6).map(t => (
                    <li key={t.id} className="p-3 bg-gray-50 rounded">
                      <div className="flex justify-between">
                        <div>{t.type}</div>
                        <div>${Number(t.amount).toFixed(2)}</div>
                      </div>
                      <div className="text-xs text-gray-500">{new Date(t.createdAt).toLocaleString()}</div>
                    </li>
                  ))}
                  {transactions.length === 0 && <li className="text-sm text-gray-500">Sin movimientos</li>}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h4 className="font-semibold">Atajos</h4>
              <div className="mt-4 space-y-2">
                <a href="/cliente/auctions" className="block p-2 bg-gray-50 rounded">Subastas</a>
                <a href="/cliente/payments" className="block p-2 bg-gray-50 rounded">Pagos</a>
                <a href="/cliente/transactions" className="block p-2 bg-gray-50 rounded">Transacciones</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
