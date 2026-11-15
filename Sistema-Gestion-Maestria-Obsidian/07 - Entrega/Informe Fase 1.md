# Informe de entrega — Fase 1: Cimientos

Rama `feature/fase-1-cimientos` · base `919eb74` · 15/11/2026 · Referencia funcional: [[Documento_Maestro_Requisitos_App_Maestria]] v0.3

> [!info] Cómo aplicarlo
> Los commits se entregan como parches porque quien los preparó no tiene permiso de escritura en el repositorio. Se aplican con `git am` sobre la rama y se suben con `git push`.

## 1. Resumen de lo implementado
- El frontend vive en `apps/frontend` y conserva la identidad visual del boceto: paleta, modo claro y oscuro, tipografía, sidebar, breadcrumbs, búsqueda, notificaciones y componentes.
- El flujo de **postulantes** quedó separado del de **estudiantes**, y la revisión documental de postulaciones quedó separada de las entregas de actividades.
- Hay navegación por rol y por estado de la cuenta, con un registro único de rutas. Las 28 rutas que corresponden a módulos o accesos de fases posteriores (24 con sesión y 4 públicas) tienen pantalla provisional, así que ningún enlace lleva a 404.
- Inicio de sesión de demostración detrás de un contrato, con protección de rutas por sesión y rol, y cambio de rol solo para cuentas con varios roles.
- Datos y textos alineados con Ecuador y con el formato DD/MM/AAAA; las reglas no aprobadas se quitaron del código o se marcaron como ejemplo.
- Se agregaron 50 pruebas automáticas, porque el proyecto no tenía ninguna.

## 2. Archivos creados, modificados, movidos y eliminados
Respecto a la base `919eb74`, solo dentro de `apps/frontend` (72 archivos, +2.606 −706 líneas):

- **Creados (35):** registro de rutas, control de acceso, autenticación, proxy, configuración, pantallas de acceso y provisionales, componentes nuevos y las pruebas.
- **Modificados (23):** dashboard, layouts, shell, tarjetas, tipos, datos, formato, navegación, `package.json` y `pnpm-lock.yaml`.
- **Movidos y renombrados:** `components/postulantes` → `components/estudiantes`, `components/evidencias` → `components/entregas`, `components/portal` → `components/estudiante`, y las páginas `/postulantes`, `/portal` y `/tutor/evidencias` → `/estudiantes`, `/estudiante` y `/tutor/entregas`. Git los muestra como renombres o como borrado más creación según cuánto cambió cada archivo.
- **Eliminados:** `role-provider.tsx` y `role-switcher.tsx`, sustituidos por `sesion-provider.tsx` y `user-menu.tsx`. También se retiró la dependencia `cn` (sin uso) y `@vercel/analytics`.
- **En el vault:** `Frontend`, `Decisiones pendientes` y `Registro de decisiones` actualizadas, y este informe.
- **Sin cambios:** `app/globals.css`, `components/ui/`, `components.json`, `postcss.config.mjs` y `public/`.

El `.zip` del boceto sigue en `Boceto de fronted/`, como se pidió. Se propone eliminarlo: duplica la carpeta que ya está movida.

Commits:
- `0ae366d` Ajustes técnicos del frontend: tipos sin ocultar, sin analytics ni dependencia sin uso, nombre de paquete
- `0edb7e1` Fase 1: separar postulaciones de estudiantes, navegación por rol y autenticación de demostración
- `7510712` Agregar pruebas automáticas (Vitest) de rutas, navegación, acceso, autenticación y datos
- `cd706ec` Cookie de demostración: Secure solo sobre HTTPS
- `64d41c1` Seguridad de la demostración: sin AUTH_DEMO ninguna cookie crea una sesión

El commit «Fase 1: separar postulaciones…» agrupa dominio, navegación y autenticación porque las piezas dependen entre sí y no compilan por separado.

