const express = require('express');
const router = express.Router();
const { registrarCliente, registrarAdmin, loginAdmin } = require('../../controladores/api/controladorAuth');

router.post('/registrar-cliente', registrarCliente);
router.post('/registrar-admin', registrarAdmin);
router.post('/login-admin', loginAdmin);

module.exports = router;