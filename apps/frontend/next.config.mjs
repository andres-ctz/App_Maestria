/**
 * Orígenes permitidos para el servidor de DESARROLLO.
 *
 * Next 16 bloquea por seguridad los recursos de desarrollo (`/_next/*`, incluido el canal de
 * recarga en caliente) cuando se abre la aplicación desde un origen distinto de `localhost`.
 * Si eso ocurre la página no se hidrata: los enlaces y formularios siguen funcionando, pero
 * los botones que dependen de JavaScript (tema, notificaciones, menú de la cuenta) no responden.
 *
 * Se permite `127.0.0.1`. Para abrir la aplicación desde otra dirección (la URL «Network» de
 * Next, un teléfono en la misma red o un puerto reenviado) define ALLOWED_DEV_ORIGINS con los
 * nombres de host separados por comas, por ejemplo: ALLOWED_DEV_ORIGINS=192.168.1.20,mi-equipo.local
 * Solo afecta a `pnpm dev`; no tiene efecto en la compilación de producción.
 *
 * Indicador de desarrollo de Next (la «N» flotante): por defecto se coloca abajo a la
 * izquierda, justo encima del menú de la cuenta del menú lateral, y captura los clics
 * (el primer clic sobre «Menú de la cuenta» no lo abría, y con él «Cambiar de cuenta» y
 * «Cerrar sesión»). Se mueve abajo a la derecha, donde no tapa ningún control de la interfaz
 * (los botones del encabezado están arriba a la derecha). Solo existe en `pnpm dev`.
 */
const origenesDev = [
  '127.0.0.1',
  ...(process.env.ALLOWED_DEV_ORIGINS ?? '')
    .split(',')
    .map((origen) => origen.trim())
    .filter(Boolean),
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: origenesDev,
  devIndicators: { position: 'bottom-right' },
  images: {
    unoptimized: true,
  },
  // Rutas del boceto original que cambiaron al separar postulantes de estudiantes.
  async redirects() {
    return [
      { source: '/postulantes', destination: '/estudiantes', permanent: false },
      { source: '/portal', destination: '/estudiante', permanent: false },
      { source: '/portal/actividades', destination: '/estudiante/actividades', permanent: false },
      { source: '/tutor/evidencias', destination: '/tutor/entregas', permanent: false },
    ]
  },
}

export default nextConfig
