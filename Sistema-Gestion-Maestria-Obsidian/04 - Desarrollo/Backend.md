# Backend

Responsabilidad: API, reglas de negocio, validaciones, autorización y persistencia.

Módulos previstos: autenticación, usuarios y roles, asignaciones, gestión institucional, facultades, programas, períodos, convocatorias, postulaciones, admisiones, matrículas, cursos, grupos, actividades, evaluaciones, calificaciones, seguimiento, riesgos, notificaciones, archivos, auditoría, reportes y configuración inicial.

Validar entradas, aplicar permisos por rol y asignación (ver [[Matriz de permisos]]), usar transacciones en operaciones sensibles (por ejemplo, asignación de cupos) y proteger las descargas.

## Estado de implementación — 26/11/2026

La rama `feature/fase-2-backend` incorpora la base técnica inicial en `apps/backend`:

- Aplicación NestJS 11 con configuración por variables de entorno, prefijo `/api/v1`, CORS, Helmet y validación global.
- Prisma ORM 7.10.1 con adaptador PostgreSQL y servicio inyectable.
- Rutas `GET /api/v1/health/live` y `GET /api/v1/health/ready`.
- Tres pruebas unitarias del servicio de salud.
- Verificación local del equipo: PostgreSQL 16 y Mailpit saludables; NestJS inició, la ruta de disponibilidad confirmó consulta a PostgreSQL, las tres pruebas pasaron y `pnpm build` terminó con código 0.

El esquema Prisma se mantiene intencionalmente sin modelos ni migraciones. Antes de crearlos deben revisarse y acordarse cardinalidades, restricciones e índices del primer módulo.

**Pendiente:** usuarios, roles, sesiones, autenticación, verificación de correo, autorización por rol/asignación, auditoría y los módulos de negocio. El primer incremento no representa el backend completo ni el cierre de la Fase 2.
