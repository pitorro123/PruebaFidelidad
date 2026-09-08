const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const CORREOS_DESCARTABLES = [
  "example.com",
  "ejemplo.com",
  "test.com",
  "correo.com",
  "email.com",
  "prueba.com",
  "temporal.com",
  "temporario.com",
  "mailinator.com",
  "10minutemail.com",
  "guerrillamail.com",
  "sharklasers.com",
  "yopmail.com",
  "temp-mail.org",
  "maildrop.cc",
  "throwaway.com",
  "fake.com",
  "fakemail.com",
  "none.com",
  "nothing.com",
  "nowhere.com",
  "null.com",
  "noemail.com",
  "sincorreo.com",
  "sin-correo.com",
  "localhost",
]

const LOCAL_PARTS_DE_PRUEBA = /^(test|prueba|asd|abc|hola)[.\d]*/

export function validarFormatoCorreo(correo) {
  if (!correo || typeof correo !== 'string') return false
  return EMAIL_REGEX.test(correo.trim())
}

export function validarCorreoReal(correo) {
  if (!validarFormatoCorreo(correo)) {
    return {
      valida: false,
      mensaje: 'Ingresa un formato de correo válido (ej. tu.nombre@gmail.com).',
    }
  }
  const partes = correo.trim().toLowerCase().split('@')
  const dominio = partes[1] || ''
  const parteLocal = partes[0] || ''
  const esDescartable = CORREOS_DESCARTABLES.some((d) => dominio === d || dominio.endsWith(`.${d}`))
  if (esDescartable || LOCAL_PARTS_DE_PRUEBA.test(parteLocal)) {
    return {
      valida: false,
      mensaje: 'Parece un correo de prueba. Usa un correo real para recibir tu bono de 20%.',
    }
  }
  return { valida: true }
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
