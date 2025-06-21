module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        nombre: { type: DataTypes.STRING, allowNull: false },
        password: { 
            type: DataTypes.STRING, 
            allowNull: true, // Solo requerido para admins
            validate: {
                isLongEnough(value) {
                    if (this.rol === 'admin' && (!value || value.length < 6)) {
                        throw new Error('La contraseña de administrador debe tener al menos 6 caracteres');
                    }
                    
                }
            }
        },
        rol: { 
            type: DataTypes.STRING, 
            allowNull: false, 
            validate: {
                isIn: {
                    args: [['admin', 'cliente']],
                    msg: 'El rol debe ser admin o cliente'
                }
            }
        }
    });

    Usuario.associate = (models) => {
        
        Usuario.hasMany(models.Venta, { foreignKey: 'UsuarioId' });
    };

    return Usuario;
}