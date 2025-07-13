import { FaClock, FaCheckCircle, FaTimesCircle, FaEdit, FaTrash } from 'react-icons/fa';

export const estadoIcono = (estado) => {
  if (estado === 'pendiente') return <FaClock style={{ color: '#f59e42' }} title="Pendiente" />;
  if (estado === 'confirmada') return <FaCheckCircle style={{ color: '#059669' }} title="Confirmada" />;
  if (estado === 'cancelada') return <FaTimesCircle style={{ color: '#dc2626' }} title="Cancelada" />;
  return null;
};

export const iconoEditar = <FaEdit style={{ color: '#2563eb' }} title="Editar" />;
export const iconoEliminar = <FaTrash style={{ color: '#dc2626' }} title="Eliminar" />;
