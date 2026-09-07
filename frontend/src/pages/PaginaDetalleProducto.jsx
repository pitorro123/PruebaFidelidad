import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InformacionProducto from '../components/pages/catalogo/InformacionProducto';
import SeccionesProducto from '../components/pages/catalogo/SeccionesProducto';
import ProductosRelacionados from '../components/pages/catalogo/ProductosRelacionados';
import GaleriaProducto from '../components/pages/catalogo/GaleriaProducto';
import { cargarProductos, obtenerProductoDetalle } from '../services/productosService';
import { RUTAS } from '../constants/rutas.js';
import styles from './DetalleProducto.module.css';

const PaginaDetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const obtenerPrimerProducto = async () => {
    const lista = await cargarProductos();
    const first = Array.isArray(lista) && lista.length > 0 ? lista[0] : null;
    if (!first) throw new Error('No hay productos disponibles para mostrar');
    return obtenerProductoDetalle(first.id);
  };

  useEffect(() => {
    let activo = true;
    const resolver = async () => {
      try {
        const p = id ? await obtenerProductoDetalle(Number(id)) : await obtenerPrimerProducto();
        if (!activo) return;
        setProducto(p);
        setError(null);
      } catch (err) {
        console.error(err);
        if (activo) setError('No se pudo cargar el producto');
      } finally {
        if (activo) setLoading(false);
      }
    };
    resolver();
    return () => {
      activo = false;
    };
  }, [id]);

  const handleAgregarCarrito = (prod, talla, cantidad) => {
    console.log('Agregado al carrito:', { prod, talla, cantidad });
  };

  const handleSeleccionarRelacionado = (productoId) => {
    navigate(`${RUTAS.DETALLE_PRODUCTO.replace(':id', String(productoId))}`)
  };

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>{error}</div>;
  if (!producto) return <div>Producto no encontrado</div>;

  return (
    <div className={styles.detalleProductoContainer}>
      <div className={styles.detalleGrid}>
        <GaleriaProducto key={producto.id} imagenes={producto.imagenes} />
        <InformacionProducto
          producto={producto}
          onAgregarCarrito={handleAgregarCarrito}
        />
      </div>

      <SeccionesProducto infoSecciones={producto.secciones} producto={producto} />

      <ProductosRelacionados
        productos={producto.relacionados}
        onSeleccionarProducto={handleSeleccionarRelacionado}
      />
    </div>
  );
};

export default PaginaDetalleProducto;