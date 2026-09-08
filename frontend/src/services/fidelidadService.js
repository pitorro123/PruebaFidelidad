import { peticionJson } from './http.js'

const CLAVE_SOCIO_STORAGE = 'fidelidadSocio'
const CLAVE_CUPON_APLICADO = 'fidelidadCuponAplicado'

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

function claveCuponAplicado(socio) {
  const tipo = socio?.tipoIdentificacionId || ''
  const numero = socio?.numeroIdentificacion || ''
  return `${CLAVE_CUPON_APLICADO}-${tipo}-${numero}`
}

export function guardarCuponAplicado(cupon, socio) {
  if (!socio?.numeroIdentificacion) return
  localStorage.setItem(
    claveCuponAplicado(socio),
    JSON.stringify({
      cupon: {
        id: cupon.id,
        codigo: cupon.codigo,
        tipo: cupon.tipo,
        descuentoPorcentaje: cupon.descuentoPorcentaje,
        fechaExpiracion: cupon.fechaExpiracion,
      },
      aplicadoEn: new Date().toISOString(),
    })
  )
}

export function obtenerCuponAplicado(socio) {
  if (!socio?.numeroIdentificacion) return null
  try {
    const guardado = localStorage.getItem(claveCuponAplicado(socio))
    if (!guardado) return null
    const { cupon } = JSON.parse(guardado)
    if (!cupon?.descuentoPorcentaje || !cupon?.fechaExpiracion) return null
    if (new Date(`${cupon.fechaExpiracion}T23:59:59`) < new Date()) return null
    return cupon
  } catch {
    return null
  }
}

export function limpiarCuponAplicado(socio) {
  if (!socio?.numeroIdentificacion) return
  localStorage.removeItem(claveCuponAplicado(socio))
}