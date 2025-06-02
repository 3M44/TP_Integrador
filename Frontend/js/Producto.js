class Producto {
    constructor(id, nombre, precio, imagen, categoria, activo, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.categoria = categoria;
        this.activo = activo;
        this.stock = 0;
        this.cantidad = cantidad
    }

    static comprarProducto(producto) {
        console.log("Producto comprado:", producto);
        let productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
        const existente = productos.find(p => p.id === producto.id);

        if (existente) {
            if (existente.stock < producto.cantidad) {
                existente.stock += 1;
            }
        } else {
            productos.push({ ...producto, stock: 1 });
        }

        localStorage.setItem('productosComprados', JSON.stringify(productos));
    }


    static sacarProducto(producto) {
    let productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
    const existente = productos.find(p => p.id === producto.id);

    if (existente) {
        if (existente.stock > 1) {
            existente.stock -= 1;
        } else {
            productos = productos.filter(p => p.id !== producto.id);
        }
        localStorage.setItem('productosComprados', JSON.stringify(productos));
        console.log("Producto actualizado o eliminado:", productos);
    }
    }

    toJsonString() {
        return JSON.stringify({
            id: this.id,
            nombre: this.nombre,
            precio: this.precio,
            imagen: this.imagen,
            categoria: this.categoria,
            activo: this.activo
        });
    }

    static createFromJsonString(json) {
        const data = JSON.parse(json);
        return new Producto(data.id, data.nombre, data.precio, data.imagen, data.categoria, data.activo);
    }

    createHTMLElement() {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'tarjeta-producto';

        const imagen = document.createElement('img');
        imagen.src = 'http://localhost:3000/' + this.imagen; 
        imagen.alt = this.nombre;
        imagen.className = 'img-producto';

        const nombre = document.createElement('h3');
        nombre.textContent = this.nombre;

        const precio = document.createElement('p');
        precio.textContent = `Precio: $${this.precio}`;

        const categoria = document.createElement('p');
        categoria.textContent = `Categoría: ${this.categoria}`;

       const cantidadSpan = document.createElement('span');
        let productosEnCarrito = JSON.parse(localStorage.getItem('productosComprados')) || [];
        let productoEnCarrito = productosEnCarrito.find(p => p.id === this.id);
        const cantidadActual = productoEnCarrito ? productoEnCarrito.stock : 0; 
        cantidadSpan.textContent = `Cantidad: ${cantidadActual}`;

        const guardarBtn = document.createElement('button');
        guardarBtn.textContent = '+';
        guardarBtn.addEventListener('click', () => {
            Producto.comprarProducto(this);
            let productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
            let prodActual = productos.find(p => p.id === this.id);
            cantidadSpan.textContent = `Cantidad: ${prodActual ? prodActual.stock : 0}`; 
        });

        const restarBtn = document.createElement('button');
        restarBtn.textContent = '-';
        restarBtn.addEventListener('click', () => {
            Producto.sacarProducto(this);
            let productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
            let prodActual = productos.find(p => p.id === this.id);
            cantidadSpan.textContent = `Cantidad: ${prodActual ? prodActual.stock : 0}`; 
        });


        productoDiv.appendChild(imagen);
        productoDiv.appendChild(nombre);
        productoDiv.appendChild(precio);
        productoDiv.appendChild(categoria);
        productoDiv.appendChild(restarBtn);
        productoDiv.appendChild(cantidadSpan);
        productoDiv.appendChild(guardarBtn);

        return productoDiv;
    }   
}