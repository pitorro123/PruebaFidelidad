import { useState } from 'react';
import styles from '../../../pages/DetalleProducto.module.css';

const GaleriaProducto = ({ imagenes = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const imagenesValidas = imagenes.filter(
    (imagen) => imagen && typeof imagen.url === 'string' && imagen.url.trim() !== '',
  );
  const imagenActiva = imagenesValidas[activeIndex] || imagenesValidas[0] || null;

  return (
    <div className={styles.galeriaContainer}>
      <div className={styles.imagenPrincipalWrapper}>
        {imagenActiva ? (
          <img
            src={imagenActiva.url}
            alt="Producto principal"
            className={styles.imagenPrincipal}
          />
        ) : (
          <div className={styles.imagenPrincipal}>Sin imagen disponible</div>
        )}
      </div>
      {imagenesValidas.length > 1 && (
        <div className={styles.miniaturasContainer}>
          {imagenesValidas.map((imagen, idx) => (
            <button
              key={imagen.id}
              onClick={() => setActiveIndex(idx)}
              className={`${styles.miniaturaBtn} ${imagenActiva?.id === imagen.id ? styles.activa : ''}`}
            >
              <img src={imagen.url} alt="miniatura" className={styles.miniaturaImg} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GaleriaProducto;
