const express = require('express');
const router = express.Router();
const axios = require('axios');
const { soloAdmins } = require('../../middlewares/protegerVistas');

// Panel principal (juegos y giftcards)
router.get('/panelProductos', soloAdmins, async (req, res) => {
    try {
        const juegosResponse = await axios.get('http://localhost:3000/api/juegos');
        const giftcardsResponse = await axios.get('http://localhost:3000/api/giftcards');
        const juegos = juegosResponse.data;
        const giftcards = giftcardsResponse.data;

       res.render('admin/panelProductos', {
      juegos,
      giftcards,
      token: req.session.token // PASAR EL TOKEN JWT A LA VISTA
    });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el panel de administración.');
    }
});

module.exports = router;