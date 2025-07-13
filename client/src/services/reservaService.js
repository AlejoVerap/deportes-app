import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reservas';

export const obtenerReservasAdmin = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(API_URL, {
    headers: { 'x-auth-token': token },
  });
  return res.data;
};

export const cambiarEstadoReserva = async (id, estado) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(`${API_URL}/estado/${id}`, { estado }, {
    headers: { 'x-auth-token': token },
  });
  return res.data;
};
