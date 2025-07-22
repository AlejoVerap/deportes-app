/*import React from 'react';

const Usuarios = () => {
  return <h2>Gestión de usuarios</h2>;
};

export default Usuarios;*/
import React, { useEffect, useState } from 'react';
import { obtenerUsuarios } from '../services/usuarioService';
import { cambiarRolUsuario } from '../services/cambiarRolService';
import { eliminarUsuario } from '../services/eliminarUsuarioService';

const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.rol;
  } catch {
    return null;
  }
};

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cargandoRol, setCargandoRol] = useState('');
  const [eliminandoId, setEliminandoId] = useState('');
  const [error, setError] = useState('');
  const rol = getUserRole();

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (err) {
        setError('Error al obtener usuarios');
      } finally {
        setLoading(false);
      }
    };
    cargarUsuarios();
  }, []);

  const handleCambioRol = async (id, rolActual) => {
    const nuevoRol = rolActual === 'admin' ? 'usuario' : 'admin';
    setCargandoRol(id);
    try {
      await cambiarRolUsuario(id, nuevoRol);
      setUsuarios(usuarios.map(u => u._id === id ? { ...u, rol: nuevoRol } : u));
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al cambiar el rol');
    } finally {
      setCargandoRol('');
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.')) return;
    setEliminandoId(id);
    try {
      await eliminarUsuario(id);
      setUsuarios(usuarios.filter(u => u._id !== id));
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al eliminar usuario');
    } finally {
      setEliminandoId('');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Gestión de Usuarios</h2>
      <div style={{ color: 'orange', fontWeight: 700 }}>DEBUG: Render Usuarios.jsx</div>
      <div style={{ color: 'orange', fontWeight: 700 }}>DEBUG: rol detectado: {rol || 'ninguno'}</div>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p style={{ color: 'orange' }}>DEBUG: Cargando usuarios...</p>
      ) : (
        <>
          <div style={{ color: 'orange', fontWeight: 700 }}>DEBUG: usuarios.length = {usuarios.length}</div>
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Edad</th>
                <th>Género</th>
                <th>Escenario Deportivo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={usuario._id}>
                  <td>{index + 1}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.rol}</td>
                  <td>{usuario.edad || '-'}</td>
                  <td>{usuario.genero || '-'}</td>
                  <td>{usuario.escenarioDeportivo || '-'}</td>
                  <td>
                    {/* Solo superadmin puede cambiar rol o eliminar */}
                    {rol === 'superadmin' ? (
                      <>
                        <button className="btn btn-sm btn-secondary me-2" onClick={() => handleCambioRol(usuario._id, usuario.rol)} disabled={cargandoRol === usuario._id}>
                          {cargandoRol === usuario._id ? 'Cambiando...' : usuario.rol === 'admin' ? 'Cambiar a Usuario' : 'Cambiar a Admin'}
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(usuario._id)} disabled={eliminandoId === usuario._id}>
                          {eliminandoId === usuario._id ? 'Eliminando...' : 'Eliminar'}
                        </button>
                      </>
                    ) : (
                      <span className="text-muted">Sin permisos</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Usuarios;

