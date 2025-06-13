const { Venta, VentaProducto, Juego, GiftCard, Usuario } = require('../models');

const crearVenta = async (req, res) => {
  try {
    const { usuarioId, productos } = req.body;

    // No es necesario pero lo agregué igual por una cuestión de logica de programacion
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    let total = 0;

    // Validar stock y calcular total
    for (const prod of productos) {
      let producto;

      if (prod.productoTipo === 'Juego') {
        producto = await Juego.findByPk(prod.productoId);
      } else if (prod.productoTipo === 'GiftCard') {
        producto = await GiftCard.findByPk(prod.productoId);
      } else {
        return res.status(400).json({ message: 'Tipo de producto inválido' });
      }

      if (!producto) {
        return res.status(404).json({ message: `Producto ${prod.productoTipo} con ID ${prod.productoId} no encontrado` });
      }

      // Validar stock suficiente
      if (producto.stock < prod.cantidad) {
        return res.status(400).json({ message: `Stock insuficiente para ${prod.productoTipo} ID ${prod.productoId}` });
      }

      total += producto.precio * prod.cantidad;
    }

    // Crear la venta
    const venta = await Venta.create({ total, UsuarioId: usuarioId });

    // Crear los detalles de venta y actualizar stock
    for (const prod of productos) {
      let producto;

      if (prod.productoTipo === 'Juego') {
        producto = await Juego.findByPk(prod.productoId);
      } else {
        producto = await GiftCard.findByPk(prod.productoId);
      }

      const subtotal = producto.precio * prod.cantidad;

      await VentaProducto.create({
        VentaId: venta.id,
        productoTipo: prod.productoTipo,
        productoId: prod.productoId,
        cantidad: prod.cantidad,
        subtotal
      });

      // Actualizar stock
      producto.stock -= prod.cantidad;
      await producto.save();
    }

    res.status(201).json({ message: 'Venta registrada correctamente', ventaId: venta.id });

  } catch (error) {
    console.error('Error al registrar la venta:', error);
    res.status(500).json({ message: 'Error al registrar la venta' });
  }
};

module.exports = { crearVenta };