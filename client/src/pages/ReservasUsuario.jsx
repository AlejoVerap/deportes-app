import React, { useEffect, useState } from 'react';
import { obtenerMisReservas, actualizarReserva, eliminarReserva, vaciarPapelera } from '../services/reservaUsuarioService';
import { estadoIcono, iconoEditar, iconoEliminar } from '../components/ReservaIcons';
import { thIcons } from '../components/ReservaThIcons';
import { FaTrashAlt } from 'react-icons/fa';

const ReservasUsuario = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editFecha, setEditFecha] = useState('');
  const [editHora, setEditHora] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [showVaciarModal, setShowVaciarModal] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      const data = await obtenerMisReservas();
      setReservas(data);
      setLoading(false);
    };
    cargar();
  }, []);

  const handleEdit = (reserva) => {
    setEditId(reserva._id);
    setEditFecha(reserva.fecha);
    setEditHora(reserva.hora);
  };

  const handleUpdate = async (id) => {
    // Validación frontend
    if (!editFecha || !editHora) {
      setMensaje('Debes ingresar fecha y hora.');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }
    const reserva = reservas.find(r => r._id === id);
    if (reserva && reserva.estado === 'cancelada') {
      setMensaje('No se puede modificar una reserva cancelada.');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }
    try {
      await actualizarReserva(id, editFecha, editHora);
      setMensaje('Reserva actualizada correctamente.');
      setEditId(null);
      // Refrescar reservas
      const data = await obtenerMisReservas();
      setReservas(data);
    } catch (err) {
      let msg = 'Error al actualizar reserva.';
      if (err.response && err.response.data && err.response.data.msg) {
        msg = err.response.data.msg;
      }
      setMensaje(msg);
    }
    setTimeout(() => setMensaje(''), 3000);
  };

  const handleEliminar = (id) => {
    setIdAEliminar(id);
    setShowConfirm(true);
  };

  const confirmarEliminar = async () => {
    setShowConfirm(false);
    try {
      await eliminarReserva(idAEliminar);
      setMensaje('Reserva eliminada correctamente.');
      // Refrescar reservas
      const data = await obtenerMisReservas();
      setReservas(data);
    } catch (err) {
      setMensaje('No se pudo eliminar la reserva.');
    }
    setTimeout(() => setMensaje(''), 3000);
    setIdAEliminar(null);
  };

  // Función para vaciar la papelera (solo ejemplo, normalmente va en HistorialReservas.jsx)
  const handleVaciarPapelera = async () => {
    setShowVaciarModal(false);
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

  // Solo mostrar reservas pendientes
  const reservasPendientes = reservas.filter(r => r.estado === 'pendiente');

  return (
    <div>
      <div className="container mt-4" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
        <h2 className="mb-4" style={{ color: '#2563eb', fontWeight: 700 }}>Mis Reservas Pendientes</h2>
        {mensaje && <div className="alert alert-success" style={{ borderRadius: 8, fontWeight: 500 }}>{mensaje}</div>}
        {loading ? <p style={{ color: '#2563eb', fontWeight: 500 }}>Cargando...</p> : (
          <div className="table-responsive">
            <table className="table table-hover align-middle" style={{ borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,0.97)', boxShadow: '0 2px 8px #4f8cff33' }}>
              <thead style={{ background: 'linear-gradient(90deg, #4f8cff 0%, #6ee7b7 100%)', color: '#fff' }}>
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
                {reservasPendientes.length === 0 && <tr><td colSpan="6">No tienes reservas pendientes.</td></tr>}
                {reservasPendientes.map((r, idx) => (
                  <tr key={r._id} style={{ background: idx % 2 === 0 ? '#f3f6fd' : '#e0f7fa' }}>
                    <td style={{ fontWeight: 600, color: '#2563eb' }}>{idx + 1}</td>
                    <td style={{ fontWeight: 600 }}>{r.escenario?.nombre}</td>
                    <td>
                      {editId === r._id ? (
                        <input type="date" value={editFecha} onChange={e => setEditFecha(e.target.value)} className="form-control" style={{ borderRadius: 8, borderColor: '#4f8cff' }} />
                      ) : r.fecha}
                    </td>
                    <td>
                      {editId === r._id ? (
                        <input type="time" value={editHora} onChange={e => setEditHora(e.target.value)} className="form-control" style={{ borderRadius: 8, borderColor: '#4f8cff' }} />
                      ) : r.hora}
                    </td>
                    <td style={{ fontWeight: 600 }}>{estadoIcono(r.estado)} <span style={{ marginLeft: 6 }}>{r.estado.charAt(0).toUpperCase() + r.estado.slice(1)}</span></td>
                    <td>
                      {editId === r._id ? (
                        <>
                          <button className="btn btn-success btn-sm me-2" style={{ borderRadius: 8, fontWeight: 600 }} onClick={() => handleUpdate(r._id)}>{iconoEditar} Guardar</button>
                          <button className="btn btn-secondary btn-sm" style={{ borderRadius: 8, fontWeight: 600 }} onClick={() => setEditId(null)}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-primary btn-sm me-2" style={{ borderRadius: 8, fontWeight: 600, background: 'linear-gradient(90deg, #4f8cff 0%, #6ee7b7 100%)', border: 'none' }} onClick={() => handleEdit(r)}>{iconoEditar} Editar</button>
                          <button className="btn btn-danger btn-sm" style={{ borderRadius: 8, fontWeight: 600 }} onClick={() => handleEliminar(r._id)} disabled={r.estado === 'cancelada'}>{iconoEliminar} Eliminar</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
        {showVaciarModal && (
          <div className="modal show d-block" tabIndex="-1" style={{background:'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={{borderRadius:16}}>
                <div className="modal-header bg-danger text-white" style={{display:'flex',alignItems:'center'}}>
                  <FaTrashAlt size={28} style={{marginRight:12}}/>
                  <h5 className="modal-title" style={{fontWeight:700}}>Vaciar Papelera</h5>
                </div>
                <div className="modal-body" style={{textAlign:'center'}}>
                  <p style={{fontSize:18, fontWeight:500, color:'#dc2626'}}>
                    ¿Seguro que deseas eliminar <b>permanentemente</b> todas las reservas canceladas?<br/>Esta acción no se puede deshacer.
                  </p>
                </div>
                <div className="modal-footer" style={{justifyContent:'center'}}>
                  <button className="btn btn-secondary" style={{fontWeight:600, borderRadius:8, minWidth:100}} onClick={()=>setShowVaciarModal(false)}>Cancelar</button>
                  <button className="btn btn-danger" style={{fontWeight:600, borderRadius:8, minWidth:100}} onClick={handleVaciarPapelera}>Vaciar</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservasUsuario;
