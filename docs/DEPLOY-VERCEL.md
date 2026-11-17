# Guia de Despliegue - Beta 2 (Vercel + TiDB)

> **Audiencia:** despliegue manual para la beta con grupo cerrado (sin costo).
> **Fecha:** 17/11/2026 · **Estado:** VIGENTE (reemplaza a `DEPLOY-STAGING.md`, histórico de Railway).
> **Plan completo y trazabilidad:** ver `README.md` de la raíz (sección "Beta 2").

## Arquitectura objetivo

```
https://<front>.vercel.app  (React/Vite — proyecto Vercel, root astroSetupsFrontend)
        │ HTTPS
        ▼
https://<back>.vercel.app   (Spring Boot — proyecto Vercel, root astrosetupsback,
        │                    preset Container: Vercel builda el Dockerfile)
        │ internet (TLS obligatorio)
        ▼
gateway.<region>.prod.aws.tidbcloud.com:4000 / astrosetupsdb
        (TiDB Cloud Starter — compatible MySQL, gratis sin tarjeta)
```

**Orden de despliegue (hay dependencia cruzada):**

1. TiDB: instancia + dump importado (Paso 0).
2. Frontend en Vercel con `VITE_API_BASE_URL` temporal → obtiene su dominio (Paso 1).
3. Backend en Vercel con `CORS_ALLOWED_ORIGINS` = dominio del front (Paso 2).
4. Frontend: variable real + Redeploy → **app funcional** (Paso 3).

---

## Paso 0 — TiDB Cloud Starter (BD gratis, sin limite de tiempo)

