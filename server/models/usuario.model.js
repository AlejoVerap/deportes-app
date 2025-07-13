const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  },
  telefono: String,
  edad: Number,
  genero: String,
  escenarioDeportivo: String,
  rol: {
    type: String,
    enum: ['usuario', 'admin', 'superadmin'],
    default: 'usuario'
  }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', userSchema);
