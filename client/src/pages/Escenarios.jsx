import React, { useEffect, useState } from 'react';
import { obtenerEscenarios } from '../services/escenarioService';
import ReservaModal from '../components/ReservaModal';
import { crearReserva } from '../services/reservaUsuarioService';

const Escenarios = () => {
  const [escenarios, setEscenarios] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [escenarioSeleccionado, setEscenarioSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      const data = await obtenerEscenarios(page, limit);
      setEscenarios(data.escenarios);
      setTotal(data.total);
      setLoading(false);
    };
    cargar();
  }, [page, limit]);

  const totalPages = Math.ceil(total / limit);

  const handleReservarClick = (escenario) => {
    setEscenarioSeleccionado(escenario);
    setShowModal(true);
  };

  const handleReservar = async (fecha, hora) => {
    await crearReserva(escenarioSeleccionado._id, fecha, hora);
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3500);
  };

  return (
    <div className="container mt-4" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 className="mb-4" style={{ color: '#2563eb', fontWeight: 700, letterSpacing: 1 }}>Escenarios Deportivos Disponibles</h2>
      {loading ? <p style={{ color: '#2563eb', fontWeight: 500 }}>Cargando...</p> : (
        <div className="row">
          {escenarios.map(escenario => (
            <div className="col-md-6 col-lg-4 mb-4" key={escenario._id}>
              <div className="card h-100 shadow-lg border-0" style={{ borderRadius: 18, background: 'rgba(255,255,255,0.97)' }}>
                <img src={escenario.imagenes[0]} alt={escenario.nombre} className="card-img-top" style={{height:180,objectFit:'cover', borderTopLeftRadius: 18, borderTopRightRadius: 18}} />
                <div className="card-body" style={{ padding: 18 }}>
                  <h5 className="card-title" style={{ color: '#2563eb', fontWeight: 700 }}>{escenario.nombre}</h5>
                  <div style={{ fontSize: 15, color: '#059669', marginBottom: 8 }}><b>{escenario.tipo}</b></div>
                  <div className="mb-2" style={{ color: '#4f8cff', fontWeight: 600 }}>
                    <span style={{ fontSize: 18 }}>${escenario.precio.toLocaleString()}</span> <span style={{ fontSize: 13, color: '#6b7280' }}>/hora</span>
                  </div>
                  <div className="mb-2" style={{ color: '#374151' }}><b>Capacidad:</b> {escenario.descripcion}</div>
                  <div className="mb-2" style={{ color: '#374151' }}><b>Ubicación:</b> {escenario.ubicacion}</div>
                  <div className="mb-2" style={{ color: '#374151' }}><b>Condiciones:</b> {escenario.condicionesUso}</div>
                  <button className="btn w-100 mt-2" style={{ background: 'linear-gradient(90deg, #4f8cff 0%, #6ee7b7 100%)', color: '#fff', fontWeight: 600, borderRadius: 8, boxShadow: '0 2px 8px #4f8cff33' }} onClick={() => handleReservarClick(escenario)}>Reservar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          <li className={`page-item${page === 1 ? ' disabled' : ''}`}><button className="page-link" style={{ color: '#2563eb', fontWeight: 600 }} onClick={() => setPage(page - 1)}>&laquo;</button></li>
          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item${page === i + 1 ? ' active' : ''}`}><button className="page-link" style={{ color: '#2563eb', fontWeight: 600 }} onClick={() => setPage(i + 1)}>{i + 1}</button></li>
          ))}
          <li className={`page-item${page === totalPages ? ' disabled' : ''}`}><button className="page-link" style={{ color: '#2563eb', fontWeight: 600 }} onClick={() => setPage(page + 1)}>&raquo;</button></li>
        </ul>
      </nav>
      {mensaje && <div className="alert alert-success" style={{ borderRadius: 8, fontWeight: 500 }}>{mensaje}</div>}
      <ReservaModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onReservar={handleReservar}
        escenario={escenarioSeleccionado}
      />
      {showSuccess && (
        <div className="modal show d-block" tabIndex="-1" style={{background:'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">¡Reserva realizada!</h5>
              </div>
              <div className="modal-body">
                <p>Tu reserva fue registrada y está <b>pendiente por confirmación</b> del administrador.</p>
                <p>Recibirás un correo cuando sea confirmada.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={() => setShowSuccess(false)}>Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Escenarios;
