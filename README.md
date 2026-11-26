# App Maestría

Sistema de gestión de cursos preparatorios para programas de maestría. Cubre el proceso completo:
- convocatorias y postulaciones;
- admisiones, listas de espera y matrículas;
- cursos, actividades, entregas, evaluaciones y calificaciones;
- seguimiento académico y riesgo;
- notificaciones y reportes.

## Estado actual
| Parte | Estado |
|---|---|
| Frontend (`apps/frontend`) | **Fase 1 cerrada.** Pantallas base con datos e inicio de sesión de **demostración** |
| Entorno local (`docker-compose.yml`) | **Verificado localmente.** PostgreSQL 16 y Mailpit ejecutándose con Docker Compose |
| Backend (`apps/backend`) | **Base inicial implementada.** NestJS 11, Prisma 7.10.1, PostgreSQL, rutas de salud y tres pruebas unitarias; los módulos de negocio siguen pendientes |
| Requisitos | Documento Maestro **v0.3.2**, con las decisiones del equipo hasta D-037 |

Los siguientes pasos están en [Informe para el equipo](Sistema-Gestion-Maestria-Obsidian/07%20-%20Entrega/Informe%20para%20el%20equipo%20-%20Cierre%20Fase%201%20y%20siguientes%20pasos.md).

## Puesta en marcha del frontend
**Requisitos:** Node.js 20.9 o superior y pnpm.

```bash
cd apps/frontend
pnpm install
pnpm dev
```

1. Abre **http://localhost:3000**. Usa `localhost`, no la IP: desde otra dirección la página se ve pero los botones no responden (ver `apps/frontend/.env.example` y `ALLOWED_DEV_ORIGINS`).
2. En la pantalla de inicio de sesión, entra con cualquier cuenta de demostración con un solo clic. No hay contraseñas.

Las cuentas de demostración y sus roles están en [Frontend.md](Sistema-Gestion-Maestria-Obsidian/04%20-%20Desarrollo/Frontend.md).

### Comandos (desde `apps/frontend`)
| Comando | Para qué |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm typecheck` | Comprobación de tipos |
| `pnpm test` | Pruebas automáticas (Vitest) |
| `pnpm build` | Compilación de producción |
| `AUTH_DEMO=true pnpm start` | Producción local con la sesión de demostración |

> [!WARNING]
> El inicio de sesión de demostración **no valida contraseñas** y nunca debe desplegarse. Sin `AUTH_DEMO=true`, una compilación de producción no permite iniciar sesión.

## Backend (Fase 2 — base inicial)
**Requisitos:** Node.js 22.18 o superior y pnpm 12.3.4. Desde la raíz del repositorio, inicia primero PostgreSQL y Mailpit:

```bash
docker compose up -d
docker compose ps
```

Después, desde `apps/backend`:

```bash
pnpm install
pnpm prisma:generate
pnpm start:dev
```

La API escucha en `http://localhost:3001`. Rutas disponibles:
- `GET /api/v1/health/live`: comprueba que el proceso está activo.
- `GET /api/v1/health/ready`: comprueba la conexión real con PostgreSQL.

Para verificar la base inicial, ejecuta desde `apps/backend`:

```bash
pnpm test
pnpm build
```

El esquema Prisma todavía no contiene modelos ni migraciones. Se incorporarán después de validar relaciones, restricciones e índices del módulo de usuarios, roles, sesiones y asignaciones. La autenticación, autorización, auditoría y los módulos de negocio siguen pendientes. Consulta [apps/backend/README.md](apps/backend/README.md).

## Servicios locales (PostgreSQL y Mailpit)
**Requisito adicional:** Docker Desktop (o Docker Engine con el plugin `docker compose`).

Desde la **raíz del repositorio**:

```bash
cp .env.example .env      # opcional: personaliza puertos o credenciales locales
docker compose up -d      # levanta PostgreSQL 16 y Mailpit
docker compose ps         # comprueba el estado de los servicios
```

| Servicio | Dirección local | Uso |
|---|---|---|
| PostgreSQL 16 | `127.0.0.1:5432` | Base de datos del backend |
| Mailpit (SMTP) | `127.0.0.1:1025` | Captura de correos simulados (D-013) |
| Mailpit (Web UI) | http://localhost:8025 | Bandeja visual para inspeccionar correos |

Para detener los servicios:
- `docker compose down` detiene los contenedores y conserva los datos de PostgreSQL.
- `docker compose down -v` detiene los contenedores y borra el volumen local.

## Estructura
```
.
├── apps/frontend/                     # Next.js 16, React 19, TypeScript, Tailwind 4 y shadcn/ui
├── apps/backend/                      # NestJS 11, Prisma 7 y PostgreSQL 16
├── docker-compose.yml                 # PostgreSQL 16 y Mailpit para desarrollo local
├── .env.example                       # plantilla de variables locales (no subir .env)
├── Sistema-Gestion-Maestria-Obsidian/ # documentación del proyecto (vault de Obsidian)
│   ├── 02 - Requisitos/               # Documento Maestro, decisiones y pendientes
│   ├── 03 - Arquitectura/             # stack, modelo de datos, matriz de permisos y API
│   ├── 04 - Desarrollo/               # notas de frontend, backend y base de datos
│   └── 07 - Entrega/                  # informes de cada entrega
├── CLAUDE.md                          # reglas del proyecto para Claude Code
└── .claude/agents/                    # subagentes de exploración, implementación y revisión
```

La documentación se puede leer en GitHub o abrir como vault en [Obsidian](https://obsidian.md).

## Documentos clave
- [Documento Maestro de Requisitos](Sistema-Gestion-Maestria-Obsidian/02%20-%20Requisitos/Documento_Maestro_Requisitos_App_Maestria.md).
- [Registro de decisiones](Sistema-Gestion-Maestria-Obsidian/02%20-%20Requisitos/Registro%20de%20decisiones.md) y [Decisiones pendientes](Sistema-Gestion-Maestria-Obsidian/02%20-%20Requisitos/Decisiones%20pendientes.md).
- [Frontend](Sistema-Gestion-Maestria-Obsidian/04%20-%20Desarrollo/Frontend.md).
- [Backend](Sistema-Gestion-Maestria-Obsidian/04%20-%20Desarrollo/Backend.md) y [README del backend](apps/backend/README.md).

## Cómo trabajamos
**Ramas:**

| Rama | Uso |
|---|---|
| `feature/fase-1-cimientos` | Rama de trabajo de la Fase 1 |
| `Revisiones_Reparaciones` | Arreglos de fin de semana; se revisan y pasan a `feature/fase-1-cimientos` (D-021) |
| `feature/fase-2-entorno-docker` | Base de entorno local de Fase 2 |
| `feature/fase-2-backend` | Implementación del backend de Fase 2 |
| `main` | Recibe los cambios cuando el equipo los aprueba |

**Reglas:**
- Ninguna decisión pendiente se resuelve por suposición; las decisiones nuevas se anotan en el Registro de decisiones.
- Para declarar una entrega lista hacen falta `pnpm typecheck`, `pnpm test`, `pnpm build` y una prueba en navegador, indicando qué no se pudo verificar.
- Código de dominio y documentación en español. Fechas DD/MM/AAAA y zona horaria `America/Guayaquil`.
- Datos ficticios: cédulas `99########`, teléfonos +593 y correos con dominio `.example`.
- No subir contraseñas, claves, archivos `.env` con secretos ni bases de datos locales.
- `apps/frontend/next-env.d.ts` no se incluye en commits: Next lo reescribe automáticamente.
