import styles from '../../../pages/DetalleProducto.module.css';

const fallbackImagen = (texto) => {
  const color = '#8a5a3b';
  const titulo = encodeURIComponent(String(texto || 'Producto'));
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500"><rect width="400" height="500" fill="${color}"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${titulo}</text></svg>`,
  )}`;
};

const ProductosRelacionados = ({ productos, onSeleccionarProducto }) => {
  if (!productos) return null;

  return (
    <div className={styles.relacionadosContainer}>
      <h3 className={styles.relacionadosTitulo}>TAMBIÉN TE PODRÍA INTERESAR</h3>
      <div className={styles.relacionadosGrid}>
        {productos.map((prod) => {
          const imageUrl = prod.imagen || prod.imagenes?.[0]?.url || fallbackImagen(prod.nombre);
          return (
            <div 
              key={prod.id} 
              className={styles.tarjetaProducto}
              onClick={() => onSeleccionarProducto(prod.id)}
            >
              <img src={imageUrl} alt={prod.nombre} className={styles.tarjetaImg} />
              <div className={styles.tarjetaBody}>
                <h4 className={styles.tarjetaNombre}>{prod.nombre}</h4>
                <span className={styles.tarjetaPrecio}>${(prod.precio || 0).toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductosRelacionados;