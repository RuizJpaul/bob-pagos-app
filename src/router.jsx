import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ClienteDashboard from "./pages/cliente/Dashboard";
import Subastas from "./pages/cliente/Subastas";
import AuctionDetail from "./pages/cliente/AuctionDetail";
import Recargar from "./pages/cliente/Recargar";
import Reembolso from "./pages/cliente/Reembolso";
import AdminDashboard from "./pages/admin/Dashboard";
import Usuarios from "./pages/admin/Usuarios";
import AdminSubastas from "./pages/admin/Subastas";
import Movimientos from "./pages/admin/Movimientos";
import { useAuth } from "./hooks/useAuth";

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Cliente */}
      <Route
        path="/cliente/dashboard"
        element={
          user?.role === "USER" ? <ClienteDashboard /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/cliente/subastas"
        element={
          user?.role === "USER" ? <Subastas /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/cliente/subastas/:id"
        element={
          user?.role === "USER" ? <AuctionDetail /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/cliente/recargar"
        element={
          user?.role === "USER" ? <Recargar /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/cliente/reembolso"
        element={
          user?.role === "USER" ? <Reembolso /> : <Navigate to="/login" />
        }
      />

      {/* Admin */}
      <Route
        path="/admin/dashboard"
        element={
          user?.role === "ADMIN" ? <AdminDashboard /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/usuarios"
        element={
          user?.role === "ADMIN" ? <Usuarios /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/subastas"
        element={
          user?.role === "ADMIN" ? <AdminSubastas /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/movimientos"
        element={
          user?.role === "ADMIN" ? <Movimientos /> : <Navigate to="/login" />
        }
      />

      {/* default */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
