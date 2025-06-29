const express = require('express');
const router = express.Router();
const { login, logout, registrarAdmin,registrarCliente } = require('../../controladores/api/controladorAuth');


router.post('/login-admin', login);

router.get('/logout', logout);
router.post('/registrar-admin', registrarAdmin);
router.post('/registrar-cliente', registrarCliente);

module.exports = router;