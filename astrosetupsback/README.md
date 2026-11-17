# Astro Setups Backend

> **README de referencia del backend.** Actualizado: **17/11/2026**.
> **Contexto completo, backlog y trazabilidad:** ver `CONTEXT.md` de esta carpeta.
> Plan de despliegue: `../README.md` (raíz) y `../docs/DEPLOY-VERCEL.md`.

API REST de la tienda Astro Setups (catálogo, ventas, clientes, promociones, envíos)
con arquitectura hexagonal sobre Spring Boot.

## Stack

- Spring Boot 3.4.5 · Java 21 · Maven
- Spring Data JPA/Hibernate · MySQL 8 (dev) / **TiDB Cloud Starter** compatible MySQL (beta)
- Spring Security + JWT (jjwt 0.12.6), sesiones stateless
- Lombok · Tests con H2 en memoria (perfil `test`)
- Docker multi-stage (`Dockerfile` Maven→JRE 21, usuario no-root)

## Correr en local

```powershell
# Requisitos: Java 21, MySQL 8
mysql -u root -p -e "CREATE DATABASE astrosetupsdb"

cd astrosetupsback
.\mvnw spring-boot:run          # http://localhost:8081  (seed automático: data.sql)

.\mvnw clean package            # build + tests H2 (no necesita MySQL)
```

- Health: `GET http://localhost:8081/api/health` → `{"status":"UP"}`
- Credenciales seed (dev): ver `src/main/resources/data.sql`.

## Docker

```powershell
docker build -t astrosetupsback:local .
docker run -p 8081:8081 `
  -e PORT=8081 `
  -e SPRING_PROFILES_ACTIVE=prod `
  -e "DB_URL=jdbc:mysql://<HOST>:3306/<DB>?useSSL=false&allowPublicKeyRetrieval=true" `
  -e DB_USER=<USER> -e DB_PASSWORD=<PASS> `
  -e "JWT_SECRET=<clave-32+chars>" `
  -e "CORS_ALLOWED_ORIGINS=https://<front>.vercel.app" `
  astrosetupsback:local
```

## Variables de entorno (perfil `prod`)

| Variable | Obligatoria | Descripcion |
|---|---|---|
| `SPRING_PROFILES_ACTIVE` | sí | `prod` (esquema via `ddl-auto=update`, sin `data.sql`, fail-fast) |
| `PORT` | sí | puerto HTTP (local default 8081; Vercel enruta a este valor) |
| `DB_URL` / `DB_USER` / `DB_PASSWORD` | sí | conexión JDBC (en TiDB: TLS con `sslMode=VERIFY_IDENTITY`) |
| `JWT_SECRET` | sí | **sin default en prod**: la app no arranca si falta |
| `CORS_ALLOWED_ORIGINS` | sí | origen exacto del front, sin `/` final (coma-separados) |
| `JAVA_OPTS` | no | p. ej. `-XX:MaxRAMPercentage=60` en contenedor |

Detalle de valores usados en cada entorno: `CONTEXT.md` §6 y `../docs/DEPLOY-VERCEL.md`.

## Despliegue

- **Actual (nov 2026):** contenedor en **Vercel** (proyecto con Root Directory
  `astrosetupsback`, preset Container — `vercel.json`) + BD **TiDB Cloud Starter**.
  Guía: `../docs/DEPLOY-VERCEL.md`.
- **Histórico:** Railway (Docker) + MySQL Railway — retirado en nov 2026
  (trial agotado); ver `../docs/DEPLOY-STAGING.md`.

## Documentacion relacionada

- `CONTEXT.md` — contexto completo, trazabilidad y backlog (este módulo)
- `../README.md` — estado global del app + plan de despliegue beta
- `../docs/QA-GUIA-DE-PRUEBAS.md` · `../docs/qa-suite-a.ps1` — QA manual/semiautomático
