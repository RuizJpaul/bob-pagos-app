import React, { useEffect, useState } from 'react';
import { listAuctions } from '../../api/auctions.api';
import request from '../../api/client';

export default function AdminDashboard(){
  const [stats, setStats] = useState({ guarantees:0, refunds:0, activeAuctions:0, users:0, pending:0 });

  useEffect(()=>{ load(); }, []);

  async function load(){
    try {
      const a = await listAuctions();
      // In absence of aggregated endpoints, do demo values
      setStats({
        guarantees: 45000,
        refunds: 12000,
        activeAuctions: a.filter(x=>x.status==='LIVE').length,
        users: 35,
        pending: 8
      });
    } catch(e){ console.error(e); }
  }

  return (
    <div>
      <div className="page-header"><h1>Dashboard Admin</h1><p className="muted">Panel operativo</p></div>

      <div className="grid admin-stats">
        <div className="card stat color-teal"><div className="label">Garantías Totales</div><div className="value">US${stats.guarantees.toLocaleString()}</div></div>
        <div className="card stat color-yellow"><div className="label">Reembolsos Totales</div><div className="value">US${stats.refunds.toLocaleString()}</div></div>
        <div className="card stat color-green"><div className="label">Subastas Activas</div><div className="value">{stats.activeAuctions}</div></div>
        <div className="card stat color-blue-wide"><div className="label">Usuarios Registrados</div><div className="value">{stats.users}</div></div>
        <div className="card stat color-red"><div className="label">Pagos Pendientes</div><div className="value">{stats.pending}</div></div>
      </div>

      <div className="card">
        <h3>Historial reciente</h3>
        <div className="muted">(Tabla con últimos movimientos — implementar fetch en backend)</div>
      </div>
    </div>
  );
}
