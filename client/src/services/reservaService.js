import * as XLSX from 'xlsx';
export const eliminarReservasCanceladas = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(`${API_URL}/papelera/vaciar`, {
    headers: { 'Authorization': token },
  });
  return res.data;
};
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reservas';

export const obtenerReservasAdmin = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(API_URL, {
    headers: { 'Authorization': token },
  });
  return res.data;
};

export const cambiarEstadoReserva = async (id, estado) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    `${API_URL}/estado/${id}`,
    { estado },
    {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    }
  );
  return res.data;
};
