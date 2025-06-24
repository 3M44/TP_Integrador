module.exports = {
    soloAdmins: (req, res, next) => {
        if (!req.session.usuario || req.session.usuario.rol !== 'admin') {
            return res.redirect('/login');
        }
        next();
    }
};
