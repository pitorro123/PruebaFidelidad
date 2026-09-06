import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import FormularioInicioSesion from '../components/autenticacion/FormularioInicioSesion/FormularioInicioSesion.jsx'
import styles from './InicioSesion.module.css'

// MKT-L01 — Inicio de sesión
// Responsabilidad: Mostrar el título "Iniciar sesión", contener FormularioInicioSesion
// y coordinar el resultado exitoso de la identificación con la capa de autenticación compartida.
export default function InicioSesion() {
  const { usuario, autenticado, cerrarSesion } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirigir a la ruta previa de origen si venía de una acción protegida, o a /carrito por defecto
  const destino = location.state?.from?.pathname || '/carrito'

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
            <Link to="/carrito" className={styles.btnIr}>
              Ir al Carrito
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
