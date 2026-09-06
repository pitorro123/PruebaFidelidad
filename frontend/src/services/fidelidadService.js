const API_BASE = 'http://localhost:8080/api'

async function peticionJson(url, opciones = {}) {
  const respuesta = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opciones,
  })

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

export async function obtenerTiposIdentificacion() {
  return peticionJson('/catalogos/tipos-identificacion')
}

export async function obtenerPaises() {
  return peticionJson('/catalogos/paises')
}

export async function obtenerMarcas() {
  return peticionJson('/catalogos/marcas')
}

export async function obtenerDepartamentos(paisId) {
  return peticionJson(`/catalogos/paises/${paisId}/departamentos`)
}

export async function obtenerCiudades(departamentoId) {
  return peticionJson(`/catalogos/departamentos/${departamentoId}/ciudades`)
}

export async function cargarCatalogosIniciales() {
  const [tiposIdentificacion, paises, marcas] = await Promise.all([
    obtenerTiposIdentificacion(),
    obtenerPaises(),
    obtenerMarcas(),
  ])
  return { tiposIdentificacion, paises, marcas }
}

export async function verificarInscrito({ tipoIdentificacionId, numeroIdentificacion, marcaId }) {
  return peticionJson('/clientes-fidelidad/verificar', {
    method: 'POST',
    body: JSON.stringify({ tipoIdentificacionId, numeroIdentificacion, marcaId }),
  })
}

export async function registrarClienteFidelidad(datos) {
  return peticionJson('/clientes-fidelidad', {
    method: 'POST',
    body: JSON.stringify(datos),
  })
}
