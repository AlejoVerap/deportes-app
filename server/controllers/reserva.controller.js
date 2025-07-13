const Reserva = require('../models/reserva.model');
const Escenario = require('../models/escenario.model');
const { enviarCorreoReserva } = require('../utils/mailer');

// Crear una reserva
exports.crearReserva = async (req, res) => {
  try {
    const { escenario, fecha, hora } = req.body;

    // Validar duplicidad
    const existe = await Reserva.findOne({
      escenario,
      fecha,
      hora,
      estado: { $in: ['confirmada', 'pendiente'] }
    });

    if (existe) {
      return res.status(400).json({ msg: 'Ese horario ya está reservado o pendiente de confirmación.' });
    }

    const nuevaReserva = new Reserva({
      usuario: req.usuario.id,
      escenario,
      fecha,
      hora,
      estado: 'pendiente'
    });
    await nuevaReserva.save();

    // Obtener datos completos para el correo
    const reservaCompleta = await Reserva.findById(nuevaReserva._id)
      .populate('usuario', 'nombre correo telefono')
      .populate('escenario', 'nombre tipo ubicacion');

    // Enviar correo de notificación de reserva pendiente
    const subject = 'Reserva creada exitosamente';
    const html = `<h3>Hola ${reservaCompleta.usuario.nombre},</h3>
      <p>Tu reserva ha sido creada exitosamente y está <b>pendiente de confirmación</b> por el administrador.</p>
      <ul>
        <li><b>Escenario:</b> ${reservaCompleta.escenario.nombre}</li>
        <li><b>Tipo:</b> ${reservaCompleta.escenario.tipo}</li>
        <li><b>Ubicación:</b> ${reservaCompleta.escenario.ubicacion || 'N/A'}</li>
        <li><b>Fecha:</b> ${reservaCompleta.fecha}</li>
        <li><b>Hora:</b> ${reservaCompleta.hora}</li>
      </ul>
      <p>Recibirás una notificación cuando la reserva sea confirmada o rechazada.</p>`;
    try {
      await enviarCorreoReserva(reservaCompleta.usuario.correo, subject, html);
    } catch (e) {
      console.error('Error enviando correo de confirmación:', e);
    }
    res.status(201).json({ msg: 'Reserva pendiente de confirmación.', reserva: nuevaReserva });
  } catch (err) {
    res.status(500).json({ msg: 'Error al crear la reserva.', error: err.message });
  }
};

// Listar reservas del usuario autenticado
exports.misReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find({ usuario: req.usuario.id })
      .populate('escenario', 'nombre tipo ubicacion')
      .sort({ fecha: 1 });

    res.json(reservas);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener reservas.' });
  }
};

// Cancelar una reserva
exports.cancelarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findOne({
      _id: req.params.id,
      usuario: req.usuario.id
    });

    if (!reserva) return res.status(404).json({ msg: 'Reserva no encontrada.' });

    reserva.estado = 'cancelada';
    await reserva.save();

    res.json({ msg: 'Reserva cancelada correctamente.' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al cancelar reserva.', error: err.message });
  }
};

// Eliminar todas las reservas canceladas del usuario autenticado
exports.eliminarReservasCanceladasUsuario = async (req, res) => {
  try {
    const resultado = await Reserva.deleteMany({ usuario: req.usuario.id, estado: 'cancelada' });
    res.json({ msg: 'Reservas canceladas eliminadas permanentemente.', eliminadas: resultado.deletedCount });
  } catch (err) {
    res.status(500).json({ msg: 'Error al vaciar la papelera.', error: err.message });
  }
};

// Listar todas las reservas (admin)
exports.todasLasReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate('usuario', 'nombre correo telefono')
      .populate('escenario', 'nombre tipo ubicacion')
      .sort({ fecha: 1 });
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener reservas.' });
  }
};

// Cambiar estado de reserva (admin)
exports.cambiarEstadoReserva = async (req, res) => {
  try {
    const { estado } = req.body;
    const reserva = await Reserva.findById(req.params.id)
      .populate('usuario', 'nombre correo telefono')
      .populate('escenario', 'nombre tipo ubicacion');
    if (!reserva) return res.status(404).json({ msg: 'Reserva no encontrada.' });
    reserva.estado = estado;
    await reserva.save();
    // Enviar correo solo si se confirma
    if (estado === 'confirmada') {
      const subject = `Reserva confirmada`;
      const html = `<h3>Hola ${reserva.usuario.nombre},</h3>
        <p>¡Tu reserva ha sido <b>confirmada</b> por el administrador!</p>
        <ul>
          <li><b>Escenario:</b> ${reserva.escenario.nombre}</li>
          <li><b>Fecha:</b> ${reserva.fecha}</li>
          <li><b>Hora:</b> ${reserva.hora}</li>
        </ul>
        <p>Gracias por usar nuestro sistema.</p>`;
      try {
        await enviarCorreoReserva(reserva.usuario.correo, subject, html);
      } catch (e) {
        console.error('Error enviando correo:', e);
      }
    }
    res.json({ msg: 'Estado de reserva actualizado.', reserva });
  } catch (err) {
    res.status(500).json({ msg: 'Error al actualizar estado de reserva.' });
  }
};

// Actualizar una reserva (usuario)
exports.actualizarReservaUsuario = async (req, res) => {
  try {
    const { fecha, hora } = req.body;
    const reserva = await Reserva.findOne({ _id: req.params.id, usuario: req.usuario.id });
    if (!reserva) return res.status(404).json({ msg: 'Reserva no encontrada.' });
    if (reserva.estado === 'cancelada') return res.status(400).json({ msg: 'No se puede modificar una reserva cancelada.' });
    reserva.fecha = fecha;
    reserva.hora = hora;
    await reserva.save();
    res.json({ msg: 'Reserva actualizada correctamente.', reserva });
  } catch (err) {
    res.status(500).json({ msg: 'Error al actualizar reserva.', error: err.message });
  }
};
