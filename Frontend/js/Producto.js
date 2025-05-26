class Producto {
    constructor(id, nombre, precio, imagen, categoria, activo) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.categoria = categoria;
        this.activo = activo;
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
        imagen.src = 'http://localhost:3000/' + this.imagen; // <-- Así
        imagen.alt = this.nombre;
        imagen.className = 'img-producto';

        const nombre = document.createElement('h3');
        nombre.textContent = this.nombre;

        const precio = document.createElement('p');
        precio.textContent = `Precio: $${this.precio}`;

        const categoria = document.createElement('p');
        categoria.textContent = `Categoría: ${this.categoria}`;

        productoDiv.appendChild(imagen);
        productoDiv.appendChild(nombre);
        productoDiv.appendChild(precio);
        productoDiv.appendChild(categoria);

        return productoDiv;
    }   
}