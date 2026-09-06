import { useState } from 'react'
import styles from './TradeModal.module.css'
import { imagenPlaceholder } from '../../../utils/imagenes'

function extraerImagenPrincipal(producto) {
  if (!producto) return ''
  const crudas = Array.isArray(producto.imagenes)
    ? producto.imagenes
    : producto.imagen
      ? [producto.imagen]
      : []
  const urls = crudas
    .map((imagen) => (typeof imagen === 'string' ? imagen : imagen?.url))
    .filter(Boolean)
  return urls[0] || imagenPlaceholder(producto.nombre, producto.id)
}

function TradeModal({ productoObjetivo, prendasUsuario, estaAbierto, onCerrar, onSubmit }) {
  const [prendasSeleccionadas, setPrendasSeleccionadas] = useState([])

  if (!estaAbierto) return null

  const prendas = prendasUsuario || []
  const alternarPrenda = (id) => {
    setPrendasSeleccionadas((previas) =>
      previas.includes(id)
        ? previas.filter((prendaId) => prendaId !== id)
        : [...previas, id],
    )
  }

  const miniatura = extraerImagenPrincipal(productoObjetivo)

  return (
    <div
      className={styles.overlay}
      onClick={onCerrar}
      role="dialog"
      aria-modal="true"
      aria-label={`Trueque por ${productoObjetivo?.nombre || ''}`}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.botonCerrar}
          onClick={onCerrar}
          aria-label="Cerrar"
        >
          &times;
        </button>

        <div className={styles.encabezado}>
          {miniatura && (
            <img
              className={styles.miniatura}
              src={miniatura}
              alt={productoObjetivo?.nombre}
            />
          )}
          <div>
            <h2 className={styles.titulo}>Trueque por: {productoObjetivo?.nombre}</h2>
            <p className={styles.subtitulo}>
              Tienes <strong>{prendas.length}</strong> prendas disponibles para
              ofrecer
            </p>
          </div>
        </div>

        {prendas.length === 0 ? (
          <p className={styles.vacio}>
            No tienes prendas disponibles para ofrecer.
          </p>
        ) : (
          <div className={styles.grid}>
            {prendas.map((prenda) => (
              <div
                key={prenda.id}
                className={`${styles.prenda}${
                  prendasSeleccionadas.includes(prenda.id)
                    ? ` ${styles.prendaSeleccionada}`
                    : ''
                }`}
                onClick={() => alternarPrenda(prenda.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    alternarPrenda(prenda.id)
                  }
                }}
              >
                <img src={prenda.imagen} alt={prenda.nombre} />
                <p className={styles.prendaNombre}>{prenda.nombre}</p>
                <p className={styles.prendaPrecio}>
                  {new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    maximumFractionDigits: 0,
                  }).format(Number(prenda.precio) || 0)}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className={styles.pie}>
          <button className={styles.boton} onClick={onCerrar}>
            Cancelar
          </button>
          <button
            className={`${styles.boton} ${styles.botonPrimario}`}
            disabled={prendasSeleccionadas.length === 0}
            onClick={() => onSubmit?.(prendasSeleccionadas)}
          >
            Enviar propuesta
          </button>
        </div>
      </div>
    </div>
  )
}

export default TradeModal