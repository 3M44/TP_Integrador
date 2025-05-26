const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000;
const db = require('./config/db');

app.use(cors());
app.use(express.json()); 
app.use(express.static(__dirname + '/Estaticos'));

app.get('/', (req, res) => {
  res.send('Servidor Express en funcionamiento');
});

app.post('/continuar', (req, res) => {
    const { nombre } = req.body;

    if (nombre.trim() == "") {
        return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    console.log("Nombre recibido:", nombre); 
    res.json({ status: "ok", mensaje: `Nombre ${nombre} recibido` });
});

app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error en la consulta de productos" });
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});