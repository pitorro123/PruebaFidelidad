const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validarFormatoCorreo(correo) {
  if (!correo || typeof correo !== 'string') return false
  return EMAIL_REGEX.test(correo.trim())
}

export function validarSeguridadContrasena(contrasena) {
  if (!contrasena || typeof contrasena !== 'string') {
    return { valida: false, mensaje: 'La contraseña no puede estar vacía.' }
  }

  const longitudMinima = 6
  if (contrasena.length < longitudMinima) {
    return {
      valida: false,
      mensaje: `La contraseña debe tener al menos ${longitudMinima} caracteres.`,
    }
  }

  return { valida: true }
}

export function validarCoincidenciaContrasenas(contrasena, confirmacion) {
  return Boolean(contrasena && confirmacion && contrasena === confirmacion)
}
