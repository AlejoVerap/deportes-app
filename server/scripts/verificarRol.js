// Script para verificar el rol de un usuario por correo
require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('../models/usuario.model');

const MONGO_URI = process.env.MONGO_URI;

async function verificarRol(correo) {
  await mongoose.connect(MONGO_URI);
  const usuario = await Usuario.findOne({ correo });
  if (!usuario) {
    console.log('Usuario no encontrado:', correo);
    process.exit(1);
  }
  console.log('Rol de', correo, 'es:', usuario.rol);
  process.exit(0);
}

// USO: node scripts/verificarRol.js correo@correo.com
if (require.main === module) {
  const [,, correo] = process.argv;
  if (!correo) {
    console.log('Uso: node scripts/verificarRol.js correo@correo.com');
    process.exit(1);
  }
  verificarRol(correo);
}
