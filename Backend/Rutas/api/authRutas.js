const express = require('express');
const router = express.Router();
const { logout, registrarAdmin,registrarCliente,usuarioDemo } = require('../../controladores/api/controladorAuth');




router.get('/logout', logout);
router.post('/registrar-admin', registrarAdmin);
router.post('/registrar-cliente', registrarCliente);
router.get('/login/demo', usuarioDemo);


module.exports = router;