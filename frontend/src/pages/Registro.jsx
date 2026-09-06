import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import FormularioRegistro from '../components/autenticacion/FormularioRegistro/FormularioRegistro.jsx'
import styles from './Registro.module.css'

// MKT-R01 — Registro de cuenta
// Responsabilidad: Mostrar el título "Crear cuenta", contener FormularioRegistro
// y coordinar el resultado exitoso con la capa de autenticación compartida.
export default function Registro() {
  const { usuario, autenticado, cerrarSesion } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [cuentaCreada, setCuentaCreada] = useState(false)
  const [nombreBienvenida, setNombreBienvenida] = useState("")

  const destino = location.state?.from?.pathname || '/'

  const handleRegistroExitoso = (correo) => {
    setCuentaCreada(true)
    const nombre = (correo || "").split("@")[0] || ""
    const nombreCapitalizado = nombre.charAt(0).toUpperCase() + nombre.slice(1)
    setNombreBienvenida(nombreCapitalizado)
    setTimeout(() => navigate(destino, { replace: true }), 6000)
  }

  return (
    <section className={styles.pagina}>
      <h1 className={styles.titulo}>Crear cuenta</h1>

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
      ) : cuentaCreada ? (
        <div className={styles.registroExitoso} role="status">
          <p className={styles.exitoTitulo}>¡Bienvenido a ReVuelta, {nombreBienvenida}!</p>
          <p>Tu cuenta fue creada con éxito. Revisa tu correo: te enviamos un mensaje de bienvenida con tu 20% de descuento en tu primera compra.</p>
          <Link to="/iniciar-sesion" className={styles.btnIr}>
            Iniciar sesión
          </Link>
        </div>
      ) : (
        <FormularioRegistro onRegistroExitoso={handleRegistroExitoso} />
      )}
    </section>
  )
}