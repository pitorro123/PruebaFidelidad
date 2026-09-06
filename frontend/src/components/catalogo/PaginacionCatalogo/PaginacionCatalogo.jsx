import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './PaginacionCatalogo.module.css'

function PaginacionCatalogo({ paginaActual, totalPaginas, onCambiarPagina }) {
  const paginas = Array.from({ length: totalPaginas }, (_, indice) => indice + 1)

  return (
    <nav className={styles.paginacion} aria-label="Paginación">
      <button
        type="button"
        className={styles.paginacionFlecha}
        disabled={paginaActual === 1}
        onClick={() => onCambiarPagina(paginaActual - 1)}
        aria-label="Página anterior"
      >
        <FaChevronLeft />
      </button>
      {paginas.map((pagina) => (
        <button
          type="button"
          key={pagina}
          className={
            pagina === paginaActual
              ? `${styles.paginacionNumero} ${styles.activo}`
              : styles.paginacionNumero
          }
          onClick={() => onCambiarPagina(pagina)}
        >
          {pagina}
        </button>
      ))}
      <button
        type="button"
        className={styles.paginacionFlecha}
        disabled={paginaActual === totalPaginas}
        onClick={() => onCambiarPagina(paginaActual + 1)}
        aria-label="Página siguiente"
      >
        <FaChevronRight />
      </button>
    </nav>
  )
}

export default PaginacionCatalogo