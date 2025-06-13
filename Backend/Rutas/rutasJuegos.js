const express = require('express');
const router = express.Router();
const { crearJuego, obtenerJuegos, obtenerJuegosActivos, actualizarJuego, eliminarJuego } = require('../controladores/juegoControlador');
const { verificarToken, esAdmin } = require('../middlewares/auth');
const { imagenJuegos } = require('../middlewares/cargarImagenes');

// CRUD protegido por admin
router.post('/', verificarToken, esAdmin, imagenJuegos.single('imagen'), crearJuego);//Protegido por rol
router.get('/', obtenerJuegos); // Disponible para todos
router.get('/', obtenerJuegosActivos); 
router.put('/:id', verificarToken, esAdmin, imagenJuegos.single('imagen'), actualizarJuego);//Protegido por rol
router.delete('/:id', verificarToken, esAdmin, eliminarJuego);//Protegido por rol

module.exports = router;