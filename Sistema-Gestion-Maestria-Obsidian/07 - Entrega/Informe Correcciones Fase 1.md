# Informe de entrega — Correcciones posteriores a la Fase 1

15/11/2026 · Base: `main` (`4d052ef`) · Referencia funcional: [[Documento_Maestro_Requisitos_App_Maestria]] v0.3.1

> [!info] Cómo aplicarlo
> Los cambios se entregan como parches **sin confirmar** (`git apply`), porque la nota pedía no hacer commits sin autorización. Se revisan en el árbol de trabajo y los confirma el equipo.

## 1. Documentos actualizados
| Documento | Cambio |
|---|---|
| `02 - Requisitos/Documento_Maestro_Requisitos_App_Maestria.md` | Pasa a **v0.3.1** y recoge solo las decisiones confirmadas: §1.5 (fuera de alcance), §6.2 (formularios), §6.3 (ocho estados), nueva §7.4 (ofertas de vacantes), nueva §12.9 (escala y nota mínima), §23 y §25. La copia de la v0.3 original queda en `historial/Documento_Maestro_Requisitos_App_Maestria_v0.3.md` |
| `02 - Requisitos/Registro de decisiones.md` | Nuevas decisiones D-013 a D-019. D-001 a D-012 sin tocar |
| `02 - Requisitos/Decisiones pendientes.md` | Se retiran las confirmadas; se conservan los pendientes y se añade la columna «Se resuelve en» |
| `01 - Gestion del proyecto/Alcance y objetivos.md` | Fuera de alcance: nivelación y constructor de formularios |
| `03 - Arquitectura/Modelo de datos.md` | Entidad `SeatOffer`; cupos en la convocatoria; ocho estados; escala; correos simulados |
| `03 - Arquitectura/Matriz de permisos.md` | Fila de ofertas de vacante (el administrador queda «Por definir») |
| `03 - Arquitectura/API y endpoints.md` | Recurso `/seat-offers` |
| `06 - Pruebas y calidad/Casos de prueba.md` y `Checklist de entrega.md` | QA-24 a QA-27 y tres puntos nuevos |
| `04 - Desarrollo/Frontend.md` | Cambio de cuenta, cierre de sesión, tema y notificaciones |
| `05 - Reuniones/Reunion inicial.md` | Apunta solo a las discrepancias que siguen abiertas |
| `07 - Entrega/Informe Correcciones Fase 1.md` | Este informe |

El `Informe Fase 1.md` anterior no se modificó: es el registro de aquella entrega.

**Versión del documento maestro.** Para no sobrescribir la v0.3 aprobada provisionalmente, las decisiones se incorporaron como **v0.3.1** y se conservó la original. Si el equipo prefiere otro número, solo cambia la fila de la sección 25 y la cabecera.

## 2. Decisiones registradas
Todas con fecha 15/11/2026, responsable «Equipo» y estado «Confirmada por el equipo».

| ID | Decisión |
|---|---|
| D-013 | Correo: notificaciones internas y correos simulados en el desarrollo local; sin correos reales en esta etapa |
| D-014 | Escala institucional de calificaciones de 0 a 100, distinta de la distribución interna de ponderaciones |
| D-015 | Nota mínima de aprobación: 70 puntos |
| D-016 | Los ocho estados de postulación del v0.3; no se incorporan «En nivelación» ni «Retirada» |
| D-017 | Formularios de estructura fija; requisitos y documentos configurables por convocatoria; sin constructor dinámico |
| D-018 | Nivelación académica fuera de la primera versión |
| D-019 | Ofertas de vacantes con plazo de respuesta; las gestiona el coordinador; el postulante acepta o rechaza; si vence se continúa con la siguiente persona, conservando el orden de la lista |

Los comprobantes de matrícula y los retiros **no se registraron como decisión**: no hay decisión definitiva.

## 3. Decisiones que permanecen pendientes
Detalle y módulo en [[Decisiones pendientes]]. No se marcó como resuelto ningún tema sin decisión explícita.

