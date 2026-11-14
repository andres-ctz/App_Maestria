# Base de datos

Propuesta: PostgreSQL + Prisma estable.

1. Revisar el [[Modelo de datos]].
2. Acordar relaciones y restricciones.
3. Definir índices.
4. Crear migraciones pequeñas.
5. Preparar seed ficticio.
6. Probar desde base vacía.
7. Documentar backup/restore.

Los archivos físicos no van en PostgreSQL: solo sus metadatos. No subir dumps con datos personales ni modificar producción manualmente.
