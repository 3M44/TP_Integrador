require('dotenv').config();
const express = require('express');
const router = express.Router();
const Usuario = require('../modelos/administrador');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Registro
router.post('/registro', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) return res.status(400).json({ error: 'El correo ya está registrado' });

    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: passwordEncriptada
    });

    res.json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(400).json({ error: 'Correo no registrado' });

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;