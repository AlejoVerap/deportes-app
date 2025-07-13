const Usuario = require('../models/usuario.model');
const Reserva = require('../models/reserva.model');
const Escenario = require('../models/escenario.model');

// Obtener todos los usuarios
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contraseña');
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ msg: 'Error al listar usuarios.' });
  }
};

// Actualizar rol o datos de un usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-contraseña');
    res.json({ msg: 'Usuario actualizado.', usuario });
  } catch (err) {
    res.status(500).json({ msg: 'Error al actualizar usuario.' });
  }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Usuario eliminado.' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar usuario.' });
  }
};
// Listar todas las reservas
exports.listarTodasReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate('usuario', 'nombre correo')
      .populate('escenario', 'nombre tipo')
      .sort({ fecha: 1 });
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener reservas.' });
  }
};

// Cancelar una reserva manualmente
exports.cancelarReservaAdmin = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) return res.status(404).json({ msg: 'Reserva no encontrada.' });

    reserva.estado = 'cancelada';
    await reserva.save();
    res.json({ msg: 'Reserva cancelada por el administrador.' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al cancelar reserva.' });
  }
};
// Listar reservas pendientes
exports.listarReservasPendientes = async (req, res) => {
  try {
    const reservas = await Reserva.find({ estado: 'pendiente' })
      .populate('usuario', 'nombre correo')
      .populate('escenario', 'nombre tipo')
      .sort({ fecha: 1 });
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener reservas pendientes.' });
  }
};

// Confirmar reserva
exports.confirmarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) return res.status(404).json({ msg: 'Reserva no encontrada.' });
    reserva.estado = 'confirmada';
    await reserva.save();
    res.json({ msg: 'Reserva confirmada.' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al confirmar reserva.' });
  }
};

// Eliminar reserva pendiente
exports.eliminarReservaPendiente = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) return res.status(404).json({ msg: 'Reserva no encontrada.' });
    if (reserva.estado !== 'pendiente') return res.status(400).json({ msg: 'Solo se pueden eliminar reservas pendientes.' });
    await reserva.deleteOne();
    res.json({ msg: 'Reserva pendiente eliminada.' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar reserva pendiente.' });
  }
};
exports.obtenerEstadisticas = async (req, res) => {
  try {
    const totalUsuarios = await Usuario.countDocuments();
    const totalEscenarios = await Escenario.countDocuments();
    const totalReservas = await Reserva.countDocuments();
    const reservasPorEscenario = await Reserva.aggregate([
      { $group: { _id: "$escenario", total: { $sum: 1 } } },
      { $sort: { total: -1 } },
      { $limit: 5 }
    ]);

    const conNombres = await Escenario.populate(reservasPorEscenario, { path: "_id", select: "nombre tipo" });

    res.json({
      totalUsuarios,
      totalEscenarios,
      totalReservas,
      escenariosMasReservados: conNombres
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener estadísticas.' });
  }
};
