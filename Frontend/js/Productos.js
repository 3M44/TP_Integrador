// productos.js

async function obtenerProductos() {
    try {
        const respuesta = await fetch('http://localhost:3000/productos');
        if (!respuesta.ok) throw new Error('Error al obtener productos');
        const datos = await respuesta.json();
        return datos.map(
            prod => new Producto(prod.id, prod.nombre, prod.precio, prod.imagen, prod.categoria, prod.activo)
        );
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function mostrarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    const productos = await obtenerProductos();
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        contenedor.appendChild(producto.createHTMLElement());
    });
}

document.addEventListener('DOMContentLoaded', mostrarProductos);