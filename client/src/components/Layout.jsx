import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const getUserInfo = () => {
  // Primero intenta obtener el usuario completo del localStorage
  const usuarioStr = localStorage.getItem('usuario');
  if (usuarioStr) {
    try {
      return JSON.parse(usuarioStr);
    } catch {}
  }
  // Si no existe, usa el token solo para rol
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
};

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUserInfo();
  const isAdmin = user?.rol === 'admin' || (user?.rol === 'superadmin' && location.pathname.startsWith('/admin'));
  const isSuperadminUserPanel = user?.rol === 'superadmin' && !location.pathname.startsWith('/admin');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg mb-4" style={{ background: '#181c2f', color: '#fff', boxShadow: '0 2px 12px #4f8cff22', width: '100vw', left: 0, position: 'relative', zIndex: 10 }}>
        <div className="container-fluid">
          <span className="navbar-brand" style={{ display: 'flex', alignItems: 'center', color: '#fff', fontWeight: 700 }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f8cff 0%, #6ee7b7 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              boxShadow: '0 2px 8px #4f8cff33',
              marginRight: 10
            }}>
              {user && user.nombre
                ? user.nombre.split(' ').map(n => n[0]).join('').toUpperCase()
                : user && user.correo
                  ? user.correo[0].toUpperCase()
                  : ''}
            </span>
            <span style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>
              Gestor de Escenarios Deportivos
            </span>
          </span>
          {/* Enlaces de cambio de panel para superadmin */}
          {user?.rol === 'superadmin' && (
            <>
              {location.pathname.startsWith('/admin') ? (
                <Link to="/escenarios" className="btn btn-outline-info me-2" style={{ fontWeight: 600 }}>
                  Ver panel de usuario
                </Link>
              ) : (
                <Link to="/admin" className="btn btn-outline-warning me-2" style={{ fontWeight: 600 }}>
                  Ver panel de administrador
                </Link>
              )}
            </>
          )}
          <button className="btn btn-outline-light ms-auto" onClick={logout} style={{ fontWeight: 600, marginLeft: 16 }}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="row">
        <aside className="col-md-3" style={{ background: '#181c2f', minHeight: '90vh', borderRadius: 16, boxShadow: '0 2px 12px #0002', padding: 0 }}>
          <div className="list-group" style={{ background: '#181c2f', borderRadius: 16 }}>
            <div style={{ color: '#6ee7b7', fontWeight: 700, fontSize: 15, margin: '12px 0 8px 0', textAlign: 'center' }}>
              Rol detectado: {user?.rol || 'ninguno'} {isAdmin ? '(admin menu visible)' : '(no admin)'}
            </div>
            {isAdmin ? (
              <>
                <Link to="/admin" className="list-group-item list-group-item-action" style={{ background: 'transparent', color: '#fff', fontWeight: 500 }}>📅 Reservas</Link>
                <Link to="/admin/escenarios" className="list-group-item list-group-item-action" style={{ background: 'transparent', color: '#fff', fontWeight: 500 }}>🏟️ Escenarios</Link>
                <Link to="/admin/usuarios" className="list-group-item list-group-item-action" style={{ background: 'transparent', color: '#fff', fontWeight: 500 }}>� Usuarios</Link>
                <Link to="/admin/reportes" className="list-group-item list-group-item-action" style={{ background: 'transparent', color: '#fff', fontWeight: 500 }}>📊 Reportes</Link>
              </>
            ) : isSuperadminUserPanel ? (
              <>
                <Link to="/usuario/escenarios" className="list-group-item list-group-item-action" style={{ background: 'transparent', color: '#fff', fontWeight: 500 }}>🏟️ Escenarios</Link>
                <Link to="/usuario/reservas-usuario" className="list-group-item list-group-item-action" style={{ background: 'transparent', color: '#fff', fontWeight: 500 }}>🗂️ Mis Reservas</Link>
                <Link to="/usuario/historial" className="list-group-item list-group-item-action" style={{ background: 'transparent', color: '#fff', fontWeight: 500 }}>🗑️ Historial</Link>
              </>
            ) : (
              <>
                <Link to="/usuario/escenarios" className="list-group-item list-group-item-action" style={{ background: 'transparent', color: '#fff', fontWeight: 500 }}>🏟️ Escenarios</Link>
                <Link to="/usuario/reservas-usuario" className="list-group-item list-group-item-action" style={{ background: 'transparent', color: '#fff', fontWeight: 500 }}>🗂️ Mis Reservas</Link>
                <Link to="/usuario/historial" className="list-group-item list-group-item-action" style={{ background: 'transparent', color: '#fff', fontWeight: 500 }}>🗑️ Historial</Link>
              </>
            )}
          </div>
        </aside>

        <main className="col-md-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
