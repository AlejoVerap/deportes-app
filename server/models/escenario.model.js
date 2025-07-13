const mongoose = require('mongoose');

const horarioSchema = new mongoose.Schema({
  dia: String, // "lunes", "martes", etc.
  horas: [String] // ["08:00", "09:00"]
});

const escenarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true }, // Ej: "fútbol", "tenis"
  ubicacion: String,
  descripcion: String,
  imagenes: [String], // URLs
  condicionesUso: String,
  precio: Number,
  disponibilidad: [horarioSchema]
}, { timestamps: true });

module.exports = mongoose.model('Escenario', escenarioSchema);