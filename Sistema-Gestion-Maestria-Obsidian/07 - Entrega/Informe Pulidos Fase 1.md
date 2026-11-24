# Informe de entrega — Pulidos de la Fase 1

24/11/2026 · Rama `feature/fase-1-cimientos` (base `5506144`) · Referencia funcional: [[Documento_Maestro_Requisitos_App_Maestria]] v0.3.1

> [!info] Cómo se entrega
> Commits locales en `feature/fase-1-cimientos`, **sin push**. No se tocó `main`. No se avanzó a ningún módulo nuevo.

> [!warning] Qué se puede afirmar y qué no
> Todo lo que aparece como «verificado» se ejecutó en esta máquina (Fedora, Linux) con Chromium 145 sin interfaz, contra `pnpm dev` y contra la compilación de producción. **No** se probó en Safari, Firefox, Windows ni en un teléfono real (sección 7).

## 1. Estado de partida
Antes de cambiar nada comprobé en el código cuáles de los pulidos pedidos ya estaban aplicados.

| # | Pulido | Estado inicial |
|---|---|---|
| 1 | Eje Y de «Tendencia de retención» (`width={44}`) y `min-w-0` | **Faltaba** (`width={32}`) |
| 2 | Tendencia de `StatCard` en una sola línea | **Faltaba** |
| 3 | `ESTADOS_CONVOCATORIA` y `EstadoConvocatoria`; `cupos` en `Convocatoria` | **Faltaban los estados** (`cupos` ya estaba en `Convocatoria`) |
| 4 | `min-w-0` en el panel; `TabsList` desplazable | **Faltaba** |
| 5 | `aria-expanded` del menú de la cuenta | **Faltaba** |
| 6 | `nativeButton` en `components/ui/button.tsx` | **Ya aplicado**; no se tocó |
| 7 | `.env.example`, nota en `Frontend.md`, este informe | `.env.example` y la nota ya existían; se precisaron |

**Línea base:** `pnpm test` daba **65 pruebas en 7 archivos**, no 67 como indicaba el encargo. Con las 3 nuevas quedan 68.

## 2. Cambios en el código
13 archivos de `apps/frontend` (1 nuevo), en commits pequeños.

| Commit | Archivos | Cambio |
|---|---|---|
| `a4f08f9` | `components/dashboard/retention-chart.tsx`, `components/stat-card.tsx` | `YAxis width={44}` y `Card className="min-w-0 lg:col-span-2"`; la tendencia lleva `shrink-0 whitespace-nowrap` |
| `1837ad0` | `lib/types.ts`, `tests/convocatorias.test.ts` *(nuevo)* | Los ocho estados del v0.3 §5.2: `borrador`, `programada`, `abierta`, `preparacion`, `en-curso`, `cerrada`, `suspendida`, `cancelada`. `Convocatoria.estado: EstadoConvocatoria`. `mock-data.ts` no cambió: sus 5 convocatorias ya usaban estados válidos |
| `2bb28e2` | `app/(app)/dashboard/page.tsx`, `at-risk-card.tsx`, `risk-by-program-chart.tsx`, `entregas/entregas-inbox.tsx` | `min-w-0` en secciones y tarjetas del panel; `TabsList className="max-w-full overflow-x-auto"` |
| `3d78312` | `components/app-shell/user-menu.tsx` | `useState(abierto)`, `DropdownMenu open/onOpenChange` y `aria-expanded={abierto}` en el disparador |
| `562f49e` | `app/(app)/dashboard/page.tsx`, `app/(public)/layout.tsx`, `components/dashboard/risk-rules-card.tsx` | Arreglos que **no estaban en la lista** y que salieron al verificar en el navegador (sección 4.2) |
| último | `user-menu.tsx` (comentario), `.env.example`, notas del vault, `.claude/agents/` | Documentación, subagentes y lo que propuso la revisión (sección 9) |

No se tocaron `lib/auth/*`, `lib/access.ts`, `proxy.ts`, `next.config.mjs`, `app/globals.css` ni los colores. La identidad visual del boceto v0 es la misma.

## 3. Pruebas automáticas, tipos y compilación
| Comprobación | Comando (desde `apps/frontend`) | Resultado |
|---|---|---|
| Tipos | `pnpm typecheck` | Sin errores |
| Pruebas | `pnpm test` | **68 pruebas en 8 archivos, todas pasan** (65 previas + 3 nuevas) |
| Compilación | `pnpm build` (Next 16.4.3, Turbopack) | Correcta: 16/16 páginas. Ver la nota siguiente |

