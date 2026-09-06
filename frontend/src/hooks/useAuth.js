import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.js'

/**
 * Hook para acceder a la capa de autenticación compartida.
 * Expone el contrato: { usuario, autenticado, cargando, iniciarSesion, iniciarSesionConGoogle, cerrarSesion, registrarUsuario }
 */
export function useAuth() {
  const contexto = useContext(AuthContext)

  if (!contexto) {
    throw new Error('useAuth debe utilizarse dentro de un <ProveedorAutenticacion>')
  }

  return contexto
}

export default useAuth
