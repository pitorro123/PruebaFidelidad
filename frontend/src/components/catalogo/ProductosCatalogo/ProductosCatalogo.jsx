import TarjetaProducto from '../../shared/TarjetaProducto/TarjetaProducto.jsx'
import styles from './ProductosCatalogo.module.css'

function ProductosCatalogo({ productos, tipoVista, onSeleccionarProducto }) {
  if (productos.length === 0) {
    return (
      <p className={styles.sinResultados}>
        No se encontraron productos con los filtros seleccionados.
      </p>
    )
  }

  return (
    <div
      className={
        tipoVista === 'cuadricula'
          ? styles.productosCuadricula
          : styles.productosLista
      }
    >
      {productos.map((producto) => (
        <TarjetaProducto
          key={producto.id}
          producto={producto}
          tipoVista={tipoVista}
          onSeleccionar={() => onSeleccionarProducto(producto)}
        />
      ))}
    </div>
  )
}

export default ProductosCatalogo