const express = require('express');
const router = express.Router();
const { crearReserva, misReservas, cancelarReserva, todasLasReservas, cambiarEstadoReserva, actualizarReservaUsuario, eliminarReservasCanceladasUsuario } = require('../controllers/reserva.controller');
const verificarToken = require('../middlewares/auth.middleware');

router.post('/', verificarToken, crearReserva);              // Crear nueva reserva
router.get('/mis', verificarToken, misReservas);             // Ver reservas propias
router.put('/cancelar/:id', verificarToken, cancelarReserva); // Cancelar reserva
router.put('/:id', verificarToken, actualizarReservaUsuario); // Actualizar reserva de usuario
router.delete('/papelera/vaciar', verificarToken, eliminarReservasCanceladasUsuario); // Eliminar todas las reservas canceladas del usuario autenticado

// Rutas de administración
router.get('/', verificarToken, todasLasReservas); // Listar todas las reservas
router.put('/estado/:id', verificarToken, cambiarEstadoReserva); // Cambiar estado

module.exports = router;
