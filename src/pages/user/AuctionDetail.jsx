import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuction } from '../../api/auctions.api';
import { useSession } from '../../context/SessionContext';

export default function AuctionDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const { session } = useSession();
  const [auction, setAuction] = useState(null);

  useEffect(()=>{ load(); }, [id]);

  async function load(){
    try { const data = await getAuction(id); setAuction(data); } catch(e){ console.error(e); }
  }

  if(!auction) return <div>Loading...</div>;

  // Assume backend returns winnerId or isWinner flag for demo
  const isWinner = auction.winnerId === session.userId || auction.isWinner;

  return (
    <div>
      <div className="page-header"><h1>{auction.title}</h1><p className="muted">{auction.description}</p></div>

      <div className="card">
        <p><strong>Estado:</strong> {auction.status}</p>
        <p><strong>Fin:</strong> {new Date(auction.endAt).toLocaleString()}</p>
      </div>

      <div className="card">
        <h3>Actividad</h3>
        {auction.bids?.length ? (
          <table className="table">
            <thead><tr><th>User</th><th>Monto</th><th>Fecha</th></tr></thead>
            <tbody>{auction.bids.map(b => (
              <tr key={b.id}><td>{b.userId}</td><td>{b.amount}</td><td>{new Date(b.createdAt).toLocaleString()}</td></tr>
            ))}</tbody>
          </table>
        ) : <div className="muted">Sin pujas</div>}
      </div>

      <div className="actions">
        <button className="btn" onClick={()=>navigate('/user/subastas')}>Volver</button>
        {isWinner && <button className="btn primary" onClick={()=>alert('Redirigir a formulario de pago (pendiente)')}>Pagar garantía</button>}
      </div>
    </div>
  );
}
