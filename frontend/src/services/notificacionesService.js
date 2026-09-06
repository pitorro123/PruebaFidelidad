let notificaciones = [];
const escuchadores = new Set();

function notificarCambio() {
  escuchadores.forEach((escuchador) => escuchador());
}

export function obtenerNotificaciones() {
  return notificaciones;
}

export function suscribirseNotificaciones(escuchador) {
  escuchadores.add(escuchador);
  return () => escuchadores.delete(escuchador);
}

export function agregarNotificacion(notificacion) {
  notificaciones = [notificacion, ...notificaciones];
  notificarCambio();
}