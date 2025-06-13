module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        nombre: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }, 
        rol: { type: DataTypes.STRING, allowNull: false } // 'cliente' o 'admin'
    });

    Usuario.associate = (models) => {
    Usuario.hasMany(models.Venta, { foreignKey: 'UsuarioId' });
  };

    return Usuario;
};
