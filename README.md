# Astro Setups - E-commerce Full Stack

> Plataforma e-commerce para tienda de productos de hardware/componentes de PC
> **Registro maestro del proyecto.** Actualizado: **17/11/2026**.

## Stack Tecnologico

| Capa | Tecnologia | Version |
|------|-----------|---------|
| Backend | Spring Boot + Java | 3.4.5 / 21 |
| Frontend | React + TypeScript | 19.1 / 5.8 |
| Build | Vite | 6.3 |
| Estilos | Tailwind CSS | 4.1 |
| Base de datos | MySQL (dev local) · TiDB Cloud Starter compatible MySQL (beta) | 8.0 / Serverless |
| Seguridad | Spring Security + JWT | jjwt 0.12.6 |
| State Mgmt | Zustand + React Query | 5.x |
| Despliegue (beta 2) | Vercel (front estático + backend en contenedor Docker) | Hobby $0 |

## Arquitectura

```
Beta 2 (vigente, Nov 2026):
Frontend (React/Vercel) <--HTTPS/REST--> Backend (Spring Boot contenedor/Vercel) --> TiDB Starter (MySQL-compat, TLS)

Historico (retirado, Oct-Nov 2026):
Frontend (Vercel) <--HTTPS/REST--> Backend (Spring Boot/Railway) --> MySQL (Railway)
```

## Auditoria del Proyecto (Estado: Noviembre 2026)

---

### FUNCIONALIDADES LISTAS PARA PROBAR (10)

| # | Funcionalidad | Backend | Frontend | Estado |
|---|--------------|---------|----------|--------|
| 1 | Auth (Login/Register) | AuthController + AuthServiceImpl + JWT | Login.tsx, Register.tsx, authStore | LISTO |
| 2 | Catalogo de Productos | CatalogController + CatalogServiceImpl | Products.tsx, ProductDetailPage.tsx | LISTO |
| 3 | Categorias | GET /api/catalog/categories | CategoryGrid, Sidebar filtros | LISTO |
| 4 | Busqueda y Filtros | POST /api/catalog/products/_search | useProductSearch, Sidebar | LISTO |
| 5 | Home Page | GET /api/catalog/products/featured | Home.tsx, Carousel, FAQ | LISTO |
| 6 | Admin Dashboard | GET /api/sales/stats, /customers/stats | DashboardPage.tsx (KPIs, graficas) | LISTO |
| 7 | Admin Productos | CRUD completo en CatalogController | AdminProductsPage.tsx | LISTO |
| 8 | Admin Pedidos | searchOrders, getOrderById, updateStatus | AdminOrdersPage.tsx | LISTO |
| 9 | Admin Clientes | searchUsers, getUserProfile, stats | AdminUsersPage.tsx | LISTO |
| 10 | Seguridad JWT | SecurityConfig + JWT Filter + roles | ProtectedRoute + rutas admin | LISTO |

---

### FUNCIONALIDADES POR AJUSTAR (3) — RESUELTAS

| # | Funcionalidad | Problema | Estado hoy |
|---|--------------|----------|-----------|
| 1 | Descuento es stub | Solo toast.info, no valida con backend | ✅ CheckoutPage valida con `POST /api/promotions/codes/validate` (promotion.service) |
| 2 | Tipo FormData incompleto | Interfaz tenia 5 campos, form 15+ | ✅ Interfaz actualizada en Checkoutform.tsx |
| 3 | Promociones sin contenido | Promotions.tsx no mostraba datos | ✅ `promotion.service.ts` + página y admin de promociones conectados |

---

### FUNCIONALIDADES POR IMPLEMENTAR (Para Fase Beta)

#### Fase 1: FUNCIONALIDAD CORE ✅ COMPLETADA

| # | Funcionalidad | Estado |
|---|--------------|--------|
| 1 | Seed data productos/categorias | ✅ 112 productos en data.sql |
| 2 | Conectar Checkout con backend | ✅ CheckoutPage usa useCart/useAuth |
| 3 | Corregir tipo FormData | ✅ Interfaz actualizada en Checkoutform.tsx |
| 4 | Conectar validacion de descuento | ✅ CheckoutPage valida con POST /api/promotions/codes/validate |
| 5 | Endpoint productos relacionados | ✅ GET /api/catalog/products/{id}/related |

#### Fase 2: FUNCIONALIDADES PENDIENTES - Backend ✅ COMPLETADA

| # | Funcionalidad | Estado |
|---|--------------|--------|
| 6 | Productos destacados con isFeatured | ✅ Campo isFeatured + query filtrada |
| 7 | Validar transiciones de estado | ✅ validateStatusTransition() con state machine |
| 8 | Historial de estado ordenes | ✅ OrderStatusHistory + getRealHistory |
| 9 | Carrito guest + migracion | ✅ getGuestCart + migrateGuestCart + endpoints |

#### Fase 2: FUNCIONALIDADES PENDIENTES - Frontend

| # | Funcionalidad | Estado |
|---|--------------|--------|
| 10 | Crear cart.service.ts | ⬜ pendiente (carrito aun es Context+localStorage) |
| 11 | Crear order.service.ts | ✅ order.service.ts (checkout crea orden) |
| 12 | Integrar carrito con backend | ⬜ pendiente (backend ya tiene guest cart + migrate) |
| 13 | Pagina Promociones | ✅ Promotions.tsx conectada con promotion.service |
| 14 | Admin Promociones | ✅ AdminPromotionsPage + hooks useAdminPromotions (CRUD+stats) |
| 15 | Admin Reportes | ✅ AdminReportsPage (ventas/clientes/promos con Recharts) |

#### Fase 3: MEJORAS - Post-Beta