**Nota sobre `pnpm build` y `pnpm dev`:** Next 16.4.3 detiene a veces el comando con un aviso de seguridad propio (`SecurityFatalError`, código de salida 1). Al repetirlo, compila y arranca con normalidad. Pasó en los tres builds (intento 1: exit 1 por el aviso; intento 2: exit 0) y dos veces con `pnpm dev`. No es un error del código. Ver sección 8.

Pruebas nuevas (`tests/convocatorias.test.ts`):
- los estados son exactamente los ocho del §5.2, en ese orden;
- las convocatorias de demostración usan solo esos estados;
- `cupos` es numérico y positivo en cada convocatoria, y ningún programa tiene `cupos`.

La revisión señala que las dos últimas las garantiza en buena parte el tipado (sección 9).

## 4. Verificación en el navegador
**Herramienta:** script de Playwright (`playwright-core` 1.58.2, instalado fuera del repositorio para no tocar las dependencias del proyecto) con Chromium 145.0.7632.6 sin interfaz, con clics, ratón y teclado reales.

**Entornos:**
- `pnpm dev` en `http://localhost:3000`;
- producción local: `pnpm build` y luego `AUTH_DEMO=true pnpm start -p 3100`.

**Resultado final, sobre el último build: 61/61 comprobaciones en cada entorno.**

### 4.1 Comprobaciones funcionales (escritorio, 1280×800)
| Comprobación | dev | prod |
|---|---|---|
| Entrar con el botón de un clic (coordinadora) lleva a `/dashboard` | OK | OK |
| Menú de la cuenta: `aria-expanded="false"` cerrado, abre **al primer clic**, `aria-expanded="true"` abierto | OK | OK |
| Escape y clic fuera lo cierran y `aria-expanded` vuelve a `"false"` | OK | OK |
| Tema: alterna la clase `dark`, cambia el fondo, se conserva al recargar, el segundo clic vuelve al inicial | OK | OK |
| Campana: abre «Próximamente», no cambia la ruta, Escape la cierra | OK | OK |
| Eje Y: ninguna etiqueta empieza fuera del SVG; `100%` empieza 4 px dentro (antes se recortaba) | OK | OK |
| «+6 pp» ocupa una sola línea | OK | OK |
| Cambio de cuenta (demostración): el submenú abre (`aria-expanded="true"`), entra como tutora, la cookie es `t-2:tutor` y el menú muestra la nueva cuenta | OK | OK |
| Cerrar sesión: vuelve a `/login` y borra la cookie | OK | OK |
| Sin errores de consola en todo el recorrido | OK | OK |

### 4.2 Escáner de desborde horizontal (320, 360 y 390 px)
En cada página implementada se compara `scrollWidth` con el ancho de la ventana. Páginas revisadas:
- públicas: `/login`, `/registro`, `/recuperar-contrasena`, `/verificar-correo`, `/catalogo`;
- con sesión: `/dashboard`, `/estudiantes`, `/sin-acceso`, `/usuarios` (pantalla provisional), `/tutor`, `/tutor/entregas`, `/estudiante`, `/estudiante/actividades`.

Son 13 páginas × 3 anchos = 39 casos: **39/39 sin desborde** en los dos entornos.

**Lo que encontró la primera pasada** (con los pulidos 1 a 5 ya aplicados) y se corrigió en `562f49e`:
1. **`/dashboard` seguía desbordando** (`scrollWidth` 510 px a 320/360/390). Los `min-w-0` pedidos no bastaban. En móvil las secciones son `grid` sin columnas explícitas, y la columna implícita `auto` crecía hasta el ancho mínimo de la columna de alertas (494 px), que no tenía `min-w-0`. Solución: `grid-cols-1` en móvil (Tailwind la traduce a `minmax(0,1fr)`; `sm:`/`lg:` no cambian) y `min-w-0` en esa columna.
2. **`/catalogo` sin sesión desbordaba** (427 px): la cabecera pública no podía encogerse. Ahora pasa a dos filas (`flex-wrap`; los botones quedan a la derecha con `ml-auto`). En escritorio se ve igual que antes.
3. **Defecto visual sin desborde:** a 320 px, la etiqueta «Ejemplo · pendiente de definición institucional» de «Reglas de riesgo» se recortaba al ocupar dos líneas (el `Badge` tiene `h-5` y `overflow-hidden`). Se añadió `h-auto` solo en esa tarjeta.

