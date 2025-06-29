const express = require('express');
const router = express.Router();
const { Admin } = require('../../models');
const bcrypt = require('bcrypt');
const { loginVista } = require('../../controladores/api/controladorAuth');


// GET login
router.get('/login', (req, res) => {
    res.render('admin/login', { error: null });
});

// POST login EJS
router.post('/login', loginVista);

module.exports = router;