| # | Funcionalidad | Estado |
|---|--------------|--------|
| 16 | Perfil de usuario | ⬜ pendiente (/profile; backend ya expone profile) |
| 17 | Seguimiento de pedidos | 🔄 pagina placeholder creada (/tracking); integrar con endpoint de tracking |
| 18 | Pagina 404 | ✅ NotFound.tsx en ruta `*` |
| 19 | Tests | 🔄 backend: 1 test contexto H2 en build; faltan tests de servicios y tests front (Vitest) |
| 20 | Swagger/OpenAPI | ⬜ pendiente (springdoc) |
| 21 | Refresh Token | ⬜ pendiente |
| 22 | Pasarela de pagos | ⬜ pendiente (Wompi/PayU/PSE) |

#### Fase 4: DEPLOY - Configuracion Produccion — COMPLETADA (Fase 1 staging, 05/10/2026)

| # | Funcionalidad | Estado |
|---|--------------|--------|
| 23 | Variables de entorno produccion | ✅ DB_URL, DB_USER, DB_PASSWORD, JWT_SECRET, PORT por env var |
| 24 | CORS para produccion | ✅ CORS_ALLOWED_ORIGINS (env var, orígenes exactos) |
| 25 | JWT Secret seguro | ✅ perfil prod fail-fast sin default (verifica application-prod.properties) |

---

## Estructura del Proyecto

```
EcomerceFullStack/
+-- astrosetupsback/           # Backend Spring Boot
│   +-- src/main/java/.../
│   │   +-- application/       # DTOs, interfaces, services
│   │   +-- domain/            # Modelos y repositorios
│   │   +-- infra/             # Controllers, config, security, exceptions
│   +-- src/main/resources/
│   │   +-- application.properties / application-prod.properties
│   │   +-- data.sql           # Seed dev (usuarios + productos)
│   +-- CONTEXT.md             # Contexto, trazabilidad y backlog del backend
│   +-- README.md              # Guia rapida del backend (run/env/deploy)
│   +-- pom.xml / Dockerfile
│
+-- astroSetupsFrontend/       # Frontend React
│   +-- src/
│   │   +-- api/               # API client
│   │   +-- components/        # Componentes UI
│   │   +-- hooks/             # Custom hooks
│   │   +-- interfaces/        # TypeScript types
│   │   +-- pages/             # Paginas/rutas
│   │   +-- services/          # Servicios API
│   │   +-- stores/            # Zustand stores
│   │   +-- styles/            # CSS
│   +-- README.md              # Contexto y backlog del frontend
│   +-- package.json / vercel.json
│
+-- docs/                      # DEPLOY-VERCEL.md (guia actual), DEPLOY-STAGING.md (hist.),
│                              # QA-GUIA-DE-PRUEBAS.md, qa-suite-a.ps1
+-- dumps/                     # Dump SQL (gitignored, datos sensibles)
+-- README.md                  # Este archivo - Registro maestro
```

## Credenciales de Prueba

> **[REDACTADO por seguridad — 05/10/2026]** Las credenciales de prueba ya no se
> documentan en repositorios. Para entorno de desarrollo, consultar
> `astrosetupsback/src/main/resources/data.sql` (usuarios seed locales).
> En staging/produccion se gestionan como secreto en la plataforma de despliegue
> (Vercel/TiDB; historicamente Railway) y se rotan tras cada import del dump.

## Como Ejecutar en Desarrollo

### Backend
```bash
# Requisitos: Java 21, MySQL 8
# 1. Crear base de datos
mysql -u root -p -e "CREATE DATABASE astrosetupsdb"

# 2. Configurar variables (o usar application.properties con credenciales root/root)

# 3. Ejecutar
cd astrosetupsback
./mvnw spring-boot:run
# Backend disponible en http://localhost:8081
```

### Frontend
```bash
# Requisitos: Node.js 18+
cd astroSetupsFrontend
npm install
npm run dev
# Frontend disponible en http://localhost:5173
```

## Documentacion por Componente

- **Global (este archivo)**: estado del app, auditoria, planes de despliegue y trazabilidad
- **Backend**: `astrosetupsback/README.md` (guia rapida) y `astrosetupsback/CONTEXT.md` (contexto, trazabilidad y backlog detallado)
- **Frontend**: `astroSetupsFrontend/README.md` (contexto, trazabilidad y backlog)
- **Despliegue vigente**: `docs/DEPLOY-VERCEL.md` · **Historico**: `docs/DEPLOY-STAGING.md`
- **QA**: `docs/QA-GUIA-DE-PRUEBAS.md` + `docs/qa-suite-a.ps1`

## Plan de Accion - Ajustes Criticos Beta (Septiembre 2026)

> Objetivo: Corregir funcionalidades criticas para despliegue beta con grupo cerrado.

### 🔴 Tareas Criticas (Flujo de compra)

| # | Tarea | Estado | Descripcion |
|---|-------|--------|-------------|
| 1 | Backend: Busqueda por nombre y categoryTypeId | ✅ Completado | Habilitar campos `query` y `categoryTypeId` en `findByFilters` (JPQL) |
| 2 | Backend: Endpoint CategoryTypes con categorías | ✅ Completado | Nuevo endpoint `/category-types/with-categories` para sidebar jerárquico |
| 3 | Backend: Corregir imagen en ProductDetailDTO | ✅ Completado | Renombrar `mainImageUrl` → `imageUrl` para compatibilidad con frontend |
| 4 | Frontend: Service y hook category types | ✅ Completado | Crear `categoryType.service.ts` y `useCategoryTypes.ts` |
| 5 | Frontend: Sidebar jerárquico | ✅ Completado | Reemplazar lista plana por CategoryType → Category colapsable |
| 6 | Frontend: Filtrado server-side en Products | ✅ Completado | Reemplazar client-side por `useProductSearch` |
| 7 | Frontend: Productos relacionados | ✅ Completado | Conectar `GET /api/catalog/products/{id}/related` |
| 8 | Frontend: Comprar ahora funcional | ✅ Completado | Agregar al carrito + navegar a `/checkout` |
| 9 | Frontend: Checkout crea orden | ✅ Completado | Conectar `POST /api/sales/orders` |
| 10 | Frontend: Checkout form UX | ✅ Completado | Labels claros, campos de pago condicionales |
| 11 | Frontend: Home cards con categoryTypeId | ✅ Completado | Usar `categoryTypeId` en links del home |

