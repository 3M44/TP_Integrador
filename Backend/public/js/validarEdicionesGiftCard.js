document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formEditarGiftCard");
  const stock = document.getElementById("stock");
  const precio = document.getElementById("precio");

  if (!form || !stock || !precio ) return; 

  

  form.addEventListener("submit", (e) => {
    if (Number(stock.value) < 0) {
      e.preventDefault();
      alert("El stock no puede ser menor a 0");
      stock.focus();
      return;
    }

    if (Number(precio.value) <= 0) {
      e.preventDefault();
      alert("El precio debe ser mayor a 0");
      precio.focus();
      return;
    }

    if (!fecha.value) {
      e.preventDefault();
      alert("Por favor, ingrese una fecha de caducidad");
      fecha.focus();
      return;
    }

  });
});
