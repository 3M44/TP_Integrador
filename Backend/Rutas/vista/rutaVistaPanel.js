const express = require('express');
const router = express.Router();
const { soloAdmins } = require('../../middlewares/protegerVistas');
const { verificarSesion } = require('../../middlewares/auth');
const {panelProductos}= require('../../controladores/vistas/controladorPanel');

// Panel principal (juegos y giftcards)
router.get('/panelProductos', verificarSesion, soloAdmins, panelProductos);

module.exports = router;