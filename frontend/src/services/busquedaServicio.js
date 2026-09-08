import { peticionJson } from './http'

export async function buscarPrendas(terminoBusqueda) {
  const productos = await peticionJson(`/productos?q=${encodeURIComponent(terminoBusqueda.trim())}`)
  return productos.map((p) => p.nombre).slice(0, 6)
}