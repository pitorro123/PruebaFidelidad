import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import FiltrosCatalogo from '../../components/catalogo/FiltrosCatalogo/FiltrosCatalogo.jsx'
import ControlesCatalogo from '../../components/catalogo/ControlesCatalogo/ControlesCatalogo.jsx'
import ProductosCatalogo from '../../components/catalogo/ProductosCatalogo/ProductosCatalogo.jsx'
import PaginacionCatalogo from '../../components/catalogo/PaginacionCatalogo/PaginacionCatalogo.jsx'
import { filtrosCatalogo } from '../../data/filtros.js'
import { obtenerProductos } from '../../services/productosService.js'
import { RUTAS } from '../../constants/rutas.js'
import styles from './Catalogo.module.css'

function filtroInicialDesdeUrl(searchParams) {
  const categoria = searchParams.get('categoria')
  if (!categoria || categoria === 'todos') return {}
  const filtro = filtrosCatalogo.find((f) => f.id === 'categoria')
  const opcion = filtro.opciones.find(
    (o) =>
      o.id === categoria ||
      o.nombre.toLowerCase() === categoria.toLowerCase(),
  )
  return opcion ? { categoria: [opcion.id] } : {}
}

function claveConsulta(filtrosActivos, ordenSeleccionado, paginaActual) {
  const filtros = Object.entries(filtrosActivos)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([filtroId, opciones]) => `${filtroId}:${[...opciones].sort().join(',')}`)
    .join('|')
  return `${filtros}|${ordenSeleccionado}|${paginaActual}`
}

function Catalogo() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [filtrosActivos, setFiltrosActivos] = useState(() =>
    filtroInicialDesdeUrl(searchParams),
  )
  const [ordenSeleccionado, setOrdenSeleccionado] = useState('mas_recientes')
  const [tipoVista, setTipoVista] = useState('cuadricula')
  const [paginaActual, setPaginaActual] = useState(1)
  const [filtrosVisibles, setFiltrosVisibles] = useState(true)
  const [paginasCargadas, setPaginasCargadas] = useState({})

  useEffect(() => {
    const clave = claveConsulta(filtrosActivos, ordenSeleccionado, paginaActual)
    if (paginasCargadas[clave]) return
    let activo = true
    obtenerProductos({
      filtrosActivos,
      orden: ordenSeleccionado,
      pagina: paginaActual,
    }).then((resultado) => {
      if (activo) {
        setPaginasCargadas((prev) => ({ ...prev, [clave]: resultado }))
      }
    })
    return () => {
      activo = false
    }
  }, [filtrosActivos, ordenSeleccionado, paginaActual, paginasCargadas])

  const manejarCambioFiltro = (filtroId, opcionId) => {
    setFiltrosActivos((prev) => {
      const actual = prev[filtroId] || []
      const incluye = actual.includes(opcionId)
      const siguiente = incluye
        ? actual.filter((id) => id !== opcionId)
        : [...actual, opcionId]
      const nuevo = { ...prev }
      if (siguiente.length === 0) {
        delete nuevo[filtroId]
      } else {
        nuevo[filtroId] = siguiente
      }
      return nuevo
    })
    setPaginaActual(1)
  }

  const manejarCancelarFiltro = (filtroId) => {
    setFiltrosActivos((prev) => {
      const nuevo = { ...prev }
      delete nuevo[filtroId]
      return nuevo
    })
    setPaginaActual(1)
  }

  const manejarCambiarOrden = (ordenId) => {
    setOrdenSeleccionado(ordenId)
    setPaginaActual(1)
  }

  const manejarCambiarVista = (vista) => {
    setTipoVista(vista)
  }

  const manejarCambiarPagina = (pagina) => {
    setPaginaActual(pagina)
  }

  const manejarSeleccionarProducto = (producto) => {
    navigate(RUTAS.DETALLE_PRODUCTO.replace(':id', String(producto.id)))
  }

  const paginaCargada =
    paginasCargadas[claveConsulta(filtrosActivos, ordenSeleccionado, paginaActual)]
  const productosPagina = paginaCargada?.productos || []
  const totalPaginas = paginaCargada?.totalPaginas || 1

  return (
    <div className={styles.catalogo}>
      <h1 className={styles.catalogoTitulo}>Catálogo</h1>
      <div className={styles.catalogoCuerpo}>
        {filtrosVisibles ? (
          <FiltrosCatalogo
            filtros={filtrosCatalogo}
            filtrosActivos={filtrosActivos}
            onCambioFiltro={manejarCambioFiltro}
            onOcultar={() => setFiltrosVisibles(false)}
          />
        ) : (
          <button
            type="button"
            className={styles.botonMostrarFiltros}
            onClick={() => setFiltrosVisibles(true)}
            title="Mostrar filtros"
            aria-label="Mostrar filtros"
          >
            <FaChevronRight />
          </button>
        )}
        <div className={styles.catalogoContenido}>
          <ControlesCatalogo
            filtros={filtrosCatalogo}
            filtrosActivos={filtrosActivos}
            ordenSeleccionado={ordenSeleccionado}
            tipoVista={tipoVista}
            onCancelarFiltro={manejarCancelarFiltro}
            onCambiarOrden={manejarCambiarOrden}
            onCambiarVista={manejarCambiarVista}
          />
          <ProductosCatalogo
            productos={productosPagina}
            tipoVista={tipoVista}
            onSeleccionarProducto={manejarSeleccionarProducto}
          />
          <PaginacionCatalogo
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            onCambiarPagina={manejarCambiarPagina}
          />
        </div>
      </div>
    </div>
  )
}

export default Catalogo