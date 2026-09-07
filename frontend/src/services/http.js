const API_BASE = '/api'

export async function peticionJson(url, opciones = {}) {
  let respuesta
  try {
    respuesta = await fetch(`${API_BASE}${url}`, {
      headers: { 'Content-Type': 'application/json' },
      ...opciones,
    })
  } catch {
    throw new Error('No se pudo conectar con el servidor. Verifica que el backend este corriendo en http://localhost:8080.')
  }

  if (!respuesta.ok) {
    let mensaje = `Error ${respuesta.status}`
    try {
      const cuerpo = await respuesta.json()
      const detalle = cuerpo?.message || cuerpo?.error || cuerpo?.detail
      if (detalle) mensaje = detalle
    } catch {
      // ignorar si el cuerpo no es JSON
    }
    throw new Error(mensaje)
  }

  if (respuesta.status === 204) return null
  return respuesta.json()
}