# Seguridad y permisos

Roles: Administrador, Coordinador, Tutor y Postulante/Estudiante (cuenta única). El detalle por rol está en [[Matriz de permisos]].

## Cuentas y sesiones (v0.3 §2.8–2.10)
- Contraseñas de mínimo 8 caracteres, con mayúsculas, minúsculas y números, guardadas con Argon2id.
- La sesión termina tras 30 minutos de inactividad.
- Desactivar una cuenta bloquea el acceso, revoca sus sesiones y conserva sus registros.
- Dos cuentas administrativas protegidas, sin credenciales predeterminadas.
- El administrador no puede ver ni fijar la contraseña de otro usuario.
- El registro público es solo para postulantes y exige verificar el correo.

## Autorización
- El backend autoriza cada operación según rol y asignación vigente.
- Ocultar botones en la interfaz no sustituye la validación en el servidor.
- El estudiante solo consulta lo propio; el tutor, lo asignado; el coordinador, sus programas.

## Archivos (v0.3 §15)
- Se valida extensión, tipo MIME, firma real, tamaño y contenido sospechoso; lo sospechoso puede ir a cuarentena.
- Las descargas validan permisos en el servidor.
- Los archivos no se sobrescriben: los reemplazos crean versiones.

## Operativo
- Secretos en variables de entorno, nunca en Git.
- Auditoría de operaciones críticas.
- No usar datos reales en demos sin autorización.
