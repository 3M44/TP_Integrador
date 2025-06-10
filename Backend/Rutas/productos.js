const express = require('express');
const router = express.Router();
const multer = require('multer');//Subida de imagenes
const path = require('path');
const fs = require('fs'); // Módulo para operaciones de sistema de archivos
const { body, validationResult } = require('express-validator'); // Para validación de datos


const verificarToken = require('../middlewares/auth');
const Juego = require('../modelos/juego');
const GiftCard = require('../modelos/giftCard');



const UPLOAD_BASE_DIR = path.join(__dirname, '..', 'Estaticos', 'Imagenes');


const JUEGOS_UPLOAD_DIR = path.join(UPLOAD_BASE_DIR, 'portada_Juegos');
const GIFTCARDS_UPLOAD_DIR = path.join(UPLOAD_BASE_DIR, 'portada_GiftCards'); 

// --- Configuración de Multer para Subida de Imágenes ---

// Para Juegos
const storageJuegos = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, JUEGOS_UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});
const uploadJuegos = multer({ storage: storageJuegos }); 

// Para Gift Cards
const storageCards = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, GIFTCARDS_UPLOAD_DIR); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});
const uploadCards = multer({ storage: storageCards }); 


// --- Funciones para Eliminar Imágenes ---

// Función unificada para eliminar imágenes, maneja errores de archivo no encontrado
const eliminarImagen = (nombreImagen, tipoProducto) => {
    if (!nombreImagen) return;

    let rutaCarpeta;
    if (tipoProducto === 'juego') {
        rutaCarpeta = JUEGOS_UPLOAD_DIR;
    } else if (tipoProducto === 'giftcard') {
        rutaCarpeta = GIFTCARDS_UPLOAD_DIR;
    } else {
        console.error('Tipo de producto desconocido para eliminar imagen:', tipoProducto);
        return;
    }

    const rutaImagenCompleta = path.join(rutaCarpeta, nombreImagen);
    fs.unlink(rutaImagenCompleta, (err) => {
        if (err) {
            // Si el archivo no existe (ENOENT), no es un error crítico, solo una advertencia
            if (err.code === 'ENOENT') {
                console.warn(`Advertencia: La imagen ${nombreImagen} no existe en ${rutaCarpeta}.`);
            } else {
                console.error('Error al eliminar la imagen:', err);
            }
        } else {
            console.log(`Imagen ${nombreImagen} eliminada correctamente de ${rutaCarpeta}.`);
        }
    });
};

// --- Rutas de Juegos ---

router.post('/juegos',
    verificarToken, 
    uploadJuegos.single('imagen'), 
    [ 
        body('nombre').notEmpty().withMessage('El nombre del juego es obligatorio.'),
        body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo.'),
        body('empresa').notEmpty().withMessage('La empresa es obligatoria.'),
        body('consola').notEmpty().withMessage('La consola es obligatoria.'),
        body('genero').notEmpty().withMessage('El género es obligatorio.'),
        body('puntuacion_general').isFloat({ min: 0, max: 10 }).optional().withMessage('La puntuación debe ser entre 0 y 10.'),        
    ],
    async (req, res) => {
        const errors = validationResult(req); // Recoge los errores de validación
       
        if (!req.file) {
            return res.status(400).json({ errores: [{ msg: 'La imagen del juego es obligatoria.' }] });
        }       
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        try {
            const juego = await Juego.create({
                ...req.body,
                imagen: req.file.filename 
            });
            res.status(201).json(juego); 
        } catch (error) {
            console.error('Error al crear juego:', error);
            res.status(500).json({ error: 'Error interno del servidor al crear el juego.' });
        }
    }
);


router.get('/juegos', async (req, res) => {
    try {
        const juegos = await Juego.findAll({ where: { activo: true } });

        const juegosUrl = juegos.map(juego => {
            const juegoData = juego.toJSON(); 
            if (juegoData.imagen) {
                juegoData.imagen = `http://localhost:3000/uploads/juegos/${juegoData.imagen}`;
            }
            return juegoData;
        });
        res.json(juegosUrl);
    } catch (error) {
        console.error('Error al obtener juegos:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener los juegos.' });
    }
});

