module.exports = (req, res, next) => {
  if (req.usuario && (req.usuario.rol === 'admin' || req.usuario.rol === 'superadmin')) {
    return next();
  }
  return res.status(403).json({ msg: 'Acceso denegado. Se requiere rol de administrador.' });
};
