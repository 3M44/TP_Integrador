document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formEditarGiftCard');
  const token = form.dataset.token;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const stock = form.querySelector('#stock');
    const precio = form.querySelector('#precio');

    if (Number(stock.value) < 0) {
      alert('El stock no puede ser menor a 0');
      stock.focus();
      return;
    }

    if (Number(precio.value) <= 0) {
      alert('El precio debe ser mayor a 0');
      precio.focus();
      return;
    }

    const formData = new FormData(form);
    const giftcardId = formData.get('giftcardId');

    try {
      const response = await fetch(`/api/giftcards/${giftcardId}/actualizar`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: formData
      });

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;

        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (jsonError) {
          try {
            const text = await response.text();
            errorMessage = `Error: ${text}`;
          } catch (textError) {
            errorMessage = `Error ${response.status} (sin mensaje interpretable)`;
          }
        }

        alert(errorMessage);
        return;
      }

      alert('GiftCard actualizada correctamente');
      window.location.href = '/admin/panelProductos';

    } catch (err) {
      console.error('Error de red o inesperado:', err);
      alert('Error de red o servidor: ' + err.message);
    }
  });
});

