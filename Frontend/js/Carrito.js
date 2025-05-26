function cargarCarrito() {
    const productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
    const contenedor = document.getElementById('carrito-listado');
    const totalDiv = document.getElementById('carrito-total');
    contenedor.innerHTML = '';
    let total = 0;

    if (productos.length === 0) {
        contenedor.innerHTML = '<p>No hay productos en el carrito.</p>';
        totalDiv.innerHTML = '';
        return;
    }

    productos.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto-carrito';

        const subtotal = producto.precio * producto.stock;
        total += subtotal;

        productoDiv.innerHTML = `
            <img src="http://localhost:3000/${producto.imagen}" alt="${producto.nombre}">
            <div>
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <div class="cantidad-control">
                    <button class="restar" data-index="${index}">-</button>
                    <span class="cantidad">Cantidad: ${producto.stock}</span>
                    <button class="sumar" data-index="${index}">+</button>
                </div>
                <p class="subtotal">Subtotal: $${subtotal}</p>
            </div>
        `;
        contenedor.appendChild(productoDiv);
    });

    totalDiv.innerHTML = `<h3>Total: $${total}</h3>`;
    agregarEventosCantidad();
}

function agregarEventosCantidad() {
    document.querySelectorAll('.sumar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            modificarCantidad(index, 1);
        });
    });

    document.querySelectorAll('.restar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            modificarCantidad(index, -1);
        });
    });
}

function modificarCantidad(index, cambio) {
    const productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
    if (!productos[index]) return;

    productos[index].stock += cambio;
    if (productos[index].stock < 1) productos[index].stock = 1;

    localStorage.setItem('productosComprados', JSON.stringify(productos));
    cargarCarrito(); 
}

document.getElementById('pasarTickt').addEventListener('click', () => {
    window.location.href = 'Ticket.html';
});


cargarCarrito();
