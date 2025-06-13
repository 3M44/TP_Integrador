const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ error: 'Acceso denegado. No token proporcionado.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido' });
    }
};

exports.esAdmin = (req, res, next) => {
    if (req.usuario.rol !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado. Requiere rol de administrador.' });
    }
    next();
};