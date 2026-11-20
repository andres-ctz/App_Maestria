# Frontend

Responsabilidad: pantallas y flujos en Next.js 16, React 19, TypeScript y Tailwind 4 con shadcn/ui.

Está en `apps/frontend`. Nació del boceto de v0 (`Boceto de fronted/sistema-de-gestion-academica`) y conserva su identidad visual. Detalle de la Fase 1 en [[Informe Fase 1]].

## Comandos
Se ejecutan desde `apps/frontend` con pnpm:

- `pnpm install`: instala las dependencias.
- `pnpm dev`: servidor de desarrollo. Abre la aplicación en **http://localhost:3000** (ver «Si los botones no responden en `pnpm dev`» más abajo).
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
- El cambio de rol solo aparece en cuentas con varios roles. Cambiar de **rol** (misma cuenta) no es lo mismo que cambiar de **cuenta**.

### Cambiar de cuenta durante las pruebas locales
Solo existe en el modo de demostración; fuera de él las cuentas de demostración no se listan y la acción no hace nada.

- **Menú de la cuenta (abajo a la izquierda):** «Cambiar de cuenta (demostración)» abre la lista de cuentas activas y entra con un clic, sin borrar cookies ni caché.
- **Pantalla de inicio de sesión:** cada cuenta de demostración tiene un botón para entrar con un clic. Con una sesión activa, `/login` se puede abrir, avisa de quién está dentro y permite continuar, cerrar sesión o elegir otra cuenta.
- **Cerrar sesión:** elimina la cookie de demostración y vuelve a `/login`.

### Otros controles del encabezado
- **Tema claro/oscuro:** el botón de tema también está en las pantallas de acceso. Su nombre accesible indica el tema activo y la acción; el tema elegido se conserva al navegar y al recargar.
- **Notificaciones:** el centro de notificaciones pertenece a una fase posterior. La campana abre un panel flotante anclado a ella, a la derecha y encima del contenido, con el título «Notificaciones», la etiqueta «Próximamente» y un mensaje. No cambia de ruta, no muestra notificaciones ni contadores, y se cierra al pulsar de nuevo la campana, al pulsar fuera y con Escape.

### Si los botones no responden en `pnpm dev`
Solo ocurre en el servidor de desarrollo y tiene dos causas conocidas:

1. **La dirección con la que abres la aplicación.** Next 16 bloquea sus recursos de desarrollo cuando el origen no es `localhost`. La página se ve, los enlaces y formularios funcionan, pero el JavaScript no se activa y los botones (tema, campana, menú de la cuenta) no responden. En la consola del navegador aparece «Blocked cross-origin request to Next.js dev resource». Abre **http://localhost:3000**. `127.0.0.1` ya está permitido; para otra dirección (la URL «Network», un teléfono o un puerto reenviado) define `ALLOWED_DEV_ORIGINS` (ver `.env.example`).
2. **El indicador de desarrollo de Next** (la «N» flotante) se colocaba abajo a la izquierda y tapaba «Menú de la cuenta», así que el primer clic no lo abría, ni «Cambiar de cuenta» ni «Cerrar sesión». Ahora está abajo a la derecha. Solo existe en `pnpm dev`.

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
