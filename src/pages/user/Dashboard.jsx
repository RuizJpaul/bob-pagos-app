import React, { useEffect, useState } from 'react';
import { useSession } from '../../context/SessionContext';
import { getAccount } from '../../api/account.api';

export default function UserDashboard(){
  const { session } = useSession();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ if(session) load(); }, [session]);

  async function load(){
    setLoading(true);
    try {
      const data = await getAccount(session.userId);
      setAccount(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  const total = account ? parseFloat(account.balance) : 0;
  const locked = account ? parseFloat(account.locked) : 0;
  const available = (total - locked).toFixed(2);
  const percent = total > 0 ? Math.round((available / total) * 100) : 0;

  return (
    <div>
      <div className="card wallet-card">
        <div className="wallet-left">
          <div className="wallet-title">Mi Billetera</div>
          <div className="wallet-total">${total.toFixed(2)}</div>
          <div className="wallet-row">
            <div><small className="muted">Disponible</small><div className="wallet-value">${available}</div></div>
            <div><small className="muted">Retenido</small><div className="wallet-value">${locked.toFixed(2)}</div></div>
          </div>

          <div className="progress">
            <div className="progress-bar" style={{width: `${percent}%`}}></div>
          </div>
        </div>

        <div className="wallet-right">
          <div className="muted">Actualizado: {new Date().toLocaleString()}</div>
          <button className="btn small">Ir a Subastas</button>
        </div>
      </div>

      <div className="card">
        <h3>Movimientos recientes</h3>
        <table className="table">
          <thead><tr><th>Fecha</th><th>Tipo</th><th>Monto</th><th>Nota</th></tr></thead>
          <tbody>
            {account?.transactions?.length ? account.transactions.map(tx => (
              <tr key={tx.id}>
                <td>{new Date(tx.createdAt).toLocaleString()}</td>
                <td>{tx.type}</td>
                <td>{tx.direction === 'CREDIT' ? '+' : '-'} ${tx.amount}</td>
                <td>{tx.note || '-'}</td>
              </tr>
            )) : <tr><td colSpan="4">No hay movimientos</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
