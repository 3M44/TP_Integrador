const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../../models');

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

    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio.' });

    try {
        // Validar que no exista otro cliente o admin con el mismo nombre
        const usuarioExistente = await Usuario.findOne({ where: { nombre } });
        if (usuarioExistente) return res.status(400).json({ error: 'El nombre ya está en uso.' });

        const nuevoCliente = await Usuario.create({ nombre, rol: 'cliente' });
        res.status(201).json({ mensaje: 'Cliente registrado', rol: nuevoCliente.rol });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar cliente.' });
    }
};

// Registrar administrador (nombre y contraseña)
exports.registrarAdmin = async (req, res) => {
    const { nombre, password } = req.body;

    if (!nombre || !password) return res.status(400).json({ error: 'Nombre y contraseña son obligatorios.' });

    try {
        // Validar que no exista otro usuario con ese nombre
        const usuarioExistente = await Usuario.findOne({ where: { nombre } });
        if (usuarioExistente) return res.status(400).json({ error: 'El nombre ya está en uso.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoAdmin = await Usuario.create({ nombre, password: hashedPassword, rol: 'admin' });
        const token = generarToken(nuevoAdmin);
            // Guardar token en sesión para usarlo en vistas
        req.session.token = token;
        req.session.usuario = { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol };
        res.status(201).json({ mensaje: 'Administrador registrado', token, rol: nuevoAdmin.rol });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar administrador.' });
    }
};



exports.login = async (req, res) => {
  const { nombre, password } = req.body;
  if (!nombre || !password) return res.status(400).json({ error: 'Nombre y contraseña son obligatorios.' });

  try {
    const admin = await Usuario.findOne({ where: { nombre, rol: 'admin' } });

    if (!admin) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const passwordValida = await bcrypt.compare(password, admin.password);

    if (!passwordValida) return res.status(401).json({ error: 'Contraseña incorrecta.' });

    const token = generarToken(admin);

    // No usar res.redirect acá, sino responder el token
    return res.json({ mensaje: 'Login exitoso', token, rol: admin.rol });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};


exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión.');
        }
        res.redirect('/login');
    });
};

exports.loginVista = async (req, res) => {
    const { nombre, password } = req.body;

    if (!nombre || !password) {
        return res.render('admin/login', { error: 'Nombre y contraseña son obligatorios.' });
    }

    try {
        const admin = await Usuario.findOne({ where: { nombre, rol: 'admin' } });

        if (!admin) return res.render('admin/login', { error: 'Usuario no encontrado' });

        const passwordValida = await bcrypt.compare(password, admin.password);

        if (!passwordValida) return res.render('admin/login', { error: 'Contraseña incorrecta' });

        
        const token = generarToken(admin);
        req.session.token = token;
        req.session.usuario = { id: admin.id, nombre: admin.nombre, rol: admin.rol };

       
        return res.redirect('/admin/panelProductos');

    } catch (error) {
        console.error(error);
        res.render('admin/login', { error: 'Error en el servidor' });
    }
}