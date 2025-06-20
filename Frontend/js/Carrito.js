function cargarCarrito() {
    const productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
    const contenedor = document.getElementById('carrito-listado');
    const totalDiv = document.getElementById('carrito-total');
    contenedor.innerHTML = '';
    let total = 0;

    if (productos.length === 0) {
        contenedor.innerHTML = '<p>No hay productos en el carrito.</p>';
        return;
    }

    productos.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto-carrito';

        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        if (producto.genero){
            img = `http://localhost:3000/imagenes/juegos/${producto.imagen}`;
        } else {
            img = `http://localhost:3000/imagenes/giftcards/${producto.imagen}`;
        }

        productoDiv.innerHTML = `
            <img src="${img}" alt="${producto.nombre}">
            <div>
                <h3 class="nombre-producto" >${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <div class="cantidad-control">
                    <button class="restar" data-nombre="${producto.nombre}">-</button>
                    <span class="cantidad">Cantidad: ${producto.cantidad}</span>
                    <button class="sumar" data-nombre="${producto.nombre}">+</button>
                </div>
                <p class="subtotal">Subtotal: $${subtotal.toFixed(2)}</p>
            </div>
        `;
        contenedor.appendChild(productoDiv);
    });
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
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
            producto.cantidad += cambio;
            
            if (producto.cantidad < 1 ) {
                producto.cantidad = 1
            } else if (producto.stock < producto.cantidad) {
                producto.cantidad = producto.stock;
            }

            localStorage.setItem('productosComprados', JSON.stringify(productos));
            cargarCarrito();
        });
    });
}

document.getElementById('pasarTickt').addEventListener('click', () => {
    window.location.href = 'ticket.html';
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