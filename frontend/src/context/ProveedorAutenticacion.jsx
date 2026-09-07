import { useState } from 'react'
import { AuthContext } from './AuthContext.js'
import { peticionJson } from '../services/http.js'
import {
  CLAVE_SESION_STORAGE,
  CLAVE_TOKEN_STORAGE,
} from '../data/authMock.js'

/**
 * Proveedor técnico de autenticación compartida para ReVuelta (MKT-L01 / MKT-R01).
 * El inicio de sesión con correo/contraseña consulta el backend real (POST /api/auth/login);
 * el inicio con Google permanece simulado porque el backend no expone OAuth.
 */
const derivarNombre = (correo) => {
  const parte = String(correo || '').split('@')[0] || 'Usuario'
  return parte.charAt(0).toUpperCase() + parte.slice(1)
}

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

  /**
   * Inicia sesión con correo y contraseña contra el backend real.
   */
  const iniciarSesion = async ({ correo, contrasena }) => {
    try {
      const respuesta = await peticionJson('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: correo.trim().toLowerCase(),
          password: contrasena,
        }),
      })

      if (respuesta && respuesta.autenticado) {
        const datosUsuario = {
          correo: respuesta.email || correo,
          nombre: derivarNombre(respuesta.email || correo),
          rol: 'usuario',
        }
        setUsuario(datosUsuario)
        localStorage.setItem(CLAVE_SESION_STORAGE, JSON.stringify(datosUsuario))
        localStorage.setItem(CLAVE_TOKEN_STORAGE, 'revuelta-sesion')
        return { success: true, usuario: datosUsuario }
      }

      return {
        success: false,
        error: respuesta?.mensaje || 'Credenciales inválidas.',
      }
    } catch (error) {
      return {
        success: false,
        error: error?.message || 'Ocurrió un error al intentar iniciar sesión.',
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

  const valor = {
    usuario,
    autenticado: Boolean(usuario),
    iniciarSesion,
    cerrarSesion,
  }

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export default ProveedorAutenticacion
