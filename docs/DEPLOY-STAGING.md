# Guia de Despliegue - Staging (Railway + Vercel)

> **Audiencia:** despliegue manual para el grupo cerrado.
> **Fecha:** 05/10/2026 · **Estado previo:** Fases 1-6 completadas (ver `README.md`).

## Arquitectura objetivo

```
https://<app>.vercel.app  (React/Vite)
        │ HTTPS
        ▼
https://<svc>.up.railway.app  (Spring Boot + Docker)
        │ red interna Railway
        ▼
mysql.railway.internal:3306  (MySQL 9.7 + Volume)
```

**Orden de despliegue (importante):** hay un ciclo de dependencias entre variables
(frontend necesita el dominio del backend y el backend necesita el dominio del
frontend), por eso seguimos este orden:

1. Frontend en Vercel (con `VITE_API_BASE_URL` temporal) → obtiene su dominio
2. Backend en Railway (con `CORS_ALLOWED_ORIGINS` = dominio de Vercel) → obtiene su dominio
3. Frontend: variable real + Redeploy → **app funcional**

---

## Paso 0 — MySQL en Railway (YA REALIZADO en Fase 6)

| Dato | Valor |
|------|-------|
| Servicio | MySQL en el proyecto de Railway |
| Database | `railway` |
| Volume | montado en `/var/lib/mysql` (persistente) |
| Host interno | `mysql.railway.internal:3306` |
| Usuario | `root` (password en: servicio MySQL → Variables → `MYSQLPASSWORD`) |
| Datos | Dump completo importado (114 productos, 21 usuarios, 26 ordenes) |
| TCP Proxy | **ELIMINADO** (solo se uso para el import; el backend usa host interno) |

Credenciales de staging (rotadas en Fase 6.5 — ver `README.md`):

| Cuenta | Password |
|--------|----------|
| `admin@astrosetups.com` | `AdminStg2026!` |
| `superadmin@astrosetups.com` | `SuperStg2026!` |
| `cliente@astrosetups.com` | `Cliente123*` |

> ⚠️ El backend **debe** crearse en el **mismo proyecto y mismo environment**
> (Preview/Production) que el MySQL, si no, `mysql.railway.internal` no resuelve.

---

## Paso 1 — Frontend en Vercel

