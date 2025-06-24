const express = require('express');
const router = express.Router();
const axios = require('axios');
const { soloAdmins } = require('../../middlewares/protegerVistas');

// Formulario crear juego
router.get('/crearJuego', soloAdmins, (req, res) => {
    res.render('admin/crearJuego',{token: req.session.token});
});

// Formulario editar juego
router.get('/editarJuego/:id', soloAdmins, async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get('http://localhost:3000/api/juegos');
        const juego = response.data.find(j => j.id == id);

        if (!juego) return res.status(404).send('Juego no encontrado');

        res.render('admin/editarJuego', { juego,  token: req.session.token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el juego.');
    }
});


module.exports = router;
