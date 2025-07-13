// Script para verificar la contraseña de un usuario por correo
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');

const MONGO_URI = process.env.MONGO_URI;

async function verificarPassword(correo, password) {
  await mongoose.connect(MONGO_URI);
  const usuario = await Usuario.findOne({ correo });
  if (!usuario) {
    console.log('Usuario no encontrado:', correo);
    process.exit(1);
  }
  const match = await bcrypt.compare(password, usuario.contraseña);
  if (match) {
    console.log('La contraseña es CORRECTA para:', correo);
  } else {
    console.log('La contraseña es INCORRECTA para:', correo);
  }
  process.exit(0);
}

// USO: node scripts/verificarPassword.js correo@nueva.com Password123!
if (require.main === module) {
  const [,, correo, password] = process.argv;
  if (!correo || !password) {
    console.log('Uso: node scripts/verificarPassword.js correo@nueva.com Password123!');
    process.exit(1);
  }
  verificarPassword(correo, password);
}
