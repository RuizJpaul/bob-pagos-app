import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../contexts/authContext';

export default function AdminDashboard(){
  const { user } = React.useContext(AuthContext);
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Bienvenido, {user?.email}</p>
        </main>
      </div>
    </div>
  );
}
