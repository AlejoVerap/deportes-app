import React from 'react';
import { FaUserFriends, FaCalendarAlt, FaHistory } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="container mt-4" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-lg border-0 h-100" style={{ borderRadius: 18, background: 'linear-gradient(135deg, #4f8cff 0%, #6ee7b7 100%)', color: '#fff', boxShadow: '0 2px 12px #4f8cff33' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 120 }}>
              <FaCalendarAlt size={38} style={{ marginBottom: 10 }} />
              <h5 className="card-title" style={{ fontWeight: 700 }}>Mis Reservas</h5>
              <p className="card-text" style={{ fontWeight: 500 }}>Gestiona tus reservas activas y pendientes.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-lg border-0 h-100" style={{ borderRadius: 18, background: 'linear-gradient(135deg, #6ee7b7 0%, #4f8cff 100%)', color: '#fff', boxShadow: '0 2px 12px #4f8cff33' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 120 }}>
              <FaUserFriends size={38} style={{ marginBottom: 10 }} />
              <h5 className="card-title" style={{ fontWeight: 700 }}>Escenarios</h5>
              <p className="card-text" style={{ fontWeight: 500 }}>Explora y reserva escenarios deportivos.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-lg border-0 h-100" style={{ borderRadius: 18, background: 'linear-gradient(135deg, #f87171 0%, #fbbf24 100%)', color: '#fff', boxShadow: '0 2px 12px #f8717133' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 120 }}>
              <FaHistory size={38} style={{ marginBottom: 10 }} />
              <h5 className="card-title" style={{ fontWeight: 700 }}>Historial</h5>
              <p className="card-text" style={{ fontWeight: 500 }}>Consulta y gestiona tu historial de reservas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
