import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function UserLayout(){
  return (
    <div className="app-shell">
      <Sidebar role="USER"/>
      <div className="main-area">
        <Navbar role="USER"/>
        <main className="content"><Outlet/></main>
      </div>
    </div>
  );
}
