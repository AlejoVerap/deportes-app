import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';

function Login() {
  // Limpiar token y usuario al cargar el login
  React.useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('lastUser');
  }, []);

  const [correo, setCorreo] = useState(localStorage.getItem('lastUser') || '');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(correo, contraseña);
      localStorage.setItem('token', data.token);
      localStorage.setItem('lastUser', correo);
      // Redirigir según el rol
      if (data.usuario && (data.usuario.rol === 'superadmin' || data.usuario.rol === 'admin')) {
        navigate('/admin');
        setError('');
        if (data.usuario.rol === 'superadmin') {
          alert('¡Bienvenido, superadministrador!');
        }
      } else {
        navigate('/usuario');
      }
    } catch (err) {
      setError('Correo o contraseña incorrectos.');
    }
    setLoading(false);
  };

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
          <h2 className="mb-1" style={{ color: '#181c2f', fontWeight: 800, fontSize: 22, letterSpacing: 1 }}>Acceso administrativo</h2>
          <h3 className="mb-2" style={{ color: '#2563eb', fontWeight: 700 }}>Iniciar sesión</h3>
          <p className="text-muted mb-0" style={{ fontSize: 15 }}>Bienvenido, ingresa tus datos para continuar</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#2563eb', fontWeight: 500 }}>Correo</label>
            <input
              type="email"
              className="form-control"
              style={{ borderRadius: 8, borderColor: '#4f8cff' }}
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#2563eb', fontWeight: 500 }}>Contraseña</label>
            <input
              type="password"
              className="form-control"
              style={{ borderRadius: 8, borderColor: '#4f8cff' }}
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger" style={{ borderRadius: 8 }}>{error}</div>}
          <button type="submit" className="btn w-100" style={{ background: 'linear-gradient(90deg, #4f8cff 0%, #6ee7b7 100%)', color: '#fff', fontWeight: 600, borderRadius: 8, boxShadow: '0 2px 8px #4f8cff33' }} disabled={loading}>
            {loading ? 'Ingresando...' : 'Entrar'}
          </button>
        </form>
        <div className="mt-3 text-center">
          <span style={{ color: '#2563eb' }}>¿No tienes cuenta? </span>
          <Link to="/register" style={{ color: '#059669', fontWeight: 600 }}>Crea una aquí</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
