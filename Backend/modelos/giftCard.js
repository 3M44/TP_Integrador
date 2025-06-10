const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GiftCard = sequelize.define('GiftCard', {
  nombre: DataTypes.STRING,
  precio: DataTypes.FLOAT,
  empresa: DataTypes.STRING,
  consola: DataTypes.STRING,
  requerimientos_minimos: DataTypes.STRING,
  stock: DataTypes.INTEGER,
  fecha_caducidad: DataTypes.DATE,
  plataformas_disponibles: DataTypes.STRING,
  imagen: DataTypes.STRING,  
  activo: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = GiftCard;