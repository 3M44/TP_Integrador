const express = require('express');
const router = express.Router();
const { login, logout, registrarAdmin } = require('../../controladores/api/controladorAuth');


router.post('/login-admin', login);
router.get('/logout', logout);
router.post('/registrar-admin', registrarAdmin);

module.exports = router;