# Informe para el equipo — Cierre de la Fase 1 y siguientes pasos

24/11/2026 · Rama `feature/fase-1-cimientos` · Referencia funcional: [[Documento_Maestro_Requisitos_App_Maestria]] v0.3.1

> [!summary] En una frase
> El frontend de la Fase 1 queda cerrado y verificado. El siguiente paso **no es programar**: el equipo tiene que responder las preguntas de la sección 4 y confirmar el stack del backend antes de empezar la Fase 2 (sección 5).

## 1. Qué está hecho
El frontend vive en `apps/frontend` (Next.js 16.4.5, React 19, TypeScript, Tailwind 4 y shadcn/ui). Aún **no hay backend**: los datos son de demostración y el inicio de sesión es de prueba.

**Pantallas desarrolladas:**
- panel ejecutivo;
- estudiantes y seguimiento;
- bandeja de entregas del tutor;
- Mi curso y Mis actividades del estudiante;
- inicio de sesión, registro, recuperación de contraseña y verificación de correo.

El resto de módulos tiene una pantalla provisional que explica qué incluirá. El detalle está en [[Frontend]].

**Cómo probarlo:**
1. Desde `apps/frontend`, ejecuta `pnpm install` y luego `pnpm dev`.
2. Abre **http://localhost:3000**. No uses la IP de la red: si la usas, los botones no responden (ver [[Frontend]]).
3. Entra con cualquier cuenta de demostración desde la pantalla de inicio de sesión.
4. Si tenías un `pnpm dev` abierto antes de esta actualización, **reinícialo**.

Las reglas y los comandos del proyecto están en `CLAUDE.md`, en la raíz del repositorio.

## 2. Cambios y arreglos de esta tanda
| Área | Qué cambió | Por qué |
|---|---|---|
| Panel | El eje del gráfico de retención ya no recorta «100%»; «+6 pp» queda en una línea | Defectos visuales señalados en informes anteriores |
| Móvil (320–390 px) | Sin desplazamiento horizontal en ninguna pantalla. Se corrigieron el panel, la cabecera del catálogo, la etiqueta de «Reglas de riesgo» y las pestañas de entregas | El panel medía 510 px en teléfonos |
| Menú de la cuenta | Abre al primer clic y anuncia bien si está abierto (`aria-expanded`) | Accesibilidad: en producción decía «cerrado» estando abierto |
| Convocatorias (tipos) | Los 8 estados del v0.3 §5.2 (borrador, programada, abierta, preparación, en curso, cerrada, suspendida, cancelada). Los cupos están en la convocatoria | Alinear el código con el Documento Maestro. **Las reglas entre estados siguen pendientes** (pregunta 7) |
| Seguridad | Next.js actualizado de 16.4.3 a **16.4.5** | 16.4.3 tenía 7 avisos de seguridad moderados y detenía `pnpm dev` y `pnpm build` con un aviso |
| Dependencias | El CLI `shadcn` pasa a `devDependencies` | Solo se usa al compilar (`globals.css`) y para añadir componentes |
| Pruebas | 4 pruebas nuevas de convocatorias (estados, datos de ejemplo válidos, cupos y fechas): **69 pruebas** en total | Vigilan que los datos sigan el Documento Maestro |
| Documentación | `CLAUDE.md` en la raíz; nota sobre los botones que no responden en `pnpm dev`; `.env.example` | Que cualquiera (persona o asistente) arranque con el mismo contexto |
| Herramientas | Subagentes de Claude Code en `.claude/agents/`: `explorador` (lectura), `implementador` (código) y `revisor` (revisión) | Usar el modelo adecuado para cada tarea |

Sobre los avisos de seguridad (`pnpm audit --prod`):
- **Antes:** 87 avisos (1 crítico, 32 altos).
- **Ahora:** 5 (4 altos y 1 moderado). Son dependencias internas del propio Next (`postcss`, `nanoid`, `browserslist`…), que se resolverán cuando Next las actualice.
- El resto de avisos que muestra `pnpm audit` corresponde a herramientas de desarrollo que no llegan a producción.

