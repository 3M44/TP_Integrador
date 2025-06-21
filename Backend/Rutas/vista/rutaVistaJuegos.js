const express = require('express');
const router = express.Router();
const axios = require('axios');
const { soloAdmins } = require('../../middlewares/protegerVistas');

// Mostrar el panel de juegos solo si es admin
router.get('/admin/juegos', soloAdmins, async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/api/juegos');
        const juegos = response.data;
        res.render('juegos', { juegos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los juegos');
    }
});

module.exports = router;


// Mostrar el formulario de edición de un juego
router.get('/admin/juego/editarJuego/:id', soloAdmins, async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get(`http://localhost:3000/api/juegos`);
        const juego = response.data.find(j => j.id == id);

        if (!juego) {
            return res.status(404).send('Juego no encontrado');
        }

        res.render('editarJuego', { juego });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el juego');
    }
});

module.exports = router;
