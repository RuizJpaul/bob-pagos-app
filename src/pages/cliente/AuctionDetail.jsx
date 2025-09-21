import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { apiFetch } from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function AuctionDetail(){
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [amount, setAmount] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    apiFetch(`/auctions/${id}`).then(res => {
      const a = res.auction || res;
      setAuction(a);
    }).catch(err => console.error(err));
  }, [id]);

  // backend doesn't provide puja endpoint in your file set; if needed it can be added.
  // For demo we show details and a "pay guarantee" placeholder that redirects to payments.
  function handlePayGuarantee() {
    nav('/cliente/payments');
  }

  if (!auction) return <div className="p-6">Cargando...</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <Navbar />
        <main className="p-6">
          <h2 className="text-2xl font-bold">{auction.title}</h2>
          <p className="text-gray-700 mt-2">{auction.description}</p>
          <div className="mt-4">
            <div className="text-sm text-gray-500">Status: {auction.status}</div>
            <div className="mt-4">
              <button onClick={handlePayGuarantee} className="px-4 py-2 rounded bg-yellow-400">Pagar garantía (ir a pagos)</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
