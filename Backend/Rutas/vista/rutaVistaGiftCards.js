
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { soloAdmins } = require('../../middlewares/protegerVistas');

// Vista protegida de giftcards
router.get('/admin/giftcards', soloAdmins, async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/api/giftcards'); // API de giftcards
        const giftcards = response.data;
        res.render('giftcards', { giftcards }); // Renderiza giftcards.ejs
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las giftcards');
    }
});

router.get('/admin/giftcard/editarGiftCard/:id', soloAdmins, async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get('http://localhost:3000/api/giftcards');
        const giftcard = response.data.find(g => g.id == id);

        if (!giftcard) {
            return res.status(404).send('Gift Card no encontrada');
        }

        res.render('editarGiftCard', { giftcard });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la gift card');
    }
});


module.exports = router;