import React, { useEffect, useState } from 'react';
import { listAuctions, getAuction } from '../../api/auctions.api';

export default function AdminAuctions(){
  const [auctions, setAuctions] = useState([]);
  useEffect(()=>{ load(); }, []);
  async function load(){
    try { const data = await listAuctions(); setAuctions(data || []); } catch(e){ console.error(e); }
  }

  return (
    <div>
      <div className="page-header"><h1>Subastas</h1></div>
      <div className="grid cards">
        {auctions.map(a => (
          <div key={a.id} className="card auction-card">
            <h4>{a.title}</h4>
            <div className="muted">Estado: {a.status}</div>
            <div className="card-actions">
              <button className="btn small">Habilitar</button>
              <button className="btn small">Deshabilitar</button>
              <button className="btn" onClick={async()=>{ const det = await getAuction(a.id); alert(JSON.stringify(det,null,2)); }}>Ver estado</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
