const { GiftCard } = require('../models');

// Crear giftcard
exports.crearGiftCard = async (req, res) => {
    const { nombre, precio, empresa, consola, requerimientos_minimos, stock, fecha_caducidad, plataformas_disponibles } = req.body;
    const imagen = req.file ? `/imagenes/giftcards/${req.file.filename}`  : null;

    try {
        const giftcard = await GiftCard.create({ nombre, precio, empresa, consola, requerimientos_minimos, stock, fecha_caducidad, plataformas_disponibles, imagen });
        res.status(201).json(giftcard);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la giftcard' });
    }
};

// Obtener todas las giftcards
exports.obtenerGiftCards = async (req, res) => {
    try {
        const giftcards = await GiftCard.findAll();
        res.json(giftcards);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener giftcards' });
    }
};

// Obtener todas las giftcards disponibles
exports.obtenerGiftCardsActivas = async (req, res) => {
    try {
        const giftCards = await GiftCard.findAll({
            where: { activo: true }
        });
        res.status(200).json(giftCards);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las gift cards activas', error });
    }
};

// Actualizar giftcard
exports.actualizarGiftCard = async (req, res) => {
    const { id } = req.params;
    const { nombre, monto } = req.body;
    const imagen = req.file ? `/imagenes/giftcards/${req.file.filename}`  : null;

    try {
        const giftcard = await GiftCard.findByPk(id);
        if (!giftcard) return res.status(404).json({ error: 'GiftCard no encontrada' });

        giftcard.nombre = nombre || giftcard.nombre;
        giftcard.monto = monto || giftcard.monto;
        if (imagen) giftcard.imagen = imagen;

        await giftcard.save();
        res.json(giftcard);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar giftcard' });
    }
};

// Eliminar giftcard
exports.eliminarGiftCard = async (req, res) => {
    const { id } = req.params;

    try {
        const giftcard = await GiftCard.findByPk(id);
        if (!giftcard) return res.status(404).json({ error: 'GiftCard no encontrada' });

        await giftcard.destroy();
        res.json({ mensaje: 'GiftCard eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar giftcard' });
    }
};