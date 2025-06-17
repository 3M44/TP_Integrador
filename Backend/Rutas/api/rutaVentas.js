const express = require('express');
const router = express.Router();
const venta = require('../../controladores/api/controladorVenta');
const {obtenerVentas, obtenerDetalleVenta}= require('../../controladores/api/controladorVenta');
const { verificarToken , esAdmin} = require('../../middlewares/auth');

// Registrar venta
router.post('/', verificarToken, esAdmin, venta.crearVenta);

// Listar ventas (opcional: solo admins)
router.get('/', verificarToken, esAdmin, obtenerVentas);

// Solo admin ve detalle
router.get('/:id', verificarToken, esAdmin, obtenerDetalleVenta);


module.exports = router;