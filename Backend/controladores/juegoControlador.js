const { Juego } = require('../models');

// Crear juego
exports.crearJuego = async (req, res) => {
    const { nombre, precio, empresa, consola, requerimientos_minimos, stock, genero, puntuacion_general } = req.body;
    const imagen = req.file ? `/imagenes/juegos/${req.file.filename}`  : null;

    try {
        const juego = await Juego.create({ nombre, precio, empresa, consola, requerimientos_minimos, stock, genero, puntuacion_general, imagen });
        res.status(201).json(juego);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el juego' });
    }
};

// Obtener todos los juegos
exports.obtenerJuegos = async (req, res) => {
    try {
        const juegos = await Juego.findAll();
        res.json(juegos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener juegos' });
    }
};

// Obtener todas los juegos
exports.obtenerJuegosActivos = async (req, res) => {
    try {
        const juegos = await GiftCard.findAll({
            where: { activo: true }
        });
        res.status(200).json(juegos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los juegos', error });
    }
};

// Actualizar juego
exports.actualizarJuego = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;
    const imagen = req.file ? `/imagenes/juegos/${req.file.filename}`  : null;

    try {
        const juego = await Juego.findByPk(id);
        if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });

        juego.nombre = nombre || juego.nombre;
        juego.descripcion = descripcion || juego.descripcion;
        juego.precio = precio || juego.precio;
        if (imagen) juego.imagen = imagen;

        await juego.save();
        res.json(juego);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar juego' });
    }
};

// Eliminar juego
exports.eliminarJuego = async (req, res) => {
    const { id } = req.params;

    try {
        const juego = await Juego.findByPk(id);
        if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });

        await juego.destroy();
        res.json({ mensaje: 'Juego eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar juego' });
    }
};