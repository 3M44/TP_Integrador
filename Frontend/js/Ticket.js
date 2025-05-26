function generarTicket() {
    const productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
    const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Unknow';
    const contenedor = document.getElementById('ticket-info');
    const fecha = new Date().toLocaleDateString();
    const empresa = "GameGift";

    if (productos.length === 0) {
        contenedor.innerHTML = '<p>No hay productos en el carrito.</p>';
        return;
    }

    let total = 0;
    let html = `
        <p>Empresa: ${empresa}</p>
        <p>Cliente: ${nombreUsuario}</p>
        <p>Fecha: ${fecha}</p>
        <hr>
        <h3>Productos:</h3>
    `;

    productos.forEach(p => {
        const subtotal = p.precio * p.stock;
        total += subtotal;
        html += `
            <p>
                Nombre: ${p.nombre} - Cantidad: ${p.stock} - Precio: $${p.precio} - Subtotal: $${subtotal}
            </p>
        `;
    });

    html += `
        <hr>
        <h3>Total: $${total}</h3>
    `;

    contenedor.innerHTML = html;
}

finalizarCompra = () => {
    const productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
    if (productos.length === 0) {
        alert("No hay productos en el carrito para finalizar la compra.");
        return;
    }
    
    //faltra lógica para enviar el ticket a la API y guardarlo en el servidor

    localStorage.removeItem('productosComprados');
    localStorage.removeItem('nombreUsuario');

    window.location.href = "Inicio.html"; 
}

document.addEventListener('DOMContentLoaded', () => {
    const btnFinalizar = document.getElementById('btnFinalizar');
    
    btnFinalizar.addEventListener('click', () => {
        finalizarCompra();
    });
    
    generarTicket();
});

