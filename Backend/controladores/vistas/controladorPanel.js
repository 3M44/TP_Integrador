
const axios = require('axios');

exports.panelProductos= async (req, res) => {
    try {
        const juegosResponse = await axios.get('http://localhost:3000/api/juegos');
        const giftcardsResponse = await axios.get('http://localhost:3000/api/giftcards');
        const juegos = juegosResponse.data;
        const giftcards = giftcardsResponse.data;

       res.render('admin/panelProductos', {
      juegos,
      giftcards,
      token: req.session.token // PASAR EL TOKEN JWT A LA VISTA
    });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el panel de administración.');
    }
}