### ✅ Completado (Pre-existente)
- Seed data: 112 productos, 3 usuarios
- Productos relacionados endpoint backend
- Productos destacados (isFeatured)
- Transiciones de estado (state machine)
- Historial de ordenes
- Carrito guest + migracion

### 📋 Pendiente Post-Beta
- cart.service.ts / order.service.ts / Integrar carrito backend
- Pagina Promociones conectada
- Admin Promociones / Reportes
- Variables de entorno produccion
- CORS produccion
- Pagina Personalizar PC (placeholder)
- Pasarela de pagos (PayPal/PSE/Wompi)

---

## Plan de Despliegue - STAGING (Octubre 2026) — HISTORICO

> **⚠️ Estado:** completado y **retirado en noviembre 2026** (trial gratuito de Railway
> agotado; servicios y datos de staging dados de baja). Se conserva como referencia e
> historial de incidentes. **Vigente:** "Plan de Despliegue Beta 2 — Vercel + TiDB"
> (seccion siguiente) y `docs/DEPLOY-VERCEL.md`.
>
> **Objetivo original:** predespliegue para un grupo cerrado de interesados.
> **Arquitectura usada:** Vercel (React + TS) --HTTPS--> Railway (Docker + Spring Boot) --> Railway MySQL 8 (persistente).

### Reglas de trazabilidad

- Este README es el **registro maestro** del plan: cada fase se marca aqui al cerrarse.
- **Solo se avanza de fase con autorizacion explicita del dueño del proyecto.**
- Al terminar cada fase se entrega un **reporte final** con: lo implementado, verificaciones ejecutadas y **acciones que debe realizar el usuario en otra plataforma** (Railway, Vercel) o **pruebas manuales** pendientes.
- Alcance acordado: fixes de código + archivos de despliegue + guía. Fuera de alcance: Flyway, CI/CD, despliegue real en plataformas (se hace con la guía de la Fase 7).

### Decisiones tomadas

| Decision | Eleccion |
|----------|----------|
| Tests en build | Perfil `test` con H2 en memoria |
| Esquema en produccion | Perfil `prod` estricto (`ddl-auto=update`, `sql.init.mode=never`, `show-sql=false`) |
| Datos de staging | **Dump completo** de la DB local real (schema + datos) |
| Seguridad | Incluida en esta ronda (IDOR, SUPER_ADMIN, carrito) |

### Estado general de fases

| Fase | Nombre | Estado | Fecha cierre |
|------|--------|--------|--------------|
| 1 | Backend: configuracion externa y arranque | ✅ COMPLETADA | 05/10/2026 |
| 2 | Backend: tests con perfil H2 | ✅ COMPLETADA | 05/10/2026 |
| 3 | Backend: seguridad | ✅ COMPLETADA | 05/10/2026 |
| 4 | Backend: Docker | ✅ COMPLETADA | 05/10/2026 |
| 5 | Frontend: fixes y archivos de despliegue | ✅ COMPLETADA | 05/10/2026 |
| 6 | Datos: dump completo → Railway MySQL | ✅ COMPLETADA | 05/10/2026 |
| 7 | Guia de despliegue (documentacion) | ✅ COMPLETADA | 05/10/2026 |
| 8 | Verificacion final (checklist auditoria) | ✅ COMPLETADA | 05/10/2026 |

> Leyenda: ⬜ PENDIENTE · 🔄 EN CURSO · ✅ COMPLETADA · ⛔ BLOQUEADA

---

### Fase 1 — Backend: configuracion externa y arranque ✅ COMPLETADA (05/10/2026)

| # | Tarea | Archivos | Estado |
|---|-------|----------|--------|
| 1.1 | Env vars: `server.port=${PORT:8081}`, datasource `${DB_URL}/${DB_USER}/${DB_PASSWORD}`, `jwt.expiration-ms` | `astrosetupsback/src/main/resources/application.properties` | ✅ |
| 1.2 | Crear perfil `prod`: `ddl-auto=update`, `sql.init.mode=never`, `show-sql=false`, `jwt.secret=${JWT_SECRET}` sin default (fail-fast) | nuevo `application-prod.properties` | ✅ |
| 1.3 | CORS configurable: `cors.allowed-origins=${CORS_ALLOWED_ORIGINS:...}` leido en `CorsConfigurationSource` (mantiene `allowCredentials=true`) | `SecurityConfig.java` | ✅ |
| 1.4 | **`GET /api/health`** → `{"status":"UP"}` con `permitAll` (sin actuator; health check de Railway) | nuevo `HealthController.java` + `SecurityConfig.java` | ✅ |
| 1.5 | Logs: `log.error` en `GlobalExceptionHandler`, quitar `ex.getMessage()` crudo del 500 | `GlobalExceptionHandler.java` | ✅ |
| 1.6 | 401/403 con cuerpo JSON (AuthenticationEntryPoint / AccessDeniedHandler) | `SecurityConfig.java` | ✅ |

**Aceptacion:** `SPRING_PROFILES_ACTIVE=prod` + env vars → arranca y `curl /api/health` responde `{"status":"UP"}`.

