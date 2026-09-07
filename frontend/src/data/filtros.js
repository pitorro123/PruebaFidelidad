const opcionesFiltros = {
  categoria: ['Chaquetas', 'Vestidos', 'Pantalones', 'Blusas', 'Camisas', 'Faldas', 'Zapatos', 'Accesorios'],
  talla: ['XS', 'S', 'M', 'L', 'XL'],
  color: ['Negro', 'Blanco', 'Azul', 'Rojo', 'Verde', 'Beige', 'Rosa', 'Amarillo'],
  marca: ['Americanino', 'American Eagle', 'Chevignon', 'Esprit', 'Naf Naf', 'Rifle'],
  precio: [
    { etiqueta: 'Hasta $50.000', min: 0, max: 50000 },
    { etiqueta: '$50.000 - $100.000', min: 50000, max: 100000 },
    { etiqueta: '$100.000 - $200.000', min: 100000, max: 200000 },
    { etiqueta: '$200.000 - $500.000', min: 200000, max: 500000 },
  ],
  estadoPrenda: ['Nuevo', 'Excelente', 'Muy bueno', 'Bueno'],
  disponiblePara: ['Mujer', 'Hombre', 'Niño', 'Unisex'],
}

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