Además:
- Revisé capturas del panel a 320 px (tema claro), del catálogo a 320 px y, en escritorio, de la tarjeta del eje y de la tendencia.
- Pestañas de entregas a 320 px: la lista se desplaza al pulsar las flechas y el anillo de foco de la pestaña activa se ve entero.

### 4.3 Otras comprobaciones
- **Producción sin `AUTH_DEMO`** (`pnpm start -p 3200`): con una cookie de demostración válida, `/dashboard`, `/usuarios` y `/tutor` responden 307 a `/login?next=…`, y `/login` no lista cuentas de demostración. **Sin `AUTH_DEMO=true` no hay sesión.**
- **`pnpm dev` desde la IP local** (`http://192.168.18.76:3000`):
  - sin `ALLOWED_DEV_ORIGINS`: la página carga (HTTP 200) pero **ni el tema ni el menú responden**, y la terminal de `pnpm dev` muestra «Blocked cross-origin request to Next.js dev resource /_next/hmr from "192.168.18.76"»;
  - con `ALLOWED_DEV_ORIGINS=192.168.*.*`: tema y menú responden.
  - Leí en el código de Next (`server/app-render/csrf-protection.js`, `matchWildcardDomain`) que cada `*` cubre un segmento, `**` uno o varios (solo al principio) y que el puerto no cuenta.

### 4.4 Falsos fallos del script (no son fallos de la aplicación)
Los dejo anotados porque la verificadora puede encontrarse lo mismo:
- Recharts 3 no usa la clase `.recharts-yAxis`; las etiquetas se localizan por `.recharts-cartesian-axis-tick-value`.
- `hover()` de Playwright salta el puntero directamente al centro del elemento, y entonces el submenú de Base UI a veces no abre. Moviendo el ratón por pasos o con la flecha derecha abre siempre, y la versión anterior de `user-menu.tsx` se comportaba igual: **no lo causa el cambio**.
- La cookie llega codificada (`t-2%3Atutor`).

## 5. Documentación
| Archivo | Cambio |
|---|---|
| `apps/frontend/.env.example` | Ya documentaba `AUTH_DEMO` y `ALLOWED_DEV_ORIGINS`. Se precisa cómo funcionan los comodines (`*` un segmento, `**` al principio, sin puerto) con el ejemplo `192.168.*.*` |
| `04 - Desarrollo/Frontend.md` | Se amplía «Si los botones no responden en `pnpm dev`»: hidratación, por qué los enlaces y formularios sí van, **el aviso sale en la terminal y no en la consola del navegador** (la nota anterior decía lo contrario), el comodín y la prueba del 24/11/2026. Nueva sección sobre el aviso de seguridad de Next |
| `02 - Requisitos/Decisiones pendientes.md` | La fila «Estados de la convocatoria» (sección D) refleja que el tipo ya tiene los 8 estados, qué fija el §5.2 (suspendidas y canceladas fuera del catálogo) y qué **sigue sin definirse** (reglas de publicación y transiciones). No se resolvió nada |
| `07 - Entrega/Informe Pulidos Fase 1.md` | Este informe |
| `.claude/agents/` | Subagentes `explorador` (haiku), `implementador` (sonnet) y `revisor` (opus) |

## 6. Uso de modelos
| Trabajo | Modelo |
|---|---|
| Comprobar en el código de Next cómo funcionan los comodines de `allowedDevOrigins` | Haiku (explorador) |
| Pulidos 1 a 5 y la prueba nueva | Sonnet (implementador). Revisé su diff y repetí typecheck y pruebas |
| Revisión del diff (sección 9) | Opus (revisor) |
| Verificación en navegador, arreglos de la sección 4.2 y documentación | Sesión principal (Opus) |

Los subagentes de `.claude/agents/` se cargan al iniciar Claude Code, así que en esta sesión se usaron agentes genéricos con el modelo fijado y las mismas instrucciones. Hay que confirmar con `/agents` al abrir una sesión nueva que aparecen los tres.

## 7. Lo que no se pudo verificar
- **Navegadores:** solo Chromium 145. No probé Safari, Firefox ni Edge.
- **Sistemas:** solo Linux. No probé Windows (incluidos los temas de contraste) ni macOS.
- **Dispositivos reales:** los anchos de 320/360/390 px son emulación de Chromium (`isMobile`, táctil), no teléfonos reales.
- **Tema oscuro en móvil:** tomé la captura a 320 px pero no la revisé con el mismo detalle que la clara. El escáner de desbordes no depende del tema.
- **Contraste:** no repetí la medición de contraste de los informes anteriores; los cambios no tocan colores.
- **Lectores de pantalla:** comprobé `aria-expanded` en el DOM, no con NVDA, VoiceOver ni Orca.
- **Causa de origen del `aria-expanded` en «false»:** se corrigió con el estado controlado, pero no se diagnosticó por qué Base UI lo dejaba en «false» en producción (sección 9).

