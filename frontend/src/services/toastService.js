let toasts = [];
const escuchadores = new Set();

function notificarCambio() {
  escuchadores.forEach((escuchador) => escuchador());
}

export function obtenerToasts() {
  return toasts;
}

export function suscribirseToasts(escuchador) {
  escuchadores.add(escuchador);
  return () => escuchadores.delete(escuchador);
}

export function eliminarToast(id) {
  toasts = toasts.filter((toast) => toast.id !== id);
  notificarCambio();
}

export function mostrarToast(mensaje, tipo = "exito", duracion = 3000) {
  const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  toasts = [...toasts, { id, mensaje, tipo }];
  notificarCambio();
  setTimeout(() => eliminarToast(id), duracion);
}