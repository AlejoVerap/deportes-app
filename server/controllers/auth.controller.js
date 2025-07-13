const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  const { nombre, correo, contraseña, telefono, edad, genero, escenarioDeportivo } = req.body;
  try {
    const existeUsuario = await Usuario.findOne({ correo });
    if (existeUsuario) return res.status(400).json({ msg: 'El correo ya está registrado.' });

    const hash = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({ nombre, correo, contraseña: hash, telefono, edad, genero, escenarioDeportivo });
    await nuevoUsuario.save();

    res.status(201).json({ msg: 'Usuario registrado correctamente.' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al registrar usuario.' });
  }
};

exports.login = async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado.' });

    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match) return res.status(401).json({ msg: 'Contraseña incorrecta.' });

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error en login.' });
  }
};

exports.perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-contraseña');
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener perfil.' });
  }
};
