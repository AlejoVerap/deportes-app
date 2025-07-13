const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  escenario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Escenario',
    required: true
  },
  fecha: {
    type: String, // "2025-07-05"
    required: true
  },
  hora: {
    type: String, // "10:00"
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'cancelada'],
    default: 'pendiente'
  }
}, { timestamps: true });

module.exports = mongoose.model('Reserva', reservaSchema);
