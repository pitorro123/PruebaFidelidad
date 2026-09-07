import { filtrosCatalogo } from '../data/filtros.js'
import { imagenPlaceholder } from '../utils/imagenes.js'
import { peticionJson } from './http.js'

const POR_PAGINA = 8

function mapASlug(texto) {
  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function tallasComoStrings(producto) {
  const tallas = Array.isArray(producto.talla) ? producto.talla : [producto.talla]
  return tallas.filter(Boolean)
}

export function mapearProductoLocal(producto) {
  const id = producto.id
  const tallas = tallasComoStrings(producto)
  const urlsImagenes =
    Array.isArray(producto.imagenes) && producto.imagenes.length
      ? producto.imagenes.filter(Boolean)
      : [producto.imagen].filter(Boolean)
  const imagen = urlsImagenes[0] || imagenPlaceholder(producto.nombre, id)
  const imagenes = (urlsImagenes.length ? urlsImagenes : [imagen]).map((url, indice) => ({
    id: `${id}-${indice}`,
    url,
  }))
  return {
    id,
    nombre: producto.nombre,
    marca: producto.marca,
    categoria: producto.categoria,
    tallas,
    talla: tallas[0],
    color: producto.color,
    precio: producto.precio,
    estado: producto.estadoPrenda,
    disponiblePara: producto.disponiblePara,
    calificacion: Math.round((4 + ((id * 5) % 10) / 10) * 10) / 10,
    verificado: id % 3 === 0,
    fechaPublicacion: new Date(Date.UTC(2026, 6, 1) + id * 86400000).toISOString(),
    cantidadDisponible: 1 + (id % 8),
    imagen,
    imagenes,
  }
}

export function mapearProductoDetalle(producto) {
  const base = mapearProductoLocal(producto)
  return {
    ...base,
    tallas: base.tallas.map((talla) => ({ id: mapASlug(talla), nombre: talla })),
    secciones: {
      descripcion: `${base.nombre} — ${base.categoria} en color ${base.color}, talla ${base.talla}. Estado: ${base.estado}.`,
      detalles: `Estado: ${base.estado}\nMaterial: -\nMedidas: Según talla de elección\nMarca: ${base.marca}\nPublicado: 2026`,
      preguntas: ' No hay preguntas registradas.',
    },
    relacionados: [],
  }
}

let cacheProductos = null
let promesaCarga = null

export async function cargarProductos() {
  if (cacheProductos) return cacheProductos
  if (!promesaCarga) {
    promesaCarga = peticionJson('/productos')
      .then((lista) => {
        cacheProductos = lista
        return lista
      })
      .finally(() => {
        promesaCarga = null
      })
  }
  return promesaCarga
}

export async function obtenerProductoDetalle(id) {
  const crudos = await cargarProductos()
  const crudo = crudos.find((p) => String(p.id) === String(id))
  if (!crudo) throw new Error('Producto no encontrado')
  const detalle = mapearProductoDetalle(crudo)
  detalle.relacionados = crudos
    .filter((p) => String(p.id) !== String(id))
    .map(mapearProductoLocal)
    .slice(0, 4)
  return detalle
}

function coincidirValorFiltro(valoresFiltro, valorProducto) {
  if (!valoresFiltro || valoresFiltro.length === 0) return true
  return valoresFiltro.includes(valorProducto)
}

function coincidirRangoPrecio(rangosFiltro, precioProducto) {
  if (!rangosFiltro || rangosFiltro.length === 0) return true
  return rangosFiltro.some((rango) => precioProducto >= rango.min && precioProducto <= rango.max)
}

function filtrarPorCamposCrudos(listaCruda, filtrosSeleccionados) {
  return listaCruda.filter((producto) =>
    coincidirValorFiltro(filtrosSeleccionados.categoria, producto.categoria) &&
    coincidirValorFiltro(filtrosSeleccionados.talla, producto.talla) &&
    coincidirValorFiltro(filtrosSeleccionados.color, producto.color) &&
    coincidirValorFiltro(filtrosSeleccionados.marca, producto.marca) &&
    coincidirValorFiltro(filtrosSeleccionados.estadoPrenda, producto.estadoPrenda) &&
    coincidirValorFiltro(filtrosSeleccionados.disponiblePara, producto.disponiblePara) &&
    coincidirRangoPrecio(filtrosSeleccionados.precio, producto.precio),
  )
}

function filtrosEnFormatoLocal(filtrosActivos) {
  const resultado = {
    categoria: [],
    talla: [],
    color: [],
    marca: [],
    estadoPrenda: [],
    disponiblePara: [],
    precio: [],
  }
  for (const [filtroId, opcionIds] of Object.entries(filtrosActivos || {})) {
    if (!opcionIds || opcionIds.length === 0) continue
    const filtro = filtrosCatalogo.find((f) => f.id === filtroId)
    if (!filtro) continue
    const opciones = filtro.opciones.filter((o) => opcionIds.includes(o.id))
    if (filtroId === 'precio') {
      resultado.precio = opciones.map((o) => ({ min: o.min, max: o.max }))
    } else {
      resultado[filtroId === 'estado' ? 'estadoPrenda' : filtroId] = opciones.map(
        (o) => o.nombre,
      )
    }
  }
  return resultado
}

function ordenarProductos(productosLista, orden) {
  const copia = [...productosLista]
  switch (orden) {
    case 'precio_menor_mayor':
      return copia.sort((a, b) => a.precio - b.precio)
    case 'precio_mayor_menor':
      return copia.sort((a, b) => b.precio - a.precio)
    case 'mejor_calificados':
      return copia.sort((a, b) => b.calificacion - a.calificacion)
    case 'mas_recientes':
    default:
      return copia.sort(
        (a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion),
      )
  }
}

function paginarProductos(productosLista, pagina) {
  const total = productosLista.length
  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA))
  const inicio = (pagina - 1) * POR_PAGINA
  return {
    productos: productosLista.slice(inicio, inicio + POR_PAGINA),
    totalPaginas,
    total,
    pagina,
  }
}

function filtrarPorBusqueda(listaProductos, busqueda) {
  const termino = String(busqueda || '').trim().toLowerCase()
  if (!termino) return listaProductos
  return listaProductos.filter((producto) =>
    [producto.nombre, producto.marca, producto.categoria, producto.color]
      .some((campo) => String(campo || '').toLowerCase().includes(termino)),
  )
}

export async function obtenerProductos({ filtrosActivos = {}, orden = 'mas_recientes', pagina = 1, busqueda = '' }) {
  const crudos = await cargarProductos()
  const filtrados = filtrarPorCamposCrudos(crudos, filtrosEnFormatoLocal(filtrosActivos))
  const conBusqueda = filtrarPorBusqueda(filtrados, busqueda)
  const mapeados = conBusqueda.map(mapearProductoLocal)
  const ordenados = ordenarProductos(mapeados, orden)
  return paginarProductos(ordenados, pagina)
}