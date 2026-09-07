import { peticionJson } from './http.js'

export async function registrarCuenta({ email, password }) {
  return peticionJson('/auth/registro', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}