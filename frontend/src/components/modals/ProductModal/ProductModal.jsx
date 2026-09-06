import styles from './ProductModal.module.css'
import { imagenPlaceholder } from '../../../utils/imagenes'

function extraerImagenes(producto) {
  const crudas = Array.isArray(producto.imagenes)
    ? producto.imagenes
    : producto.imagen
      ? [producto.imagen]
      : []
  const urls = crudas
    .map((imagen) => (typeof imagen === 'string' ? imagen : imagen?.url))
    .filter(Boolean)
  return urls.length > 0 ? urls : [imagenPlaceholder(producto.nombre, producto.id)]
}

function ProductModal({ producto, estaAbierto, onCerrar, onProponerTrueque, onVerCatalogo }) {
  if (!estaAbierto || !producto) return null

  const imagenes = extraerImagenes(producto)
  const tallas = (producto.tallas || [])
    .map((talla) => (typeof talla === 'string' ? talla : talla?.nombre))
    .filter(Boolean)
    .join(', ')
  const precio = Number(producto.precio) || 0
  const sinStock = producto.cantidadDisponible === 0

  return (
    <div
      className={styles.overlay}
      onClick={onCerrar}
      role="dialog"
      aria-modal="true"
      aria-label={producto.nombre}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.botonCerrar}
          onClick={onCerrar}
          aria-label="Cerrar"
        >
          &times;
        </button>

        <h2 className={styles.titulo}>{producto.nombre}</h2>

        <div className={styles.imagenes}>
          {imagenes.map((imagen, indice) => (
            <img
              key={indice}
              className={styles.imagen}
              src={imagen}
              alt={`${producto.nombre} - imagen ${indice + 1}`}
            />
          ))}
        </div>

        <p className={styles.precio}>
          {new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0,
          }).format(precio)}
        </p>

        <div className={styles.detalles}>
          <div className={styles.detalle}>
            <span className={styles.detalleLabel}>Tallas</span>
            <span className={styles.detalleValor}>{tallas || 'Única'}</span>
          </div>
          <div className={styles.detalle}>
            <span className={styles.detalleLabel}>Disponibles</span>
            <span className={styles.detalleValor}>
              {producto.cantidadDisponible ?? '—'}
            </span>
          </div>
          <div className={`${styles.detalle} ${styles.detalleLote}`}>
            <span className={styles.detalleLabel}>Lote</span>
            <span className={`${styles.detalleValor} ${styles.lote}`}>
              {producto.lote || '—'}
            </span>
          </div>
        </div>

        {producto.truequesDeInteres?.length > 0 && (
          <div className={styles.trueques}>
            {producto.truequesDeInteres.map((trueque, indice) => (
              <span key={indice} className={styles.tag}>
                {trueque}
              </span>
            ))}
          </div>
        )}

        <button
          className={styles.botonAccion}
          onClick={onProponerTrueque}
          disabled={sinStock}
        >
          Proponer Trueque
        </button>

        {onVerCatalogo && (
          <button
            className={`${styles.botonAccion} ${styles.botonCatalogo}`}
            onClick={onVerCatalogo}
          >
            Ver en catálogo
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductModal