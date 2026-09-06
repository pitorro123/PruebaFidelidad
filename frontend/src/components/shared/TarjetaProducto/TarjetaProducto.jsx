import { useState } from 'react'
import { FaCheckCircle, FaStar } from 'react-icons/fa'
import { imagenPlaceholder } from '../../../utils/imagenes.js'
import styles from './TarjetaProducto.module.css'

function TarjetaProducto({ producto, tipoVista = 'cuadricula', onSeleccionar }) {
  const [imagen, setImagen] = useState(producto.imagen)
  return (
    <article
      className={`${styles.tarjetaProducto} ${tipoVista === 'lista' ? styles.vistaLista : styles.vistaCuadricula}`}
      onClick={onSeleccionar}
      role="button"
      tabIndex={0}
      onKeyDown={(evento) => {
        if (evento.key === 'Enter' || evento.key === ' ') {
          evento.preventDefault()
          onSeleccionar()
        }
      }}
    >
      <div className={styles.tarjetaProductoImagen}>
        <img
          src={imagen}
          alt={producto.nombre}
          onError={() =>
            setImagen(imagenPlaceholder(producto.nombre, producto.id))
          }
        />
      </div>
      <div className={styles.tarjetaProductoInfo}>
        <p className={styles.tarjetaProductoMarca}>{producto.marca}</p>
        <h3 className={styles.tarjetaProductoNombre}>{producto.nombre}</h3>
        <p className={styles.tarjetaProductoTalla}>
          Talla: {producto.tallas.join(', ')}
        </p>
        <p className={styles.tarjetaProductoColor}>{producto.color}</p>
        <p className={styles.tarjetaProductoPrecio}>
          ${producto.precio.toLocaleString('es-CO')}
        </p>
        <p className={styles.tarjetaProductoVendedor}>
          {producto.vendedor}
          {producto.verificado && (
            <FaCheckCircle className={styles.iconoVerificado} aria-label="Verificado" />
          )}
          <span className={styles.tarjetaProductoCalificacion}>
            <FaStar className={styles.iconoEstrella} /> {producto.calificacion}
          </span>
        </p>
      </div>
    </article>
  )
}

export default TarjetaProducto