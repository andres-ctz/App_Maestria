import dotenv from 'dotenv';
import { defineConfig } from 'prisma/config';

// Al ejecutar desde apps/backend, ../../.env apunta al .env de la raíz.
// El .env local del backend puede sobreescribir variables para desarrollo.
dotenv.config({ path: '../../.env' });
dotenv.config({ path: '.env', override: true });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  // Permite generar el cliente aun cuando DATABASE_URL no esté configurada.
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
});