## 8. Observaciones y decisiones pendientes encontradas
1. **Avisos de seguridad de dependencias.** `pnpm audit --prod`: 1 crítico, 32 altos, 52 moderados y 9 bajos.
   - **Next 16.4.3** tiene 7 avisos moderados que se corrigen en **16.4.5**.
   - Casi todo lo demás entra por el CLI `shadcn` (que arrastra `@modelcontextprotocol/sdk`, `express`, `undici`, etc.), declarado en `dependencies` aunque es una herramienta de desarrollo.
   - **No actualicé nada:** cambia dependencias y queda fuera de los pulidos. Decisión del equipo.
2. **Datos de demostración incoherentes:** la convocatoria `cv-4` está «abierta» pero su programa `pr-4` está en «borrador». Además, `Programa.estado` usa `activo | borrador | cerrado`, mientras que el v0.3 §4.2 solo dice que los programas «podrán activarse o desactivarse». No se tocó: depende de quién crea y activa programas (sección C de [[Decisiones pendientes]], Módulo 3).
3. **`Convocatoria.inscritos`** guarda la ocupación como un número, y el panel lo suma. Choca con el pendiente «Cupos de la convocatoria» (¿se guardan o se calculan desde las asignaciones, §7.2?). Es anterior a esta entrega.
4. **Estados de la convocatoria:** el tipo tiene los ocho, pero las reglas de publicación y las transiciones (suspensión, cancelación) siguen pendientes (Módulo 4).
5. **Referencia del encargo:** las decisiones pendientes del Documento Maestro están en el **§23**; el §25 es el control de versiones.
6. **El zip del vault sigue en la raíz de `origin/main`:** `Sistema-Gestion-Maestria-Obsidian.zip` está en `origin/main` y en esta rama. No se borró.
7. **Cambio ajeno sin confirmar:** el árbol de trabajo tiene borrado `Boceto de fronted/sistema-de-gestion-academica.zip`. No es de esta tarea y quedó fuera de los commits. `apps/frontend/next-env.d.ts` lo regenera Next al compilar y también quedó fuera.
8. **Rama remota nueva:** `origin/Revisiones_Reparaciones` apunta al mismo commit que la base de esta rama (`5506144`).

## 9. Revisión del diff (subagente revisor, Opus)
**Alcance:** `git diff 5506144`. **Resultado: sin bloqueantes.** Typecheck limpio y 68/68 pruebas.

- **Autenticación y permisos: sin hallazgos.**
  - El diff no toca `lib/auth/*`, `lib/access.ts` ni `proxy.ts`.
  - `lib/auth/constants.ts` sigue exigiendo `AUTH_DEMO=true` en producción.
  - `lib/auth/sesion.ts` invalida cualquier sesión fuera del modo demostración.
- **Coherencia con el Documento Maestro:** los 8 identificadores corresponden uno a uno y en orden a §5.2, y nada del diff resuelve por suposición una decisión pendiente.
- **Mejoras, con lo que se hizo:**
  - *`aria-expanded` manual en `user-menu.tsx`.* No se duplica: Base UI mezcla las props y gana la del elemento `render`, que coincide con el estado controlado. Pero tapa una causa de origen sin diagnosticar. → Comentario en el código para que no se quite. El diagnóstico queda pendiente (sección 7).
  - *Pestañas con `overflow-x-auto`.* Riesgo de recortar el anillo de foco. → Comprobado a 320 px: no se recorta y la lista se desplaza con las flechas.
  - *`Decisiones pendientes.md`.* Decía que el v0.3 no define reglas de visibilidad, y §5.2 sí fija algunas. → Corregido.
  - *`next-env.d.ts`.* Modificado por el build. → Fuera de los commits.
  - *Pruebas nuevas.* La 2 y la 3 las garantiza casi del todo el tipado; serían más útiles con reglas que el tipo no asegura, como `inicio < fin`. → **No se hizo:** propuesta para la siguiente tanda. `inscritos ≤ cupos` ya se comprueba en `tests/decisiones.test.ts`.
- **Pendientes de decisión:** `inscritos` frente a cupos calculados, y `cv-4` abierta con su programa en borrador (sección 8).
