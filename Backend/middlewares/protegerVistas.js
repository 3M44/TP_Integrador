module.exports = {
    soloAdmins: (req, res, next) => {
        if (!req.session.token || req.session.rol !== 'admin') {
            return res.redirect('/login');
        }
        next();
    }
};