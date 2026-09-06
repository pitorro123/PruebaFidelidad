import { productos, filtrarProductos as filtrarProductosLocal } from '../data/catalogoProductos'
import { filtrosCatalogo } from '../data/filtros.js'
import { imagenPlaceholder } from '../utils/imagenes.js'

const POR_PAGINA = 8

const VENDEDORES = [
  'Laura Gómez',
  'Carlos Ruiz',
  'Andrea Torres',
  'Miguel Herrera',
  'Valentina Rojas',
  'Andrés Pineda',
]

const elegir = (arreglo, id, semilla) => arreglo[(id * 7 + semilla) % arreglo.length]

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
    vendedor: elegir(VENDEDORES, id, 7),
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

const campoPorFiltro = {
  categoria: 'categoria',
  talla: 'tallas',
  color: 'color',
  marca: 'marca',
  precio: 'precio',
  estado: 'estado',
  disponiblePara: 'disponiblePara',
  vendedor: 'vendedor',
}

function coincideFiltro(producto, filtroId, opcion) {
  const campo = campoPorFiltro[filtroId]
  if (filtroId === 'precio') {
    return producto.precio >= opcion.min && producto.precio <= opcion.max
  }
  const valor = producto[campo]
  if (Array.isArray(valor)) {
    return valor.some(
      (v) => String(v).toLowerCase() === String(opcion.nombre).toLowerCase(),
    )
  }
  return String(valor).toLowerCase() === String(opcion.nombre).toLowerCase()
}

function filtrarProductos(productosLista, filtrosActivos) {
  return productosLista.filter((producto) =>
    Object.entries(filtrosActivos).every(([filtroId, opcionIds]) => {
      if (!opcionIds || opcionIds.length === 0) return true
      const filtro = filtrosCatalogo.find((f) => f.id === filtroId)
      return opcionIds.some((opcionId) => {
        const opcion = filtro.opciones.find((o) => o.id === opcionId)
        return opcion && coincideFiltro(producto, filtroId, opcion)
      })
    }),
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
    if (!opcionIds || opcionIds.length === 0 || filtroId === 'vendedor') continue
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

export async function obtenerProductos({ filtrosActivos = {}, orden = 'mas_recientes', pagina = 1 }) {
  const filtrados = filtrarProductosLocal(productos, filtrosEnFormatoLocal(filtrosActivos))
  let mapeados = filtrados.map(mapearProductoLocal)
  if (filtrosActivos.vendedor?.length) {
    mapeados = filtrarProductos(mapeados, { vendedor: filtrosActivos.vendedor })
  }
  const ordenados = ordenarProductos(mapeados, orden)
  return paginarProductos(ordenados, pagina)
}