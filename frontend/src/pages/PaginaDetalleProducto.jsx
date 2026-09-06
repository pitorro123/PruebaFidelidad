import { useState, useEffect } from 'react';
import InformacionProducto from '../components/pages/catalogo/InformacionProducto';
import SeccionesProducto from '../components/pages/catalogo/SeccionesProducto';
import ProductosRelacionados from '../components/pages/catalogo/ProductosRelacionados';
import GaleriaProducto from '../components/pages/catalogo/GaleriaProducto';
import { fetchProductById, fetchProducts } from '../services/productService';
import styles from './DetalleProducto.module.css';

const PaginaDetalleProducto = () => {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducto = async (id) => {
    try {
      setLoading(true);
      const p = await fetchProductById(id);
      const relacionados = await fetchProducts(1000);
      p.relacionados = relacionados.filter(r => r.id !== p.id).slice(0, 4);

      setProducto(p);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      const path = window.location.pathname || '';
      const match = path.match(/\/producto\/(\d+)/);
      if (match) {
        const id = Number(match[1]);
        await loadProducto(id);
        return;
      }

      // Si no hay id en la URL, intentamos obtener el primer producto disponible
      try {
        const lista = await fetchProducts(10);
        const first = Array.isArray(lista) && lista.length > 0 ? lista[0] : null;
        const id = first ? first.id : null;
        if (id) await loadProducto(id);
        else setError('No hay productos disponibles para mostrar');
      } catch (e) {
        console.error(e);
        setError('No se pudo cargar el producto');
      }
    };

    loadInitial();

    const onPop = () => {
      const m = window.location.pathname.match(/\/producto\/(\d+)/);
      const i = m ? Number(m[1]) : null;
      if (i) (async () => { await loadProducto(i); })();
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const handleAgregarCarrito = (prod, talla, cantidad) => {
    console.log('Agregado al carrito:', { prod, talla, cantidad });
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
        onSeleccionarProducto={(id) => {
          window.history.pushState({ productoId: id }, '', `/producto/${id}`);
          loadProducto(id);
        }}
      />
    </div>
  );
};

export default PaginaDetalleProducto;
