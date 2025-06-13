// middlewares/multerConfig.js
const multer = require('multer');
const path = require('path');

// Extensiones permitidas
const filtroArchivo = (req, file, cb) => {
    const tipoArchivo = /jpeg|jpg|png/;
    const extName = tipoArchivo.test(path.extname(file.originalname).toLowerCase());
    const mimeType = tipoArchivo.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Solo se permiten imágenes JPEG, JPG y PNG'));
    }
};

// Configuración para juegos
const storageJuegos = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './Estaticos/Imagenes/portada_juegos'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

// Configuración para gift cards
const storageGiftCards = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './Estaticos/Imagenes/portada_giftCards'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

// Instancias de multer con filtro
const imagenJuegos = multer({ storage: storageJuegos, filtroArchivo });
const imagenGiftCards = multer({ storage: storageGiftCards, filtroArchivo });

module.exports = { imagenJuegos, imagenGiftCards };