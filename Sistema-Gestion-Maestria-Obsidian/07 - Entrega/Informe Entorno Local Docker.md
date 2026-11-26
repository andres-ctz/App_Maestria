# Informe — Entorno local con Docker Compose (PostgreSQL y Mailpit)

24/11/2026 · Rama `feature/fase-2-entorno-docker` · Referencia funcional: [[Documento_Maestro_Requisitos_App_Maestria]] v0.3.2 · Decisiones aplicadas: D-008, D-009, D-013 y D-022

> [!summary] En una frase
> Se agrega la infraestructura mínima de desarrollo local en la raíz del repositorio (`docker-compose.yml` y `.env.example`) con **PostgreSQL 16** y **Mailpit** para que el equipo pueda arrancar la Fase 2 (NestJS + Prisma) sobre el mismo entorno, sin tocar `apps/frontend` ni adelantar decisiones de arquitectura del backend.

> [!warning] Qué se verificó y qué no
> - **Verificado:** sintaxis y estructura de `docker-compose.yml` y `.env.example`, protección de `.env` en `.gitignore`, coherencia con las decisiones D-008, D-009, D-013 y D-022, y comprobación de que `apps/frontend` no fue modificado.
> - **No verificado en esta máquina:** ejecución real de `docker compose up -d` y `healthcheck` de los contenedores, porque **Docker no estaba instalado** en el equipo desde donde se generó este cambio. Quien revise el PR en una máquina con Docker debe ejecutar las comprobaciones de la sección 4 antes de aprobar el merge.

## 1. Archivos creados y modificados
| Archivo | Cambio | Por qué |
|---|---|---|
| `docker-compose.yml` *(nuevo)* | Define los servicios `postgres` (`postgres:16-alpine`) y `mailpit` (`axllent/mailpit:v1.21`), volumen `postgres_data` y `healthcheck` en ambos | Primer cimiento reproducible de la Fase 2 según el stack confirmado (D-022) |
| `.env.example` *(nuevo)* | Plantilla de variables locales (`TZ`, `POSTGRES_*`, `DATABASE_URL` y `MAILPIT_*`) con valores ficticios de desarrollo | Permite configurar puertos o credenciales locales sin subir secretos al repositorio (`.env` ya está en `.gitignore`) |
| `README.md` | Añade la sección «Servicios locales (PostgreSQL y Mailpit)» y actualiza estado y estructura | Que cualquier integrante sepa levantar los servicios desde la raíz en dos comandos |
| `04 - Desarrollo/Base de datos.md` | Documenta el uso de `docker-compose.yml` y enlaza este informe | Mantiene alineada la documentación técnica del vault |
| `07 - Entrega/Informe Entorno Local Docker.md` *(nuevo)* | Este informe | Deja trazabilidad clara de lo agregado y de lo que falta verificar |

No se modificaron archivos de `apps/frontend`, ni reglas de negocio, ni decisiones pendientes.

## 2. Servicios configurados
| Servicio | Imagen | Puerto local | Propósito | Regla / decisión |
|---|---|---|---|---|
| `postgres` | `postgres:16-alpine` | `127.0.0.1:5432` | Base de datos relacional para el futuro backend (NestJS + Prisma) | D-022, [[Arquitectura general]] |
| `mailpit` | `axllent/mailpit:v1.21` | `127.0.0.1:1025` (SMTP) y `127.0.0.1:8025` (Web UI) | Captura local de correos simulados (verificación de correo, recuperación, notificaciones) | D-008, D-013, D-022 |

Decisiones técnicas tomadas dentro del alcance ya aprobado:
- **Imágenes estables con versión fija:** se evita `latest` y versiones RC ([[Stack tecnologico]]).
- **Puertos solo en `127.0.0.1`:** los servicios no quedan expuestos en la red local, únicamente en el equipo del desarrollador.
- **Zona horaria:** ambos contenedores usan `TZ=America/Guayaquil` y PostgreSQL además `PGTZ=America/Guayaquil` (D-009).
- **Persistencia local:** PostgreSQL guarda los datos en el volumen nombrado `app_maestria_postgres_data`, que se puede reiniciar limpio con `docker compose down -v`.
- **Valores ficticios por defecto:** `usuario: app_maestria`, `contraseña: app_maestria_dev`, `base: app_maestria`. Solo para desarrollo local; nunca para producción.

## 3. Cómo usarlo
Desde la raíz del repositorio:

1. *(Opcional)* Copia `.env.example` a `.env` si necesitas ajustar puertos (por ejemplo, si ya tienes un PostgreSQL local en el `5432`).
2. Levanta los servicios:
   ```bash
   docker compose up -d
   ```
3. Comprueba que ambos contenedores estén saludables:
   ```bash
   docker compose ps
   ```
4. Abre la bandeja de correos simulados en **http://localhost:8025**.
5. Para detener sin borrar datos: `docker compose down`. Para empezar con la base vacía: `docker compose down -v`.

### Cadena de conexión para el futuro backend (Fase 2)
```text
DATABASE_URL="postgresql://app_maestria:app_maestria_dev@127.0.0.1:5432/app_maestria?schema=public"
```
Y para el envío SMTP simulado desde NestJS: host `127.0.0.1`, puerto `1025`, sin TLS ni autenticación obligatoria en local.

## 4. Lista de verificación pendiente (en un equipo con Docker)
Antes de dar por verificada esta rama en integración:
- [ ] Ejecutar `docker compose config` y confirmar que no reporta advertencias ni errores.
- [ ] Ejecutar `docker compose up -d` y comprobar con `docker compose ps` que `app-maestria-postgres` y `app-maestria-mailpit` alcanzan el estado `healthy`.
- [ ] Verificar la zona horaria de PostgreSQL: `docker compose exec postgres psql -U app_maestria -d app_maestria -c "SHOW TIME ZONE;"` (debe devolver `America/Guayaquil`).
- [ ] Abrir `http://localhost:8025` en el navegador y comprobar que carga la interfaz de Mailpit.
- [ ] Comprobar que `docker compose down -v` limpia el volumen sin errores.

## 5. Qué sigue para la siguiente persona del equipo
Con este entorno base listo, el siguiente paso de la Fase 2 es inicializar `apps/backend` con **NestJS + Prisma** conectado al `DATABASE_URL` y al SMTP de Mailpit configurados aquí, empezando por el Módulo 1 (autenticación real con Argon2id, sesiones de 30 minutos, cuentas protegidas, roles y auditoría inicial).
