/** Cookie de la sesión de DEMOSTRACIÓN. No contiene secretos: es solo "cuenta:rol". */
export const COOKIE_SESION = "am_sesion_demo"

/**
 * El proveedor de demostración solo está activo en desarrollo. Para usarlo con una
 * compilación de producción local (por ejemplo `next start`) hay que activar
 * AUTH_DEMO=true de forma explícita. Nunca debe activarse en un despliegue real.
 */
export function demoHabilitado(): boolean {
  return process.env.NODE_ENV !== "production" || process.env.AUTH_DEMO === "true"
}
