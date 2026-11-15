/** @type {import('next').NextConfig} */
const nextConfig = {
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
