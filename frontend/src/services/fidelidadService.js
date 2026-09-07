import { peticionJson } from './http.js'

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