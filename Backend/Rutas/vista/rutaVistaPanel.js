const express = require('express');
const router = express.Router();
const { soloAdmins } = require('../../middlewares/protegerVistas');
const {panelProductos}= require('../../controladores/vistas/controladorPanel');

// Panel principal (juegos y giftcards)
router.get('/panelProductos', panelProductos);

module.exports = router;