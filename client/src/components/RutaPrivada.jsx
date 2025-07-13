import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RutaPrivada = ({ adminOnly }) => {
  const token = localStorage.getItem('token');
  let rol = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      rol = payload.rol;
    } catch {}
  }
  if (!token) return <Navigate to="/login" replace />;
  if (adminOnly && rol !== 'admin') return <Navigate to="/admin/escenarios" replace />;
  return <Outlet />;
};

export default RutaPrivada;