## 3. Arquitectura resultante
```
apps/frontend/
├── proxy.ts                  # sesión y rol → redirige a /login o /sin-acceso
├── app/
│   ├── (auth)/ (public)/     # acceso y catálogo, sin el shell
│   ├── (app)/                # shell con sesión
│   │   └── [...ruta]/        # pantalla provisional para toda ruta registrada sin página
│   └── salir/                # limpia una sesión inválida
└── lib/
    ├── modules.ts            # registro único: ruta, roles, estado, qué incluirá, pendientes
    ├── access.ts             # puedeAcceder, rutaInicial, destinoSeguro
    ├── navigation.ts         # menú por rol y estado de la cuenta
    ├── auth/                 # contrato, proveedor de demostración, sesión, acciones
    ├── config/               # marca institucional y valores de ejemplo
    └── types.ts, mock-data.ts, format.ts
```
- Una sola fuente de verdad (`lib/modules.ts`) alimenta el proxy, el menú, las migas de pan y las pruebas.
- Una prueba falla si una página existe sin estar registrada, porque el proxy no la protegería.
- Los datos de ejemplo están aislados en `mock-data.ts` para sustituirlos por llamadas a la API.

## 4. Cambios sobre el frontend existente
| # | Cambio aprobado | Qué se hizo |
|---|---|---|
| 1 | Separar postulantes de estudiantes | Tipos `Postulacion` y `Estudiante`; «Matriz de postulantes» pasó a «Estudiantes y seguimiento» (`/estudiantes`); la aprobación de inscripción se retiró de esa tabla; Admisión queda en pantallas provisionales |
| 2 | Separar revisión documental y entregas | `Evidencia` pasó a `Entrega` (`/tutor/entregas`); los documentos de postulación son parte de `Postulacion` y de la pantalla provisional de Postulaciones |
| 3 | Quitar reglas no aprobadas | Se eliminaron «48 horas hábiles», «necesitas 100 %» y los pasos de inscripción inventados (pago, examen); la secuencia de recordatorios 15·10·5·3·1 se quitó; las reglas de riesgo y los límites de archivo pasaron a `lib/config/ejemplos.ts` y se muestran marcados como ejemplo |
| 4 | Contexto ecuatoriano y DD/MM/AAAA | Cédula o pasaporte, +593, cédulas ficticias con prefijo 99, correos `.example`, sin escala de notas, «doctorado» corregido, fechas DD/MM/AAAA, zona horaria America/Guayaquil, textos de marca en `lib/config/institucion.ts` |
| 5 | Navegación sin 404 | Las 5 rutas y el botón «Exportar» que daban 404 ahora llevan a una pantalla; las rutas antiguas redirigen a las nuevas |
| 6 | Ajustes técnicos | `ignoreBuildErrors` retirado (los tipos pasan); `@vercel/analytics` y `cn` retirados; paquete renombrado a `app-maestria-frontend`; `tsconfig.tsbuildinfo` ignorado. `react-is` **no se agregó**: pnpm resuelve el peer de recharts (`react-is@19.3.1` está en el lockfile) y el fallo visto en la revisión venía de instalar con npm y `--legacy-peer-deps` |
| 7 | Cambio de rol | Solo se ofrece a cuentas con varios roles (en la demostración, `jparedes@posgrado.example`) |

El selector de rol de demostración, que no tenía sesión, se sustituyó por el inicio de sesión y el menú de la cuenta.

## 5. Autenticación y roles
- **Contrato** `AuthService` (`lib/auth/auth-service.ts`). El proveedor de demostración identifica la cuenta por correo, ignora la contraseña y rechaza cuentas desactivadas.
- **Solo en desarrollo.** En producción hace falta `AUTH_DEMO=true`; sin esa variable no hay sesión posible: `resolverSesion` devuelve `null` aunque exista una cookie.
- **Sesión:** cookie `am_sesion_demo` (`cuenta:rol`), `HttpOnly`, `SameSite=lax`, `Secure` solo sobre HTTPS. No está firmada, por lo que **no debe desplegarse**.
- **Roles:** Administrador, Coordinador, Tutor y Postulante/Estudiante (una cuenta). Una cuenta puede tener varios; el rol activo se cambia desde el menú de la cuenta y la acción valida que la cuenta lo tenga.
- **Protección de rutas:** `proxy.ts` redirige a `/login?next=…` sin sesión y a `/sin-acceso` si el rol no puede entrar; cada página provisional lo vuelve a comprobar. Es experiencia de usuario: la seguridad real va en el backend.
- **Postulante/Estudiante:** el menú depende de la cuenta, no de otro rol: con matrícula ve «Mi curso»; con postulaciones ve «Mis postulaciones»; sin ninguna, el catálogo.
- **Matriz de permisos:** donde dice «Por definir», la ruta no se habilita (Calificaciones para el coordinador, Grupos para administrador y coordinador).
- **Cuentas protegidas:** dos administradores marcados como protegidos en los datos. La regla (no eliminar, desactivar ni cambiar el correo) se aplica en el backend; todavía no hay pantalla de usuarios.
- **Redirección segura:** `next` solo acepta rutas internas a las que el rol puede entrar.

