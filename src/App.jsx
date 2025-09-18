import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSession } from './context/SessionContext';

// Auth
import Login from './pages/auth/Login';

// User
import UserLayout from './components/layout/UserLayout';
import UserDashboard from './pages/user/Dashboard';
import WalletPage from './pages/user/WalletPage';
import Subastas from './pages/user/Subastas';
import AuctionDetail from './pages/user/AuctionDetail';
import RechargePage from './pages/user/Recharge';

// Admin
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import Movements from './pages/admin/Movements';
import ValidateMovements from './pages/admin/ValidateMovements';
import UsersPage from './pages/admin/Users';
import AdminAuctions from './pages/admin/Auctions';

function RequireSession({ children, role }) {
  const { session } = useSession();
  if (!session) return <Navigate to="/login" replace />;
  if (role && session.role !== role) {
    return <Navigate to={session.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard'} replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/user/*" element={
          <RequireSession role="USER"><UserLayout/></RequireSession>
        }>
          <Route index element={<UserDashboard/>} />
          <Route path="dashboard" element={<UserDashboard/>} />
          <Route path="wallet" element={<WalletPage/>} />
          <Route path="subastas" element={<Subastas/>} />
          <Route path="subastas/:id" element={<AuctionDetail/>} />
          <Route path="recharge" element={<RechargePage/>} />
        </Route>

        <Route path="/admin/*" element={
          <RequireSession role="ADMIN"><AdminLayout/></RequireSession>
        }>
          <Route index element={<AdminDashboard/>} />
          <Route path="dashboard" element={<AdminDashboard/>} />
          <Route path="movements" element={<Movements/>} />
          <Route path="validate" element={<ValidateMovements/>} />
          <Route path="users" element={<UsersPage/>} />
          <Route path="auctions" element={<AdminAuctions/>} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
