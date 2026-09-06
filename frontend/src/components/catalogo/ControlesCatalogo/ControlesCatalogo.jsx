import { FaList, FaThLarge, FaTimes } from 'react-icons/fa'
import styles from './ControlesCatalogo.module.css'

const opcionesOrden = [
  { id: 'mas_recientes', nombre: 'Más recientes' },
  { id: 'precio_menor_mayor', nombre: 'Precio: menor a mayor' },
  { id: 'precio_mayor_menor', nombre: 'Precio: mayor a menor' },
  { id: 'mejor_calificados', nombre: 'Mejor calificados' },
]

function ControlesCatalogo({
  filtros,
  filtrosActivos,
  ordenSeleccionado,
  tipoVista,
  onCancelarFiltro,
  onCambiarOrden,
  onCambiarVista,
}) {
  const filtrosConSeleccion = filtros.filter(
    (filtro) => (filtrosActivos[filtro.id] || []).length > 0,
  )

  const nombreOpcion = (filtro, opcionId) =>
    filtro.opciones.find((opcion) => opcion.id === opcionId)?.nombre || opcionId

  return (
    <div className={styles.controlesCatalogo}>
      <div className={styles.filtrosActivos}>
        {filtrosConSeleccion.length === 0 ? (
          <span className={`${styles.indicadorFiltro} ${styles.todos}`}>Todos</span>
        ) : (
          filtrosConSeleccion.map((filtro) => (
            <span className={styles.indicadorFiltro} key={filtro.id}>
              {filtro.nombre}:{' '}
              {filtrosActivos[filtro.id]
                .map((opcionId) => nombreOpcion(filtro, opcionId))
                .join(', ')}
              <button
                type="button"
                className={styles.botonCancelarFiltro}
                onClick={() => onCancelarFiltro(filtro.id)}
                title={`Quitar filtro ${filtro.nombre}`}
                aria-label={`Quitar filtro ${filtro.nombre}`}
              >
                <FaTimes />
              </button>
            </span>
          ))
        )}
      </div>
      <div className={styles.controlesDerecha}>
        <div className={styles.controlVista}>
          <span className={styles.etiquetaControl}>Vista</span>
          <button
            type="button"
            className={
              tipoVista === 'cuadricula'
                ? `${styles.botonVista} ${styles.activo}`
                : styles.botonVista
            }
            onClick={() => onCambiarVista('cuadricula')}
            title="Vista en cuadrícula"
            aria-label="Vista en cuadrícula"
          >
            <FaThLarge />
          </button>
          <button
            type="button"
            className={
              tipoVista === 'lista'
                ? `${styles.botonVista} ${styles.activo}`
                : styles.botonVista
            }
            onClick={() => onCambiarVista('lista')}
            title="Vista en lista"
            aria-label="Vista en lista"
          >
            <FaList />
          </button>
        </div>
        <div className={styles.controlOrden}>
          <span className={styles.etiquetaControl}>Ordenar por</span>
          {opcionesOrden.map((opcion) => (
            <button
              type="button"
              key={opcion.id}
              className={
                ordenSeleccionado === opcion.id
                  ? `${styles.ordenOpcion} ${styles.activa}`
                  : styles.ordenOpcion
              }
              onClick={() => onCambiarOrden(opcion.id)}
            >
              {opcion.nombre}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ControlesCatalogo