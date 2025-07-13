import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin/usuarios';

export const eliminarUsuario = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      'Authorization': token,
    },
  });
  return res.data;
};