**Verificaciones ejecutadas (05/10/2026):**
- `mvn compile` y `mvn package -DskipTests` → BUILD SUCCESS.
- Fail-fast prod: arranque con `SPRING_PROFILES_ACTIVE=prod` SIN `JWT_SECRET` → falla con `Could not resolve placeholder 'JWT_SECRET'` (correcto).
- Perfil dev: `GET /api/health` → `{"status":"UP"}` (200).
- Perfil prod con env vars (`PORT=8099`, `JWT_SECRET`, `CORS_ALLOWED_ORIGINS=https://astrosetups.vercel.app`) → arranca en el puerto indicado, health OK.
- CORS: origen permitido → 200 + `Access-Control-Allow-Origin` correcto; origen no permitido → 403 `Invalid CORS request`.
- Prod NO ejecuta `data.sql` (`sql.init.mode=never`) y `show-sql` desactivado (verificado en logs).
- 401 sin token → body JSON `{"success":false,...,"errorCode":"UNAUTHORIZED"}` (Content-Type application/json).
- 404 de ruta inexistente manejado por `NoResourceFoundException` con formato `ErrorResponseDTO` (rutas no autenticadas responden 401 por seguridad).

---

### Fase 2 — Backend: tests con perfil H2 ✅ COMPLETADA (05/10/2026)

| # | Tarea | Archivos | Estado |
|---|-------|----------|--------|
| 2.1 | Dependencia `com.h2database:h2` scope test | `pom.xml` | ✅ |
| 2.2 | `application-test.properties`: H2 in-memoria (`MODE=MySQL`), `sql.init.mode=never`, `ddl-auto=create-drop` | nuevo `src/test/resources/application-test.properties` | ✅ |
| 2.3 | `@ActiveProfiles("test")` en el test | `AstrosetupsBackendApplicationTests.java` | ✅ |
| 2.4 | Verificar `mvn clean package` completo pasa | — | ✅ |

**Aceptacion:** `mvn clean package` → BUILD SUCCESS con `target/surefire-reports/` generado.

**Verificaciones ejecutadas (05/10/2026):**
- `mvn clean package` → **BUILD SUCCESS** (01:10 min).
- `Tests run: 1, Failures: 0, Errors: 0, Skipped: 0`.
- Log confirma `The following 1 profile is active: "test"` y conexion H2 (`jdbc:h2:mem:testdb`), sin tocar MySQL.
- `data.sql` NO se ejecuta en tests (`spring.sql.init.mode=never`).
- Reportes generados: `target/surefire-reports/` (xml + txt).
- El build ahora **puede correr en el contenedor de Railway sin MySQL disponible en tiempo de build**.

---

### Fase 3 — Backend: seguridad ✅ COMPLETADA (05/10/2026)

| # | Tarea | Archivos | Estado |
|---|-------|----------|--------|
| 3.1 | SUPER_ADMIN operativo: `isAdmin()` incluye `ROLE_SUPER_ADMIN` + reglas `hasAnyRole("ADMIN","SUPER_ADMIN")` en las 12 rutas admin | `SecurityUtils.java`, `SecurityConfig.java` | ✅ |
| 3.2 | IDOR escritura: verificado que `CustomerController` ya aplica `checkOwnership` + nullado de `status/verified` para no-admins (la auditoria original sobreestimo el hueco); con fix de 3.1 SUPER_ADMIN queda habilitado | `CustomerController.java` (sin cambios) | ✅ |
| 3.3 | IDOR lectura: `checkOwnership` añadido a `GET /promotions/codes/history/{userId}`; `GET /shipping/addresses` restringido a ADMIN/SUPER_ADMIN (Sales/Shipping ya tenian checks) | `PromotionController.java`, `SecurityConfig.java` | ✅ |
| 3.4 | Carrito: fuera `permitAll` total; ahora solo `GET /cart/guest/**` y `POST /cart/items` son publicos, con verificacion de claim de usuario; `GET /cart/{userId}`, `summary`, `migrate`, `PATCH/DELETE /items` exigen dueño o admin (nuevo `getCartItemOwnerUserId` en SalesService) | `SecurityConfig.java`, `CartController.java`, `SalesService.java`, `SalesServiceImpl.java` | ✅ |
| 3.5 | Credenciales redactadas en README raiz y README del frontend | `README.md`, `astroSetupsFrontend/README.md` | ✅ |
| + | Bonus: handler `HttpMessageNotReadableException` → 400 (body ausente/ilegible ya no da 500) | `GlobalExceptionHandler.java` | ✅ |

**Aceptacion:** con token de `cliente@...`, `PUT /api/customers/{otroId}` → 403; con `superadmin@...` el panel admin → 200.

**Verificaciones ejecutadas (05/10/2026):**
- `mvn clean package` → BUILD SUCCESS, 1 test OK.
- Pruebas end-to-end contra MySQL local con 3 tokens (CLIENT id=9, SUPER_ADMIN, sin token), **13/13 correctas**:

| Prueba | Esperado | Resultado |
|--------|----------|-----------|
| CLIENT `GET /cart/{propio}` | 200 | 200 ✅ |
| CLIENT `GET /cart/{ajeno}` | 403 | 403 ✅ |
| CLIENT `GET promotions/history/{propio}` | 200 | 200 ✅ |
| CLIENT `GET promotions/history/{ajeno}` | 403 | 403 ✅ |
| CLIENT `PUT /customers/{otro}` | 403 | 403 ✅ |
| CLIENT `PUT /customers/{propio}` | 200 | 200 ✅ |
| SUPER `PUT /customers/{otro}` | 200 | 200 ✅ |
| SUPER `GET /cart/{cliente}` | 200 | 200 ✅ |
| CLIENT `GET /customers/stats` | 403 | 403 ✅ |
| SUPER `GET /customers/stats` | 200 | 200 ✅ |
| Publico `GET /cart/guest/{id}` | 200 | 200 ✅ |
| Sin token `GET /cart/{userId}` | 401 | 401 ✅ |
| `PUT /customers` sin body | 400 | 400 ✅ |

