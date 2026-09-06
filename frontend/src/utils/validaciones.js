/**
 * Utilidades de validación para formularios de autenticación y registro (MKT-L01 / MKT-R01).
 * Centralizadas para permitir fácil extensión cuando se definan reglas específicas adicionales.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Valida el formato de una dirección de correo electrónico.
 * @param {string} correo
 * @returns {boolean}
 */
export function validarFormatoCorreo(correo) {
  if (!correo || typeof correo !== 'string') return false
  return EMAIL_REGEX.test(correo.trim())
}

/**
 * Valida las reglas de seguridad de una contraseña de forma centralizada y extensible.
 * @param {string} contrasena
 * @returns {{ valida: boolean, mensaje?: string }}
 */
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

/**
 * Valida si la contraseña y su confirmación coinciden.
 * @param {string} contrasena
 * @param {string} confirmacion
 * @returns {boolean}
 */
export function validarCoincidenciaContrasenas(contrasena, confirmacion) {
  return Boolean(contrasena && confirmacion && contrasena === confirmacion)
}
