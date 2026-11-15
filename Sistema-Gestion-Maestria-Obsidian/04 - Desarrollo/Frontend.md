# Frontend

Responsabilidad: pantallas y flujos en Next.js 16, React 19, TypeScript y Tailwind 4 con shadcn/ui.

Está en `apps/frontend`. Nació del boceto de v0 (`Boceto de fronted/sistema-de-gestion-academica`) y conserva su identidad visual. Detalle de la Fase 1 en [[Informe Fase 1]].

## Comandos
Se ejecutan desde `apps/frontend` con pnpm:

- `pnpm install`: instala las dependencias.
- `pnpm dev`: servidor de desarrollo.
- `pnpm typecheck`: comprobación de tipos.
- `pnpm test`: pruebas automáticas (Vitest).
- `pnpm build`: compilación de producción.

## Estructura
```
apps/frontend/
├── proxy.ts                  # protección de rutas por sesión y rol
├── app/
│   ├── (auth)/               # login y pantallas de acceso
│   ├── (public)/             # catálogo público
│   ├── (app)/                # aplicación con sesión (sidebar, encabezado)
│   │   └── [...ruta]/        # pantalla provisional de los módulos sin desarrollar
│   └── salir/                # limpia una sesión inválida
├── components/               # shell, paneles, tablas y componentes de UI
└── lib/
    ├── modules.ts            # registro único de rutas, roles y estado
    ├── access.ts             # control de acceso por rol y estado de la cuenta
    ├── navigation.ts         # menú de cada rol
    ├── auth/                 # contrato de autenticación y proveedor de demostración
    ├── config/               # marca institucional y valores de ejemplo
    ├── types.ts              # tipos del dominio (postulaciones y estudiantes separados)
    └── mock-data.ts          # datos de demostración
```

Una ruta nueva se registra en `lib/modules.ts` y, si tiene página propia, se crea su `page.tsx`. Las pruebas fallan si una página queda fuera del registro.

## Autenticación de demostración (Fase 1)
No existe backend. El inicio de sesión usa un proveedor de demostración detrás de un contrato (`lib/auth/auth-service.ts`), de modo que el proveedor real se pueda cambiar después sin tocar las pantallas.

- Identifica la cuenta por correo y **no valida contraseñas**.
- Solo está activo en desarrollo. Con una compilación de producción local hay que activar `AUTH_DEMO=true` (ver `.env.example`). Sin esa variable no hay sesión posible.
- La cookie de sesión no está firmada: **nunca debe desplegarse**.
- La protección de rutas del frontend es experiencia de usuario. Los permisos reales se validan en el backend en una fase posterior.
- El cambio de rol solo aparece en cuentas con varios roles.

### Cuentas de demostración
Los correos usan el dominio reservado `.example`. Todas las cuentas están sin contraseña.

| Correo | Rol | Observación |
|---|---|---|
| rsalazar@posgrado.example | Administrador | Cuenta protegida |
| vandrade@posgrado.example | Administrador | Cuenta protegida |
| mherrera@posgrado.example | Coordinador | |
| frojas@posgrado.example | Coordinador | |
| jparedes@posgrado.example | Tutor y coordinador | Única cuenta con varios roles |
| lquishpe@posgrado.example | Tutor | |
| avillacis@posgrado.example | Tutor | |
| cbenitez@posgrado.example | Tutor | Cuenta desactivada: no puede ingresar |
| valeria.gutierrez@correo.example | Postulante/Estudiante | Con matrícula |
| isabella.chavez@correo.example | Postulante/Estudiante | Postulante sin matrícula |

## Pantallas por módulo
Las desarrolladas son el panel ejecutivo, estudiantes y seguimiento, la bandeja de entregas del tutor, Mi curso y Mis actividades. El resto muestra una pantalla provisional que indica su estado y lo que incluirá.

- Acceso: login, registro de postulantes, recuperación de contraseña y verificación de correo.
- Catálogo público de convocatorias.
- Administración institucional: datos, tema, facultades, programas, períodos y usuarios.
- Convocatorias, postulaciones y revisión documental.
- Admisiones, lista de espera y matrículas.
- Cursos, módulos, asignaturas y grupos.
- Actividades, entregas y evaluaciones en línea, con banco de preguntas.
- Calificaciones: planes, cierre y publicación.
- Notificaciones y preferencias.
- Reportes y auditoría.

Mantener estados de carga, error y vacío, tema claro y oscuro, y diseño adaptable. Reutilizar el sistema visual. Ocultar botones no sustituye la autorización en el backend.
