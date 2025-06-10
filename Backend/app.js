// Backend/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./Rutas/auth');
const productosRoutes = require('./Rutas/productos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads_juegos', express.static(path.join(__dirname, 'Estaticos', 'Imagenes', 'portada_Juegos')));
app.use('/uploads_cards', express.static(path.join(__dirname, 'Estaticos', 'Imagenes', 'portada_gifCards')));

app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);

sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch(error => console.error('Error al conectar la base de datos:', error));

sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');

  app.listen(3000, () => {
    console.log('Servidor funcionando en http://localhost:3000');
  });
});