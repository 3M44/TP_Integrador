function continuar() {
  const nombre = document.getElementById("nombreUsuario").value.trim();
  if (nombre) {
    localStorage.setItem("usuario", nombre);
    window.location.href = "productos.html";
  } else {
    alert("Por favor, ingresá tu nombre.");
  }
}