**Nota:** durante la prueba se cerro un `spring-boot:run` local (PID 23652) que estaba escuchando en el 8081 — era el dev server de la prueba manual de la Fase 1.

---

### Fase 4 — Backend: Docker ✅ COMPLETADA (05/10/2026)

| # | Tarea | Archivos | Estado |
|---|-------|----------|--------|
| 4.1 | `Dockerfile` multi-stage: `maven:3.9.9-eclipse-temurin-21` (capa de dependencias con `dependency:go-offline` + `mvn package` con tests H2) → `eclipse-temurin:21-jre` (usuario no-root, `JAVA_OPTS` configurable, ENTRYPOINT) | nuevo `astrosetupsback/Dockerfile` | ✅ |
| 4.2 | `.dockerignore`: `target/`, `.idea/`, `.git/`, docs internas, mvnw | nuevo `astrosetupsback/.dockerignore` | ✅ |
| 4.3 | `<finalName>app</finalName>` → `target/app.jar` (57.6 MB) estable para el COPY del Dockerfile | `pom.xml` | ✅ |

**Aceptacion:** `docker build -t astroback .` y `docker run -e PORT=8081 ...` arranca.

**Verificaciones ejecutadas (05/10/2026):**
- `mvn package` → genera `target/app.jar` ✓
- `docker build -t astrosetupsback:staging .` → **EXIT=0** (los tests H2 corrieron dentro del stage de build, sin MySQL ni red) ✓
- Contenedor dev (DB local via `host.docker.internal`): `GET /api/health` → `{"status":"UP"}` ✓
- Contenedor **prod** (`SPRING_PROFILES_ACTIVE=prod` + `DB_URL` + `JWT_SECRET` + `CORS_ALLOWED_ORIGINS=https://astrosetups.vercel.app`): health OK, preflight CORS → `Access-Control-Allow-Origin: https://astrosetups.vercel.app` ✓
- Contenedor prod NO ejecuta `data.sql` ✓
- Contenedores de prueba limpiados (sin residuos) ✓

**Comandos de referencia:**
```bash
# Build local
cd astrosetupsback && docker build -t astrosetupsback:staging .

# Ejecucion estilo Railway
docker run -p 8081:8081 \
  -e PORT=8081 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e "DB_URL=jdbc:mysql://<HOST>:3306/<DB>?useSSL=false&allowPublicKeyRetrieval=true" \
  -e DB_USER=<USER> -e DB_PASSWORD=<PASS> \
  -e "JWT_SECRET=<clave-32+>" \
  -e "CORS_ALLOWED_ORIGINS=https://<app>.vercel.app" \
  astrosetupsback:staging
```

---

### Fase 5 — Frontend: fixes y archivos de despliegue ✅ COMPLETADA (05/10/2026)

| # | Tarea | Archivos | Estado |
|---|-------|----------|--------|
| 5.1 | `vercel.json` con SPA rewrite `/(.*) → /index.html` (refresh/compartir enlaces sin 404) | nuevo `astroSetupsFrontend/vercel.json` | ✅ |
| 5.2 | `apiConfig.ts`: sin fallback a localhost — si falta `VITE_API_BASE_URL` lanza error visible; sin `console.log` | `src/api/apiConfig.ts` | ✅ |
| 5.3 | `.env` y `tsconfig.tsbuildinfo` fuera del repo (`git rm --cached`, cambios staged); nuevo `.env.example`; `.gitignore` con excepción `!.env.example` | `.gitignore`, nuevo `.env.example` | ✅ |
| 5.4 | Bug búsqueda: `SearchBar` navegaba a `/products` (ruta inexistente) → `/catalog?q=`; sin referencias residuales a `/products` | `SearchBar.tsx` | ✅ |
| 5.5 | Ruta 404: `<Route path="*">` + página `NotFound` con links a inicio/catálogo | `App.tsx`, nuevo `src/pages/NotFound.tsx` | ✅ |
| 5.6 | `placeholder.png` creado (600×600, "Sin imagen") — referenciado en 4 componentes | nuevo `public/assets/products/placeholder.png` | ✅ |
| 5.7 | Título `index.html` → "Astro Setups \| Tienda de hardware y componentes de PC" | `index.html` | ✅ |
| 5.8 | tsconfig solution-style: `tsconfig.json` con references; `tsconfig.app.json` con alias `@/*`; tsbuildinfo ahora va a `node_modules/.tmp/` | tsconfigs | ✅ |
| 5.9 | Error handling: toast en 403/500/sin red (`client.ts`); `isError` + `ErrorState` en Promotions, AdminOrders, AdminUsers, Dashboard; quitado "Error silently handled" | `client.ts` + 4 páginas | ✅ |

**Aceptacion:** `npm run lint && npm run build` sin errores; sin `localhost` en runtime de `src/`.

**Verificaciones ejecutadas (05/10/2026):**
- `npx tsc -b` → EXIT=0 (aplicando `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`) ✓
- `npm run lint` → **0 errores** (2 warnings preexistentes de fast-refresh, no bloqueantes) ✓
- `npm run build` → **EXIT=0** (2836 módulos, `dist/` generado; warning preexistente de chunk >500 kB) ✓
- Grep `localhost|127.0.0.1` en `src/` → solo un comentario, **cero en runtime** ✓
- Sin referencias a ruta `/products` en el código ✓

