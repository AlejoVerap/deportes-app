
import React, { useEffect, useState } from 'react';
import { obtenerReservasAdmin, eliminarReservasCanceladas } from '../services/reservaService';
import * as XLSX from 'xlsx';

const Reportes = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerReservasAdmin();
        setReservas(data.filter(r => r.estado === 'confirmada' || r.estado === 'cancelada'));
      } catch {
        setError('Error al cargar reportes');
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  // Filtros
  const reservasFiltradas = reservas.filter(r =>
    (!filtroEstado || r.estado === filtroEstado) &&
    (!filtroFecha || r.fecha === filtroFecha)
  );

  // Exportar a Excel
  const exportarExcel = () => {
    const datos = reservasFiltradas.map(r => ({
      Usuario: r.usuario?.nombre,
      Correo: r.usuario?.correo,
      Escenario: r.escenario?.nombre,
      Fecha: r.fecha,
      Hora: r.hora,
      Estado: r.estado
    }));
    const ws = XLSX.utils.json_to_sheet(datos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reportes');
    XLSX.writeFile(wb, 'reportes_reservas.xlsx');
    alert('¡Reporte exportado exitosamente!');
  };

  // Vaciar reportes
  const vaciarReportes = async () => {
    if (!window.confirm('¿Seguro que desea vaciar los reportes? Esta acción no se puede deshacer.')) return;
    try {
      await eliminarReservasCanceladas();
      setReservas(reservas.filter(r => r.estado !== 'cancelada'));
    } catch {
      alert('Error al vaciar reportes');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Reservas confirmadas y canceladas</h2>
      <div className="mb-3 d-flex gap-3 align-items-end">
        <div>
          <label>Estado:&nbsp;</label>
          <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} className="form-select">
            <option value="">Todos</option>
            <option value="confirmada">Confirmadas</option>
            <option value="cancelada">Canceladas</option>
          </select>
        </div>
        <div>
          <label>Fecha:&nbsp;</label>
          <input type="date" value={filtroFecha} onChange={e => setFiltroFecha(e.target.value)} className="form-control" />
        </div>
        <button className="btn btn-success" onClick={exportarExcel}>Exportar a Excel</button>
        <button className="btn btn-danger" onClick={vaciarReportes}>Vaciar reportes</button>
      </div>
      {loading ? (
        <p>Cargando...</p>
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
            </tr>
          </thead>
          <tbody>
            {reservasFiltradas.map((reserva, idx) => (
              <tr key={reserva._id}>
                <td>{idx + 1}</td>
                <td>{reserva.usuario?.nombre}</td>
                <td>{reserva.usuario?.correo}</td>
                <td>{reserva.escenario?.nombre}</td>
                <td>{reserva.fecha}</td>
                <td>{reserva.hora}</td>
                <td>{reserva.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reportes;
