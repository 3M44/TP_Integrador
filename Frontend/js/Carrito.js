document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('carrito-lista');
    const totalElement = document.getElementById('total');
    const finalizarBtn = document.getElementById('finalizarCompra');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;

    carrito.forEach((producto, index) => {
        const div = document.createElement('div');
        div.className = 'producto';
        const subtotal = producto.precio * producto.cantidad;
        div.innerHTML = `
            <h4>${producto.nombre}</h4>
            <p>Precio: $${producto.precio} x ${producto.cantidad} = $${subtotal.toFixed(2)}</p>
            <button class="btn-filtro" onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        contenedor.appendChild(div);
        total += subtotal;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
});

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    location.reload();
}

function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload();
}

function finalizarCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    localStorage.setItem('productosComprados', JSON.stringify(carrito));
    window.location.href = 'ticket.html';
}

