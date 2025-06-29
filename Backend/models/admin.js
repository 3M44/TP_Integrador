module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
        nombre: { type: DataTypes.STRING, allowNull: false },
        password: { 
            type: DataTypes.STRING, 
            allowNull: false,
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
            defaultValue: 'admin',
            validate: {
                isIn: {
                    args: [['admin']],
                    msg: 'El rol debe ser admin'
                }
            }
        }
    });

    return Admin;
}