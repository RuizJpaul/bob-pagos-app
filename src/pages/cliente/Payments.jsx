import React, { useState, useContext, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { apiFetch } from '../../services/api';
import { AuthContext } from '../../contexts/authContext';

const BANKS = [
  { name: 'Bank of Peru', account: 'USD-000-111-222' },
  { name: 'Global Bank', account: 'USD-333-444-555' },
  { name: 'Interbank', account: 'USD-777-888-999' }
];

export default function Payments(){
  const { user } = React.useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [bank, setBank] = useState(BANKS[0].name);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    apiFetch('/payments').then(res => {
      setPayments(res.payments || res);
    }).catch(()=>{});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await apiFetch('/payments', { method: 'POST', body: JSON.stringify({ userId: user.id, amount, reference: `REC-${Date.now()}` }) });
      alert('Pago enviado. Pendiente validación.');
      setAmount('');
      // refresh
      const res = await apiFetch('/payments');
      setPayments(res.payments || res);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <Navbar />
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Recargar / Pagos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">Enviar pago (Transferencia)</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <label className="block text-sm">Banco</label>
                <select value={bank} onChange={e=>setBank(e.target.value)} className="w-full p-2 border rounded">
                  {BANKS.map(b => <option key={b.name} value={b.name}>{b.name} — {b.account}</option>)}
                </select>

                <label className="block text-sm">Monto (USD)</label>
                <input value={amount} onChange={e=>setAmount(e.target.value)} className="w-full p-2 border rounded" />

                <button className="py-2 px-4 bg-teal-600 text-white rounded">Enviar</button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">Historial de pagos</h3>
              <ul className="space-y-2">
                {payments.map(p => (
                  <li key={p.id} className="p-2 border rounded">
                    <div className="flex justify-between">
                      <div>{p.reference || '—'}</div>
                      <div>${Number(p.amount).toFixed(2)}</div>
                    </div>
                    <div className="text-xs text-gray-500">Estado: {p.status}</div>
                  </li>
                ))}
                {payments.length===0 && <div className="text-sm text-gray-500">Sin pagos</div>}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
