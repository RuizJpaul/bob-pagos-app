import React, { useState } from 'react';
import { useSession } from '../../context/SessionContext';
import request from '../../api/client';

export default function WalletPage(){
  const { session } = useSession();
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    if(!bank||!accountNumber||!amount) return alert('Completa los campos');
    try {
      setLoading(true);
      const payload = { amount: amount.toString(), reason: 'Reembolso', bank, accountNumber };
      await request(`/users/${session.userId}/refunds`, { method:'POST', body: payload });
      alert('Solicitud registrada. Se procesará en lote (miércoles).');
      setBank(''); setAccountNumber(''); setAmount('');
    } catch(err){ console.error(err); alert('Error: ' + (err.payload?.message || err.message)); }
    finally{ setLoading(false); }
  }

  return (
    <div>
      <div className="page-header"><h1>Reembolso</h1><p className="muted">Solicita devolución de tus fondos retenidos</p></div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label className="label">Banco</label>
          <input className="input" value={bank} onChange={e=>setBank(e.target.value)} placeholder="Ej: Bank of Peru" />
          <label className="label">Número de cuenta</label>
          <input className="input" value={accountNumber} onChange={e=>setAccountNumber(e.target.value)} placeholder="123456789" />
          <label className="label">Monto (USD)</label>
          <input className="input" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="400.00" />
          <div className="actions"><button className="btn primary" disabled={loading}>{loading? 'Enviando…' : 'Solicitar reembolso'}</button></div>
        </form>
      </div>
    </div>
  );
}
