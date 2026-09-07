import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import FormularioInicioSesion from '../../components/autenticacion/FormularioInicioSesion/FormularioInicioSesion.jsx'
import { RUTAS } from '../../constants/rutas.js'
import styles from './InicioSesion.module.css'

export default function InicioSesion() {
  const { usuario, autenticado, cerrarSesion } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const destino = location.state?.from?.pathname || RUTAS.LANDING_PAGE

  const handleInicioExitoso = () => {
    navigate(destino, { replace: true })
  }

  return (
    <section className={styles.pagina}>
      <h1 className={styles.titulo}>Iniciar sesión</h1>

      {autenticado ? (
        <div className={styles.alertaSesionActiva}>
          <p>
            Ya tienes una sesión activa como <strong>{usuario?.nombre || usuario?.correo}</strong>.
          </p>
          <div className={styles.accionesSesionActiva}>
            <Link to={RUTAS.CATALOGO} className={styles.btnIr}>
              Ir al Catálogo
            </Link>
            <button type="button" className={styles.btnCerrar} onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </div>
        </div>
      ) : (
        <FormularioInicioSesion onInicioExitoso={handleInicioExitoso} />
      )}
    </section>
  )
}
