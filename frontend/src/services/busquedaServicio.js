import { cargarProductos } from './productosService'

export async function buscarPrendas(terminoBusqueda) {
  const crudos = await cargarProductos()
  const termino = terminoBusqueda.trim().toLowerCase()
  return crudos
    .map((p) => p.nombre)
    .filter((titulo) => titulo.toLowerCase().includes(termino))
    .slice(0, 6)
}