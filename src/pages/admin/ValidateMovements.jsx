import React, { useEffect, useState } from 'react';
import { getPayments, validatePayment } from '../../api/payments.api';

export default function ValidateMovements(){
  const [payments, setPayments] = useState([]);

  useEffect(()=>{ load(); }, []);
  async function load(){
    try { const data = await getPayments('status=PENDING_VALIDATION'); setPayments(data || []); } catch(e){ console.error(e); }
  }

  async function handleAction(id, action){
    if(!confirm('Confirmar acción?')) return;
    try { await validatePayment(id, action); alert('Hecho'); load(); } catch(e){ console.error(e); alert('Error'); }
  }

  return (
    <div>
      <div className="page-header"><h1>Validar Movimientos</h1></div>
      <div className="card">
        <table className="table">
          <thead><tr><th>User</th><th>Auction</th><th>Monto</th><th>Ref</th><th>Acciones</th></tr></thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id}>
                <td>{p.userId}</td>
                <td>{p.auctionId || '-'}</td>
                <td>{p.amount}</td>
                <td>{p.reference}</td>
                <td>
                  <button className="btn small" onClick={()=>handleAction(p.id,'validate')}>Validar</button>
                  <button className="btn danger small" onClick={()=>handleAction(p.id,'reject')}>Rechazar</button>
                </td>
              </tr>
            ))}
            {!payments.length && <tr><td colSpan="5">No hay solicitudes</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
