const COLORES = ['#4a6fa5', '#d4739b', '#c2a488', '#3f7d58', '#22262b', '#8a5a3b']

export function imagenPlaceholder(texto, semilla = 0) {
  const color = COLORES[Math.abs(semilla) % COLORES.length]
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"><rect width="600" height="800" fill="${color}"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="32" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${texto}</text></svg>`,
  )}`
}
