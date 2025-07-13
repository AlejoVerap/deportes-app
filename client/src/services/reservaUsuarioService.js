import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reservas';

export const crearReserva = async (escenario, fecha, hora) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(API_URL, { escenario, fecha, hora }, {
    headers: {
      'Authorization': token,
    },
  });
  return res.data;
};

export const obtenerMisReservas = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/mis`, {
    headers: {
      'Authorization': token,
    },
  });
  return res.data;
};

export const actualizarReserva = async (id, fecha, hora) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(`${API_URL}/${id}`, { fecha, hora }, {
    headers: {
      'Authorization': token,
    },
  });
  return res.data;
};

export const eliminarReserva = async (id) => {
  const token = localStorage.getItem('token');
  // Usamos la ruta de cancelar reserva (PUT) para usuarios
  const res = await axios.put(`${API_URL}/cancelar/${id}`, {}, {
    headers: {
      'Authorization': token,
    },
  });
  return res.data;
};

export const restaurarReserva = async (id, fecha, hora) => {
  const token = localStorage.getItem('token');
  // Reutiliza el endpoint de actualizar reserva de usuario
  const res = await axios.put(`${API_URL}/${id}`, { fecha, hora }, {
    headers: {
      'Authorization': token,
    },
  });
  return res.data;
};

export const vaciarPapelera = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(`${API_URL}/papelera/vaciar`, {
    headers: {
      'Authorization': token,
    },
  });
  return res.data;
};
