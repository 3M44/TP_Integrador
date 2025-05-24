document.getElementById("btnContinuar").addEventListener("click", () => { 
    const nombre = document.getElementById("nombre"); 

    if (!nombre.value.trim()) {
        alert("Por favor ingresa tu nombre.");
        return;
    }

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