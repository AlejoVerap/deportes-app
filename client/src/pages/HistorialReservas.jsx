import React, { useEffect, useState } from 'react';
import { obtenerMisReservas, eliminarReserva, vaciarPapelera } from '../services/reservaUsuarioService';
import { estadoIcono } from '../components/ReservaIcons';
import { thIcons } from '../components/ReservaThIcons';

const HistorialReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [eliminandoId, setEliminandoId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      const data = await obtenerMisReservas();
      setReservas(data);
      setLoading(false);
    };
    cargar();
  }, []);

  const confirmadas = reservas.filter(r => r.estado === 'confirmada');
  const canceladas = reservas.filter(r => r.estado === 'cancelada');

  const handleEliminar = (id) => {
    setIdAEliminar(id);
    setShowConfirm(true);
  };

  const confirmarEliminar = async () => {
    setShowConfirm(false);
    try {
      await eliminarReserva(idAEliminar);
      setMensaje('Reserva eliminada permanentemente.');
      const data = await obtenerMisReservas();
      setReservas(data);
    } catch {
      setMensaje('No se pudo eliminar la reserva.');
    }
    setTimeout(() => setMensaje(''), 3000);
    setIdAEliminar(null);
  };

  // Botón para vaciar papelera
  const handleVaciarPapelera = async () => {
    if (canceladas.length === 0) return;
    if (!window.confirm('¿Seguro que deseas eliminar permanentemente todas las reservas canceladas? Esta acción no se puede deshacer.')) return;
    setLoading(true);
    try {
      await vaciarPapelera();
      setMensaje('Papelera vaciada correctamente.');
      const data = await obtenerMisReservas();
      setReservas(data);
    } catch {
      setMensaje('No se pudo vaciar la papelera.');
    }
    setLoading(false);
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div>
      <div className="container mt-4" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
        <h2 className="mb-4" style={{ color: '#2563eb', fontWeight: 700 }}>Historial de Reservas</h2>
        {mensaje && <div className="alert alert-info" style={{ borderRadius: 8, fontWeight: 500 }}>{mensaje}</div>}
        {loading ? <p style={{ color: '#2563eb', fontWeight: 500 }}>Cargando...</p> : (
          <>
            <h4 style={{ color: '#059669', fontWeight: 600 }}>Confirmadas</h4>
            <div className="table-responsive mb-4">
              <table className="table table-hover align-middle" style={{ borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,0.97)', boxShadow: '0 2px 8px #4f8cff33' }}>
                <thead style={{ background: 'linear-gradient(90deg, #4f8cff 0%, #6ee7b7 100%)', color: '#fff' }}>
                  <tr>
                    <th>{thIcons[0]} #</th>
                    <th>{thIcons[1]} Escenario</th>
                    <th>{thIcons[2]} Fecha</th>
                    <th>{thIcons[3]} Hora</th>
                    <th>{thIcons[4]} Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmadas.length === 0 && <tr><td colSpan="5">No hay reservas confirmadas.</td></tr>}
                  {confirmadas.map((r, idx) => (
                    <tr key={r._id} style={{ background: idx % 2 === 0 ? '#f3f6fd' : '#e0f7fa' }}>
                      <td style={{ fontWeight: 600, color: '#2563eb' }}>{idx + 1}</td>
                      <td style={{ fontWeight: 600 }}>{r.escenario?.nombre}</td>
                      <td>{r.fecha}</td>
                      <td>{r.hora}</td>
                      <td style={{ fontWeight: 600 }}>{estadoIcono(r.estado)} <span style={{ marginLeft: 6 }}>{r.estado.charAt(0).toUpperCase() + r.estado.slice(1)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h4 style={{ color: '#dc2626', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Eliminadas (Papelera)</span>
              <button
                className="btn btn-outline-danger btn-sm"
                style={{ fontWeight: 600, borderRadius: 8, marginLeft: 12 }}
                onClick={handleVaciarPapelera}
                disabled={canceladas.length === 0 || loading}
              >
                Vaciar Papelera
              </button>
            </h4>
            <div className="table-responsive">
              <table className="table table-hover align-middle" style={{ borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,0.97)', boxShadow: '0 2px 8px #4f8cff33' }}>
                <thead style={{ background: 'linear-gradient(90deg, #f87171 0%, #fbbf24 100%)', color: '#fff' }}>
                  <tr>
                    <th>{thIcons[0]} #</th>
                    <th>{thIcons[1]} Escenario</th>
                    <th>{thIcons[2]} Fecha</th>
                    <th>{thIcons[3]} Hora</th>
                    <th>{thIcons[4]} Estado</th>
                    <th>{thIcons[5]} Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {canceladas.length === 0 && <tr><td colSpan="6">No hay reservas eliminadas.</td></tr>}
                  {canceladas.map((r, idx) => (
                    <tr key={r._id} style={{ background: idx % 2 === 0 ? '#f3f6fd' : '#ffe4e6' }}>
                      <td style={{ fontWeight: 600, color: '#dc2626' }}>{idx + 1}</td>
                      <td style={{ fontWeight: 600 }}>{r.escenario?.nombre}</td>
                      <td>{r.fecha}</td>
                      <td>{r.hora}</td>
                      <td style={{ fontWeight: 600 }}>{estadoIcono(r.estado)} <span style={{ marginLeft: 6 }}>{r.estado.charAt(0).toUpperCase() + r.estado.slice(1)}</span></td>
                      <td>
                        <button className="btn btn-danger btn-sm" style={{ borderRadius: 8, fontWeight: 600 }} onClick={() => handleEliminar(r._id)}>{eliminandoId === r._id ? 'Eliminando...' : 'Eliminar'}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {showConfirm && (
          <div className="modal show d-block" tabIndex="-1" style={{background:'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-danger text-white">
                  <h5 className="modal-title">Confirmar eliminación</h5>
                </div>
                <div className="modal-body">
                  <p>¿Estás seguro de que deseas eliminar esta reserva? Esta acción no se puede deshacer.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancelar</button>
                  <button className="btn btn-danger" onClick={confirmarEliminar}>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorialReservas;
