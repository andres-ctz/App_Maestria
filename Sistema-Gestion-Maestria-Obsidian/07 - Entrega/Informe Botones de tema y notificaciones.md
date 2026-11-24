# Informe — Botones de tema y de notificaciones

16/11/2026 · Rama `feature/fase-1-cimientos` (`ab13939`) · Referencia funcional: [[Documento_Maestro_Requisitos_App_Maestria]] v0.3.1

> [!info] Cómo aplicarlo
> Parche sin confirmar (`git apply`). Cambia 4 archivos de `apps/frontend` y 3 notas del vault. No toca roles, permisos, navegación ni decisiones funcionales.

> [!warning] Qué se puede afirmar y qué no
> Reproduje en un navegador real **una causa que produce exactamente estos síntomas** y la corregí. **No puedo confirmar que sea la de tu equipo**, porque no tengo acceso a él: en el código y en el navegador de mi entorno ambos botones ya funcionaban en `localhost`. Al final de la sección 1 está cómo comprobarlo en dos minutos.

## 1. Causa del fallo del botón de tema
**El código del botón no estaba roto.** `ThemeProvider`, `ThemeToggle`, `next-themes` y las variables de `globals.css` funcionan: al alternar, cambian los fondos, textos, tarjetas, menús y paneles, el icono refleja el tema activo y la preferencia persiste.

**Lo que sí reproduje:** al abrir `pnpm dev` por una dirección distinta de `localhost` (por ejemplo `127.0.0.1`, la URL «Network» que imprime Next, un teléfono en la red o un puerto reenviado), **Next 16 bloquea sus recursos de desarrollo** (`/_next/*`, incluido el canal de recarga en caliente) y **la página no se hidrata**. La página se ve y los enlaces y formularios siguen funcionando (por eso el inicio de sesión sí funcionaba), pero ningún botón que dependa de JavaScript responde: el de tema, la campana, el menú de la cuenta, el selector de rol.

- **Antes del arreglo:** por `127.0.0.1` y por la dirección de red, los botones no tenían manejadores de React y no respondían. Por `localhost` funcionaban.
- **Después:** funcionan por `localhost` y por `127.0.0.1`; por otra dirección funcionan declarándola en `ALLOWED_DEV_ORIGINS`.
- **Cómo saber si te pasa a ti:** mira la barra de direcciones (¿dice `localhost`?) y abre la consola del navegador (F12): si aparece «Blocked cross-origin request to Next.js dev resource», es esta causa. Si abres `http://localhost:3000` y sigue sin responder, dime el navegador y lo que muestra la consola.
- **Nota para Windows:** con los «temas de contraste» activos (colores forzados), el sistema anula los colores de cualquier página y el tema no puede cambiar el aspecto. Es el comportamiento esperado del sistema, no un fallo.

## 2. Causa del fallo del botón de notificaciones
- **Causa principal: la misma de la sección 1.** Un popover depende de JavaScript; sin hidratación no abre nada.
- **El popover en sí funciona.** No logré reproducir que no respondiera en `localhost`: abre al pulsar, se cierra al volver a pulsar, al pulsar fuera y con Escape, y responde al teclado.
- **Lo que no cumplía lo pedido:** el panel tenía un enlace «Ver qué incluirá» que navegaba a `/notificaciones`. Se quitó. Ahora el panel es solo informativo y no cambia la ruta.
- **Causa secundaria encontrada, que no era de la campana sino del menú de la cuenta:** el indicador flotante «N» de Next en desarrollo se colocaba abajo a la izquierda y **tapaba «Menú de la cuenta»**. El primer clic caía sobre `<nextjs-portal>` y el menú no se abría (3 de 3 intentos fallaron), y con él «Cambiar de cuenta» y «Cerrar sesión». Es probable que sea la razón de que cambiar de cuenta pareciera imposible sin borrar cookies. Se movió el indicador abajo a la derecha (3 de 3 intentos abren al primer clic).

## 3. Archivos modificados
| Archivo | Cambio |
|---|---|
| `apps/frontend/next.config.mjs` | `allowedDevOrigins` con `127.0.0.1` y los orígenes de `ALLOWED_DEV_ORIGINS`; `devIndicators.position: 'bottom-right'`. Solo afectan a `pnpm dev` |
| `apps/frontend/components/app-shell/notifications.tsx` | Se quita el enlace a `/notificaciones` y la importación de `next/link`; la anchura del panel se limita a la pantalla (`max-w-[calc(100vw-1.5rem)]`). El resto (título, etiqueta «Próximamente», mensaje, anclaje a la derecha) ya estaba |
| `apps/frontend/.env.example` | Documenta `ALLOWED_DEV_ORIGINS` |
| `apps/frontend/tests/entorno-dev.test.ts` *(nuevo)* | Pruebas de la configuración y de la campana |
| `04 - Desarrollo/Frontend.md` | Sección «Si los botones no responden en `pnpm dev`» y descripción de la campana |
| `07 - Entrega/Informe Correcciones Fase 1.md` | Se corrige la mención al enlace que ya no existe |
| `07 - Entrega/Informe Botones de tema y notificaciones.md` *(nuevo)* | Este informe |

