import React, { useState } from 'react';

const ReservaModal = ({ show, onClose, onReservar, escenario }) => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const validar = () => {
    if (!fecha || !hora) return 'Debes seleccionar fecha y hora.';
    if (fecha < today) return 'No puedes reservar en fechas pasadas.';
    if (hora < '06:00' || hora > '22:00') return 'La hora debe estar entre 06:00 y 22:00.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const errorMsg = validar();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setLoading(true);
    try {
      await onReservar(fecha, hora);
      onClose();
    } catch (err) {
      setError('Error al reservar. Intenta nuevamente.');
    }
    setLoading(false);
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{background:'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Reservar: {escenario?.nombre}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Fecha</label>
                <input type="date" className="form-control" value={fecha} onChange={e => setFecha(e.target.value)} min={today} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Hora</label>
                <input type="time" className="form-control" value={hora} onChange={e => setHora(e.target.value)} min="06:00" max="22:00" required />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn btn-success" disabled={loading}>{loading ? 'Reservando...' : 'Reservar'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservaModal;
