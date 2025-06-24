const express = require('express');
const router = express.Router();
const axios = require('axios');
const { soloAdmins } = require('../../middlewares/protegerVistas');

// Listar todas las ventas (solo admin)
router.get('/panelVentas', soloAdmins, async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/api/ventas', {
            headers: { Authorization: `Bearer ${req.session.token}` }
        });
        const ventas = response.data;
        res.render('admin/ventasPanel', { ventas, token: req.session.token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las ventas');
    }
});

// Mostrar detalle de una venta (solo admin)
router.get('/panelVentas/:id', soloAdmins, async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get(`http://localhost:3000/api/ventas/${id}`, {
            headers: { Authorization: `Bearer ${req.session.token}` }
        });
        const venta = response.data;
        res.render('admin/detalleVenta', { venta, token: req.session.token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el detalle de la venta');
    }
});

module.exports = router;

