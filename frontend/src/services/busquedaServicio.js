import { cargarProductos, mapearProductoLocal } from './productosService'

export async function buscarPrendas(terminoBusqueda) {
  const crudos = await cargarProductos()
  const termino = terminoBusqueda.trim().toLowerCase()
  return crudos
    .map((p) => p.nombre)
    .filter((titulo) => titulo.toLowerCase().includes(termino))
    .slice(0, 6)
}

export async function buscarVendedores(terminoBusqueda) {
  const crudos = await cargarProductos()
  const termino = terminoBusqueda.trim().toLowerCase()
  const vistos = new Set()
  return crudos
    .map(mapearProductoLocal)
    .map((p) => ({
      idVendedor: p.id,
      nombreVendedor: p.vendedor,
      calificacionVendedor: p.calificacion,
    }))
    .filter((vendedor) => {
      if (!vendedor.nombreVendedor.toLowerCase().includes(termino)) return false
      if (vistos.has(vendedor.nombreVendedor)) return false
      vistos.add(vendedor.nombreVendedor)
      return true
    })
}