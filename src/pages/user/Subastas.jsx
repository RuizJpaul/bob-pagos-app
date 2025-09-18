import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listAuctions } from '../../api/auctions.api';

export default function Subastas(){
  const [auctions, setAuctions] = useState([]);
  useEffect(()=>{ load(); }, []);

  async function load(){
    try {
      const data = await listAuctions();
      setAuctions(data || []);
    } catch(e){ console.error(e); alert('Error'); }
  }

  return (
    <div>
      <div className="page-header"><h1>Subastas</h1><p className="muted">Subastas activas y próximas</p></div>
      <div className="grid cards">
        {auctions.length ? auctions.map(a => (
          <div className="card auction-card" key={a.id}>
            <div>
              <h4>{a.title}</h4>
              <div className="muted">Cierra: {new Date(a.endAt).toLocaleString()}</div>
            </div>
            <div className="card-actions">
              <Link to={`/user/subastas/${a.id}`} className="btn">Ver</Link>
            </div>
          </div>
        )) : <div>No hay subastas</div>}
      </div>
    </div>
  );
}
