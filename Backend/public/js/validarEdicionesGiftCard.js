document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formEditarGiftCard");
  const stock = document.getElementById("stock");
  const precio = document.getElementById("precio");
  const fecha = document.getElementById("fecha_caducidad");

  if (!form || !stock || !precio || !fecha) return;

  const hoy = new Date();
  hoy.setDate(hoy.getDate() + 10);
  const fechaMinima = hoy.toISOString().split("T")[0];

  // Establecer fecha mínima visual
  fecha.min = fechaMinima;

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

    if (fecha.value < fechaMinima) {
      e.preventDefault();
      alert(`La fecha de caducidad debe ser al menos ${fechaMinima}`);
      fecha.focus();
      return;
    }
  });
});