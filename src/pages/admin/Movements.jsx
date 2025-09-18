import React from 'react';
import { Link } from 'react-router-dom';

export default function Movements(){
  const types = ['DEPOSIT_GUARANTEE','REFUND','PENALTY','APPLY_PURCHASE'];
  return (
    <div>
      <div className="page-header"><h1>Movimientos</h1><p className="muted">Filtra y verifica movimientos</p></div>
      <div className="card">
        <ul className="movements-list">
          {types.map(t => (
            <li key={t} className="movement-row">
              <div>{t}</div>
              <div><Link className="btn small" to="/admin/validate">Verificar</Link></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
