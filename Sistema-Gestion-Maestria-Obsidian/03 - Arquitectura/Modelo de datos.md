# Modelo de datos conceptual

> [!warning] Borrador derivado del v0.3
> Propuesta de entidades a partir del [[Documento_Maestro_Requisitos_App_Maestria]]. Los nombres en inglés son una propuesta para el esquema; atributos, cardinalidades y restricciones finales requieren validación. El v0.3 (§21.3) pide no crear entidades duplicadas para una misma responsabilidad.

| Entidad | Propósito y datos clave | Reglas del v0.3 |
|---|---|---|
| User | Identificación única, nombres, apellidos, correo único (acceso), teléfono; opcionales: nacimiento, dirección, foto | Desactivar no elimina historial (§2.7, §2.10) |
| Role / UserRole | Cuatro roles fijos; un usuario puede tener varios | Sin permisos individuales (§2.1–2.2) |
| EmergencyContact | Contactos de emergencia, aparte del perfil | §2.7 |
| Cuenta protegida | Dos cuentas administrativas protegidas (marca en User o equivalente: por definir) | No se eliminan, desactivan ni cambian de correo (§2.9) |
| Assignment | Coordinador–programa, tutor–curso, tutor–asignatura; estado Activa/Suspendida/Finalizada; fechas; responsable; motivo | Revocar conserva historial (§2.4); la reasignación registra anterior, nuevo, administrador, fecha y motivo (§2.5) |
| Institution / Theme | Nombre, logotipo, contacto, información; colores principal, secundario y de apoyo | Los PDF históricos no cambian (§3) |
| Faculty | Código único, nombre, descripción, activo | No se desactiva con programas activos ni se elimina (§4.1) |
| Program | Código institucional único, nombre, facultad, modalidad, descripción, información académica, duración, estado | No se elimina con historial (§4.2). Estado solo Activo o Inactivo; lo gestiona solo el administrador (D-024). No se puede desactivar con convocatorias en Programada, Abierta, Preparación o En curso (D-029) |
| Modality (enumeración fija) / DocumentTypeCatalog | Modalidad: valor fijo (Presencial, Virtual, Híbrida), no es una tabla editable. Tipos de documento: catálogo editable por el administrador | De los tipos de documento se eligen los que pide cada convocatoria (D-023, D-017) |
| AcademicPeriod | Código único, nombre, inicio, fin, estado | No se elimina (§4.3) |
| ProgramPeriod | Relación N:M programa–período | §4.4 |
| Call | Programa, período, nombre, descripción, fechas, fecha de apertura y de cierre de postulaciones (D-026), cupos, estado, información pública, días de período adicional de revisión (por defecto 7; D-028), motivo de suspensión, motivo de cancelación, estado anterior a la suspensión (D-026), fecha de cierre efectiva (para mostrarla 30 días en el catálogo, D-025) | 8 estados (§5.2); fechas dentro del período; el período solo cambia antes de abrir (§4.4). Los cupos pertenecen a la convocatoria, no al programa (§5.1). Cupos ocupados y disponibles se calculan, no se almacenan (D-031). Flujo Borrador → Programada → Abierta → Preparación → En curso → Cerrada; suspensión total con motivo y vuelta al estado anterior; cancelación definitiva con motivo; todo auditado (D-026). Duplicar crea una copia en Borrador con requisitos, documentos y estructura, sin fechas, postulaciones ni estudiantes; no hay entidad de plantilla de curso (D-027). Visibilidad pública según estado (D-025) |
| CallRequirement / CallDocument | Requisitos obligatorios u opcionales; documentos públicos o privados con versiones | Reemplazar conserva versiones (§5.3). Requisitos y documentos configurables por convocatoria; el formulario de postulación tiene estructura fija, sin constructor dinámico (D-017) |
| Application | Usuario + convocatoria, estado, historial de estados | Una por persona y convocatoria (§6.1, §19.3). Ocho estados exactos (§6.3, D-016). Al terminar el período adicional de revisión, las pendientes pasan a «No admitida» con el motivo «Revisión no completada al cierre» y se notifica (D-034) |
| ApplicationDocument | Requisito solicitado, documento presentado, archivo(s), versión, resultado de revisión | Un requisito admite varios archivos (§6.2) |
| DocumentReview / CorrectionRequest | Revisor, fecha, resultado, observaciones; campos habilitados para corregir | §6.4–6.5 |
| AdmissionDecision | Postulación, resultado, responsable, fecha y hora, observaciones, historial | §7.1 |
| SeatAssignment | Asignación de cupo | Transaccional, sin doble asignación (§7.2). Disponibles = cupos − asignados − ofertas pendientes; el backend impide excederlos con concurrencia (D-031, D-032) |
| WaitlistEntry | Postulación y fecha-hora de validación de requisitos obligatorios | Orden de llegada; no cambia salvo que cambie la elegibilidad (§7.3) |
| SeatOffer | Postulación, convocatoria, quién la creó (coordinador), fecha de envío, fecha límite, estado, fecha de respuesta y motivo de anulación (D-032). Estados: Pendiente, Aceptada, Rechazada, Vencida y Anulada | El coordinador la gestiona, fija el plazo y puede anularla con motivo; el postulante acepta o rechaza; si vence se continúa con la siguiente persona sin alterar el orden de la lista (§7.4, D-019). El cupo se reserva mientras está Pendiente; al aceptarla pasa a ser una asignación (SeatAssignment); si se rechaza, vence o se anula, se libera (D-032) |
| Enrollment | Estudiante, postulación de origen, curso, fecha, estado (incluye Retirada), responsable, historial; en el retiro, motivo y fecha; código único del comprobante | Una válida por proceso de admisión (§8.2). Retiro simple a «Retirada» con motivo y fecha, sin reincorporación: quien vuelve se matricula de nuevo en otra convocatoria. Comprobante PDF con código único y verificable (D-033) |
| Course | Nombre, descripción, programa, período, fechas, estado | Fechas dentro del período (§9.1). Se puede duplicar: la copia conserva configuración y estructura, sin fechas ni estudiantes; no hay plantillas de curso aparte (D-027) |
| CourseModule | Módulo opcional de un curso | §9.2 |
| Subject | Pertenece a un curso y, opcionalmente, a un módulo de ese curso | Hereda las fechas del curso (§9.2, §19.6) |
| StudentGroup / GroupMember | Capacidad máxima y mínima opcional; integrantes | Solo el tutor mueve estudiantes (§9.4) |
| Activity | Título, instrucciones, publicación, vencimiento, intentos, individual o grupal, adjuntos, ponderación | §10.1–10.2 |
| Submission / SubmissionAttempt | Entrega y cada intento (fecha, archivos, observaciones, estado); en grupales, integrantes al momento de entregar | Los intentos pertenecen a una entrega (§19.8); no se elige intento automáticamente (§10.3) |
| Extension / Reopening / LatePenalty | Autoriza, registra, nueva fecha, motivo; nota original, penalización, nota resultante | Penalizaciones no automáticas (§10.4–10.6) |
| Grade / Feedback | Calificación con historial; retroalimentación vinculada a actividad o entrega | Modificar exige motivo (§10.7) |
| Assessment | Apertura y cierre, duración, intentos, navegación, preguntas, configuración de revisión | §11.1 |
| Question / QuestionVersion / Option | Banco por asignatura y tema; cinco tipos de pregunta | Se conserva la versión exacta usada en cada intento (§11.3) |
| AssessmentAttempt / AttemptQuestion / AttemptAnswer | Inicio, tiempo efectivo, preguntas y orden mostrados, respuestas, adjuntos | §11.4–11.6, §19.9 |
| AssessmentInvalidation | Motivo y responsable; libera puntos en su categoría | §11.15 |
| GradingTemplate / GradingCategory | Plantilla institucional con categorías y puntos | §12.1 |
| GradingPlan / GradingWeight | Plan por curso y asignatura; cada ponderación apunta a una actividad o a una evaluación, nunca a ambas | Suma exacta de 100 puntos (§12.2, §19.7). Escala institucional de 0 a 100 y nota mínima de 70 puntos (§12.9, D-014 y D-015): no es lo mismo que la distribución interna de ponderaciones |
| GradeClosureVersion / GradePublication | Versión, fecha-hora, responsable; publicación | Lo publicado es inmutable (§12.5–12.6) |
| FinalReport | PDF final del estudiante | §12.8 |
| TutoringContact / Commitment | Contactos, compromisos, seguimientos, observaciones, vencimientos | §13.1 |
| RiskAssessment | Estudiante, nivel, indicadores, explicación, versión de criterios, fecha | No se sobrescribe; el nivel no se edita (§13.3–13.4) |
| Notification / NotificationDelivery | Destinatario, tipo, evento, canal, fecha, intentos, resultado, errores | Sin duplicados por evento, destinatario y tipo (§14.5). Correos simulados en el entorno local, sin envío real (D-013) |
| NotificationTypeSetting / NotificationPreference | Activación institucional y preferencias del usuario | La preferencia no habilita un tipo desactivado (§14.4) |
| StoredFile | Id único, clave de almacenamiento, nombre original, tamaño, formato, checksum, usuario, fecha, estado (Activo, Archivado, En cuarentena) | Archivos físicos fuera de PostgreSQL; sin sobrescribir (§15) |
| AuditLog | Usuario, acción, recurso, fecha y hora, valores anterior y nuevo, motivo, contexto | No editable por operaciones ordinarias (§16) |

Definir cardinalidades, claves, restricciones y estados antes de crear migraciones definitivas. Las 18 reglas de integridad están en el v0.3 §19.