**Nota de configuracion TS:** `verbatimModuleSyntax` y `erasableSyntaxOnly` quedaron en `false` en `tsconfig.app.json` — activarlos exige migrar ~40 archivos a `import type` (pendiente post-staging, no bloquea).

---

### Fase 6 — Datos: dump completo → Railway MySQL ✅ COMPLETADA (05/10/2026)

| # | Tarea | Responsable | Estado |
|---|-------|-------------|--------|
| 6.1 | Extraer dump de la DB local: `mysqldump --single-transaction --routines --triggers` → `dumps/astrosetups_full_dump.sql` (carpeta `dumps/` agregada al `.gitignore` raiz — **datos sensibles, nunca commitear**) | Agente (ejecucion local) | ✅ |
| 6.2 | Verificar contenido del dump | Agente | ✅ |
| 6.3 | Crear MySQL en Railway con **Volume** persistente + TCP Proxy (Public Networking) | **Usuario (Railway)** | ✅ Volumen con mount path `/var/lib/mysql`; DB `railway`; TCP Proxy `tokaido.proxy.rlwy.net:35307` |
| 6.4 | Importar dump ANTES del primer arranque del backend | Agente | ✅ Import via `dumps/import-staging.ps1` |
| 6.5 | Rotar passwords de admin en la DB de staging (`admin@`, `superadmin@`) | Agente | ✅ `dumps/rotate-passwords.sql` + verificacion bcrypt MATCH |
| 6.6 | Confirmar que en `prod` NO se ejecuta `data.sql` (`sql.init.mode=never`) | Agente (validacion) | ✅ verificado en Fases 1 y 4 |

**Verificaciones del dump (05/10/2026):**
- Archivo: `dumps/astrosetups_full_dump.sql` (90 KB, 559 lineas) — generado con `mysqldump 8.0.39`.
- Estructura: **17 `CREATE TABLE` + 17 `DROP TABLE IF EXISTS` + 25 foreign keys**, sin `CREATE DATABASE`/`USE` (importable directo a la DB creada por Railway).
- Codificacion: `SET NAMES utf8mb4`, **0 caracteres corruptos (U+FFFD)**; acentos verificados OK contra la DB origen.

**Verificaciones del import a staging (05/10/2026):**
- Conteos **identicos local ↔ staging**: `users 21 · products 114 · categories 24 · orders 26 · order_items 40 · promo_codes 6 · cities 10 · postal_codes 12`.
- Admins presentes y ACTIVE: `user_id 7 admin@` (ADMIN), `8 superadmin@` (SUPER_ADMIN), `9 cliente@` (CLIENT).
- Nota: Railway desplego **MySQL 9.7.2** (no 8.0) — el dump de mysqldump 8.0.39 importo sin errores; `utf8mb4_0900_ai_ci` y sintaxis compatibles.
- 6.5: passwords de staging rotadas → **`admin@astrosetups.com` = `AdminStg2026!`**, **`superadmin@astrosetups.com` = `SuperStg2026!`** (hashes `$2b$10$` verificados con `bcrypt.checkpw` = MATCH).
- El backend en Railway se conectara por host **interno** `mysql.railway.internal:3306` (no requiere TCP Proxy) — el proxy publico fue solo para el import y **puede desactivarse**.

---

### Fase 7 — Guia de despliegue (documentacion) ✅ COMPLETADA (05/10/2026)

| # | Tarea | Archivos | Estado |
|---|-------|----------|--------|
| 7.1 | Crear `docs/DEPLOY-STAGING.md`: pasos Railway (MySQL + Backend), pasos Vercel (preset Vite, env vars), checklist post-despliegue | `docs/DEPLOY-STAGING.md` | ✅ |

**Contenido de la guia (`docs/DEPLOY-STAGING.md`):**
1. Paso 0 — MySQL en Railway: estado post-Fase 6 (host interno, volumen, credenciales de staging, nota de mismo proyecto/environment).
2. Paso 1 — Frontend Vercel: Root Directory `astroSetupsFrontend`, preset Vite, build/output default, `VITE_API_BASE_URL` temporal.
3. Paso 2 — Backend Railway: Root Directory `./astrosetupsback`, Dockerfile auto-deteccion, 6 env vars (`SPRING_PROFILES_ACTIVE=prod`, `DB_URL` jdbc con `allowPublicKeyRetrieval`, `DB_USER`, `DB_PASSWORD`, `CORS_ALLOWED_ORIGINS`, `JWT_SECRET` generado), Public Domain **HTTP** (no TCP Proxy), healthcheck `/api/health`.
4. Paso 3 — Cierre del circuito: `VITE_API_BASE_URL` real + Redeploy (Vite inyecta vars en build time).
5. Checklist post-despliegue (7 pruebas: health, login admin, catalogo, refresh SPA, 404, 403 rol cliente, checkout) + tabla de solucion de problemas (8 casos).

---

### Fase 8 — Verificacion final (checklist auditoria) ✅ COMPLETADA (05/10/2026)

| # | Verificacion | Estado |
|---|--------------|--------|
| 8.1 | `mvn clean package` → SUCCESS (tests H2) | ✅ BUILD SUCCESS, 1 test (H2) OK |
| 8.2 | `java -jar target/app.jar` con env vars → `curl localhost:8081/api/health` = `{"status":"UP"}` | ✅ UP en 15s con perfil `prod` + `JWT_SECRET` + `CORS_ALLOWED_ORIGINS`; **fail-fast** sin `JWT_SECRET` verificado (`Could not resolve placeholder`) |
| 8.3 | `npm run lint && npm run build` → 0 errores | ✅ lint **0 errores** (2 warnings preexistentes de `react-refresh`), build OK (25s) |
| 8.4 | Grep: sin `localhost` en runtime del front, sin secrets en el repo | ✅ `localhost` solo en comentario (`apiConfig.ts:4`); password de Railway **no** en el repo; `.env` y `dumps/` sin trackear; solo `data.sql` (seed dev, intencional) |
| 8.5 | (Opcional) `docker build` local del backend | ✅ EXIT=0 con el Dockerfile **sin `EXPOSE`** (fix de target port) |
| 8.6 | Smoke test manual con QA: `docs/QA-GUIA-DE-PRUEBAS.md` | ⬜ manual — pendiente del usuario/grupo |

