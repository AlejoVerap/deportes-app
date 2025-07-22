import React from 'react';
import { FaCalendarAlt, FaHistory, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div className="container mt-4" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 className="mb-4" style={{ color: '#2563eb', fontWeight: 700 }}>Panel de Usuario</h2>
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <Link to="/usuario/escenarios" className="card shadow-lg border-0 h-100 text-decoration-none" style={{ borderRadius: 18, background: 'linear-gradient(135deg, #6ee7b7 0%, #4f8cff 100%)', color: '#fff', boxShadow: '0 2px 12px #4f8cff33' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 120 }}>
              <FaMapMarkerAlt size={38} style={{ marginBottom: 10 }} />
              <h5 className="card-title" style={{ fontWeight: 700 }}>Escenarios</h5>
              <p className="card-text" style={{ fontWeight: 500 }}>Explora y reserva escenarios deportivos.</p>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-3">
          <Link to="/usuario/reservas-usuario" className="card shadow-lg border-0 h-100 text-decoration-none" style={{ borderRadius: 18, background: 'linear-gradient(135deg, #4f8cff 0%, #6ee7b7 100%)', color: '#fff', boxShadow: '0 2px 12px #4f8cff33' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 120 }}>
              <FaCalendarAlt size={38} style={{ marginBottom: 10 }} />
              <h5 className="card-title" style={{ fontWeight: 700 }}>Mis Reservas</h5>
              <p className="card-text" style={{ fontWeight: 500 }}>Gestiona tus reservas activas y pendientes.</p>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-3">
          <Link to="/usuario/historial" className="card shadow-lg border-0 h-100 text-decoration-none" style={{ borderRadius: 18, background: 'linear-gradient(135deg, #f87171 0%, #fbbf24 100%)', color: '#fff', boxShadow: '0 2px 12px #f8717133' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 120 }}>
              <FaHistory size={38} style={{ marginBottom: 10 }} />
              <h5 className="card-title" style={{ fontWeight: 700 }}>Historial</h5>
              <p className="card-text" style={{ fontWeight: 500 }}>Consulta y gestiona tu historial de reservas.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
