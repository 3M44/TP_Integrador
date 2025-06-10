const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ error: 'Acceso denegado. Falta token.' });

  try {
    const verificar = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificar;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = verificarToken;