// 3. Obtener un juego por ID (GET /juegos/:id)
router.get('/juegos/:id', async (req, res) => {
    try {
        const juego = await Juego.findByPk(req.params.id);
        // Verifica si el juego existe y si está activo
        if (!juego || !juego.activo) {
            return res.status(404).json({ error: 'Juego no encontrado o inactivo.' });
        }

        const juegoUrl = juego.toJSON();
        if (juegoUrl.imagen) {
            juegoUrl.imagen = `http://localhost:3000/uploads/juegos/${juegoUrl.imagen}`;
        }

        res.json(juegoUrl);
    } catch (error) {
        console.error('Error al obtener juego por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener el juego.' });
    }
});

// 4. Actualizar un juego existente (PUT /juegos/:id)
router.put('/juegos/:id',
    verificarToken,
    uploadJuegos.single('imagen'),
    [
        body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío.'),
        body('precio').optional().isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo.'),
        body('empresa').notEmpty().withMessage('La empresa es obligatoria.'),
        body('consola').notEmpty().withMessage('La consola es obligatoria.'),
        body('genero').notEmpty().withMessage('El género es obligatorio.'),
        body('puntuacion_general').isFloat({ min: 0, max: 10 }).optional().withMessage('La puntuación debe ser entre 0 y 10.'),          
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        try {
            const juego = await Juego.findByPk(req.params.id);
            if (!juego) return res.status(404).json({ error: 'Juego no encontrado.' });

            
            let nuevaImagenNombre = juego.imagen; 

            if (req.file) { 
                if (juego.imagen) {
                    eliminarImagen(juego.imagen, 'juego');
                }
                nuevaImagenNombre = req.file.filename; 
            }

            await juego.update({
                ...req.body,
                imagen: nuevaImagenNombre 
            });

            res.json(juego);
        } catch (error) {
            console.error('Error al actualizar juego:', error);
            res.status(500).json({ error: 'Error interno del servidor al actualizar el juego.' });
        }
    }
);

router.delete('/juegos/:id', verificarToken, async (req, res) => {
    try {
        const juego = await Juego.findByPk(req.params.id);
        if (!juego) return res.status(404).json({ error: 'Juego no encontrado.' });

       
        await juego.update({ activo: false, imagen: null });

        res.json({ mensaje: 'Juego desactivado correctamente.' });
    } catch (error) {
        console.error('Error al desactivar juego:', error);
        res.status(500).json({ error: 'Error interno del servidor al desactivar el juego.' });
    }
});


router.patch('/juegos/:id/reactivar', verificarToken, async (req, res) => {
    try {
        const juego = await Juego.findByPk(req.params.id);
        if (!juego) return res.status(404).json({ error: 'Juego no encontrado.' });

        await juego.update({ activo: true });

        res.json({ mensaje: 'Juego reactivado correctamente.', juego });
    } catch (error) {
        console.error('Error al reactivar juego:', error);
        res.status(500).json({ error: 'Error interno del servidor al reactivar el juego.' });
    }
});


router.post('/giftcards',
    verificarToken,
    uploadCards.single('imagen'), 
    [ 
        body('nombre').notEmpty().withMessage('El nombre de la Gift Card es obligatorio.'),
        body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo.'),
        body('empresa').notEmpty().withMessage('La empresa es obligatoria.'),
        body('plataformas_disponibles').notEmpty().withMessage('Las plataformas disponibles son obligatorias.'),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!req.file) {
            
            return res.status(400).json({ errores: [{ msg: 'La imagen de la Gift Card es obligatoria.' }] });
        }
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        try {
            const giftCard = await GiftCard.create({
                ...req.body, // Expande los datos del body
                imagen: req.file.filename // Usamos req.file.filename directamente, ya que confirmamos que existe
            });
            res.status(201).json(giftCard); // 201 Created para indicar que el recurso fue creado
        } catch (error) {
            console.error('Error al crear Gift Card:', error);
            res.status(500).json({ error: 'Error interno del servidor al crear la Gift Card.' });
        }
    }
);

