import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/authContext';

/* pages */
import Login from './pages/Login';
import ClientDashboard from './pages/cliente/Dashboard';
import ClientAuctions from './pages/cliente/auctions';
import ClientAuctionDetail from './pages/cliente/AuctionDetail';
import ClientPayments from './pages/cliente/Payments';
import ClientTransactions from './pages/cliente/Transactions';

import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminAuctions from './pages/admin/Auctions';
import AdminTransactions from './pages/admin/Transactions';

function PrivateRoute({ children, role }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* cliente */}
      <Route path="/cliente/dashboard" element={<PrivateRoute role={"USER"}><ClientDashboard/></PrivateRoute>} />
      <Route path="/cliente/auctions" element={<PrivateRoute role={"USER"}><ClientAuctions/></PrivateRoute>} />
      <Route path="/cliente/auctions/:id" element={<PrivateRoute role={"USER"}><ClientAuctionDetail/></PrivateRoute>} />
      <Route path="/cliente/payments" element={<PrivateRoute role={"USER"}><ClientPayments/></PrivateRoute>} />
      <Route path="/cliente/transactions" element={<PrivateRoute role={"USER"}><ClientTransactions/></PrivateRoute>} />

      {/* admin */}
      <Route path="/admin/dashboard" element={<PrivateRoute role={"ADMIN"}><AdminDashboard/></PrivateRoute>} />
      <Route path="/admin/users" element={<PrivateRoute role={"ADMIN"}><AdminUsers/></PrivateRoute>} />
      <Route path="/admin/auctions" element={<PrivateRoute role={"ADMIN"}><AdminAuctions/></PrivateRoute>} />
      <Route path="/admin/transactions" element={<PrivateRoute role={"ADMIN"}><AdminTransactions/></PrivateRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
