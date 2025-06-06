document.getElementById("btnContinuar").addEventListener("click", () => { 
    const nombre = document.getElementById("nombre"); 

    fetch("http://localhost:3000/continuar", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre.value }) 
    })
    .then(response => response.json()) 
    .then(data => {
        if (data.error) {  
            alert(data.error);
        } else {
            localStorage.setItem('nombreUsuario', nombre.value.trim());
            window.location.href = "Productos.html"; 
        }
    })
    .catch(error => console.error("Error en la petición:", error));
});

function ajustarLinks() {
  const nombreUsuario = localStorage.getItem('nombreUsuario');
  const linkCarrito = document.getElementById('linkCarrito');
  const linkTicket = document.getElementById('linkTicket');
  const linkProductos = document.getElementById('linkProductos');

  if (linkCarrito) {
    linkCarrito.style.pointerEvents = 'none';
    linkCarrito.style.color = 'gray';
  }

  if (linkTicket) {
    linkTicket.style.pointerEvents = 'none';
    linkTicket.style.color = 'gray';
  }

  if (linkProductos) {
    linkProductos.style.pointerEvents = 'none';
    linkProductos.style.color = 'gray';
  }
}

document.addEventListener('DOMContentLoaded', ajustarLinks);
