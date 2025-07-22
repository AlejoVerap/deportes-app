import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RutaPrivada = ({ adminOnly }) => {
  const token = localStorage.getItem('token');
  let rol = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      rol = payload.rol;
    } catch {}
  }
  const location = useLocation();
  if (!token) return <Navigate to="/login" state={{ from: location }} replace />;
  if (adminOnly && rol !== 'admin' && rol !== 'superadmin') return <Navigate to="/usuario" replace />;
  return <Outlet />;
};

export default RutaPrivada;
