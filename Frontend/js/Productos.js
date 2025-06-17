const productos = [ 
  { nombre: "Producto 1", precio: 50, categoria: "games" },
  { nombre: "Producto 2", precio: 75, categoria: "accesorios" },
  { nombre: "Producto 3", precio: 30, categoria: "games" }
];

function mostrarProductos(lista) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  lista.forEach(producto => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button onclick='agregarAlCarrito(${JSON.stringify(producto)})'>Comprar</button>
    `;

    contenedor.appendChild(card);
  });
}

function filtrar(categoria) {
  if (categoria === "todos") {
    mostrarProductos(productos);
  } else {
    const filtrados = productos.filter(p => p.categoria === categoria);
    mostrarProductos(filtrados);
  }
}

function agregarAlCarrito(nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Verificamos si ya existe el producto
  const productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`Agregado ${nombre} al carrito`);
}



window.onload = () => {
  mostrarProductos(productos);
};
