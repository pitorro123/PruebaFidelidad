// ============================================================
// catalogoProductos.js
// Catálogo de prendas + estructura de filtros (ComercioAPP)
// ============================================================

// ---------- Catálogo de productos ----------

const urlBaseImagenes = 'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/';

export const productos = [
  {
    id: 1,
    nombre: "Chaqueta de mezclilla negra Levi's",
    imagen: `${urlBaseImagenes}prenda_01.png`,
    categoria: 'Chaquetas',
    talla: 'M',
    color: 'Negro',
    marca: 'Levis',
    precio: 180000,
    estadoPrenda: 'Nuevo',
    disponiblePara: 'Unisex',
  },
  {
    id: 2,
    nombre: 'Vestido rojo escote cruzado',
    imagen: `${urlBaseImagenes}prenda_02.png`,
    categoria: 'Vestidos',
    talla: 'S',
    color: 'Rojo',
    marca: 'Zara',
    precio: 89000,
    estadoPrenda: 'Nuevo',
    disponiblePara: 'Mujer',
  },
  {
    id: 3,
    nombre: 'Jeans azules corte mom fit',
    imagen: `${urlBaseImagenes}prenda_03.png`,
    categoria: 'Pantalones',
    talla: 'M',
    color: 'Azul',
    marca: 'Zara',
    precio: 120000,
    estadoPrenda: 'Excelente',
    disponiblePara: 'Mujer',
  },
  {
    id: 4,
    nombre: 'Blusa beige manga abullonada',
    imagen: `${urlBaseImagenes}prenda_04.png`,
    categoria: 'Blusas',
    talla: 'S',
    color: 'Beige',
    marca: 'Zara',
    precio: 75000,
    estadoPrenda: 'Nuevo',
    disponiblePara: 'Mujer',
  },
  {
    id: 5,
    nombre: 'Polo blanco Adidas',
    imagen: `${urlBaseImagenes}prenda_05.png`,
    categoria: 'Camisas',
    talla: 'L',
    color: 'Blanco',
    marca: 'Adidas',
    precio: 130000,
    estadoPrenda: 'Nuevo',
    disponiblePara: 'Hombre',
  },
  {
    id: 6,
    nombre: 'Falda plisada rosada',
    imagen: `${urlBaseImagenes}prenda_06.png`,
    categoria: 'Faldas',
    talla: 'S',
    color: 'Rosa',
    marca: 'Zara',
    precio: 68000,
    estadoPrenda: 'Muy bueno',
    disponiblePara: 'Mujer',
  },
  {
    id: 7,
    nombre: 'Tenis Nike azules con gorra Adidas beige',
    imagen: `${urlBaseImagenes}prenda_07.png`,
    categoria: 'Zapatos',
    talla: 'M',
    color: 'Azul',
    marca: 'Nike',
    precio: 175000,
    estadoPrenda: 'Nuevo',
    disponiblePara: 'Hombre',
  },
  {
    id: 8,
    nombre: 'Pantalón cargo negro',
    imagen: `${urlBaseImagenes}prenda_08.png`,
    categoria: 'Pantalones',
    talla: 'M',
    color: 'Negro',
    marca: 'Zara',
    precio: 95000,
    estadoPrenda: 'Nuevo',
    disponiblePara: 'Unisex',
  },
  {
    id: 9,
    nombre: 'Chaqueta cortavientos roja Nike',
    imagen: `${urlBaseImagenes}prenda_09.png`,
    categoria: 'Chaquetas',
    talla: 'M',
    color: 'Rojo',
    marca: 'Nike',
    precio: 160000,
    estadoPrenda: 'Nuevo',
    disponiblePara: 'Unisex',
  },
  {
    id: 10,
    nombre: 'Camisa de cuadros azul',
    imagen: `${urlBaseImagenes}prenda_10.png`,
    categoria: 'Camisas',
    talla: 'L',
    color: 'Azul',
    marca: 'H&M',
    precio: 89000,
    estadoPrenda: 'Muy bueno',
    disponiblePara: 'Hombre',
  },
  {
    id: 11,
    nombre: 'Minifalda de mezclilla blanca',
    imagen: `${urlBaseImagenes}prenda_11.png`,
    categoria: 'Faldas',
    talla: 'S',
    color: 'Blanco',
    marca: 'Zara',
    precio: 78000,
    estadoPrenda: 'Excelente',
    disponiblePara: 'Mujer',
  },
  {
    id: 12,
    nombre: 'Tenis Nike rosados',
    imagen: `${urlBaseImagenes}prenda_12.png`,
    categoria: 'Zapatos',
    talla: 'M',
    color: 'Rosa',
    marca: 'Nike',
    precio: 145000,
    estadoPrenda: 'Nuevo',
    disponiblePara: 'Mujer',
  },
  {
    id: 13,
    nombre: 'Cinturón de cuero negro',
    imagen: `${urlBaseImagenes}prenda_13.png`,
    categoria: 'Accesorios',
    talla: 'M',
    color: 'Negro',
    marca: 'Zara',
    precio: 45000,
    estadoPrenda: 'Nuevo',
    disponiblePara: 'Unisex',
  },
  {
    id: 14,
    nombre: 'Pantalón cargo verde',
    imagen: `${urlBaseImagenes}prenda_14.png`,
    categoria: 'Pantalones',
    talla: 'M',
    color: 'Verde',
    marca: 'Zara',
    precio: 98000,
    estadoPrenda: 'Nuevo',
    disponiblePara: 'Unisex',
  },
  {
    id: 15,
    nombre: 'Trench coat beige',
    imagen: `${urlBaseImagenes}prenda_15.png`,
    categoria: 'Chaquetas',
    talla: 'M',
    color: 'Beige',
    marca: 'Zara',
    precio: 320000,
    estadoPrenda: 'Nuevo',
    disponiblePara: 'Mujer',
  },
  {
    id: 16,
    nombre: 'Vestido amarillo infantil',
    imagen: `${urlBaseImagenes}prenda_16.png`,
    categoria: 'Vestidos',
    talla: 'XS',
    color: 'Amarillo',
    marca: 'Stradivarius',
    precio: 55000,
    estadoPrenda: 'Nuevo',
    disponiblePara: 'Niño',
  },
  {
    id: 17,
    nombre: 'Blusa negra de encaje',
    imagen: `${urlBaseImagenes}prenda_17.png`,
    categoria: 'Blusas',
    talla: 'S',
    color: 'Negro',
    marca: 'Zara',
    precio: 82000,
    estadoPrenda: 'Muy bueno',
    disponiblePara: 'Mujer',
  },
  {
    id: 18,
    nombre: 'Camisa a rayas blanco y azul',
    imagen: `${urlBaseImagenes}prenda_18.png`,
    categoria: 'Camisas',
    talla: 'M',
    color: 'Blanco',
    marca: 'Zara',
    precio: 90000,
    estadoPrenda: 'Nuevo',
    disponiblePara: 'Mujer',
  },
];

