const express = require('express');
const router = express.Router();
const {
  crearEscenario,
  listarEscenarios,
  obtenerEscenario,
  actualizarEscenario,
  eliminarEscenario
} = require('../controllers/escenario.controller');

const verificarToken = require('../middlewares/auth.middleware');
const esAdmin = require('../middlewares/admin.middleware');

router.get('/', listarEscenarios);
router.get('/:id', obtenerEscenario);

// Rutas protegidas por token y rol admin
router.post('/', verificarToken, esAdmin, crearEscenario); 
/*router.post('/', crearEscenario);*/

router.put('/:id', verificarToken, esAdmin, actualizarEscenario);
router.delete('/:id', verificarToken, esAdmin, eliminarEscenario);

module.exports = router;
