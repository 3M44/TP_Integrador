const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

// Generar token JWT
const generarToken = (usuario) => {
    return jwt.sign(
        { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Registrar cliente (solo nombre)
exports.registrarCliente = async (req, res) => {
    const { nombre } = req.body;

    try {
        const nuevoCliente = await Usuario.create({ nombre, rol: 'cliente' });
        const token = generarToken(nuevoCliente);
        res.status(201).json({ mensaje: 'Cliente registrado', token });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar cliente' });
    }
};

// Registrar administrador (nombre y contraseña)
exports.registrarAdmin = async (req, res) => {
    const { nombre, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoAdmin = await Usuario.create({ nombre, password: hashedPassword, rol: 'admin' });
        const token = generarToken(nuevoAdmin);
        res.status(201).json({ mensaje: 'Administrador registrado', token });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar administrador' });
    }
};

// Login de administrador
exports.loginAdmin = async (req, res) => {
    const { nombre, password } = req.body;

    try {
        const admin = await Usuario.findOne({ where: { nombre, rol: 'admin' } });

        if (!admin) {
            return res.status(404).json({ error: 'Administrador no encontrado' });
        }

        const passwordValida = await bcrypt.compare(password, admin.password);

        if (!passwordValida) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        const token = generarToken(admin);
        res.json({ mensaje: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};