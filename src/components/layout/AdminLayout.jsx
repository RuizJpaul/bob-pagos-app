import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function AdminLayout(){
  return (
    <div className="app-shell">
      <Sidebar role="ADMIN"/>
      <div className="main-area">
        <Navbar role="ADMIN"/>
        <main className="content"><Outlet/></main>
      </div>
    </div>
  );
}
