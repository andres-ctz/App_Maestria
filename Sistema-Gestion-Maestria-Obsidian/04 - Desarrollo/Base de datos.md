# Base de datos

Stack confirmado (D-022): **PostgreSQL 16** + **Prisma estable**, levantado en local con `docker-compose.yml`.

## Entorno local (Docker Compose)
La definición de servicios vive en la raíz del repositorio (`docker-compose.yml` y `.env.example`) e incluye **PostgreSQL 16** (`127.0.0.1:5432`) y **Mailpit** (`127.0.0.1:1025` SMTP / `http://localhost:8025` interfaz web) con zona horaria `America/Guayaquil` (D-009).

- Arrancar servicios: `docker compose up -d`
- Verificar salud: `docker compose ps`
- Reiniciar desde base vacía: `docker compose down -v && docker compose up -d`

Detalle completo en [[Informe Entorno Local Docker]].

## Pasos para el esquema y migraciones (Fase 2)
1. Revisar el [[Modelo de datos]].
2. Acordar relaciones y restricciones.
3. Definir índices.
4. Crear migraciones pequeñas.
5. Preparar seed ficticio.
6. Probar desde base vacía.
7. Documentar backup/restore.

Los archivos físicos no van en PostgreSQL: solo sus metadatos (D-007). No subir dumps con datos personales ni modificar producción manualmente.
