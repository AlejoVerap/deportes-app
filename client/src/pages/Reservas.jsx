import React, { useEffect, useState } from 'react';
import { obtenerReservasAdmin, cambiarEstadoReserva } from '../services/reservaService';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleEstado = async (id, estado) => {
    try {
      await cambiarEstadoReserva(id, estado);
      setReservas(reservas.map(r => r._id === id ? { ...r, estado } : r));
    } catch {
      alert('Error al cambiar estado');
    }
  };

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
    </div>
  );
};

export default Reservas;
