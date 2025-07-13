/*const Escenario = require('../models/escenario.model');

// Crear escenario (solo admin)
exports.crearEscenario = async (req, res) => {
  try {
    const escenario = new Escenario(req.body);
    await escenario.save();
    res.status(201).json({ msg: 'Escenario creado', escenario });
  } catch (err) {
    res.status(500).json({ msg: 'Error al crear escenario', error: err.message });
  }
};

// Listar todos
exports.listarEscenarios = async (req, res) => {
  try {
    const escenarios = await Escenario.find();
    res.json(escenarios);
  } catch (err) {
    res.status(500).json({ msg: 'Error al listar escenarios' });
  }
};

// Obtener uno por ID
exports.obtenerEscenario = async (req, res) => {
  try {
    const escenario = await Escenario.findById(req.params.id);
    if (!escenario) return res.status(404).json({ msg: 'No encontrado' });
    res.json(escenario);
  } catch (err) {
    res.status(500).json({ msg: 'Error al buscar escenario' });
  }
};

// Actualizar (solo admin)
exports.actualizarEscenario = async (req, res) => {
  try {
    const escenario = await Escenario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ msg: 'Escenario actualizado', escenario });
  } catch (err) {
    res.status(500).json({ msg: 'Error al actualizar' });
  }
};

// Eliminar (solo admin)
exports.eliminarEscenario = async (req, res) => {
  try {
    await Escenario.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Escenario eliminado' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar' });
  }
};*/
const Escenario = require('../models/escenario.model');

// Crear un escenario (solo para prueba inicial)
exports.crearEscenario = async (req, res) => {
  try {
    const escenario = new Escenario(req.body);
    await escenario.save();
    res.status(201).json({ msg: 'Escenario creado correctamente.', escenario });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear el escenario.', error: error.message });
  }
};

// Listar todos los escenarios
exports.listarEscenarios = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;
    const total = await Escenario.countDocuments();
    const escenarios = await Escenario.find().skip(skip).limit(limit);
    res.json({ escenarios, total });
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener escenarios.', error: error.message });
  }
};

// Obtener un escenario por ID
exports.obtenerEscenario = async (req, res) => {
  try {
    const escenario = await Escenario.findById(req.params.id);
    if (!escenario) {
      return res.status(404).json({ msg: 'Escenario no encontrado.' });
    }
    res.json(escenario);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener escenario.', error: error.message });
  }
};

// Actualizar escenario (solo admin)
exports.actualizarEscenario = async (req, res) => {
  try {
    const escenario = await Escenario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!escenario) {
      return res.status(404).json({ msg: 'Escenario no encontrado para actualizar.' });
    }
    res.json({ msg: 'Escenario actualizado correctamente.', escenario });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar escenario.', error: error.message });
  }
};

// Eliminar escenario (solo admin)
exports.eliminarEscenario = async (req, res) => {
  try {
    const escenario = await Escenario.findByIdAndDelete(req.params.id);
    if (!escenario) {
      return res.status(404).json({ msg: 'Escenario no encontrado para eliminar.' });
    }
    res.json({ msg: 'Escenario eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar escenario.', error: error.message });
  }
};
