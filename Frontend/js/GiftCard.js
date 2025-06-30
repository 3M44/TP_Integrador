class GiftCard {
    constructor(id, nombre, precio, empresa, consola, requerimientos_minimos, stock, fecha_caducidad, plataformas_disponibles, imagen, activo) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.empresa = empresa;
        this.consola = consola;
        this.requerimientos_minimos = requerimientos_minimos;
        this.fecha_caducidad = fecha_caducidad;
        this.plataformas_disponibles = plataformas_disponibles;
        this.activo = activo;
        this.imagen = imagen;
        this.stock = stock;
        this.cantidad = 0;
    }
    
    static comprarProducto(producto) {
        console.log("Producto comprado:", producto);
        let productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
        const existente = productos.find(p => p.id === producto.id);

        if (existente) {
            if (existente.cantidad < producto.stock) {
                existente.cantidad += 1;
            }
        } else {
            productos.push({ ...producto, cantidad: 1 });
        }

        localStorage.setItem('productosComprados', JSON.stringify(productos));
    }


    static sacarProducto(producto) {
    let productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
    const existente = productos.find(p => p.id === producto.id);

    if (existente) {
        if (existente.cantidad > 1) {
            existente.cantidad -= 1;
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
            genero: this.genero,
            activo: this.activo
        });
    }

    static createFromJsonString(json) {
        const data = JSON.parse(json);
        return new GiftCard(data.id, data.nombre, data.precio, data.imagen, data.genero, data.activo);
    }

    createHTMLElement() {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'tarjeta-producto';

        const imagen = document.createElement('img');
        imagen.src = 'http://localhost:3000' + this.imagen; 
        imagen.alt = this.nombre;
        imagen.className = 'img-producto';

        const nombre = document.createElement('h3');
        nombre.textContent = this.nombre;

        const precio = document.createElement('p');
        precio.textContent = `Precio: $${this.precio}`;

        const plataformas_disponibles = document.createElement('p');
        plataformas_disponibles.textContent = `plataformas_disponibles: ${this.plataformas_disponibles}`;

        const fecha_caducidad = document.createElement('p');
        const fecha = new Date(this.fecha_caducidad);
        fecha_caducidad.textContent = `Fecha de caducidad: ${fecha.toISOString().slice(0, 10)}`;


        const empresa = document.createElement('p');
        empresa.textContent = `Empresa: ${this.empresa}`;

        const consola = document.createElement('p');
        consola.textContent = `Plataforma: ${this.consola}`;

       const cantidadSpan = document.createElement('span');
        let productosEnCarrito = JSON.parse(localStorage.getItem('productosComprados')) || [];
        let productoEnCarrito = productosEnCarrito.find(p => p.id === this.id);
        const cantidadActual = productoEnCarrito ? productoEnCarrito.cantidad : 0; 
        cantidadSpan.textContent = `Cantidad: ${cantidadActual}`;

        const guardarBtn = document.createElement('button');
        guardarBtn.textContent = '+';
        guardarBtn.addEventListener('click', () => {
            GiftCard.comprarProducto(this);
            let productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
            let prodActual = productos.find(p => p.id === this.id);
            cantidadSpan.textContent = `Cantidad: ${prodActual ? prodActual.cantidad : 0}`; 
        });

        const restarBtn = document.createElement('button');
        restarBtn.textContent = '-';
        restarBtn.addEventListener('click', () => {
            GiftCard.sacarProducto(this);
            let productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
            let prodActual = productos.find(p => p.id === this.id);
            cantidadSpan.textContent = `Cantidad: ${prodActual ? prodActual.cantidad : 0}`; 
        });


        productoDiv.appendChild(imagen);
        productoDiv.appendChild(nombre);
        productoDiv.appendChild(precio);
        productoDiv.appendChild(empresa);
        productoDiv.appendChild(consola);
        productoDiv.appendChild(plataformas_disponibles);
        productoDiv.appendChild(fecha_caducidad);
        productoDiv.appendChild(restarBtn);
        productoDiv.appendChild(cantidadSpan);
        productoDiv.appendChild(guardarBtn);

        return productoDiv;
    }   
}