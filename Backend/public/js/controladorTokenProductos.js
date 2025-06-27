// public/js/estadoProductos.js

export function crearControladorEstado(token) {
  async function cambiarEstadoJuego(juegoId, activar) {
    try {
      const url = activar ? `/api/juegos/${juegoId}/activar` : `/api/juegos/${juegoId}`;
      const method = activar ? 'PUT' : 'DELETE';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert('Error: ' + (errorData.message || 'Error al cambiar estado del juego'));
        return;
      }

      alert(`Juego ${activar ? 'reactivado' : 'desactivado'} correctamente`);
      location.reload();
    } catch (err) {
      console.error(err);
      alert('Error de red o servidor');
    }
  }

  async function cambiarEstadoGiftCard(giftcardId, activar) {
    try {
      const url = activar
        ? `/api/giftcards/${giftcardId}/activar`
        : `/api/giftcards/${giftcardId}`;
      const method = activar ? 'PUT' : 'DELETE';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: 'No se pudo interpretar el error del servidor' };
        }

        alert('Error: ' + (errorData.message || JSON.stringify(errorData)));
        return;
      }

      alert(`GiftCard ${activar ? 'reactivada' : 'desactivada'} correctamente`);
      location.reload();

    } catch (err) {
      console.error(err);
      alert('Error de red o servidor: ' + err.message);
    }
  }

  return { cambiarEstadoJuego, cambiarEstadoGiftCard };
}
