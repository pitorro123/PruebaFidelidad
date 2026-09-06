import { opcionesFiltros } from './catalogoProductos.js'

const aSlug = (texto) =>
  String(texto)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')

const opcionesConId = (nombres) =>
  nombres.map((nombre) => ({ id: aSlug(nombre), nombre }))

export const filtrosCatalogo = [
  {
    id: 'marca',
    nombre: 'Marca',
    opciones: opcionesConId(opcionesFiltros.marca),
  },
  {
    id: 'categoria',
    nombre: 'Categoría',
    opciones: opcionesConId(opcionesFiltros.categoria),
  },
  {
    id: 'talla',
    nombre: 'Talla',
    opciones: opcionesConId(opcionesFiltros.talla),
  },
  {
    id: 'color',
    nombre: 'Color',
    opciones: opcionesConId(opcionesFiltros.color),
  },
  {
    id: 'precio',
    nombre: 'Precio',
    opciones: opcionesFiltros.precio.map(({ etiqueta, min, max }) => ({
      id: `${min}-${max}`,
      nombre: etiqueta,
      min,
      max,
    })),
  },
  {
    id: 'estado',
    nombre: 'Estado de la prenda',
    opciones: opcionesConId(opcionesFiltros.estadoPrenda),
  },
  {
    id: 'disponiblePara',
    nombre: 'Disponible para',
    opciones: opcionesConId(opcionesFiltros.disponiblePara),
  },
  {
    id: 'vendedor',
    nombre: 'Vendedor',
    opciones: [
      { id: 'laura-gomez', nombre: 'Laura Gómez' },
      { id: 'carlos-ruiz', nombre: 'Carlos Ruiz' },
      { id: 'andrea-torres', nombre: 'Andrea Torres' },
      { id: 'miguel-herrera', nombre: 'Miguel Herrera' },
      { id: 'valentina-rojas', nombre: 'Valentina Rojas' },
      { id: 'andres-pineda', nombre: 'Andrés Pineda' },
    ],
  },
]