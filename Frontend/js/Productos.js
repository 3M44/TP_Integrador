document.addEventListener('DOMContentLoaded', () => {
    let categoriaMostrada = "Juegos"
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
                if (producto.categoria == categoriaMostrada ) {
                    contenedor.appendChild(producto.createHTMLElement());
                }
            });

        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    cambiar.addEventListener('change', () => {
        switch (cambiar.value){
            case 'Juegos':
                categoriaMostrada = "Juegos";
                cargarProductos();
                console.log(categoriaMostrada);
                break;
            case 'Gift Card':
                categoriaMostrada = "Gift Card";
                cargarProductos();
                console.log(categoriaMostrada);
                break;
        }   
    });


    cargarProductos();
});