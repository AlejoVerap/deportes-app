import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginSelector() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4f8cff 0%, #6ee7b7 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div className="card shadow-lg p-4 border-0" style={{ maxWidth: '400px', width: '100%', borderRadius: 18, background: 'rgba(255,255,255,0.97)' }}>
        <div className="text-center mb-4">
          <img src={require('../assets/deporte.png')} alt="Deporte" style={{ width: 70, marginBottom: 16, borderRadius: 12, boxShadow: '0 2px 8px #4f8cff33' }} />
          <h3 className="mb-2" style={{ color: '#2563eb', fontWeight: 700 }}>Bienvenido</h3>
          <p className="text-muted mb-0" style={{ fontSize: 15 }}>Selecciona el tipo de acceso</p>
        </div>
        <button className="btn w-100 mb-3" style={{ background: 'linear-gradient(90deg, #4f8cff 0%, #6ee7b7 100%)', color: '#fff', fontWeight: 600, borderRadius: 8, boxShadow: '0 2px 8px #4f8cff33' }} onClick={() => navigate('/login')}>Acceso Usuario</button>
        <button className="btn w-100" style={{ background: '#2563eb', color: '#fff', fontWeight: 600, borderRadius: 8, boxShadow: '0 2px 8px #4f8cff33' }} onClick={() => navigate('/login')}>Acceso Administrativo</button>
      </div>
    </div>
  );
}

export default LoginSelector;
