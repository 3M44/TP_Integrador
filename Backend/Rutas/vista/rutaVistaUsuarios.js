
const express = require('express');
const router = express.Router();


// Vista: Formulario de login
router.get('/login', (req, res) => {
    res.render('login'); // login.ejs
});

// Vista: Logout (cerrar sesión)
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});


module.exports = router;