- **Del v0.3 (§23):** si la nota mínima puede variar por programa o asignatura; redistribución de ponderaciones; tamaño máximo de archivos; reglas de riesgo; retención; rendimiento; despliegue; integraciones.
- **Discrepancias v0.2 y v0.3 abiertas:** retiro de la postulación, comprobante y retiros de matrícula, plantillas y duplicación, suspensión y cancelación, recuperaciones y cierre de curso, catálogos y prioridad de notificaciones.
- **Permisos y alcance:** papel del coordinador en calificaciones, grupos y reasignaciones; quién asigna tutores; quién crea y activa programas; alcance del coordinador por programa.
- **Otros:** indicadores del panel, recordatorios (anticipación, frecuencia y horario), visibilidad del riesgo para el estudiante, campos y estados de la oferta de vacante, y cupos ocupados y disponibles.

## 4. Archivos del frontend modificados
19 archivos en `apps/frontend` (2 nuevos).

- **Tipos y datos:** `lib/types.ts`, `lib/mock-data.ts`, `lib/config/calificaciones.ts` *(nuevo)*, `lib/modules.ts`.
- **Cambio de cuenta y sesión:** `lib/auth/actions.ts`, `lib/auth/auth-service.ts`, `proxy.ts`, `components/providers/sesion-provider.tsx`, `components/app-shell/user-menu.tsx`, `components/auth/login-form.tsx`, `app/(auth)/login/page.tsx`, `app/(app)/layout.tsx`.
- **Tema y notificaciones:** `components/app-shell/theme-toggle.tsx`, `components/app-shell/notifications.tsx`, `app/(auth)/layout.tsx`, `app/(public)/layout.tsx`.
- **Otros:** `components/status/status-badge.tsx` (comentario) y `components/ui/button.tsx` (ver sección 10).
- **Pruebas:** `tests/decisiones.test.ts` *(nuevo)*.

No se tocaron `app/globals.css`, `components.json`, `postcss.config.mjs` ni `public/`; la identidad visual es la misma. `lib/navigation.ts` no necesitó cambios.

## 5. Corrección del modelo de programas y convocatorias
- **Qué decía el v0.3.** El programa (§4.2) no tiene cupos. La convocatoria (§5.1) tiene el «número de cupos».
- **Qué había en el código.** `Programa.vacantes`, heredado del boceto.
- **Qué se hizo.** Se eliminó `vacantes` de `Programa` y se añadió `cupos` a `Convocatoria`. Solo lo usaban los tipos y los datos de ejemplo: ninguna pantalla lo mostraba, así que no hubo que ajustar componentes.
- **Datos de ejemplo.** Cada convocatoria recibe sus cupos (40, 60, 30, 35 y 45). La convocatoria cerrada tenía 41 inscritos y el programa 40 vacantes, así que se le asignó 45 para que los datos sean coherentes. Son valores de demostración.
- **Pruebas nuevas.** El programa no tiene `vacantes` ni `cupos`; cada convocatoria tiene cupos y no más inscritos que cupos.
- **Pendiente de decisión.** Si se guardan los cupos ocupados y disponibles o se calculan a partir de las asignaciones (§7.2). No se inventó ningún campo.

## 6. Cambio de tema claro y oscuro
Probé el botón en un **navegador real** (Chromium sin interfaz), con la compilación de producción y con `next dev`.

- **No logré reproducir un fallo.** El botón cambió de tema desde un tema del sistema claro y desde uno oscuro, con un clic, con cinco clics rápidos más y tras navegar y recargar. El tema se conservó en todos los casos.
- **Contraste:** 910 textos revisados en ambos temas (panel, estudiantes, usuarios, notificaciones, sin acceso, y con el menú de cuenta, el submenú y el panel de notificaciones abiertos). Ninguno bajo 3:1.
- **Qué se mejoró** (los colores y el diseño no cambian):
  - El nombre accesible del botón indica el estado y la acción («Tema claro activo. Cambiar a tema oscuro») y tiene tooltip. El icono sigue mostrando el tema activo.
  - El botón también aparece en el inicio de sesión y en el catálogo público, para poder elegir tema antes de entrar. Antes solo existía dentro de la app.
  - Se corrigió un error de consola de Base UI que aparecía en modo desarrollo (ver sección 10); podía confundirse con un fallo del botón.
- **Si el fallo sigue en tu equipo,** dime el navegador y si ocurre con `pnpm dev` o con `pnpm build`.

## 7. Cierre de sesión y cambio de cuenta
62 comprobaciones en el navegador, todas correctas, más 11 casos de inicio de sesión por HTTP.

