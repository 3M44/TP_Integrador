const express = require('express');
const app = express();
require('dotenv').config();
const { sequelize } = require('./models');
<<<<<<< HEAD
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override'); 

// Configuración de sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'mi_secreto',
    resave: false,
    saveUninitialized: false
}));
=======
const cors = require('cors');

app.use(cors());
>>>>>>> 438e25fa9620ebff435119662a7031f0ede86da9

// Configuración de method-override para formularios con PUT y DELETE
app.use(methodOverride('_method'));

// Configuración de parseo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Vistas'));

// Servir imágenes estáticas
app.use('/imagenes/juegos', express.static(path.join(__dirname, 'Estaticos/Imagenes/portada_juegos')));
app.use('/imagenes/giftcards', express.static(path.join(__dirname, 'Estaticos/Imagenes/portada_giftCards')));
app.use('/imagenes/logo', express.static(path.join(__dirname, 'Estaticos/Imagenes/logo')));

// Rutas API
const authRutas = require('./Rutas/api/authRutas');
const juegoRutas = require('./Rutas/api/rutasJuegos');
const rutasCards = require('./Rutas/api/rutasCards');
const ventaRutas = require('./Rutas/api/rutaVentas');

// Rutas EJS
const vistasGenerales = require('./Rutas/vista/rutaVistaUsuarios');
const vistasJuegos = require('./Rutas/vista/rutaVistaJuegos');
const vistasGiftCards = require('./Rutas/vista/rutaVistaGiftCards');
const vistasVentas = require('./Rutas/vista/rutaVistaVentas');

// Montar rutas API
app.use('/api/auth', authRutas);
app.use('/api/juegos', juegoRutas);
app.use('/api/giftcards', rutasCards);
app.use('/api/ventas', ventaRutas);

<<<<<<< HEAD
// Montar rutas EJS
app.use('/', vistasGenerales);
app.use('/juegos', vistasJuegos); 
app.use('/giftcards', vistasGiftCards);
app.use('/ventas', vistasVentas); // vistas EJS de ventas

// Conexión con la base de datos
=======
// Servir imágenes de juegos
app.use('/imagenes/juegos', express.static('Estaticos/Imagenes/portada_juegos'));

// Servir imágenes de gift cards
app.use('/imagenes/giftcards', express.static('Estaticos/Imagenes/portada_giftCards'));

app.use('/imagenes/logo', express.static('Estaticos/Imagenes/logo'));


>>>>>>> 438e25fa9620ebff435119662a7031f0ede86da9
sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(process.env.PORT || 3000, () => console.log(`Servidor corriendo en puerto ${process.env.PORT || 3000}`));
    })
    .catch(err => console.error('Error al sincronizar la base de datos', err));

module.exports = app;
