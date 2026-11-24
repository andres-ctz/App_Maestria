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
| Backend y base de datos | Aún no existen. Son la **Fase 2**, con el stack ya confirmado (D-022): NestJS, PostgreSQL, Prisma, Docker Compose y Mailpit |
| Requisitos | Documento Maestro **v0.3.2**, con las decisiones del equipo hasta D-037 |

Los siguientes pasos están en [`Informe para el equipo`](Sistema-Gestion-Maestria-Obsidian/07%20-%20Entrega/Informe%20para%20el%20equipo%20-%20Cierre%20Fase%201%20y%20siguientes%20pasos.md).

## Puesta en marcha
**Requisitos:** Node.js 20.9 o superior (probado con Node.js 22) y pnpm.

```bash
cd apps/frontend
pnpm install
pnpm dev
```

1. Abre **http://localhost:3000**. Usa `localhost`, no la IP de tu red: desde otra dirección la página se ve pero los botones no responden (ver `apps/frontend/.env.example` y la variable `ALLOWED_DEV_ORIGINS`).
2. En la pantalla de inicio de sesión, entra con cualquier cuenta de demostración con un solo clic. No hay contraseñas.

Las cuentas de demostración y sus roles están en [`Frontend.md`](Sistema-Gestion-Maestria-Obsidian/04%20-%20Desarrollo/Frontend.md).

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

## Estructura
```
.
├── apps/frontend/                     # Next.js 16, React 19, TypeScript, Tailwind 4 y shadcn/ui
├── Sistema-Gestion-Maestria-Obsidian/ # documentación del proyecto (vault de Obsidian)
│   ├── 02 - Requisitos/               # Documento Maestro, Registro de decisiones, Decisiones pendientes
│   ├── 03 - Arquitectura/             # stack, modelo de datos, matriz de permisos, API
│   ├── 04 - Desarrollo/               # notas de frontend, backend y base de datos
│   └── 07 - Entrega/                  # informes de cada entrega
├── CLAUDE.md                          # reglas del proyecto para el asistente Claude Code
└── .claude/agents/                    # subagentes de Claude Code (explorador, implementador, revisor)
```

La documentación se puede leer en GitHub, pero se ve mejor abriendo `Sistema-Gestion-Maestria-Obsidian/` como vault en [Obsidian](https://obsidian.md).

## Documentos clave
- **Fuente de verdad:** [Documento Maestro de Requisitos](Sistema-Gestion-Maestria-Obsidian/02%20-%20Requisitos/Documento_Maestro_Requisitos_App_Maestria.md).
- **Qué se ha decidido y qué no:** [Registro de decisiones](Sistema-Gestion-Maestria-Obsidian/02%20-%20Requisitos/Registro%20de%20decisiones.md) y [Decisiones pendientes](Sistema-Gestion-Maestria-Obsidian/02%20-%20Requisitos/Decisiones%20pendientes.md).
- **Cómo está hecho el frontend:** [Frontend](Sistema-Gestion-Maestria-Obsidian/04%20-%20Desarrollo/Frontend.md).

## Cómo trabajamos
**Ramas:**

| Rama | Uso |
|---|---|
| `feature/fase-1-cimientos` | Rama de trabajo principal |
| `Revisiones_Reparaciones` | Arreglos de fin de semana. Se revisan y se pasan a `feature/fase-1-cimientos` (D-021) |
| `main` | Recibe la rama de trabajo cuando el equipo lo aprueba |

**Reglas:**
- **Decisiones:** ninguna decisión pendiente se resuelve por suposición. Si algo depende de una, se pregunta, y cuando se decide se anota en el Registro de decisiones.
- **Para dar algo por terminado** hacen falta `pnpm typecheck`, `pnpm test`, `pnpm build` y una prueba en el navegador. Cada cambio de comportamiento lleva sus pruebas.
- **Idioma:** todo en español, código de dominio incluido. Fechas en DD/MM/AAAA y zona horaria `America/Guayaquil`.
- **Datos de prueba:** siempre ficticios: cédulas `99########`, teléfonos +593 y correos con dominio `.example`.
- **Seguridad:** nunca se suben contraseñas, claves ni archivos `.env` con secretos.
- **`apps/frontend/next-env.d.ts`:** no se incluye en los commits; Next lo reescribe solo.
