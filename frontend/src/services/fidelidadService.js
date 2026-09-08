import { peticionJson } from './http.js'

const CLAVE_SOCIO_STORAGE = 'fidelidadSocio'

export function guardarSocioFidelidad(socio) {
  localStorage.setItem(CLAVE_SOCIO_STORAGE, JSON.stringify(socio))
}

export function obtenerSocioFidelidad() {
  try {
    const guardado = localStorage.getItem(CLAVE_SOCIO_STORAGE)
    return guardado ? JSON.parse(guardado) : null
  } catch {
    return null
  }
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

export async function registrarClienteFidelidad(datos) {
  return peticionJson('/clientes-fidelidad', {
    method: 'POST',
    body: JSON.stringify(datos),
  })
}

export async function consultarPuntos(tipoIdentificacionId, numeroIdentificacion) {
  return peticionJson(
    `/puntos?tipoIdentificacionId=${tipoIdentificacionId}&numeroIdentificacion=${encodeURIComponent(numeroIdentificacion)}`
  )
}

export async function acumularPuntos(datos) {
  return peticionJson('/puntos/acumular', {
    method: 'POST',
    body: JSON.stringify(datos),
  })
}

export async function canjearPuntos(datos) {
  return peticionJson('/puntos/canjear', {
    method: 'POST',
    body: JSON.stringify(datos),
  })
}

export async function obtenerCampanasActivas() {
  return peticionJson('/campanas/activas')
}

export async function obtenerCupones(tipoIdentificacionId, numeroIdentificacion) {
  return peticionJson(
    `/cupones?tipoIdentificacionId=${tipoIdentificacionId}&numeroIdentificacion=${encodeURIComponent(numeroIdentificacion)}`
  )
}

export async function usarCupon(codigo) {
  return peticionJson('/cupones/usar', {
    method: 'POST',
    body: JSON.stringify({ codigo }),
  })
}