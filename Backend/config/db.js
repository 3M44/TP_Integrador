require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME,     // nombre de la base de datos
  process.env.DB_USER,     // usuario
  process.env.DB_PASS,     // contraseña
  {
    host: process.env.DB_HOST, // Host
    dialect: 'mysql',
    logging: false // Opcional: desactiva logs SQL
  }
);

module.exports = sequelize;