**Verificación:**
- `pnpm typecheck`, `pnpm test` (69/69) y `pnpm build` correctos con Next 16.4.5.
- En Chromium: 61/61 comprobaciones en desarrollo (con una instalación limpia `pnpm install --frozen-lockfile`) y 61/61 en producción local. Cubren menú, tema, notificaciones, cambio de cuenta y desbordes en 13 páginas a 320, 360 y 390 px.
- Producción sin `AUTH_DEMO`: no hay sesión posible.
- Detalle técnico en [[Informe Pulidos Fase 1]].

**Sin verificar:** Safari, Firefox, Windows, teléfonos reales y lectores de pantalla.
- **Pedido al equipo:** quien tenga esos equipos, abra la aplicación y anote en [[Registro de errores]] lo que vea mal.

## 3. Limpieza: decidido el 24/11/2026
| Tema | Decisión | Estado |
|---|---|---|
| `Sistema-Gestion-Maestria-Obsidian.zip` | Se borra | Hecho |
| Boceto del frontend (`Boceto de fronted/` y su zip) | Se borra | Hecho; sigue en el historial de git |
| `apps/frontend/next-env.d.ts` | Se ignora: no se incluye en los commits | Anotado en `CLAUDE.md` |
| Rama `Revisiones_Reparaciones` | Se usa para los arreglos de fin de semana sobre la rama de cimientos. El responsable revisa y pasa los cambios a `feature/fase-1-cimientos` | Anotado en `CLAUDE.md` |
| Merge de `feature/fase-1-cimientos` a `main` | Aprobado | Merge hecho en local el 24/11/2026, sin conflictos; falta subirlo a GitHub |

Lo que sigue en esta sección es el planteamiento original, antes de decidir.

### Planteamiento original
- **`Sistema-Gestion-Maestria-Obsidian.zip`** está en la raíz de `origin/main` y también en `feature/fase-1-cimientos`, así que el merge no lo retira. Duplica el vault y ya está desactualizado. ¿Lo retiramos?
- **`Boceto de fronted/sistema-de-gestion-academica.zip`** aparece borrado en una copia de trabajo, sin confirmar. ¿Se retira oficialmente la carpeta del boceto? (No hay tarea en el backlog para eso; AM-01 pide el README y el `.env.example`.)
- **`apps/frontend/next-env.d.ts`** lo reescribe Next en cada `pnpm dev` o `pnpm build`, así que aparece modificado a menudo. Se puede ignorar al hacer commit.
- **Rama `Revisiones_Reparaciones`:** existe en GitHub y apunta a un commit antiguo de esta rama. ¿Se usa?
- **Merge de `feature/fase-1-cimientos` a `main`:** pendiente de que el equipo lo apruebe. `main` tiene un commit del 15/11 («Distribucion de informacion») que esta rama no tiene.

## 4. Preguntas que el equipo o el cliente deben responder
Ninguna se resolvió por suposición. Están ordenadas por el módulo que bloquean, en el orden previsto de implementación ([[Alcance y objetivos]], que también está «por validar»).

### Antes de la Fase 2 (fundamentos, gestión institucional y facultades, programas y períodos)
1. **Stack del backend.** ¿Se confirma NestJS + PostgreSQL + Prisma + Docker Compose + Mailpit? Hoy es una propuesta ([[Stack tecnologico]]).
2. **Seguridad de cuentas (D-005).** Argon2id, mínimo de 8 caracteres y sesión de 30 minutos están en el v0.3 pero **sin aprobar**. [[Seguridad y permisos]] los presenta como hechos.
3. **Decisiones D-001 a D-008.** Siguen «pendientes de aprobación». ¿Quién las aprueba y cuándo?
4. **Catálogos configurables (v0.2 §14.3).** ¿Se mantienen los catálogos de tipos de documento, modalidades, etc.? (Módulos 2 y 3)
5. **Programas.** ¿Quién los crea y quién los activa o desactiva? ¿Qué estados tienen? El v0.3 §4.2 solo dice «Estado» y que «podrán activarse o desactivarse»; el código de demostración usa `activo`, `borrador` y `cerrado`. (Módulo 3)

