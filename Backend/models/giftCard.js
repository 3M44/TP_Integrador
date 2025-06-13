module.exports = (sequelize, DataTypes) => {
    const GiftCard = sequelize.define('GiftCard', {
        nombre: { type: DataTypes.STRING, allowNull: false },
        precio: { type: DataTypes.FLOAT, allowNull: false },
        empresa: { type: DataTypes.STRING, allowNull: false },
        consola: { type: DataTypes.STRING, allowNull: false },
        requerimientos_minimos: { type: DataTypes.STRING, allowNull: false },
        stock: { type: DataTypes.INTEGER, allowNull: false },
        fecha_caducidad: { type: DataTypes.DATE, allowNull: false },
        plataformas_disponibles: { type: DataTypes.STRING, allowNull: false },        
        imagen: { type: DataTypes.STRING, allowNull: true },
        activo: { type: DataTypes.BOOLEAN, defaultValue: true } 
    });

     // Hook para actualizar el campo "activo" automáticamente
    GiftCard.beforeSave((giftCard, options) => {
        if (giftCard.stock <= 0) {
            giftCard.activo = false;
        } else {
            giftCard.activo = true;
        }
    });

    return GiftCard;
};