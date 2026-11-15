# Revisión del boceto de v0 frente al Documento Maestro v0.3

Preparado el 14 de noviembre de 2026 · Proyecto App Maestría · Repositorio andres-ctz/App_Maestria

## Resumen

El boceto de frontend (`Boceto de fronted/sistema-de-gestion-academica`) tiene un diseño sólido que conviene conservar. Lo que hay que cambiar es sobre todo funcional: mezcla postulante y estudiante, tiene escritas a mano reglas que el v0.3 deja pendientes y cubre solo una parte de los 18 módulos. Se proponen siete cambios antes de redactar el prompt para empezar a programar.

## Qué es el boceto

- Next.js 16, React 19, Tailwind 4 y shadcn con base-ui.
- 3.474 líneas de código, 6 pantallas reales (panel ejecutivo, matriz de postulantes, inicio del tutor, revisión de evidencias, portal del postulante y sus actividades).
- Todos los datos son `mock-data` en memoria; nada persiste.
- En una copia de trabajo pasa el chequeo de tipos y `next build` compila (ver las advertencias al final).

## Qué mantendría

El diseño es sólido y no se cambiaría:

- Paleta azul sobria en oklch, con modo claro y oscuro, fuente Geist y colores de riesgo (bajo, medio y alto).
- El shell de la app: sidebar colapsable, breadcrumbs, búsqueda ⌘K, notificaciones y cambio de tema.
- Los patrones que se repiten bien: `PageHeader`, `StatCard`, badges por tono, panel lateral con pestañas, diálogos, estados vacíos, skeletons y pantalla de error.
- Accesibilidad cuidada (etiquetas ARIA, textos para lectores de pantalla) y diseño adaptable.

## Qué cambiaría

1. **Separar postulante de estudiante.** El boceto los junta en una "Matriz de postulantes" con tutor, avance y riesgo. En el v0.3 el tutor sigue a estudiantes matriculados en cursos y asignaturas, y la admisión es otro flujo. Se propone separar **Postulaciones** (documentos, requisitos, decisión y lista de espera) de **Estudiantes** (avance, riesgo, tutor y bitácora).
2. **Dividir "Evidencias" en dos.** Una parte es la revisión de documentos de la postulación y la otra son las entregas de actividades. El v0.3 las trata distinto, y las entregas admiten intentos y trabajo grupal.
3. **Quitar reglas escritas a mano que el v0.3 deja pendientes.** Hoy están fijas en el código los recordatorios "15·10·5·3·1", la lista de reglas de riesgo, los 20 MB y los tipos de archivo del cargador, un "revisión en 48 horas hábiles" y un "necesitas 100% para la evaluación final" que no existen en ningún documento. Pasarían a ser configuración o texto marcado como ejemplo.
4. **Corregir textos y datos de ejemplo.**
   - El portal dice "doctorado".
   - Los datos de ejemplo son peruanos (DNI, +51) y con notas sobre 20.
   - Las fechas salen como "27 oct 2026" y el v0.3 pide DD/MM/AAAA.
   - Los textos de marca ("Precursus", "Escuela de Posgrado") deben salir de la configuración institucional.
5. **Arreglar los enlaces del menú que dan 404:** `/usuarios`, `/configuracion`, `/auditoria`, `/programas`, `/reportes` y el botón "Exportar" del panel.
6. **Ajustes técnicos.** `ignoreBuildErrors: true` oculta errores de tipos; hay que fijar `react-is` en las dependencias, quitar `@vercel/analytics` para el entorno local y renombrar el paquete `my-project`.
7. **Cambio de rol.** Hoy es un selector de demostración. En la app real habrá login, y el cambio solo se ofrecerá a quien tenga varios roles.

## Cobertura de los 18 módulos del v0.3

Resultado: 1 cubierto, 6 parciales y 11 por construir.

| # | Módulo | Estado | Observación |
|---|---|---|---|
| 1 | Usuarios, autenticación y permisos | Parcial | Selector de rol de demostración; sin login, registro ni recuperación; `/usuarios` da 404 |
| 2 | Gestión institucional | Falta | `/configuracion` da 404 |
| 3 | Facultades, programas y períodos | Falta | Solo existen como datos de ejemplo; `/programas` da 404 |
| 4 | Convocatorias | Falta | Solo datos de ejemplo; sin catálogo público |
| 5 | Postulaciones y documentos | Parcial | Matriz de postulantes y "aprobar inscripción"; sin formulario de postulación ni revisión de documentos |
| 6 | Admisiones y listas de espera | Falta | Solo una aprobación simple |
| 7 | Matrículas | Falta | |
| 8 | Cursos, módulos y asignaturas | Falta | Los cursos son solo datos de ejemplo |
| 9 | Tutores, coordinadores y grupos | Parcial | Diálogo para asignar tutor; sin grupos |
| 10 | Actividades y entregas | Parcial | Lista de actividades y carga de evidencia; sin crear actividades, intentos ni entregas grupales |
| 11 | Evaluaciones en línea | Falta | |
| 12 | Calificaciones y ponderaciones | Falta | Solo se muestra la ponderación |
| 13 | Seguimiento académico y riesgos | Cubierto | Bitácora, compromisos, motivos de riesgo y panel; reglas de ejemplo |
| 14 | Notificaciones | Parcial | Solo alertas de vencimiento; sin centro de notificaciones ni preferencias |
| 15 | Archivos y almacenamiento | Parcial | Solo el diálogo de carga |
| 16 | Auditoría | Falta | `/auditoria` da 404 (el tipo de dato existe) |
| 17 | Reportes y exportaciones | Falta | `/reportes` da 404 |
| 18 | Configuración institucional | Falta | Igual que el módulo 2 |

## Pantallas por construir

Son unas 25, y todas pueden reutilizar los patrones que ya existen.

- **Acceso:** login, registro de postulantes con verificación de correo, recuperación de contraseña y catálogo público de convocatorias.
- **Administrador:** usuarios y roles, configuración institucional y tema, asistente de configuración inicial, facultades, programas y períodos.
- **Coordinador:** convocatorias (requisitos, documentos, cupos y estados), postulaciones (revisión documental, correcciones, decisión y lista de espera), matrículas, cursos con módulos, asignaturas y grupos, y calificaciones (planes, cierre y publicación).
- **Tutor:** sus cursos y asignaturas, crear actividades, revisar entregas, evaluaciones con banco de preguntas, calificar y el seguimiento que ya existe.
- **Postulante y estudiante:** formulario de postulación, mis postulaciones, mis cursos, entregas, rendir evaluaciones, calificaciones y reporte final.
- **Transversales:** centro de notificaciones con preferencias, reportes y auditoría.

## Siguiente paso

Si se aprueban los cambios 1 a 7, se redacta el prompt para programar por fases. Primero los cimientos: tipos del dominio según el v0.3, navegación real por rol, login y pantallas vacías con el diseño actual. Después, los módulos por orden de dependencia. El prompt indicará no modificar decisiones funcionales por cuenta propia (v0.3 §25).

## Limitaciones de esta revisión

- No se vio el boceto renderizado, porque el entorno de revisión no tiene navegador. La evaluación se hizo leyendo el código.
- En la compilación de prueba hubo dos advertencias. Las fuentes de Google no se descargan en el entorno de revisión. Y recharts pide `react-is`, que no se instaló porque se usó `--legacy-peer-deps`; con una instalación normal debería resolverse, pero conviene fijarlo en las dependencias.
