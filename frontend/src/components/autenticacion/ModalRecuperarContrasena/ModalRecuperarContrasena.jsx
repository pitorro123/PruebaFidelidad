import { useState } from 'react'
import { validarFormatoCorreo } from '../../../utils/validaciones.js'
import styles from './ModalRecuperarContrasena.module.css'

export default function ModalRecuperarContrasena({ visible, onCerrar }) {
  const [correo, setCorreo] = useState('')
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [cargando, setCargando] = useState(false)

  if (!visible) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validarFormatoCorreo(correo)) {
      setError('Ingresa un correo electrónico válido.')
      return
    }

    setCargando(true)
    // Simular petición
    await new Promise((resolve) => setTimeout(resolve, 300))
    setCargando(false)
    setEnviado(true)
  }

  const handleCerrar = () => {
    setCorreo('')
    setError('')
    setEnviado(false)
    onCerrar()
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.cerrar}
          onClick={handleCerrar}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <h2 className={styles.titulo}>Recuperar contraseña</h2>
        <p className={styles.descripcion}>
          Ingresa el correo asociado a tu cuenta y te enviaremos un enlace seguro para restablecer
          tu contraseña.
        </p>

        {enviado ? (
          <div>
            <div className={styles.mensajeExito}>
              ¡Listo! Si existe una cuenta asociada a <strong>{correo}</strong>, recibirás las
              instrucciones en breve.
            </div>
            <div className={styles.acciones}>
              <button type="button" className={styles.btnPrincipal} onClick={handleCerrar}>
                Entendido
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <div className={styles.mensajeError}>{error}</div>}

            <div className={styles.campo}>
              <label htmlFor="correo-recuperacion" className={styles.label}>
                Correo electrónico
              </label>
              <input
                id="correo-recuperacion"
                type="email"
                className={styles.input}
                placeholder="ejemplo@correo.com"
                value={correo}
                onChange={(e) => {
                  setCorreo(e.target.value)
                  if (error) setError('')
                }}
                autoFocus
              />
            </div>

            <div className={styles.acciones}>
              <button
                type="button"
                className={styles.btnSecundario}
                onClick={handleCerrar}
                disabled={cargando}
              >
                Cancelar
              </button>
              <button type="submit" className={styles.btnPrincipal} disabled={cargando}>
                {cargando ? 'Enviando...' : 'Enviar enlace'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
