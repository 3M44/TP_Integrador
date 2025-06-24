module.exports = (sequelize, DataTypes) => {
    const Juego = sequelize.define('Juego', {
        nombre: { type: DataTypes.STRING, allowNull: false },
        precio: { type: DataTypes.FLOAT, allowNull: false },
        empresa: { type: DataTypes.STRING, allowNull: false },
        consola: { type: DataTypes.STRING, allowNull: false },
        requerimientos_minimos: { type: DataTypes.STRING, allowNull: false },
        stock: { type: DataTypes.INTEGER, allowNull: false },
        genero: { type: DataTypes.STRING, allowNull: true },
        puntuacion_general: { type: DataTypes.FLOAT, allowNull: true },
        activo: { type: DataTypes.BOOLEAN, defaultValue: true } ,
        imagen: { type: DataTypes.STRING, allowNull: true }
    });


    // Hook para desactivar el juego automaticamente
    Juego.beforeSave((juego, options) => {
        if (juego.stock <= 0) {
            juego.activo = false;
        } 
    });

    return Juego;
};