- **Cerrar sesión.** Vuelve a `/login`, elimina la cookie de demostración y «atrás» no recupera la sesión anterior.
- **Cambio de cuenta de un clic**, sin borrar cookies ni caché:
  - Menú de la cuenta → «Cambiar de cuenta (demostración)». Lista las 9 cuentas activas; la desactivada no aparece.
  - La pantalla de inicio de sesión tiene un botón por cuenta. Con una sesión activa, `/login` ya no te expulsa: avisa de quién está dentro y permite continuar, cerrar sesión o elegir otra cuenta.
- **Cuenta no es rol.** Una cuenta con un solo rol no ofrece «Cambiar de rol». La cuenta con varios roles entra con el primero y puede cambiar dentro de sus roles autorizados, y el cambio de rol conserva la cuenta.
- **Permisos sin cambios.** Al cambiar de cuenta, la coordinadora deja de ver «Usuarios y roles».
- **Solo local.** Fuera del modo demostración las cuentas no se listan, el botón de un clic no aparece y reproducir la acción por HTTP no crea sesión (303 a `/login`, sin cookie); una cookie falsificada es rechazada.

## 8. Botón de notificaciones
- Sigue en el mismo lugar y con el mismo diseño.
- Se quitó el contador rojo y los vencimientos de ejemplo, que se presentaban como notificaciones reales.
- Ahora abre un panel con la etiqueta «Próximamente» y el texto «El centro de notificaciones se habilitará en una fase posterior. Por ahora no hay avisos que mostrar», (el enlace a la pantalla provisional se retiró después; ver [[Informe Botones de tema y notificaciones]]). El nombre accesible es «Notificaciones (próximamente)».
- Verificado en escritorio y en un viewport móvil de 390 píxeles (el panel queda dentro de la pantalla).
- **No pude reproducir que el botón no abriera nada:** en mi navegador de pruebas ya abría un panel (con los vencimientos de ejemplo).
- Cuando exista el módulo 14 deberá conectarse con los tipos y las preferencias del Documento Maestro.

## 9. Pruebas de tipos y compilación
| Comprobación | Resultado |
|---|---|
| `pnpm typecheck` | Sin errores |
| `pnpm test` | 60 pruebas en 6 archivos, todas pasan (10 nuevas) |
| `pnpm build` (Next 16.4.3) | Correcto, con validación de tipos |
| `next dev`: recorrido de todas las pantallas de 5 cuentas | Sin errores ni advertencias de consola (antes había un error de Base UI) |
| Rutas por rol contra un servidor de producción | 405 solicitudes, 0 fallos |
| Inicio de sesión (acción de servidor) | 11 casos correctos |
| Navegador: tema, cuentas y notificaciones | 62 comprobaciones correctas |
| Viewport móvil (390 px) | Sin desbordes; los controles responden |
| Vault | 66 enlaces, ninguno roto |

## 10. Problemas y observaciones
1. **No pude reproducir** los fallos descritos del tema ni del botón de notificaciones (secciones 6 y 8). Las mejoras se hicieron igualmente.
2. **Cambio en `components/ui/button.tsx`.** Es un componente de la biblioteca de UI. Se añadió `nativeButton={false}` cuando el botón se renderiza como enlace. Sin cambio visual; elimina el error de consola de Base UI.
3. **El compilador no descarga las fuentes de Google en mi entorno.** Para compilar desactivé las fuentes solo en una copia de pruebas; en el equipo con internet no hace falta.
4. **Detalles visuales que vi y no se tocaron** (fuera de lo pedido): en «Tendencia de retención» las etiquetas del eje vertical aparecen recortadas por la izquierda («00%» en lugar de «100%»), y «+6 pp» del panel se parte en dos líneas. Puedo corregirlos si el equipo quiere.
5. **`/login` con sesión activa** ya no redirige: el proxy lo permite para poder cambiar de cuenta. Es un cambio de comportamiento deliberado, solo relevante en demostración.
6. **Estados de la convocatoria.** Los datos de ejemplo usan 3 y el v0.3 define 8. Sigue pendiente (sección D de [[Decisiones pendientes]]).
7. **`Sistema-Gestion-Maestria-Obsidian.zip` en la raíz de `main`.** Duplica el vault y quedará desactualizado con estos cambios; conviene retirarlo o regenerarlo.
8. **No verificado:** Safari y Firefox (solo Chromium), y el aspecto de pantallas distintas de las revisadas en capturas.

No se avanzó con ningún módulo nuevo, como pedía la nota.
