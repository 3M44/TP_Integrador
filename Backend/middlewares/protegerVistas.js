module.exports = {
    soloAdmins: (req, res, next) => {
        if (!req.session.admin || req.session.admin.rol !== 'admin') {
            return res.redirect('/login');
        }
        next();
    }
};
