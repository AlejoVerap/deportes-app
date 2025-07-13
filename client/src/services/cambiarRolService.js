import axios from 'axios';

const API_URL = 'http://localhost:5000/api/usuarios';

export const cambiarRolUsuario = async (id, nuevoRol) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(`${API_URL}/rol/${id}`, { rol: nuevoRol }, {
    headers: {
      'Authorization': token,
    },
  });
  return res.data;
};
