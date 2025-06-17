const express = require('express');
const app = express();
require('dotenv').config();
const { sequelize } = require('./models');
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir imágenes estáticas
app.use('/imagenes', express.static('public/imagenes'));

// Rutas
const authRutas = require('./Rutas/api/authRutas');
const juegoRutas = require('./Rutas/api/rutasJuegos');
const rutasCards = require('./Rutas/api/rutasCards');
const ventaRutas = require('./Rutas/api/rutaVentas');


app.use('/api/ventas', ventaRutas);

// Rutas de autenticación
app.use('/api/auth', authRutas);

// Rutas CRUD de juegos
app.use('/api/juegos', juegoRutas);

// Rutas CRUD de giftcards
app.use('/api/giftcards', rutasCards);

<<<<<<< HEAD
app.use('/imagenes/juegos', express.static(path.join(__dirname, 'Estaticos/Imagenes/juegos')));
app.use('/imagenes/giftcards', express.static(path.join(__dirname, 'Estaticos/Imagenes/giftcards')));
=======
// Servir imágenes de juegos
app.use('/imagenes/juegos', express.static('Estaticos/Imagenes/portada_juegos'));

// Servir imágenes de gift cards
app.use('/imagenes/giftcards', express.static('Estaticos/Imagenes/portada_giftCards'));

app.use('/imagenes/logo', express.static('Estaticos/Imagenes/logo'));


>>>>>>> 8614c6811f57aa37916f2fa93ed942bba50b2d93


// Conexión con la base de datos
sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(process.env.PORT || 3000, () => console.log(`Servidor corriendo en puerto ${process.env.PORT || 3000}`));
    })
    .catch(err => console.error('Error al sincronizar la base de datos', err));

module.exports = app;