// 2. Obtener TODAS las Gift Cards activas (GET /giftcards)
router.get('/giftcards', async (req, res) => {
    try {
        const giftCards = await GiftCard.findAll({ where: { activo: true } });
        const giftCardsUrl = giftCards.map(card => {
            const cardData = card.toJSON();
            if (cardData.imagen) {
                cardData.imagen = `http://localhost:3000/uploads/giftcards/${cardData.imagen}`; 
            }
            return cardData;
        });
        res.json(giftCardsUrl);
    } catch (error) {
        console.error('Error al obtener Gift Cards:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener las Gift Cards.' });
    }
});


router.get('/giftcards/:id', async (req, res) => {
    try {
        const giftCard = await GiftCard.findByPk(req.params.id);
        if (!giftCard || !giftCard.activo) {
            return res.status(404).json({ error: 'Gift Card no encontrada o inactiva.' });
        }
        const cardUrl = giftCard.toJSON();
        if (cardUrl.imagen) {
            cardUrl.imagen = `http://localhost:3000/uploads/giftcards/${cardUrl.imagen}`;
        }
        res.json(cardUrl);
    } catch (error) {
        console.error('Error al obtener Gift Card por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener la Gift Card.' });
    }
});

// 4. Actualizar una Gift Card existente (PUT /giftcards/:id)
router.put('/giftcards/:id',
    verificarToken,
    uploadCards.single('imagen'),
    [ // Validaciones para la actualización de Gift Cards
        body('nombre').notEmpty().withMessage('El nombre de la Gift Card es obligatorio.'),
        body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo.'),
        body('empresa').notEmpty().withMessage('La empresa es obligatoria.'),
        body('plataformas_disponibles').notEmpty().withMessage('Las plataformas disponibles son obligatorias.'),
       
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        try {
            const giftCard = await GiftCard.findByPk(req.params.id);
            if (!giftCard) return res.status(404).json({ error: 'Gift Card no encontrada.' });

            let nuevaImagenNombre = giftCard.imagen;
            if (req.file) {
                if (giftCard.imagen) {
                    eliminarImagen(giftCard.imagen, 'giftcard');
                }
                nuevaImagenNombre = req.file.filename;
            } 

            await giftCard.update({
                ...req.body,
                imagen: nuevaImagenNombre
            });
            res.json(giftCard);
        } catch (error) {
            console.error('Error al actualizar Gift Card:', error);
            res.status(500).json({ error: 'Error interno del servidor al actualizar la Gift Card.' });
        }
    }
);

// 5. Eliminar (desactivar) una Gift Card (DELETE /giftcards/:id)
router.delete('/giftcards/:id', verificarToken, async (req, res) => {
    try {
        const giftCard = await GiftCard.findByPk(req.params.id);
        if (!giftCard) return res.status(404).json({ error: 'Gift Card no encontrada.' });     

        await giftCard.update({ activo: false, imagen: null });
        res.json({ mensaje: 'Gift Card desactivada correctamente.' });
    } catch (error) {
        console.error('Error al desactivar Gift Card:', error);
        res.status(500).json({ error: 'Error interno del servidor al desactivar la Gift Card.' });
    }
});

// 6. Reactivar una Gift Card (PATCH /giftcards/:id/reactivar)
router.patch('/giftcards/:id/reactivar', verificarToken, async (req, res) => {
    try {
        const giftCard = await GiftCard.findByPk(req.params.id);
        if (!giftCard) return res.status(404).json({ error: 'Gift Card no encontrada.' });

        await giftCard.update({ activo: true });
        res.json({ mensaje: 'Gift Card reactivada correctamente.', giftCard });
    } catch (error) {
        console.error('Error al reactivar Gift Card:', error);
        res.status(500).json({ error: 'Error interno del servidor al reactivar la Gift Card.' });
    }
});


module.exports = router;