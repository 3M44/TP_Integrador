const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Juego = sequelize.define('Juego', {
  nombre: DataTypes.STRING,
  precio: DataTypes.FLOAT,
  empresa: DataTypes.STRING,
  consola: DataTypes.STRING,
  requerimientos_minimos: DataTypes.STRING,
  stock: DataTypes.INTEGER,
  genero: DataTypes.STRING,
  puntuacion_general: DataTypes.FLOAT,
  imagen: DataTypes.STRING,
  activo: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = Juego;