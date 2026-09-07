import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.js'

export function useAuth() {
  const contexto = useContext(AuthContext)

  if (!contexto) {
    throw new Error('useAuth debe utilizarse dentro de un <ProveedorAutenticacion>')
  }

  return contexto
}