1. [vercel.com](https://vercel.com) → **Add New → Project** → importar el repo de GitHub.
2. **Framework Preset:** `Vite` (auto-detectado).
3. **Settings → General:**
   - **Root Directory:** `astroSetupsFrontend`
   - Build Command: `npm run build` (default)
   - Output Directory: `dist` (default)
   - Install Command: `npm install` (default)
4. **Settings → Environment Variables:**

   | Name | Value |
   |------|-------|
   | `VITE_API_BASE_URL` | `https://backend-pendiente.up.railway.app/api` ← **temporal**, se reemplaza en el Paso 3 |
   | `VITE_APP_NAME` | `ASTRO SETUPS` (opcional) |

5. **Deploy.** Al terminar, anota el dominio asignado:
   `https://<app>.vercel.app` (Settings → Domains).
   - Nota: `vercel.json` (rewrite SPA `/* → index.html`) ya esta en `astroSetupsFrontend/` y Vercel lo aplica automatico.
   - Nota: hasta el Paso 3 la app carga pero las llamadas a API fallan (esperado).

---

## Paso 2 — Backend en Railway

1. En el **mismo proyecto** donde esta el MySQL → **+ New → GitHub Repo** → seleccionar el repo.
2. **Settings → Source** (del servicio nuevo):
   - **Root Directory:** `./astrosetupsback`
   - Railway detecta el `Dockerfile` (multi-stage Maven → JRE 21) automatico.
   - El build corre los tests (H2 en memoria): primer build tarda ~3-5 min.
3. **Settings → Variables:**

   | Name | Value |
   |------|-------|
   | `SPRING_PROFILES_ACTIVE` | `prod` |
   | `DB_URL` | `jdbc:mysql://mysql.railway.internal:3306/railway?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC` |
   | `DB_USER` | `root` |
   | `DB_PASSWORD` | *(valor de `MYSQLPASSWORD` del servicio MySQL)* |
   | `CORS_ALLOWED_ORIGINS` | `https://<app>.vercel.app` ← dominio del Paso 1, **sin barra final** |
   | `JWT_SECRET` | *(generar con el comando de abajo, ≥32 chars)* |

   `PORT` lo inyecta Railway (Spring lo lee: `server.port=${PORT:8081}`) — **no declararla**.
   Opcional: `JAVA_OPTS=-Xmx512m`.

   Generar `JWT_SECRET` en PowerShell:
   ```powershell
   [guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N')
   ```

4. **Settings → Networking → Public Domain** (es **HTTP**, a diferencia del TCP
   Proxy de la DB): genera `https://<svc>.up.railway.app` → anotalo.
   > ⚠️ **Target Port**: junto al dominio, verifica que el puerto objetivo sea el
   > de la app (**8080** = `$PORT`, nunca `8081`). Si difiere, el edge responde
   > `502/404` con header `x-railway-fallback: true`: el healthcheck **pasa igual**
   > (sondea `$PORT`) pero **ninguna petición externa llega a la app**. Al cambiar
   > o regenerar el dominio **el hostname puede cambiar** (sufijo nuevo) → repetir
   > el Paso 3 con el dominio nuevo.
5. **Healthcheck** (Settings → Deploy/Healthcheck Path): `/api/health`
   → Railway espera a que el backend este realmente levantado.
6. **Deploy.** Verificar desde PowerShell:
   ```powershell
   curl.exe https://<svc>.up.railway.app/api/health
   # esperado: {"status":"UP"}
   ```

> **Fail-fast:** con `SPRING_PROFILES_ACTIVE=prod`, si falta `JWT_SECRET` o
> `CORS_ALLOWED_ORIGINS` la app **no arranca** y el error aparece en los Logs
> del servicio (`Could not resolve placeholder ...`). Es intencional.

---

## Paso 3 — Cerrar el circuito

1. Vercel → tu proyecto → **Settings → Environment Variables** → editar
   `VITE_API_BASE_URL`:
   ```
   https://<svc>.up.railway.app/api
   ```
   (recordar el sufijo `/api`: los services del frontend llaman a `/catalog/...`,
   `/auth/...` y el backend los expone bajo `/api/...`).
2. **Deployments → Redeploy** (las variables de Vite se inyectan en build time;
   cambiar la variable sola no redespliega).

---

## Checklist post-despliegue

| # | Prueba | Esperado |
|---|--------|----------|
| 1 | `curl https://<svc>.up.railway.app/api/health` | `{"status":"UP"}` |
| 2 | Login `admin@astrosetups.com` / `AdminStg2026!` | Entra y carga el Dashboard (KPIs) |
| 3 | Catalogo `/catalog` | 114 productos, filtros y busqueda funcionan |
| 4 | Refresh en `/catalog` | La pagina recarga sin error 404 (rewrite SPA) |
| 5 | Ruta inexistente `/ruta-mala` | Muestra la pagina 404 (NotFound) |
| 6 | Login `cliente@astrosetups.com` / `Cliente123*` → abrir `/admin` | Bloqueado (403 / redireccion) |
| 7 | Carrito sin login + agregar producto + checkout | Flujo completo responde |

---

## Solucion de problemas

| Sintoma | Causa / Solucion |
|---------|------------------|
| Backend no arranca, log: `Could not resolve placeholder 'JWT_SECRET'` o `'CORS_ALLOWED_ORIGINS'` | Falta la variable en Settings → Variables |
| `UnknownHostException mysql.railway.internal` | Backend en otro proyecto/environment que el MySQL |
| Navegador: error CORS (`...has been blocked by CORS policy`) | `CORS_ALLOWED_ORIGINS` no coincide exacto con el dominio de Vercel (https, sin `/` final) |
| **502/404 con header `x-railway-fallback: true`** (la app corre, healthcheck pasa, logs normales, pero todo lo externo falla) | **Target Port del dominio ≠ puerto de la app** (p. ej. heredado de un `EXPOSE` viejo). Settings → Networking → target port = `8080`. Ver Paso 2.4 — *causa real vivida en staging 05/10/2026* |
| Tras cambiar/regenerar el dominio: 404 o el frontend no conecta | El **hostname cambió** (sufijo nuevo) → actualizar `VITE_API_BASE_URL` en Vercel + Redeploy (Paso 3) — *vivido: `...production` → `...production-7db9`* |
| `Driver com.mysql.cj.jdbc.Driver claims to not accept jdbcUrl, mysql://...` | `DB_URL` en formato de Railway (`mysql://`); debe ser JDBC: `jdbc:mysql://host:3306/db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC` |
| `Access denied for user 'root'` pese a password correcta | Los nombres de variable deben ser **exactamente** `DB_USER`/`DB_PASSWORD`/`DB_URL` (Spring no lee `Mysql_user`, `mysql_url`, etc.) y sin espacios ocultos al pegar |
| Pantalla blanca en Vercel | Falta `VITE_API_BASE_URL` (`apiConfig.ts` lanza error al cargar) |
| Login falla con credenciales del README | En staging la password de admin roto: usar `AdminStg2026!` |
| Errores `Public Key Retrieval is not allowed` | Falta `allowPublicKeyRetrieval=true` en `DB_URL` |
| Errores de conexión TLS a la DB | Falta `useSSL=false` en `DB_URL` |
| 404 en rutas del frontend al recargar | Falta `vercel.json` o el Root Directory no es `astroSetupsFrontend` |
