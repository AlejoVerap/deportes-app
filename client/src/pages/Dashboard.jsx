import React from 'react';
import { FaUserFriends, FaCalendarAlt, FaHistory } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="container mt-4" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 className="mb-4" style={{ color: '#2563eb', fontWeight: 700 }}>Panel de Administración</h2>
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <a href="/admin/usuarios" className="card shadow-lg border-0 h-100 text-decoration-none" style={{ borderRadius: 18, background: 'linear-gradient(135deg, #4f8cff 0%, #6ee7b7 100%)', color: '#fff', boxShadow: '0 2px 12px #4f8cff33' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 120 }}>
              <FaUserFriends size={38} style={{ marginBottom: 10 }} />
              <h5 className="card-title" style={{ fontWeight: 700 }}>Usuarios</h5>
              <p className="card-text" style={{ fontWeight: 500 }}>Gestiona los usuarios registrados.</p>
            </div>
          </a>
        </div>
        <div className="col-md-3 mb-3">
          <a href="/admin/escenarios" className="card shadow-lg border-0 h-100 text-decoration-none" style={{ borderRadius: 18, background: 'linear-gradient(135deg, #6ee7b7 0%, #4f8cff 100%)', color: '#fff', boxShadow: '0 2px 12px #4f8cff33' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 120 }}>
              <FaCalendarAlt size={38} style={{ marginBottom: 10 }} />
              <h5 className="card-title" style={{ fontWeight: 700 }}>Escenarios</h5>
              <p className="card-text" style={{ fontWeight: 500 }}>Administra los escenarios deportivos.</p>
            </div>
          </a>
        </div>
        <div className="col-md-3 mb-3">
          <a href="/admin/reservas" className="card shadow-lg border-0 h-100 text-decoration-none" style={{ borderRadius: 18, background: 'linear-gradient(135deg, #f87171 0%, #fbbf24 100%)', color: '#fff', boxShadow: '0 2px 12px #f8717133' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 120 }}>
              <FaHistory size={38} style={{ marginBottom: 10 }} />
              <h5 className="card-title" style={{ fontWeight: 700 }}>Reservas</h5>
              <p className="card-text" style={{ fontWeight: 500 }}>Gestiona todas las reservas.</p>
            </div>
          </a>
        </div>
        <div className="col-md-3 mb-3">
          <a href="/admin/reportes" className="card shadow-lg border-0 h-100 text-decoration-none" style={{ borderRadius: 18, background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)', color: '#fff', boxShadow: '0 2px 12px #6366f133' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 120 }}>
              <FaUserFriends size={38} style={{ marginBottom: 10 }} />
              <h5 className="card-title" style={{ fontWeight: 700 }}>Reportes</h5>
              <p className="card-text" style={{ fontWeight: 500 }}>Visualiza reportes y estadísticas.</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
