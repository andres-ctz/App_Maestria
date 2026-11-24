---
aliases: [Plan de pruebas]
---
# Casos de prueba

Cubren las áreas que pide el v0.3 §21.5. Las reglas críticas deben tener pruebas automatizadas.

| ID | Escenario | Resultado esperado | Estado |
|---|---|---|---|
| QA-01 | Login válido | Acceso según roles | Pendiente |
| QA-02 | Login inválido | Acceso rechazado | Pendiente |
| QA-03 | Tutor consulta curso o estudiante no asignado | Acceso denegado | Pendiente |
| QA-04 | Coordinador consulta un programa no asignado | Acceso denegado | Pendiente |
| QA-05 | Estudiante consulta datos de otro | Acceso denegado | Pendiente |
| QA-06 | Segunda postulación a la misma convocatoria | Rechazada | Pendiente |
| QA-07 | Archivo con extensión, MIME o firma no válidos | Rechazado o en cuarentena | Pendiente |
| QA-08 | Descarga de archivo sin permiso | Denegada | Pendiente |
| QA-09 | Corrección de un documento de postulación | Versión anterior conservada | Pendiente |
| QA-10 | Dos procesos asignan el último cupo a la vez | Se asigna un solo cupo | Pendiente |
| QA-11 | Orden de la lista de espera | Por fecha y hora de validación de requisitos | Pendiente |
| QA-12 | Segunda matrícula válida para el mismo proceso de admisión | Rechazada | Pendiente |
| QA-13 | Entrega antes de la publicación o después del vencimiento | Rechazada | Pendiente |
| QA-14 | Evaluación: tiempo efectivo y cierre general | Rige el menor; el intento se cierra con lo registrado | Pendiente |
| QA-15 | Modificar el banco de preguntas tras un intento | El intento conserva la versión usada | Pendiente |
| QA-16 | Plan de calificación que no suma 100 | No permite cerrar | Pendiente |
| QA-17 | Modificar una calificación publicada | Rechazado | Pendiente |
| QA-18 | Mismo evento, destinatario y tipo de notificación | Una sola notificación | Pendiente |
| QA-19 | Preferencia que habilita un tipo desactivado por el administrador | No permitido | Pendiente |
| QA-20 | Cambio de nivel de riesgo | Historial con indicadores y criterios | Pendiente |
| QA-21 | Operación auditable (por ejemplo, reasignar un tutor) | Registro con usuario, acción y valores | Pendiente |
| QA-22 | Exportación PDF/Excel | Datos coinciden con la BD y respetan el alcance | Pendiente |
| QA-23 | Instalación limpia | Arranque según README | Pendiente |
| QA-24 | Una oferta de vacante vence sin respuesta | Pasa a vencida y el coordinador continúa con la siguiente persona sin alterar el orden de la lista | Pendiente |
| QA-25 | El postulante acepta o rechaza una oferta vigente | Se registra la respuesta | Pendiente |
| QA-26 | Calificaciones de 69 y de 70 puntos en la escala de 0 a 100 | 69 no alcanza la nota mínima y 70 sí | Pendiente |
| QA-27 | Estados de una postulación | Solo existen los ocho estados confirmados (no «En nivelación» ni «Retirada») | Pendiente |
