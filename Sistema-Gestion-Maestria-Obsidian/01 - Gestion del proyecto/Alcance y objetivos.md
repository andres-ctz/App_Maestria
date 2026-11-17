---
aliases: [Mapa de módulos y dependencias]
---
# Alcance y objetivos

> [!info] Fuente
> El alcance funcional vigente es el del [[Documento_Maestro_Requisitos_App_Maestria]] (v0.3, §1). Cualquier cambio se registra en [[Registro de decisiones]].

## Objetivo general
Plataforma web para administrar programas de maestría, convocatorias, postulaciones, admisiones, matrículas, cursos preparatorios, actividades, evaluaciones, calificaciones y seguimiento académico, de forma organizada, segura, trazable y según los permisos de cada usuario.

## Módulos (v0.3 §1.4)
1. Usuarios, autenticación y permisos.
2. Gestión institucional.
3. Facultades, programas y períodos académicos.
4. Convocatorias.
5. Postulaciones y documentos.
6. Admisiones y listas de espera.
7. Matrículas.
8. Cursos, módulos y asignaturas.
9. Tutores, coordinadores y grupos.
10. Actividades y entregas.
11. Evaluaciones en línea.
12. Calificaciones y ponderaciones.
13. Seguimiento académico y riesgos.
14. Notificaciones.
15. Archivos y almacenamiento.
16. Auditoría.
17. Reportes y exportaciones.
18. Configuración institucional.

## Fuera del alcance inicial (v0.3 §1.5)
- Integración con sistemas externos de admisión o gestión universitaria, salvo aprobación posterior.
- Envío de correos con un proveedor real durante el desarrollo local. Las notificaciones internas y los correos simulados sí se usan (D-013).
- Aplicaciones móviles nativas.
- Videoconferencias integradas.
- Chat general entre usuarios.
- Modificación individual de permisos por usuario.
- Automatización de decisiones institucionales que requieran aprobación humana.
- Proceso académico de nivelación; podrá evaluarse en una versión futura (D-018).
- Constructor de formularios dinámicos (D-017).
- Despliegue definitivo en producción antes de la validación del cliente.

## Orden de implementación (heredado del v0.2 §18, por validar)
> [!warning] El v0.3 no define un orden de implementación; es una propuesta de dependencias que debe revisarse.
1. Fundamentos: autenticación, usuarios, roles, permisos en backend, base de datos y auditoría inicial.
2. Configuración institucional.
3. Programas y convocatorias.
4. Postulaciones y admisión.
5. Vacantes y matrículas.
6. Gestión académica.
7. Seguimiento académico y riesgo.
8. Notificaciones, auditoría completa y reportes.
9. Pruebas integrales, correcciones y despliegue.

Pendientes de definición institucional: [[Decisiones pendientes]].