### Antes de Convocatorias (Módulo 4)
6. **Publicación.** El v0.3 §5.2 dice que las suspendidas y canceladas no se muestran en el catálogo, pero no define las «reglas de publicación» de las cerradas, programadas y en curso.
7. **Transiciones entre los 8 estados.** ¿Qué paso lleva a cuál y quién lo hace? En particular, suspensión total o parcial con motivo y estado anterior (v0.2 §4.2).
8. **Plantillas y duplicación.** ¿Se pueden duplicar convocatorias (v0.2)? El v0.3 no lo menciona.
9. **Período adicional de revisión al cierre (§6.6).** Es configurable, pero ¿cuánto vale por defecto?
10. **Programa en borrador.** ¿Puede tener una convocatoria abierta? Los datos de ejemplo lo permiten (`cv-4`).

### Antes de Postulaciones, admisiones y matrículas (Módulos 5 a 7)
11. **Retiro de la postulación.** ¿Existe? ¿Cómo se registra, si no hay estado «Retirada» (D-016)?
12. **Cupos.** ¿Los ocupados y disponibles se guardan o se calculan a partir de las asignaciones (§7.2)?
13. **Ofertas de vacante (D-019).** ¿Qué campos y estados tienen? ¿Aceptar ocupa el cupo o solo lo hace la matrícula?
14. **Comprobante y retiros de matrícula.** Sin decisión (§23).

### Contradicciones detectadas en el vault
- **Recordatorios:** el backlog (AM-13) dice «15, 10, 5, 3 y 1 día antes», pero no hay una anticipación aprobada ([[Decisiones pendientes]]).
- **Nombres de módulos:** [[Backend]] usa una lista de módulos en inglés que no coincide con los 18 del v0.3.
- **Backlog incompleto:** no tiene tareas para Gestión institucional (módulo 2), Facultades y Períodos (módulo 3) ni Configuración institucional (módulo 18).
- **Equipo:** [[Equipo y responsabilidades]] tiene los roles P1–P5, pero sin nombres.
- **[[Cronograma]]:** está marcado «por revalidar».

La lista completa de pendientes sigue en [[Decisiones pendientes]]. Cuando se responda una pregunta, se anota en [[Registro de decisiones]] y se retira de allí.

## 5. Siguientes pasos propuestos
| Orden | Qué | Quién (rol propuesto) | Depende de |
|---|---|---|---|
| 1 | Asignar nombres a P1–P5 en [[Equipo y responsabilidades]] y revalidar el [[Cronograma]] | Todo el equipo | — |
| 2 | Responder las preguntas 1 a 5 y aprobar D-001 a D-008 | Equipo con el cliente | — |
| 3 | Aprobar el merge de `feature/fase-1-cimientos` a `main` y decidir las limpiezas de la sección 3 | P1 | — |
| 4 | Completar el backlog con los módulos 2, 3 y 18 y alinear los nombres de [[Backend]] con el v0.3 | P1 | 2 |
| 5 | **Fase 2 — Base del backend:** autenticación real (sustituye el proveedor de demostración tras `AuthService`), usuarios y roles, permisos validados en el servidor y auditoría inicial | P4 y P1 | 1 y 2 |
| 6 | Gestión institucional y Facultades, programas y períodos (módulos 2 y 3; backend y pantallas) | P4 y P3 | 5 y preguntas 4–5 |
| 7 | En el frontend, sustituir `lib/mock-data.ts` por una capa de acceso a la API (D-012: los nombres en español se traducen ahí) | P3 | contratos de API de P4 |
| 8 | Convocatorias y Postulaciones | P3 y P4 | preguntas 6–13 |
| 9 | Revisión en Safari, Firefox, Windows y teléfonos reales | P5 | — |

Los roles son los de [[Equipo y responsabilidades]]. Las personas concretas aún están «por definir».

**Reglas de trabajo** (resumen de `CLAUDE.md`):
- No se resuelve ninguna decisión pendiente por suposición.
- Cada cambio de comportamiento lleva sus pruebas.
- Para dar algo por terminado hacen falta `pnpm typecheck`, `pnpm test`, `pnpm build` y una prueba en el navegador, indicando qué no se pudo verificar.
- Las decisiones nuevas se anotan en [[Registro de decisiones]].
