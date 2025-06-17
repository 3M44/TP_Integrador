function generarDatosTicket() {
    const productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
    const fecha = new Date().toLocaleDateString();
    const empresa = "GameGift";

    let total = 0;
    productos.forEach(p => {
        total += p.precio * p.cantidad;
    });

    return {
        empresa,
        fecha,
        productos,
        total: total.toFixed(2)
    };
}

function mostrarTicketHTML() {
    const datos = generarDatosTicket();
    const contenedor = document.getElementById('ticket-info');

    if (datos.productos.length === 0) {
        contenedor.innerHTML = '<p>No hay productos en el carrito.</p>';
        return;
    }

    let html = `
        <p>Empresa: ${datos.empresa}</p>
        <p>Fecha: ${datos.fecha}</p>
        <hr>
        <h3>Productos:</h3>
    `;

    datos.productos.forEach(p => {
        const subtotal = p.precio * p.cantidad;
        html += `
            <p>
                ${p.nombre} - Cantidad: ${p.cantidad} - $${p.precio} c/u - Subtotal: $${subtotal.toFixed(2)}
            </p>
        `;
    });

    html += `
        <hr>
        <h3>Total: $${datos.total}</h3>
    `;
    contenedor.innerHTML = html;

    localStorage.removeItem('carrito'); // limpia carrito
    localStorage.removeItem('productosComprados');
}

document.addEventListener('DOMContentLoaded', mostrarTicketHTML);
