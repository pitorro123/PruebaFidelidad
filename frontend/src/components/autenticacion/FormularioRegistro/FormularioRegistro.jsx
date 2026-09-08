import { useState } from 'react'
import { Link } from 'react-router-dom'
import { validarCorreoReal, validarSeguridadContrasena, validarCoincidenciaContrasenas } from '../../../utils/validaciones.js'
import { registrarCuenta } from '../../../services/registroService.js'
import styles from './FormularioRegistro.module.css'

export default function FormularioRegistro({ onRegistroExitoso }) {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [confirmacionContrasena, setConfirmacionContrasena] = useState('')
  const [recibirNovedades, setRecibirNovedades] = useState(false)

  const [errores, setErrores] = useState({})
  const [errorGlobal, setErrorGlobal] = useState('')
  const [enviando, setEnviando] = useState(false)

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!correo.trim()) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.'
    } else {
      const correoValido = validarCorreoReal(correo)
      if (!correoValido.valida) {
        nuevosErrores.correo = correoValido.mensaje
      }
    }

    const contrasenaValida = validarSeguridadContrasena(contrasena)
    if (!contrasenaValida.valida) {
      nuevosErrores.contrasena = contrasenaValida.mensaje
    }

    if (!validarCoincidenciaContrasenas(contrasena, confirmacionContrasena)) {
      nuevosErrores.confirmacionContrasena = 'Las contraseñas no coinciden.'
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
      await registrarCuenta({
        email: correo,
        password: contrasena,
      })

      if (onRegistroExitoso) onRegistroExitoso(correo.trim())
    } catch (error) {
      setErrorGlobal(error?.message || 'No fue posible crear tu cuenta. Intenta nuevamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className={styles.tarjeta}>
      <div className={styles.avisoBienvenida} role="note">
        <span className={styles.avisoIcono} aria-hidden="true">
          ✉
        </span>
        <p>
          <strong>Usa un correo real y revísalo:</strong> ahí te enviaremos tu
          <strong> bono de 20% de descuento</strong> para la primera compra.
        </p>
      </div>

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
              placeholder="ej. tu.nombre@gmail.com"
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
          {errores.correo ? (
            <span className={styles.errorTexto}>{errores.correo}</span>
          ) : (
            <span className={styles.ayudaCorreo}>Aquí llegará tu bono de bienvenida de 20%.</span>
          )}
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
              placeholder="Mínimo 6 caracteres"
              className={`${styles.input} ${errores.contrasena ? styles.inputError : ''}`}
              value={contrasena}
              onChange={(e) => {
                setContrasena(e.target.value)
                if (errores.contrasena) setErrores((prev) => ({ ...prev, contrasena: null }))
              }}
              autoComplete="new-password"
              disabled={enviando}
            />
          </div>
          {errores.contrasena && (
            <span className={styles.errorTexto}>{errores.contrasena}</span>
          )}
        </div>

        <div className={styles.campo}>
          <label htmlFor="confirmacionContrasena" className={styles.label}>
            Confirmar contraseña
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcono} aria-hidden="true">
              🔐
            </span>
            <input
              id="confirmacionContrasena"
              name="confirmacionContrasena"
              type="password"
              placeholder="Repite tu contraseña"
              className={`${styles.input} ${errores.confirmacionContrasena ? styles.inputError : ''}`}
              value={confirmacionContrasena}
              onChange={(e) => {
                setConfirmacionContrasena(e.target.value)
                if (errores.confirmacionContrasena) {
                  setErrores((prev) => ({ ...prev, confirmacionContrasena: null }))
                }
              }}
              autoComplete="new-password"
              disabled={enviando}
            />
          </div>
          {errores.confirmacionContrasena && (
            <span className={styles.errorTexto}>{errores.confirmacionContrasena}</span>
          )}
        </div>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            checked={recibirNovedades}
            onChange={(e) => setRecibirNovedades(e.target.checked)}
            disabled={enviando}
          />
          Quiero recibir novedades y ofertas
        </label>

        <button type="submit" className={styles.btnSubmit} disabled={enviando}>
          {enviando ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </form>

      <div className={styles.pieSesion}>
        ¿Ya tienes cuenta?
        <Link to="/iniciar-sesion">Iniciar sesión</Link>
      </div>
    </div>
  )
}