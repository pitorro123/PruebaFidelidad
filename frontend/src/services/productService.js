import { productos } from '../data/catalogoProductos';
import { mapearProductoDetalle } from './productosService';

export const mapApiProduct = mapearProductoDetalle;

export const fetchProductById = async (id, mapper = mapApiProduct) => {
  const producto = productos.find((p) => p.id === Number(id));
  if (!producto) throw new Error('Producto no encontrado');
  return mapper(producto);
};

export const fetchProducts = async (limit = 10, mapper = mapApiProduct) => {
  return productos.slice(0, limit).map(mapper);
};

export default { fetchProductById, fetchProducts, mapApiProduct };