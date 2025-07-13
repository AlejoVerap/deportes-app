// Script para crear el super administrador usando el correo del .env
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');

const MONGO_URI = process.env.MONGO_URI;
const EMAIL_USER = process.env.EMAIL_USER;
const PASSWORD = process.env.EMAIL_PASS || 'SuperAdmin123!';

async function crearSuperAdmin() {
  await mongoose.connect(MONGO_URI);
  const existe = await Usuario.findOne({ correo: EMAIL_USER });
  if (existe) {
    console.log('El super administrador ya existe:', EMAIL_USER);
    process.exit(0);
  }
  const hash = await bcrypt.hash(PASSWORD, 10);
  const superAdmin = new Usuario({
    nombre: 'Super Administrador',
    correo: EMAIL_USER,
    contraseña: hash,
    rol: 'admin',
  });
  await superAdmin.save();
  console.log('Super administrador creado:', EMAIL_USER);
  process.exit(0);
}

crearSuperAdmin();
