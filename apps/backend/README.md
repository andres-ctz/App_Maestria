# Backend — App Maestría

API base construida con NestJS, TypeScript y Prisma ORM 7 sobre PostgreSQL 16.

## Requisitos

- Node.js 22.18 o superior.
- pnpm 12.3.4.
- Docker Compose para levantar PostgreSQL desde la raíz del repositorio.

## Preparar el entorno

Desde la raíz del repositorio, copia .env.example a .env si todavía no existe y levanta los servicios:

```bash
docker compose up -d
docker compose ps
```

Después, desde apps/backend:

```bash
pnpm install
pnpm prisma:generate
pnpm start:dev
```

La API escucha en http://localhost:3001 y utiliza DATABASE_URL del .env de la raíz. Las variables adicionales del backend se documentan en .env.example.

## Comprobaciones de salud

- GET /api/v1/health/live: confirma que el proceso está activo; no necesita consultar PostgreSQL.
- GET /api/v1/health/ready: comprueba la conexión con PostgreSQL y devuelve HTTP 503 si no está disponible.

## Comandos

```bash
pnpm build
pnpm test
pnpm test:cov
pnpm prisma:generate
pnpm prisma:migrate:dev -- --name nombre_migracion
pnpm prisma:migrate:deploy
```

## Estado del modelo de datos

prisma/schema.prisma contiene por ahora la configuración del generador y del proveedor PostgreSQL, sin modelos ni migraciones. Es deliberado: el modelo conceptual de usuarios, roles, asignaciones y sesiones todavía requiere revisar cardinalidades, restricciones e índices antes de crear la primera migración. No se modifica la base de datos al instalar o arrancar esta API.

## Seguridad inicial

- Configuración validada al arrancar.
- CORS limitado a los orígenes declarados.
- Cabeceras HTTP con Helmet.
- Validación global de DTOs con whitelist, transform y rechazo de propiedades no declaradas.
- La comprobación de disponibilidad no expone errores internos ni credenciales.

La autenticación, autorización, auditoría y el modelo de usuarios todavía no están implementados en este primer incremento.
