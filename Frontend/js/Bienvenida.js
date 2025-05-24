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
            window.location.href = "Productos.html"; 
        }
    })
    .catch(error => console.error("Error en la petición:", error));
});
