const router = require('express').Router();
const { obtenerUsuarios, cambiarRol } = require('../controllers/usuario.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Ruta protegida: solo con token
router.get('/', authMiddleware, obtenerUsuarios);
router.put('/rol/:id', authMiddleware, cambiarRol);

module.exports = router;
