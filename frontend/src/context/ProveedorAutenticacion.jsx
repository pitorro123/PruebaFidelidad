import { useState } from 'react'
import { AuthContext } from './AuthContext.js'
import {
  usuarioGoogleMock,
  autenticarMock,
  CLAVE_SESION_STORAGE,
  CLAVE_TOKEN_STORAGE,
} from '../data/authMock.js'

/**
 * Proveedor técnico de autenticación compartida para ReVuelta (MKT-L01 / MKT-R01).
 * Expone el mismo contrato técnico tanto para el modo simulado como para cuando exista backend real.
 */
export function ProveedorAutenticacion({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const sesionGuardada = localStorage.getItem(CLAVE_SESION_STORAGE)
      return sesionGuardada ? JSON.parse(sesionGuardada) : null
    } catch (error) {
      console.error('Error al recuperar la sesión guardada:', error)
      localStorage.removeItem(CLAVE_SESION_STORAGE)
      localStorage.removeItem(CLAVE_TOKEN_STORAGE)
      return null
    }
  })
  const [cargando] = useState(false)

  /**
   * Inicia sesión con correo y contraseña.
   * Mientras no haya backend, valida con authMock.
   * Cuando se integre backend, aquí se realizará la petición Axios sin afectar los componentes.
   */
  const iniciarSesion = async ({ correo, contrasena }) => {
    try {
      const respuesta = await autenticarMock({ correo, contrasena })

      if (respuesta.success && respuesta.usuario) {
        setUsuario(respuesta.usuario)

        // Guardar indicador de sesión simulada en localStorage para persistencia entre recargas
        localStorage.setItem(CLAVE_SESION_STORAGE, JSON.stringify(respuesta.usuario))
        if (respuesta.token) {
          localStorage.setItem(CLAVE_TOKEN_STORAGE, respuesta.token)
        }

        return { success: true, usuario: respuesta.usuario }
      }

      return { success: false, error: respuesta.error || 'Credenciales inválidas.' }
    } catch (error) {
      return {
        success: false,
        error: error?.message || 'Ocurrió un error al intentar iniciar sesión.',
      }
    }
  }

  /**
   * Simula el inicio de sesión con Google.
   */
  const iniciarSesionConGoogle = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setUsuario(usuarioGoogleMock)
      localStorage.setItem(CLAVE_SESION_STORAGE, JSON.stringify(usuarioGoogleMock))
      localStorage.setItem(CLAVE_TOKEN_STORAGE, `google-token-${usuarioGoogleMock.id}`)
      return { success: true, usuario: usuarioGoogleMock }
    } catch (error) {
      return {
        success: false,
        error: error?.message || 'Error al iniciar sesión con Google.',
      }
    }
  }

  /**
   * Cierra la sesión activa y elimina los datos de persistencia.
   */
  const cerrarSesion = () => {
    setUsuario(null)
    localStorage.removeItem(CLAVE_SESION_STORAGE)
    localStorage.removeItem(CLAVE_TOKEN_STORAGE)
  }

  /**
   * Simula el registro de un nuevo usuario.
   */
  const registrarUsuario = async ({ correo, recibirNovedades = false }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200))
      const nuevoUsuario = {
        id: Date.now(),
        nombre: correo.split('@')[0],
        correo: correo.trim().toLowerCase(),
        recibirNovedades,
        rol: 'usuario',
      }
      setUsuario(nuevoUsuario)
      localStorage.setItem(CLAVE_SESION_STORAGE, JSON.stringify(nuevoUsuario))
      localStorage.setItem(CLAVE_TOKEN_STORAGE, `mock-jwt-token-${nuevoUsuario.id}`)
      return { success: true, usuario: nuevoUsuario }
    } catch (error) {
      return {
        success: false,
        error: error?.message || 'Error al crear la cuenta.',
      }
    }
  }

  const valor = {
    usuario,
    autenticado: Boolean(usuario),
    cargando,
    iniciarSesion,
    iniciarSesionConGoogle,
    cerrarSesion,
    registrarUsuario,
  }

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export default ProveedorAutenticacion