1. [tidbcloud.com](https://tidbcloud.com) → sign up (email; **no pide tarjeta** para las primeras 5 instancias Starter MySQL).
2. Crear proyecto → instancia **Starter**, compatibilidad **MySQL** (región cercana, p. ej. AWS us-east-1 / sa-east-1).
3. En la instancia → **Connect** → anotar:
   - **Host** (`gateway01.<region>.prod.aws.tidbcloud.com`)
   - **Port** `4000`
   - **User** (incluye prefijo del cluster: ej. `ab12cd34.root` — usar **tal cual**)
   - **Password** (generarlo y **guardarlo**; no se vuelve a mostrar)
4. Crear el schema e importar el dump desde tu máquina local (MySQL 8 client ya requerido):
   ```powershell
   cd dumps
   .\import-tidb.ps1 -TiDBHost gateway01.<region>.prod.aws.tidbcloud.com `
                     -User "ab12cd34.root" -DbPassword "<password>"
   ```
   El script crea `astrosetupsdb`, importa `astrosetups_full_dump.sql` y verifica conteos
   esperados: `users 21 · products 114 · categories 24 · orders 26 · order_items 40 ·
   promo_codes 6 · cities 10 · postal_codes 12`.
   - TLS: por defecto `--ssl-mode=REQUIRED`; con `-CaPath <isrgrootx1.pem>` usa `VERIFY_CA`.
   - Si tu `mysql.exe` está en otra ruta: `-MysqlExe "C:\ruta\mysql.exe"`.

> **Costos:** Starter es gratis mientras se mantenga dentro de la cuota mensual
> (5 GiB almacenamiento + 50M Request Units/mes) — holgado para la beta. Si se excede,
> se bloquean nuevas conexiones hasta el reinicio del mes (sin cobro automático).

---

## Paso 1 — Frontend en Vercel

1. [vercel.com](https://vercel.com) → **Add New → Project** → importar el repo
   (si el proyecto de octubre `ecomerce-full-stack` sigue activo, reutilizarlo).
2. **Root Directory:** `astroSetupsFrontend` · Framework **Vite** (auto-detectado).
3. Build/Output default: `npm run build` / `dist`.
4. **Settings → Environment Variables** (entorno Production):

   | Name | Value |
   |------|-------|
   | `VITE_API_BASE_URL` | `https://backend-pendiente.vercel.app/api` ← **temporal**, se reemplaza en el Paso 3 |
   | `VITE_APP_NAME` | `ASTRO SETUPS` (opcional) |

5. **Deploy.** Anota el dominio: `https://<front>.vercel.app`
   (Settings → Domains). `vercel.json` con rewrite SPA ya está en la carpeta.
   > Hasta el Paso 3 la app carga pero las llamadas a API fallan (esperado).

---

## Paso 2 — Backend en Vercel (contenedor Spring Boot)

1. **Add New → Project** → mismo repo → **Root Directory:** `./astrosetupsback`.
   - El `vercel.json` de la carpeta declara `"framework": "container"` → Vercel usa el
     `Dockerfile` existente (multi-stage Maven 3.9/Java 21 → JRE 21, usuario no-root).
   - Primer build: ~3-5 min (corre los tests H2; no necesita MySQL).
2. **Settings → Environment Variables** (entorno **Production**):

   | Name | Value |
   |------|-------|
   | `SPRING_PROFILES_ACTIVE` | `prod` |
   | `PORT` | `8081` ← **crítico**: Vercel enruta las peticiones a `$PORT` y Spring lo escucha en `${PORT:8081}`. No usar `80` (la imagen corre como usuario no-root y no puede enlazar puertos privilegiados). |
   | `DB_URL` | `jdbc:mysql://<host-tidb>:4000/astrosetupsdb?sslMode=VERIFY_IDENTITY&enabledTLSProtocols=TLSv1.2,TLSv1.3` |
   | `DB_USER` | `<prefijo>.root` (exactamente como en TiDB Connect) |
   | `DB_PASSWORD` | *(password generado en Paso 0)* |
   | `CORS_ALLOWED_ORIGINS` | `https://<front>.vercel.app` ← dominio del Paso 1, **sin barra final** |
   | `JWT_SECRET` | generar con: `[guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N')` |
   | `JAVA_OPTS` | `-XX:MaxRAMPercentage=60` (el default del JVM usa solo 25% de la memoria del contenedor → posible OOM) |

   > TLS a TiDB: Java confía en el sistema CA (Let's Encrypt ISRG Root X1 está en el
   > truststore de la imagen) — no hace falta descargar certificados.
3. **Deploy.** Verificar desde PowerShell (el primer arranque puede tardar ~10-30 s):
   ```powershell
   curl.exe https://<back>.vercel.app/api/health
   # esperado: {"status":"UP"}
   ```

> **Fail-fast:** con `SPRING_PROFILES_ACTIVE=prod`, si falta `JWT_SECRET` o
> `CORS_ALLOWED_ORIGINS` la app **no arranca** (`Could not resolve placeholder ...`).
> El detalle está en Logs → Function/Container del proyecto.

---

## Paso 3 — Cerrar el circuito

1. Vercel → proyecto **frontend** → Settings → Environment Variables → editar:
   ```
   VITE_API_BASE_URL=https://<back>.vercel.app/api
   ```
   (recordar el sufijo `/api`: los services del frontend llaman a `/catalog/...`,
   `/auth/...` y el backend los expone bajo `/api/...`).
2. **Deployments → Redeploy** (las variables `VITE_*` se inyectan en build time;
   cambiar la variable sola no redespliega).

---

## Checklist post-despliegue

| # | Prueba | Esperado |
|---|--------|----------|
| 1 | `curl https://<back>.vercel.app/api/health` | `{"status":"UP"}` |
| 2 | Login `admin@astrosetups.com` (password de staging: ver trazabilidad Fase 6.5) | Entra y carga el Dashboard (KPIs) |
| 3 | Catalogo `/catalog` | 114 productos, filtros y busqueda funcionan |
| 4 | Refresh en `/catalog` | Recarga sin 404 (rewrite SPA) |
| 5 | Ruta inexistente `/ruta-mala` | Muestra pagina 404 (NotFound) |
| 6 | Login `cliente@astrosetups.com` → abrir `/admin` | Bloqueado (403 / redireccion) |
| 7 | Carrito sin login + agregar producto + checkout | Flujo completo responde |
| 8 | Vercel → Usage (proyecto backend) | CPU/Memoria/Peticiones consumiendo, sin pausa |

---

## Operacion durante la beta (15 dias, Vercel Hobby $0)

- **Sleep/wake automatico:** a los ~5 min sin trafico el contenedor escala a cero;
  la **primera peticion lo despierta solo** (arranque de Java: segundos). No hay accion manual.
- **Nunca hay cobro:** Hobby no cobra usage extra; si se superan los limites mensuales
  (4 CPU-hrs activas, 360 GB-hrs memoria, 1M peticiones) la app queda **pausada**
  (503 `DEPLOYMENT_PAUSED`) hasta el reset de 30 dias.
- **Monitoreo:** Vercel → proyecto backend → **Usage**. Con 10 testers/15 dias el margen es amplio.
- **No configurar pings keep-alive frecuentes** (cada arranque de JVM consume CPU activa
  del limite). Solo si el grupo lo pide: como maximo 1 ping cada 30 min.
- **Fair use:** el plan Hobby es "uso personal/no comercial" — beta cerrada sin cobros
  es un riesgo aceptado documentado; si el proyecto pasa a comercial → Pro ($20/mes).
- **Base de datos:** TiDB Starter no duerme; la cuota mensual se reinicia cada mes.

---

## Solucion de problemas

| Sintoma | Causa / Solucion |
|---------|------------------|
| Backend no arranca, log `Could not resolve placeholder 'JWT_SECRET'` o `'CORS_ALLOWED_ORIGINS'` | Falta la variable en Settings → Environment Variables (entorno Production) |
| `curl /api/health` → connection timeout / 502 | `PORT` no es `8081` en las env vars del proyecto backend (Vercel enruta a otro puerto que donde escucha Spring) |
| 503 `DEPLOYMENT_PAUSED` | Se superó un limite mensual de Hobby → Usage page; esperar reset o usar Plan B (Render) |
| Error CORS en navegador (`...blocked by CORS policy`) | `CORS_ALLOWED_ORIGINS` no coincide exacto con el dominio del front (https, sin `/` final) o falta Redeploy de backend tras cambiarla |
| Errores `Public Key Retrieval is not allowed` / TLS con TiDB | `DB_URL` sin `sslMode=VERIFY_IDENTITY&enabledTLSProtocols=TLSv1.2,TLSv1.3` o usuario sin prefijo de cluster |
| `Access denied for user` pese a password correcta | `DB_USER` debe ser **exactamente** el de TiDB Connect (incluye prefijo `xxxx.root`); sin espacios ocultos al pegar |
| Import del dump falla con error de collation (`utf8mb4_0900_ai_ci`) | TiDB no soporta esa collation en tu version → crear copia del dump con `utf8mb4_unicode_ci` y reimportar |
| `OOMKilled` / `Java heap space` en logs | Falta `JAVA_OPTS=-XX:MaxRAMPercentage=60` (o subir a `70`) |
| Primera carga muy lenta | Cold start normal del JVM tras escalar a cero; solo la primera peticion |
| Pantalla blanca en el front | Falta `VITE_API_BASE_URL` (`apiConfig.ts` lanza error visible) o no se hizo Redeploy tras cambiarla |
| 404 en rutas del front al recargar | Falta `vercel.json` o el Root Directory no es `astroSetupsFrontend` |
| Build del backend falla en tests | Revisar logs del build; los tests usan H2 y no requieren red/MySQL — raro en local |
| TiDB: `too many connections` / cuota agotada | Revisar uso en TiDB → Usage; Starter cierra conexiones al superar 50M RUs/mes (resetea al mes siguiente) |

---

## Anexo A — Plan B: backend en Render free (respaldo)

Si el runtime de contenedores de Vercel falla o se agota un limite de Hobby:

1. [render.com](https://render.com) → **New → Web Service** → conectar el repo.
2. **Root Directory:** `astrosetupsback` · **Runtime:** Docker (usa el `Dockerfile` tal cual) ·
   **Instance Type:** Free (512 MB, duerme a los 15 min, ~750 hrs/mes, sin tarjeta).
3. Mismas variables de entorno que el Paso 2, **excepto**: `PORT` **no declararla**
   (Render la inyecta; Spring la lee de `${PORT}`), y `CORS_ALLOWED_ORIGINS` debe ser
   el dominio de Render: `https://<svc>.onrender.com`.
4. Health check path: `/api/health`.
5. Actualizar `VITE_API_BASE_URL=https://<svc>.onrender.com/api` + Redeploy del front.

Diferencias: duerme a los 15 min (~1 min de wake, más lento que Vercel), pero nunca
"se pausa" por usage y es un runtime maduro para JVM.

## Anexo B — Mapeo desde la desconfiguracion Railway (historica)

| Railway (retirado) | Vercel + TiDB (vigente) |
|---|---|
| Servicio MySQL con volumen `mysql.railway.internal` | TiDB Starter `gateway...:4000` (publico + TLS) |
| Backend Docker en Railway (target port 8080) | Backend contenedor en Vercel (`PORT=8081`) |
| `DB_URL=jdbc:mysql://...?useSSL=false&allowPublicKeyRetrieval=true` | `DB_URL=jdbc:mysql://...?sslMode=VERIFY_IDENTITY&enabledTLSProtocols=TLSv1.2,TLSv1.3` |
| `import-staging.ps1` (TCP proxy) | `import-tidb.ps1` (directo + TLS) |
| Healthcheck en Railway UI | `curl /api/health` manual + Logs de Vercel |
