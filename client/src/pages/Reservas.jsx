
import React, { useEffect, useState } from 'react';
import { obtenerReservasAdmin, cambiarEstadoReserva } from '../services/reservaService';
import '../App.css';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState({ open: false, id: null, estado: '', mensaje: '' });

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const data = await obtenerReservasAdmin();
        setReservas(data);
      } catch (err) {
        setError('Error al obtener reservas');
      } finally {
        setLoading(false);
      }
    };
    cargarReservas();
  }, []);

  const handleEstado = (id, estado) => {
    setModal({
      open: true,
      id,
      estado,
      mensaje: estado === 'confirmada' ? '¿Seguro que desea confirmar esta reserva?' : '¿Seguro que desea cancelar esta reserva?'
    });
  };

  const confirmarModal = async () => {
    try {
      await cambiarEstadoReserva(modal.id, modal.estado);
      setReservas(reservas.map(r => r._id === modal.id ? { ...r, estado: modal.estado } : r));
      setModal({ open: false, id: null, estado: '', mensaje: '' });
    } catch {
      alert('Error al cambiar estado');
      setModal({ open: false, id: null, estado: '', mensaje: '' });
    }
  };

  const cerrarModal = () => setModal({ open: false, id: null, estado: '', mensaje: '' });

  return (
    <div>
      <h2 className="mb-4">Gestión de Reservas</h2>
      {loading ? (
        <p>Cargando reservas...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Escenario</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.filter(r => r.estado === 'pendiente').map((reserva, idx) => (
              <tr key={reserva._id}>
                <td>{idx + 1}</td>
                <td>{reserva.usuario?.nombre}</td>
                <td>{reserva.usuario?.correo}</td>
                <td>{reserva.escenario?.nombre}</td>
                <td>{reserva.fecha}</td>
                <td>{reserva.hora}</td>
                <td>{reserva.estado}</td>
                <td>
                  <button className="btn btn-success btn-sm me-2" disabled={reserva.estado === 'confirmada'} onClick={() => handleEstado(reserva._id, 'confirmada')}>Confirmar</button>
                  <button className="btn btn-danger btn-sm" disabled={reserva.estado === 'cancelada'} onClick={() => handleEstado(reserva._id, 'cancelada')}>Cancelar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    {/* Modal de confirmación */}
    {modal.open && (
      <div className="modal-bg">
        <div className="modal-content">
          <h4>{modal.mensaje}</h4>
          <div className="modal-btns">
            <button className="confirm" onClick={confirmarModal}>Sí</button>
            <button className="cancel" onClick={cerrarModal}>No</button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default Reservas;