**Estado del despliegue staging (05/10/2026) — VERIFICADO POR API:**
- Frontend Vercel: `https://ecomerce-full-stack.vercel.app` (SPA rewrite OK).
- Backend Railway: `https://ecomercefullstack-production-7db9.up.railway.app` → `GET /api/health` = 200 `{"status":"UP"}`; preflight CORS devuelve `access-control-allow-origin: https://ecomerce-full-stack.vercel.app`; `GET /api/catalog/products` = 200 con datos del dump.
- MySQL Railway: volume `/var/lib/mysql`, dump importado (21 users / 114 products / 26 orders), passwords de admin rotadas (`AdminStg2026!` / `SuperStg2026!`).
- **Incidentes resueltos y documentados en `docs/DEPLOY-STAGING.md`:** (1) target port del dominio ≠ 8080 → `x-railway-fallback` 502/404 (fix: quitar `EXPOSE 8081` + target port 8080); (2) al regenerar el dominio cambió el hostname (sufijo `-7db9`) → `VITE_API_BASE_URL` actualizada; (3) `DB_URL` debe ser `jdbc:mysql://` (no `mysql://` de Railway); (4) 401 de admin = password rotada de staging.
- **Pendiente único:** 8.6 (smoke test manual con `docs/QA-GUIA-DE-PRUEBAS.md`).

---

### Orden de ejecucion y dependencias

```
Fase 1 (config) ──┬→ Fase 2 (tests) ──→ Fase 4 (Docker) ──┐
Fase 3 (seguridad)┘                                        ├→ Fase 8 (verificacion)
Fase 5 (front) ─────────────────────────────────────────────┤
Fase 6 (dump) ── paralelo (requiere MySQL en Railway) ------┤
Fase 7 (guia) ── al final, refleja el estado real ──────────┘
```

### Riesgos abiertos a vigilar

- **Formato de `DB_URL`**: Railway entrega `mysql://...`; se necesita `jdbc:mysql://...?useSSL=false&allowPublicKeyRetrieval=true` (documentado en Fase 7).
- **CORS + `withCredentials:true`**: exige origenes exactos (env var con lista, no wildcard).
- **Formulario de contacto** (`Contact.tsx` solo hace `console.log`): fuera de alcance, validar con el grupo.

---

## Plan de Despliegue - BETA 2: Vercel + TiDB (Noviembre 2026) — VIGENTE

> **Objetivo:** reconectar la app para una nueva ronda de pruebas con el grupo cerrado
> **sin costo de infraestructura y sin límite de tiempo**, tras el cierre del trial de
> Railway (nov 2026). Aprobado por el dueño del proyecto: **17/11/2026**.
> Guía operativa paso a paso: **`docs/DEPLOY-VERCEL.md`**.

### Contexto de la decision

- El trial gratuito de Railway se agotó y el tráfico del primer beta (grupo cerrado,
  ~10 personas, ≤3 simultáneas) no justificaba pagar hosting.
- La beta sirvió para recopilar feedback de flujo/funcionalidad; ahora toca corregirlo,
  y eso puede tomar tiempo → se requiere infraestructura **gratis mientras tanto**.
- Requisitos explícitos del dueño: gratis indefinidamente; puede dormir por inactividad
  mientras pueda reactivarse; pruebas de flujo (no de concurrencia), 15 días de uso.

### Decisiones aprobadas

| Dimension | Eleccion | Por que |
|---|---|---|
| Frontend | **Vercel Hobby ($0)** (proyecto existente) | ya desplegado; SPA estática, sin costos de compute |
| Backend | **Vercel Hobby ($0) vía `Dockerfile` (Container runtime)** | una sola plataforma; Vercel corre Spring Boot en contenedores desde junio 2026 (beta en todos los planes); scale-to-zero automático (despierta solo con la 1ª petición) |
| Base de datos | **TiDB Cloud Starter** (MySQL-compatible, gratis sin tarjeta: 5 GiB + 50M ops/mes, sin caducidad) | cero cambios de código (driver/dialecto/dump MySQL actuales); PlanetScale no tiene plan gratis (2024) y Aiven retiró su MySQL gratis (11/2026) |
| Datos | dump `dumps/astrosetups_full_dump.sql` del repo | los datos del beta en Railway ya no son accesibles |
| Postgres | **Migración post-beta** (fase pública) | el código lo permite (JPQL puro, sin nativeQuery/columnDefinition); migrar ahora retrasa la beta y los datos del beta son prescindibles |

### Arquitectura objetivo

```
https://<front>.vercel.app  (React/Vite, root astroSetupsFrontend)
        │ HTTPS
        ▼
https://<back>.vercel.app   (Spring Boot contenedor, root astrosetupsback, preset Container)
        │ internet (TLS)
        ▼
gateway.<region>.prod.aws.tidbcloud.com:4000 / astrosetupsdb  (TiDB Starter)
```

### Fases del plan

