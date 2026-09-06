import { FaChevronLeft } from 'react-icons/fa'
import styles from './FiltrosCatalogo.module.css'

function FiltrosCatalogo({
  filtros,
  filtrosActivos,
  onCambioFiltro,
  onOcultar,
}) {
  return (
    <aside className={styles.filtrosCatalogo}>
      <div className={styles.filtrosCabecera}>
        <h2 className={styles.filtrosTitulo}>Filtros</h2>
        <button
          type="button"
          className={styles.botonOcultarFiltros}
          onClick={onOcultar}
          title="Ocultar filtros"
          aria-label="Ocultar filtros"
        >
          <FaChevronLeft />
        </button>
      </div>
      {filtros.map((filtro) => (
        <div className={styles.filtroSeccion} key={filtro.id}>
          <h3 className={styles.filtroSeccionTitulo}>{filtro.nombre}</h3>
          <div className={styles.filtroOpciones}>
            {filtro.opciones.map((opcion) => {
              const activa = (filtrosActivos[filtro.id] || []).includes(
                opcion.id,
              )
              return (
                <button
                  type="button"
                  key={opcion.id}
                  className={
                    activa
                      ? `${styles.filtroOpcion} ${styles.activa}`
                      : styles.filtroOpcion
                  }
                  onClick={() => onCambioFiltro(filtro.id, opcion.id)}
                >
                  {opcion.nombre}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </aside>
  )
}

export default FiltrosCatalogo