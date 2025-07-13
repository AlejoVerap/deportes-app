// Script para cambiar la contraseña de un usuario por correo
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');

const MONGO_URI = process.env.MONGO_URI;

async function cambiarPassword(correo, nuevaPassword) {
  await mongoose.connect(MONGO_URI);
  const usuario = await Usuario.findOne({ correo });
  if (!usuario) {
    console.log('Usuario no encontrado:', correo);
    process.exit(1);
  }
  const hash = await bcrypt.hash(nuevaPassword, 10);
  usuario.contraseña = hash;
  await usuario.save();
  console.log('Contraseña actualizada para:', correo);
  process.exit(0);
}

// USO: node scripts/cambiarPassword.js correo@nueva.com NuevaPassword123!
if (require.main === module) {
  const [,, correo, nuevaPassword] = process.argv;
  if (!correo || !nuevaPassword) {
    console.log('Uso: node scripts/cambiarPassword.js correo@nueva.com NuevaPassword123!');
    process.exit(1);
  }
  cambiarPassword(correo, nuevaPassword);
}