Cuentas de demostración y comandos: [[Frontend]].

## 6. Rutas y pantallas preparadas
36 rutas registradas: 8 desarrolladas y 28 provisionales. 5 son públicas (login y 4 provisionales).

| Ruta | Pantalla | Quién accede | Estado |
|---|---|---|---|
| `/dashboard` | Panel ejecutivo | Administrador, Coordinador | Desarrollada |
| `/estudiantes` | Estudiantes y seguimiento | Administrador, Coordinador | Desarrollada |
| `/tutor` | Mis estudiantes | Tutor | Desarrollada |
| `/tutor/entregas` | Entregas por revisar | Tutor | Desarrollada |
| `/estudiante` | Mi curso | Postulante/Estudiante (con matrícula) | Desarrollada |
| `/estudiante/actividades` | Mis actividades | Postulante/Estudiante (con matrícula) | Desarrollada |
| `/sin-acceso` | Sin acceso | Administrador, Coordinador, Tutor, Postulante/Estudiante | Desarrollada |
| `/usuarios` | Usuarios y roles | Administrador | Provisional |
| `/configuracion` | Configuración institucional | Administrador | Provisional |
| `/facultades` | Facultades | Administrador | Provisional |
| `/programas` | Programas | Administrador, Coordinador | Provisional |
| `/periodos` | Períodos académicos | Administrador | Provisional |
| `/convocatorias` | Convocatorias | Administrador, Coordinador | Provisional |
| `/postulaciones` | Postulaciones | Administrador, Coordinador | Provisional |
| `/admisiones` | Admisiones y lista de espera | Administrador, Coordinador | Provisional |
| `/matriculas` | Matrículas | Administrador, Coordinador | Provisional |
| `/cursos` | Cursos y asignaturas | Administrador, Coordinador | Provisional |
| `/tutores` | Tutores y asignaciones | Administrador, Coordinador | Provisional |
| `/calificaciones` | Calificaciones | Administrador | Provisional |
| `/auditoria` | Auditoría y trazabilidad | Administrador, Coordinador | Provisional |
| `/reportes` | Reportes | Administrador, Coordinador, Tutor, Postulante/Estudiante (con matrícula) | Provisional |
| `/tutor/cursos` | Mis cursos y asignaturas | Tutor | Provisional |
| `/tutor/actividades` | Actividades | Tutor | Provisional |
| `/tutor/evaluaciones` | Evaluaciones | Tutor | Provisional |
| `/tutor/calificaciones` | Calificaciones | Tutor | Provisional |
| `/tutor/grupos` | Grupos | Tutor | Provisional |
| `/postulante/postulaciones` | Mis postulaciones | Postulante/Estudiante (con postulaciones) | Provisional |
| `/estudiante/evaluaciones` | Evaluaciones | Postulante/Estudiante (con matrícula) | Provisional |
| `/estudiante/calificaciones` | Calificaciones | Postulante/Estudiante (con matrícula) | Provisional |
| `/notificaciones` | Notificaciones | Administrador, Coordinador, Tutor, Postulante/Estudiante | Provisional |
| `/perfil` | Mi perfil | Administrador, Coordinador, Tutor, Postulante/Estudiante | Provisional |
| `/login` | Iniciar sesión | Público | Desarrollada |
| `/registro` | Registro de postulantes | Público | Provisional |
| `/recuperar-contrasena` | Recuperar contraseña | Público | Provisional |
| `/verificar-correo` | Verificar correo | Público | Provisional |
| `/catalogo` | Convocatorias disponibles | Público | Provisional |

