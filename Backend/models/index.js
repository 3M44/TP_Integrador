const { Sequelize, DataTypes  } = require('sequelize');

const sequelize = require('../config/db'); 


const Usuario = require('./usuario')(sequelize, require('sequelize').DataTypes);
const Juego = require('./juego')(sequelize, require('sequelize').DataTypes);
const GiftCard = require('./giftCard')(sequelize, require('sequelize').DataTypes);

const Venta = require('./venta')(sequelize, DataTypes);
const VentaProducto = require('./ventaProducto')(sequelize, DataTypes);

// Asociaciones
Venta.associate({ Usuario, VentaProducto });
VentaProducto.associate({ Venta });


// Exportar conexión y modelos
module.exports = { sequelize, Usuario, Juego, GiftCard };