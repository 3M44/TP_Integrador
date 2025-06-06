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
                <h3 class="nombre-producto" >${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <div class="cantidad-control">
                    <button class="restar" data-nombre="${producto.nombre}">-</button>
                    <span class="cantidad">Cantidad: ${producto.stock}</span>
                    <button class="sumar" data-nombre="${producto.nombre}">+</button>
                </div>
                <p class="subtotal">Subtotal: $${subtotal.toFixed(2)}</p>
            </div>
        `;
        contenedor.appendChild(productoDiv);
    });
    totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    agregarEventosCantidad();
}

function agregarEventosCantidad() {
    document.querySelectorAll('.cantidad-control').forEach(control => {
        control.addEventListener('click', (e) => {
            if (!e.target.classList.contains('sumar') && !e.target.classList.contains('restar')) return;

            const nombre = e.target.dataset.nombre;
            const productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
            const producto = productos.find(p => p.nombre === nombre);

            const cambio = e.target.classList.contains('sumar') ? 1 : -1;
            producto.stock += cambio;
            
            if (producto.stock < 1 ) {
                producto.stock = 1
            } else if (producto.cantidad < producto.stock) {
                producto.stock = producto.cantidad;
            }

            localStorage.setItem('productosComprados', JSON.stringify(productos));
            cargarCarrito();
        });
    });
}

document.getElementById('pasarTickt').addEventListener('click', () => {
    window.location.href = 'Ticket.html';
});

function ajustarLinks() {
    const linkTicket = document.getElementById('linkTicket');
    const linkInicio = document.getElementById('linkInicio');

    linkInicio.addEventListener('click', () => {
        localStorage.removeItem('productosComprados');
        localStorage.removeItem('nombreUsuario');
    });

    if (linkTicket) {
        linkTicket.style.pointerEvents = 'none';
        linkTicket.style.color = 'gray';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const productos = JSON.parse(localStorage.getItem('productosComprados')) || [];

    if (productos.length == 0) {
        document.getElementById('pasarTickt').disabled = true;
    }

    ajustarLinks();

    cargarCarrito();
});