## 7. Pruebas ejecutadas y resultados
| Comprobación | Resultado |
|---|---|
| Instalación limpia (`pnpm install --frozen-lockfile`) desde un clon | Correcta |
| Tipos (`pnpm typecheck`, y `next build` con la validación de tipos activa) | Sin errores |
| Pruebas automáticas (`pnpm test`) | 50 en 5 archivos, todas pasan |
| Las pruebas detectan errores | Se alteró el código 6 veces (página sin registrar, coordinador con Calificaciones, id de menú inexistente, icono faltante, formato de fecha antiguo, guarda de sesión) y las pruebas fallaron cada vez. Dos de las primeras pruebas eran débiles y se reforzaron |
| Compilación de producción (Next 16.4.3, Turbopack) | Correcta |
| Navegación contra un servidor de producción real | 406 solicitudes, 0 fallos. 8 cuentas o roles frente a las 31 rutas privadas (abren o van a `/sin-acceso` según corresponde); rutas públicas sin sesión; redirecciones de las 4 rutas antiguas y de `/` por rol; 5 cookies manipuladas rechazadas; enlaces del menú de cada cuenta sin 404 ni «sin acceso» |
| Inicio de sesión (acción de servidor) | 11 casos correctos: 8 destinos (por rol, `next` permitido, `next` de otro rol y redirección abierta ignorados) y 3 errores |
| Producción sin `AUTH_DEMO` | Cookies falsificadas y `/dashboard` redirigen a `/login`; el login muestra «Autenticación no disponible» |
| Diseño conservado | `globals.css`, `components/ui/`, `components.json`, `postcss.config.mjs` y `public/` sin cambios |

**No se pudo verificar:**
- El aspecto en pantalla (diseño adaptable, modo oscuro, accesibilidad en el navegador): el entorno de revisión no tiene navegador. Revísalo con `pnpm dev`.
- El cambio de rol y el cierre de sesión desde el menú, con clics: se probó la lógica con pruebas y la ruta `/salir`, pero no el menú.
- La compilación con las fuentes de Google: el entorno de revisión no tiene acceso a esa red, así que allí se desactivaron solo en una copia de verificación. En tu equipo no hay que hacerlo.

## 8. Problemas encontrados
1. **Cookie sin firmar.** Durante la revisión final se vio que, sin `AUTH_DEMO`, una cookie fabricada habría abierto sesión. Se corrigió y tiene prueba (commit «Seguridad de la demostración…»).
2. **Rutas inexistentes con sesión.** Muestran la pantalla de no encontrado, pero con estado HTTP 200 porque `loading.tsx` envía la página antes de resolver la ruta. Sin efecto funcional.
3. **Nombres de instituciones de ejemplo.** Son ficticios pero genéricos y podrían coincidir con instituciones reales. Conviene revisarlos.
4. **`Programa.vacantes`.** El tipo heredado guarda las vacantes en el programa; el v0.3 asigna cupos por convocatoria. Se dejó sin cambios.
5. **Pruebas de la verificación.** En una primera pasada el servidor de pruebas anterior no se detuvo y se repitieron todas las pruebas contra el código final.

## 9. Decisiones pendientes que requieren intervención
Ninguna bloquea la Fase 1. Están registradas en [[Decisiones pendientes]]:
- **Sección B (v0.2 frente a v0.3):** correo electrónico, escala y nota mínima, estados de postulación, vacantes y ofertas, y otras 10 diferencias. Hay que resolverlas **antes de modelar los datos**.
- **Sección D (nueva):** papel del coordinador en Calificaciones, Grupos y reasignaciones; indicadores del panel; recordatorios; visibilidad del riesgo para el estudiante; alcance del coordinador por programa; cupos y estados de la convocatoria.
- Decisiones nuevas en [[Registro de decisiones]]: D-009 a D-012 (zona horaria, login de demostración, `apps/frontend` y nombres en español).

## 10. Recomendación del siguiente bloque
1. **Antes:** cerrar con el cliente las discrepancias de la sección B de [[Decisiones pendientes]], sobre todo estados de postulación, correo, escala y vacantes.
2. **Fase 2:** base del backend (autenticación real, permisos por rol y asignación validados en el servidor, usuarios y roles, auditoría inicial) y, sobre ella, **Configuración institucional, Facultades, Programas y Períodos**. Sin API los módulos no pueden persistir ni validar permisos, que es lo que pide el v0.3. El stack del backend aún es una propuesta (v0.3 §21.1) y hay que confirmarlo.
3. En paralelo, en el frontend, sustituir `mock-data.ts` por una capa de acceso a la API y desarrollar **Convocatorias y Postulaciones**, que no dependen de las decisiones pendientes más delicadas.
4. Orden de las limpiezas: eliminar `sistema-de-gestion-academica.zip`, renombrar `Boceto de fronted/` (o eliminarlo, ya vacío salvo el zip) y agregar un README en la raíz (tarea AM-01).
