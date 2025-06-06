document.addEventListener('DOMContentLoaded', () => {
    let categoriaMostrada = "Todos"
    const cambiar = document.getElementById('cambiar-categoria');

    const cargarProductos = async () => {
        const contenedor = document.getElementById('contenedor-productos');
        contenedor.innerHTML = "";

        try {
            const response = await fetch('http://localhost:3000/productos');
            const datos = await response.json();

            const productos = datos.map(
                prod => new Producto(prod.id, prod.nombre, prod.precio, prod.imagen, prod.categoria, prod.activo, prod.cantidad)
            );

            productos.forEach(producto => {
                if (categoriaMostrada === "Todos" && producto.activo == 1) {
                    contenedor.appendChild(producto.createHTMLElement());
                } else if (producto.categoria == categoriaMostrada && producto.activo == 1) {
                    contenedor.appendChild(producto.createHTMLElement());
                }
            });

        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    cambiar.addEventListener('change', () => {
        switch (cambiar.value){
            case 'Todos':
                categoriaMostrada = "Todos";
                cargarProductos();
                break;
            case 'Juegos':
                categoriaMostrada = "Juegos";
                cargarProductos();
                break;
            case 'Gift Card':
                categoriaMostrada = "Gift Card";
                cargarProductos();
                break;
        }   
    });

    ajustarLinks();
    cargarProductos();
});

function ajustarLinks() {
    const linkCarrito = document.getElementById('linkCarrito');
    const linkTicket = document.getElementById('linkTicket');
    const linkInicio = document.getElementById('linkInicio');

    linkInicio.addEventListener('click', (e) => {
        localStorage.removeItem('productosComprados');
        localStorage.removeItem('nombreUsuario');
    });

    if (linkTicket) {
        linkTicket.style.pointerEvents = 'none';
        linkTicket.style.color = 'gray';
    }

    if (linkCarrito) {
        linkCarrito.style.pointerEvents = 'none';
        linkCarrito.style.color = 'gray';
    }
}