| Fase | Nombre | Responsable | Estado |
|------|--------|-------------|--------|
| 1 | Contexto: READMEs + CONTEXT.md actualizados | Agente | ✅ COMPLETADA (17/11/2026) |
| 2 | Repo: `vercel.json` (container) back, `dumps/import-tidb.ps1`, `.env.example`, `docs/DEPLOY-VERCEL.md` | Agente | ✅ COMPLETADA (17/11/2026) |
| 3 | Verificación: `mvn clean package` + `npm run lint && npm run build` + `docker build` + arranque de prueba | Agente | ✅ COMPLETADA (17/11/2026): backend BUILD SUCCESS (1 test H2), front lint 0 errores / build OK (21 s), imagen Docker OK, contenedor arranca con env vars `prod` y falla limpio (exit 1) sin DB (esperado) |
| 4 | TiDB: cuenta + instancia Starter + schema + import dump + conteos | **Usuario + Agente** | ✅ COMPLETADA (17/11/2026): instancia Starter AWS us-east-1, dump importado, conteos exactos (21/114/24/26/40/6/10/12), usuarios admin/superadmin/cliente ACTIVE |
| 5 | Vercel: proyecto backend (root `astrosetupsback`, Container) + 8 env vars | **Usuario** (guiado) | ⬜ pendiente |
| 6 | Vercel: actualizar `VITE_API_BASE_URL` + Redeploy del front | **Usuario** (guiado) | ⬜ pendiente |
| 7 | Smoke test: health, login, catálogo, checkout (checklist QA) | Agente/Usuario | ⬜ pendiente |
| 8 | Operación beta: monitoreo de Usage en Vercel durante los 15 días | Usuario | ⬜ pendiente |

> Reglas de trazabilidad: este README es el registro maestro (cada fase se marca aquí
> al cerrarse); solo se avanza de fase con autorización explícita del dueño; al cerrar
> cada fase se entrega reporte con lo implementado, verificaciones y acciones manuales.

### Variables de entorno

**Frontend (Vercel, build time — cambiarla exige Redeploy):**

| Name | Value |
|------|-------|
| `VITE_API_BASE_URL` | `https://<back>.vercel.app/api` |
| `VITE_APP_NAME` | `ASTRO SETUPS` (opcional) |

**Backend (Vercel → Settings → Environment Variables, entorno Production):**

| Name | Value |
|------|-------|
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `PORT` | `8081` (Vercel enruta a `$PORT`; la imagen corre como usuario no-root y no enlaza el puerto 80) |
| `DB_URL` | `jdbc:mysql://<host-tidb>:4000/astrosetupsdb?sslMode=VERIFY_IDENTITY&enabledTLSProtocols=TLSv1.2,TLSv1.3` |
| `DB_USER` | `<prefijo>.root` (exactamente como lo da TiDB, con prefijo) |
| `DB_PASSWORD` | generado por TiDB |
| `JWT_SECRET` | `[guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N')` |
| `CORS_ALLOWED_ORIGINS` | `https://ecomerce-full-stack.vercel.app` (sin barra final) |
| `JAVA_OPTS` | `-XX:MaxRAMPercentage=60` (evita heap mínimo por defecto → OOM en arranque) |

### Orden de despliegue (dependencia cruzada front <-> back)

1. TiDB listo + dump importado (Fase 4).
2. Front en Vercel con `VITE_API_BASE_URL` temporal → obtiene dominio.
3. Back en Vercel con `CORS_ALLOWED_ORIGINS` = dominio del front (Fase 5).
4. Front: variable real + **Redeploy** (Fase 6) → app funcional.
5. `curl https://<back>.vercel.app/api/health` → `{"status":"UP"}`.

### Operación y límites a vigilar (Vercel Hobby, gratis)

- **Nunca hay cobro:** al exceder los límites mensuales (4 CPU-hrs activas,
  360 GB-hrs de memoria, 1M peticiones) la app se **pausa** (503) hasta el reset de
  30 días; Hobby no permite comprar usage extra.
- Monitorear en Vercel → **Usage** durante la beta. Con 10 testers/15 días el margen es amplio.
- **No usar keep-alive agresivo** (pings frecuentes): cada arranque de JVM consume CPU
  activa del límite. El wake es automático en la primera petición (~segundos).
- Sleep automático: ~5 min de inactividad (producción) → ninguna acción manual requerida.
- Restricción Hobby: "uso personal/no comercial" (beta cerrada sin cobros: riesgo aceptado).
- Runtime de contenedores de Vercel en **beta**: posible inestabilidad → Plan B abajo.

### Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Collations `utf8mb4_0900_ai_ci`/`ENGINE=` del dump rechazadas por TiDB | probables de aceptar; fallback: normalizar collation y reimportar |
| OOM en arranque del contenedor | `JAVA_OPTS=-XX:MaxRAMPercentage=60`; revisar logs del 1er deploy |
| Pausa por límite Hobby | monitorear Usage; si ocurre: migrar backend a Plan B |
| Runtime de contenedores beta | Plan B Render (mismo Dockerfile, mismas env vars) |
| Cold start Java para el grupo | aceptado (segundos, auto-wake) |

### Plan B (respaldo): backend en Render free

Si el runtime de contenedores de Vercel falla o se agotan los límites:
proyecto Render → Root Directory `astrosetupsback`, Dockerfile detectado,
mismas variables (`PORT` aquí la inyecta Render), sleep a los 15 min (wake
automático), 750 hrs/mes gratis. Pasos detallados en `docs/DEPLOY-VERCEL.md` (Anexo A).

### Post-beta (siguiente etapa)

1. Consolidar y corregir el **feedback del grupo cerrado** (lista por definir).
2. **Migración a PostgreSQL** (Neon/Supabase/RDS) para la fase pública:
   driver + dialecto + conversión del dump; sin bloqueos de código.
3. Backlog completo: ver `astrosetupsback/CONTEXT.md` §7 y READMEs por componente.
