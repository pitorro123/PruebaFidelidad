// Simulación de autenticación para MKT-R01 / MKT-L01 mientras no exista backend real.
// Debe exponer el mismo contrato que usará la autenticación real: usuario, autenticado, iniciarSesion, cerrarSesion.

export const CLAVE_SESION_STORAGE = 'revuelta_usuario_simulado'
export const CLAVE_TOKEN_STORAGE = 'revuelta_token'

export const usuariosMock = [
  {
    id: 1,
    nombre: 'Usuario de prueba',
    correo: 'usuario@ejemplo.com',
    contrasena: 'password123',
    rol: 'usuario',
  },
  {
    id: 2,
    nombre: 'Ana Martínez',
    correo: 'ana@revuelta.com',
    contrasena: 'password123',
    rol: 'vendedor',
  },
]

export const usuarioMock = usuariosMock[0]

export const usuarioGoogleMock = {
  id: 99,
  nombre: 'Usuario Google ReVuelta',
  correo: 'usuario.google@gmail.com',
  foto: '',
  proveedor: 'google',
  rol: 'usuario',
}

/**
 * Simula la validación de credenciales en el frontend.
 * @param {{ correo: string, contrasena: string }} credenciales
 * @returns {Promise<{ success: boolean, usuario?: object, error?: string, token?: string }>}
 */
export async function autenticarMock({ correo, contrasena }) {
  // Simular latencia de red leve
  await new Promise((resolve) => setTimeout(resolve, 200))

  const usuarioEncontrado = usuariosMock.find(
    (u) => u.correo.toLowerCase() === correo.trim().toLowerCase()
  )

  if (!usuarioEncontrado) {
    // Si es un correo válido en modo prueba pero no está en la lista fija, permitir simular como nuevo usuario
    if (correo.includes('@') && contrasena.length >= 6) {
      const nuevoUsuario = {
        id: Date.now(),
        nombre: correo.split('@')[0],
        correo: correo.trim().toLowerCase(),
        rol: 'usuario',
      }
      return {
        success: true,
        usuario: nuevoUsuario,
        token: `mock-jwt-token-${nuevoUsuario.id}`,
      }
    }

    return {
      success: false,
      error: 'Correo o contraseña incorrectos. Por favor verifica tus datos.',
    }
  }

  if (usuarioEncontrado.contrasena !== contrasena) {
    return {
      success: false,
      error: 'Correo o contraseña incorrectos. Por favor verifica tus datos.',
    }
  }

  const datosUsuario = { ...usuarioEncontrado }
  delete datosUsuario.contrasena
  return {
    success: true,
    usuario: datosUsuario,
    token: `mock-jwt-token-${usuarioEncontrado.id}`,
  }
}

