import React, { useState } from 'react';
import { useSession } from '../../context/SessionContext';
import request from '../../api/client';

const BANKS = [
  { id:'bcp', label:'BCP - Banco de Crédito' },
  { id:'bbva', label:'BBVA' },
  { id:'scotiabank', label:'Scotiabank' }
];

export default function RechargePage(){
  const { session } = useSession();
  const [bank, setBank] = useState(BANKS[0].id);
  const [targetAccount, setTargetAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    if(!amount||!reference) return alert('Completa monto y referencia');
    const fd = new FormData();
    fd.append('userId', session.userId);
    fd.append('amount', amount.toString());
    fd.append('reference', reference);
    fd.append('bank', bank);
    fd.append('targetAccount', targetAccount);
    try {
      setLoading(true);
      await request('/payments', { method:'POST', body: fd });
      alert('Comprobante enviado. Pendiente de validación.');
      setAmount(''); setReference(''); setTargetAccount('');
    } catch(err){ console.error(err); alert('Error: '+(err.payload?.message||err.message)); }
    finally{ setLoading(false); }
  }

  return (
    <div>
      <div className="page-header"><h1>Recargar Saldo</h1><p className="muted">Transfiere a las cuentas de Bob y sube tu comprobante</p></div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label className="label">Banco destino</label>
          <select className="input" value={bank} onChange={e=>setBank(e.target.value)}>{BANKS.map(b=> <option key={b.id} value={b.id}>{b.label}</option>)}</select>

          <label className="label">Número de cuenta</label>
          <input className="input" value={targetAccount} onChange={e=>setTargetAccount(e.target.value)} />

          <label className="label">Monto (USD)</label>
          <input className="input" value={amount} onChange={e=>setAmount(e.target.value)} />

          <label className="label">Número de operación</label>
          <input className="input" value={reference} onChange={e=>setReference(e.target.value)} />

          <label className="label">Comprobante (opcional)</label>
          <input className="input" type="file" name="receipt" />

          <div className="actions"><button className="btn primary" disabled={loading}>{loading ? 'Enviando...' : 'Enviar comprobante'}</button></div>
        </form>
      </div>
    </div>
  );
}
