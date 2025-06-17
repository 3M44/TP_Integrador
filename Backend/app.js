const express = require('express');
const app = express();
require('dotenv').config();
const { sequelize } = require('./models');
const cors = require('cors');

app.use(cors());

// Rutas
const authRutas = require('./Rutas/authRutas');
const juegoRutas = require('./Rutas/rutasJuegos');
const rutasCards = require('./Rutas/rutasCards');


//Ruta de creacion de clientes/admin y login cliente
app.use('/api/auth', authRutas);
//Rutas CRUD juegos
app.use('/api/juegos', juegoRutas);
//Rutas CRUD admin
app.use('/api/giftcards', rutasCards);

// Servir imágenes de juegos
app.use('/imagenes/juegos', express.static('Estaticos/Imagenes/portada_juegos'));

// Servir imágenes de gift cards
app.use('/imagenes/giftcards', express.static('Estaticos/Imagenes/portada_giftCards'));

app.use('/imagenes/logo', express.static('Estaticos/Imagenes/logo'));

app.use('/imagenes/carrito', express.static('Estaticos/Imagenes/carrito'));




sequelize.sync({ force: false })
  .then(() =>{
     console.log('Base de datos sincronizada'),
     app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));
  })
  .catch(err => console.error('Error al sincronizar la base de datos', err));

module.exports = app;