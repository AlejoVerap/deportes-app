const express = require('express');
const router = express.Router();
const {
  listarUsuarios,
  actualizarUsuario,
  eliminarUsuario,
  listarTodasReservas,
  cancelarReservaAdmin,
  obtenerEstadisticas,
  listarReservasPendientes,
  confirmarReserva,
  eliminarReservaPendiente
} = require('../controllers/admin.controller');

const verificarToken = require('../middlewares/auth.middleware');
const esAdmin = require('../middlewares/admin.middleware');

// Usuarios
router.get('/usuarios', verificarToken, esAdmin, listarUsuarios);
router.put('/usuarios/:id', verificarToken, esAdmin, actualizarUsuario);
router.delete('/usuarios/:id', verificarToken, esAdmin, eliminarUsuario);

// Reservas
router.get('/reservas', verificarToken, esAdmin, listarTodasReservas);
router.put('/reservas/cancelar/:id', verificarToken, esAdmin, cancelarReservaAdmin);

// Reportes
router.get('/reportes', verificarToken, esAdmin, obtenerEstadisticas);

// Reservas pendientes CRUD
router.get('/reservas-pendientes', verificarToken, esAdmin, listarReservasPendientes);
router.put('/reservas-pendientes/confirmar/:id', verificarToken, esAdmin, confirmarReserva);
router.delete('/reservas-pendientes/:id', verificarToken, esAdmin, eliminarReservaPendiente);

module.exports = router;
