document.getElementById("btnContinuar").addEventListener("click", async () => { 
    const nombre = document.getElementById("nombreUsuario"); 

    if (nombre.value.trim() === "") {
      alert("Por favor, ingrese un nombre de usuario.");
    } else {
      try {
        const response = await fetch('http://localhost:3000/registrar-cliente', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          nombre: nombre.value.trim()
        })
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.error || "Error al registrar usuario");
          return; 
        }

        localStorage.setItem('nombreUsuario', nombre.value.trim());
        window.location.href = "Productos.html"; 
      } catch (error){
        alert('Error en la conexión al servidor');
      }
    }
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
