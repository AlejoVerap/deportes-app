const Usuario = require('../models/usuario.model');

// Obtener todos los usuarios (requiere autenticación)
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contraseña'); // Oculta el campo contraseña
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

// Cambiar rol de usuario (solo superadmin puede asignar admin)
exports.cambiarRol = async (req, res) => {
  try {
    if (!req.usuario || req.usuario.rol !== 'superadmin') {
      return res.status(403).json({ msg: 'Solo el superadministrador puede cambiar roles.' });
    }
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado.' });
    usuario.rol = req.body.rol;
    await usuario.save();
    res.json({ msg: 'Rol actualizado correctamente.', usuario });
  } catch (error) {
    res.status(500).json({ msg: 'Error al cambiar rol.' });
  }
};