`ThemeToggle`, `ThemeProvider`, `globals.css` y los componentes de `components/ui` **no necesitaron cambios**.

## 4. Pruebas automatizadas
`pnpm test`: **65 pruebas en 7 archivos, todas pasan** (5 nuevas).

- La configuración permite `127.0.0.1`, añade los orígenes de `ALLOWED_DEV_ORIGINS` limpiando espacios y vacíos, y mueve el indicador de Next abajo a la derecha.
- Comprobación **estática del código** de la campana: no importa `next/link`, no tiene `href`, no usa router ni `/notificaciones`, contiene «Próximamente» y el mensaje, y no usa datos de ejemplo ni contadores. Esto vigila el código; no prueba el comportamiento.
- Se comprobó que las pruebas nuevas fallan si se quita `127.0.0.1` de la configuración o si la campana vuelve a importar `next/link`.

Las pruebas automatizadas no ejecutan un navegador: el comportamiento visual está en la sección 6.

## 5. Tipos y compilación
Sobre un clon limpio de la rama con el parche aplicado:

| Comprobación | Resultado |
|---|---|
| `pnpm install --frozen-lockfile` | Correcta |
| `pnpm typecheck` | Sin errores |
| `pnpm build` (Next 16.4.3) | Correcto, con validación de tipos |

El compilador no descarga las fuentes de Google en mi entorno; las desactivé solo en una copia de verificación. En tu equipo, con internet, no hace falta.

## 6. Comprobaciones en el navegador
Chromium 153 sin interfaz, con clics y teclado reales (no solo lectura de código). La misma batería de 65 comprobaciones dio **65/65** en tres entornos: `pnpm dev` por `localhost`, `pnpm dev` por `127.0.0.1` y compilación de producción.

**Tema claro y oscuro**
- Claro → oscuro y oscuro → claro, con el sistema operativo en claro y en oscuro.
- Cambian al instante los fondos del cuerpo, del menú lateral, de las tarjetas y de la cabecera; también el menú de la cuenta y el panel de notificaciones.
- El icono muestra el tema activo; el nombre accesible indica estado y acción.
- Se conserva al navegar a otras tres pantallas y al recargar; un segundo clic vuelve exactamente al aspecto inicial.
- Contraste de los textos con el panel abierto: sin textos bajo 3:1.
- Sin errores de hidratación ni de consola.
- Pruebas adicionales: cinco tamaños de ventana, escalado 125 %, clics rápidos, almacenamiento bloqueado, movimiento reducido y táctil.

**Campana de notificaciones**
- Aparece el panel flotante debajo de la campana, alineado a su derecha (borde derecho a ≤ 4 px) y por encima del contenido.
- La ruta no cambia y no se pide `/notificaciones`.
- No altera la distribución: mismas posiciones de título, tarjeta, cabecera y menú lateral antes y después de abrir.
- Se cierra al volver a pulsar la campana, al pulsar fuera y con Escape (el foco vuelve a la campana). Enter y Espacio la abren.
- Contenido exacto: «Notificaciones», «Próximamente» y el mensaje pedido; sin enlaces, sin números, sin contador.
- Con el panel abierto, el botón de tema, la búsqueda ⌘K y el botón del menú lateral siguen funcionando.
- Pantallas pequeñas 320×568, 360×640, 390×844 y 844×390: el panel queda dentro de la pantalla y se abre y cierra con toques.
- Vista en tema claro y oscuro revisada en capturas.

**Causas reproducidas**
- Hidratación fallida por origen distinto de `localhost`: reproducida antes del arreglo y resuelta después.
- Indicador de Next tapando el menú de la cuenta: reproducido (elemento superpuesto `<nextjs-portal>`) y resuelto.

## 7. Problemas pendientes
1. **No verificado en tu equipo.** Solo probé Chromium. No probé Safari ni Firefox, ni un Windows real, ni extensiones del navegador.
2. **Desplazamiento horizontal en móvil en el panel ejecutivo** (509 px con 390 de ancho útil), que ya existía y no lo causa la campana. No se tocó por quedar fuera de alcance.
3. **`aria-expanded` del menú de la cuenta** queda en «false» aunque el menú esté abierto, en la compilación de producción. Observado, no corregido, y no afecta al uso con ratón.
4. **Detalles visuales ya conocidos:** etiquetas recortadas del eje vertical de «Tendencia de retención» y «+6 pp» partido en dos líneas.
5. **«Notificaciones» sigue en el menú lateral** («Mi cuenta») y lleva a la pantalla provisional del módulo. Es la navegación de la Fase 1, que esta tarea no modifica.
6. **El indicador de desarrollo** de Next ahora está abajo a la derecha y puede tapar elementos pequeños de esa esquina. Solo existe en `pnpm dev`.
