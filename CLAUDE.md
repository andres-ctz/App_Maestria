# App Maestría

Sistema de gestión de cursos preparatorios para maestrías. Todo se escribe en **español**: código de dominio, interfaz y documentación.

## Fuente de verdad
- `Sistema-Gestion-Maestria-Obsidian/02 - Requisitos/Documento_Maestro_Requisitos_App_Maestria.md` (v0.3.2).
- `02 - Requisitos/Registro de decisiones.md` (D-001…D-019) y `02 - Requisitos/Decisiones pendientes.md`.
- Estado del frontend: `04 - Desarrollo/Frontend.md`. Entregas e informes: `07 - Entrega/`.

Antes de cambiar algo, comprueba en el código si ya está hecho; no lo supongas.

## Reglas
- **Git:** los commits locales están permitidos. Push, merge a `main` y PR solo con confirmación expresa. `main` tiene commits de otro colaborador: no la pises ni la rebasees sin avisar.
- **Ramas:**
  - `feature/fase-1-cimientos` es la rama de trabajo;
  - `Revisiones_Reparaciones` es la rama de arreglos de fin de semana: se trabaja ahí, el responsable revisa y pasa los cambios a `feature/fase-1-cimientos`;
  - `main` recibe la rama de trabajo cuando el equipo lo aprueba.
- **No versionar `apps/frontend/next-env.d.ts`:** Next lo reescribe en cada `pnpm dev` o `pnpm build`; no lo incluyas en los commits.
- **Decisiones pendientes** (Documento Maestro §23 y la nota «Decisiones pendientes»): no se resuelven ni se inventan. Si algo depende de una, anótalo y pregunta.
- **Identidad visual del boceto v0:** shadcn/ui con `@base-ui/react`, Tailwind 4, temas claro y oscuro. No cambies `app/globals.css` ni los colores sin pedirlo.
- **Seguridad:**
  - sin credenciales ni secretos en el repositorio y sin despliegues;
  - el inicio de sesión de demostración va detrás del contrato `AuthService`, y sin `AUTH_DEMO=true` en producción no existe sesión;
  - la protección de rutas del frontend (`lib/access.ts`, `proxy.ts`) es experiencia de usuario: los permisos reales se validan en el backend.
- **Dominio:**
  - `Postulacion` y `Estudiante` son tipos separados; se dice `Entrega` (no «Evidencia»);
  - escala de 0 a 100 y nota mínima de 70;
  - fechas en formato DD/MM/AAAA y zona horaria `America/Guayaquil`;
  - datos ficticios ecuatorianos: cédula `99########`, teléfonos +593, correos con dominio `.example`.
- **Para declarar algo «listo»** hacen falta `pnpm typecheck`, `pnpm test`, `pnpm build` y una prueba en el navegador. Hay que indicar qué no se pudo verificar.

## Comandos
Desde `apps/frontend`, con pnpm:

```bash
pnpm install
pnpm dev            # abrir http://localhost:3000 (no la IP; ver Frontend.md)
pnpm typecheck
pnpm test           # Vitest
pnpm build
AUTH_DEMO=true pnpm start   # producción local con la sesión de demostración
```

- **Abrir `pnpm dev` desde otra dirección** (un teléfono o la URL «Network»): define `ALLOWED_DEV_ORIGINS`, por ejemplo `192.168.*.*` (ver `apps/frontend/.env.example`). Sin esa variable los botones no responden.
- **Rutas nuevas:** se registran en `lib/modules.ts`. Las pruebas fallan si una página queda fuera del registro.

## Subagentes (`.claude/agents/`)
- `explorador` (haiku): lectura, búsqueda y resúmenes de salidas largas.
- `implementador` (sonnet): cambios de código y pruebas, mínimos y acotados.
- `revisor` (opus): planificación y revisión del diff (autenticación, permisos, accesibilidad, coherencia con el Documento Maestro).
