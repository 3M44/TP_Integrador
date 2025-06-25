const { Venta, VentaProducto, Juego, GiftCard, Usuario } = require('../../models');

exports.crearVenta = async (req, res) => {
  try {
    const { nombreUsuario, productos } = req.body;

    // Buscar usuario por nombre en vez de por id
    const usuario = await Usuario.findOne({ where: { nombre: nombreUsuario } });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    const usuarioId = usuario.id;

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

      if (producto.stock < prod.cantidad) {
        return res.status(400).json({ message: `Stock insuficiente para ${prod.productoTipo} ID ${prod.productoId}` });
      }

      total += producto.precio * prod.cantidad;
    }

    // Crear la venta
    const venta = await Venta.create({ total, UsuarioId: usuarioId });

    // Crear detalles de venta y actualizar stock
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

exports.obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: [
        { model: Usuario, attributes: ['id', 'nombre'] },
        { model: VentaProducto }
      ]
    });
    res.json(ventas);
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    res.status(500).json({ mensaje: 'Error al obtener las ventas.' });
  }
};

exports.obtenerDetalleVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const venta = await Venta.findByPk(id, {
      include: [
        { model: Usuario, attributes: ['id', 'nombre'] },
        { model: VentaProducto }
      ]
    });
    if (!venta) return res.status(404).json({ mensaje: 'Venta no encontrada.' });
    res.json(venta);
  } catch (error) {
    console.error('Error al obtener el detalle de la venta:', error);
    res.status(500).json({ mensaje: 'Error al obtener el detalle de la venta.' });
  }
};
