
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { soloAdmins } = require('../../middlewares/protegerVistas');

// Listar todas las ventas (solo admin)
router.get('/ventas', soloAdmins, async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/api/ventas', {
            headers: { Authorization: req.session.token }
        });
        const ventas = response.data;
        res.render('admin/ventasPanel', { ventas }); // Renderiza la vista ventas.ejs
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las ventas');
    }
});

// Mostrar detalle de una venta (solo admin)
router.get('/admin/ventas/:id', soloAdmins, async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get(`http://localhost:3000/api/ventas/${id}`, {
            headers: { Authorization: req.session.token }
        });
        const venta = response.data;
        res.render('detalleVenta', { venta }); // Renderiza la vista detalleVenta.ejs
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el detalle de la venta');
    }
});

module.exports = router;
