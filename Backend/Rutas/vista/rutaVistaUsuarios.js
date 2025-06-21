const express = require('express');
const router = express.Router();
const { Usuario } = require('../../models');  // Modelo Sequelize Usuario
const bcrypt = require('bcrypt'); // Si guardás password hasheada

// GET login (ya lo tenés)
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// POST login
router.post('/login', async (req, res) => {
  const { nombre, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { nombre } });

    if (!usuario) {
      return res.render('login', { error: 'Usuario no encontrado' });
    }

    // Validar contraseña (si no está en claro, sino quitá bcrypt)
    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) {
      return res.render('login', { error: 'Contraseña incorrecta' });
    }

    // Guardar datos en sesión
    req.session.usuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      rol: usuario.rol
    };

    // Redirigir según rol
    if (usuario.rol === 'admin') {
      return res.redirect('/admin'); // Ruta de admin, por ejemplo
    } else {
      return res.redirect('/cliente'); // Ruta cliente o home
    }

  } catch (error) {
    console.error(error);
    res.render('login', { error: 'Error en el servidor' });
  }
});

module.exports = router;
