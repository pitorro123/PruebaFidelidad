import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth.js'
import { validarFormatoCorreo } from '../../../utils/validaciones.js'
import ModalRecuperarContrasena from '../ModalRecuperarContrasena/ModalRecuperarContrasena.jsx'
import styles from './FormularioInicioSesion.module.css'

export default function FormularioInicioSesion({ onInicioExitoso }) {
  const { iniciarSesion } = useAuth()

  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [recordarContrasena, setRecordarContrasena] = useState(false)

  const [errores, setErrores] = useState({})
  const [errorGlobal, setErrorGlobal] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [modalRecuperarVisible, setModalRecuperarVisible] = useState(false)

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!correo.trim()) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.'
    } else if (!validarFormatoCorreo(correo)) {
      nuevosErrores.correo = 'Ingresa un formato de correo válido (ej. usuario@ejemplo.com).'
    }

    if (!contrasena) {
      nuevosErrores.contrasena = 'La contraseña es obligatoria.'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorGlobal('')

    if (!validarFormulario()) return

    setEnviando(true)
    try {
      const resultado = await iniciarSesion({
        correo,
        contrasena,
        recordarContrasena,
      })

      if (resultado.success) {
        if (onInicioExitoso) onInicioExitoso(resultado.usuario)
      } else {
        setErrorGlobal(resultado.error || 'No fue posible iniciar sesión. Verifica tus datos.')
      }
    } catch {
      setErrorGlobal('Ocurrió un error inesperado al conectar con el servidor.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className={styles.tarjeta}>
      {errorGlobal && (
        <div className={styles.alertaErrorGlobal} role="alert">
          {errorGlobal}
        </div>
      )}

      <form className={styles.formulario} onSubmit={handleSubmit} noValidate>
        <div className={styles.campo}>
          <label htmlFor="correo" className={styles.label}>
            Correo
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcono} aria-hidden="true">
              ✉
            </span>
            <input
              id="correo"
              name="correo"
              type="email"
              placeholder="Ingresa tu correo electrónico"
              className={`${styles.input} ${errores.correo ? styles.inputError : ''}`}
              value={correo}
              onChange={(e) => {
                setCorreo(e.target.value)
                if (errores.correo) setErrores((prev) => ({ ...prev, correo: null }))
              }}
              autoComplete="email"
              disabled={enviando}
            />
          </div>
          {errores.correo && <span className={styles.errorTexto}>{errores.correo}</span>}
        </div>

        <div className={styles.campo}>
          <label htmlFor="contrasena" className={styles.label}>
            Contraseña
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcono} aria-hidden="true">
              🔒
            </span>
            <input
              id="contrasena"
              name="contrasena"
              type="password"
              placeholder="••••••••••"
              className={`${styles.input} ${errores.contrasena ? styles.inputError : ''}`}
              value={contrasena}
              onChange={(e) => {
                setContrasena(e.target.value)
                if (errores.contrasena) setErrores((prev) => ({ ...prev, contrasena: null }))
              }}
              autoComplete="current-password"
              disabled={enviando}
            />
          </div>
          {errores.contrasena && <span className={styles.errorTexto}>{errores.contrasena}</span>}
        </div>

        <div className={styles.filaOpciones}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={recordarContrasena}
              onChange={(e) => setRecordarContrasena(e.target.checked)}
              disabled={enviando}
            />
            Recordar contraseña
          </label>

          <button
            type="button"
            className={styles.linkOlvido}
            onClick={() => setModalRecuperarVisible(true)}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button type="submit" className={styles.btnSubmit} disabled={enviando}>
          {enviando ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>

      <div className={styles.pieRegistro}>
        ¿No tienes cuenta?
        <Link to="/registro">Crear cuenta</Link>
      </div>

      <ModalRecuperarContrasena
        visible={modalRecuperarVisible}
        onCerrar={() => setModalRecuperarVisible(false)}
      />
    </div>
  )
}
