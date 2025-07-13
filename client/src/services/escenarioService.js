import axios from 'axios';

const API_URL = 'http://localhost:5000/api/escenarios';

export const obtenerEscenarios = async (page = 1, limit = 4) => {
  const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
  return res.data;
};
