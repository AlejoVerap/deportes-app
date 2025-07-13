import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const login = async (correo, contraseña) => {
  const response = await axios.post(`${API_URL}/login`, { correo, contraseña });
  return response.data;
};