// ---------- 3. Función para filtrar el catálogo ----------
// filtrosSeleccionados es un objeto donde cada clave es un arreglo de valores
// activos, por ejemplo:
// { categoria: ['Chaquetas'], color: ['Negro', 'Rojo'], marca: [], talla: [],
//   estadoPrenda: [], disponiblePara: ['Mujer'], precio: [{min:0,max:50000}] }

export function filtrarProductos(listaProductos, filtrosSeleccionados) {
  return listaProductos.filter((producto) => {
    const cumpleCategoria = coincideValor(filtrosSeleccionados.categoria, producto.categoria);
    const cumpleTalla = coincideValor(filtrosSeleccionados.talla, producto.talla);
    const cumpleColor = coincideValor(filtrosSeleccionados.color, producto.color);
    const cumpleMarca = coincideValor(filtrosSeleccionados.marca, producto.marca);
    const cumpleEstado = coincideValor(filtrosSeleccionados.estadoPrenda, producto.estadoPrenda);
    const cumpleDisponibilidad = coincideValor(filtrosSeleccionados.disponiblePara, producto.disponiblePara);
    const cumplePrecio = coincideRangoPrecio(filtrosSeleccionados.precio, producto.precio);

    return (
      cumpleCategoria &&
      cumpleTalla &&
      cumpleColor &&
      cumpleMarca &&
      cumpleEstado &&
      cumpleDisponibilidad &&
      cumplePrecio
    );
  });
}

// Si el filtro está vacío, no restringe. Si tiene valores, el producto debe estar incluido.
function coincideValor(valoresFiltro, valorProducto) {
  if (!valoresFiltro || valoresFiltro.length === 0) return true;
  return valoresFiltro.includes(valorProducto);
}

function coincideRangoPrecio(rangosFiltro, precioProducto) {
  if (!rangosFiltro || rangosFiltro.length === 0) return true;
  return rangosFiltro.some((rango) => precioProducto >= rango.min && precioProducto <= rango.max);
}