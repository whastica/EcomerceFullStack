# Astro Setups - E-commerce Full Stack

> Plataforma e-commerce para tienda de productos de hardware/componentes de PC

## Stack Tecnologico

| Capa | Tecnologia | Version |
|------|-----------|---------|
| Backend | Spring Boot + Java | 3.4.5 / 21 |
| Frontend | React + TypeScript | 19.1 / 5.8 |
| Build | Vite | 6.3 |
| Estilos | Tailwind CSS | 4.1 |
| Base de datos | MySQL | 8.0 |
| Seguridad | Spring Security + JWT | jjwt 0.12.6 |
| State Mgmt | Zustand + React Query | 5.x |

## Arquitectura

```
Frontend (React/Vercel) <--HTTPS/REST--> Backend (Spring Boot/Railway) --> MySQL (Railway)
```

## Auditoria del Proyecto (Estado: Septiembre 2025)

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

### FUNCIONALIDADES POR AJUSTAR (3)

| # | Funcionalidad | Problema | Ubicacion | Ajuste |
|---|--------------|----------|-----------|--------|
| 1 | Descuento es stub | Solo toast.info, no valida con backend | CartPage.tsx:31-38 | Conectar con POST /api/promotions/codes/validate |
| 2 | Tipo FormData incompleto | Interfaz tiene 5 campos, form tiene 15+ | Checkoutform.tsx:267-272 | Actualizar interfaz TypeScript |
| 3 | Promociones sin contenido | Promotions.tsx existe pero no muestra datos | Promotions.tsx | Conectar con backend de promociones |

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

#### Fase 2: FUNCIONALIDADES PENDIENTES - Frontend (PENDIENTE)

| # | Funcionalidad | Que hacer |
|---|--------------|-----------|
| 10 | Crear cart.service.ts | Servicio API para carrito backend |
| 11 | Crear order.service.ts | Servicio API para ordenes backend |
| 12 | Integrar carrito con backend | Modificar Cart.tsx para usar backend |
| 13 | Pagina Promociones | Mostrar promociones activas desde backend |
| 14 | Admin Promociones | CRUD de codigos promocionales en admin |
| 15 | Admin Reportes | Pagina de reportes de ventas |

#### Fase 3: MEJORAS - Post-Beta

| # | Funcionalidad | Que hacer |
|---|--------------|-----------|
| 16 | Perfil de usuario | Pagina /profile para clientes |
| 17 | Seguimiento de pedidos | Pagina de tracking para clientes |
| 18 | Pagina 404 | Pagina de ruta no encontrada |
| 19 | Tests | Tests unitarios e integracion (backend y frontend) |
| 20 | Swagger/OpenAPI | Documentacion de API |
| 21 | Refresh Token | Sesion larga con refresh automatico |
| 22 | Pasarela de pagos | Wompi/PayU para pagos Colombia |

#### Fase 4: DEPLOY - Configuracion Produccion

| # | Funcionalidad | Que hacer |
|---|--------------|-----------|
| 23 | Variables de entorno produccion | Mover config de application.properties a variables de entorno (DB_URL, JWT_SECRET, etc.) |
| 24 | CORS para produccion | Agregar dominio de Vercel a SecurityConfig.java |
| 25 | JWT Secret seguro | Eliminar fallback hardcoded, usar solo variable de entorno |

---

## Estructura del Proyecto

```
EcomerceFullStack/
+-- astrosetupsback/           # Backend Spring Boot
�   +-- src/main/java/.../
�   �   +-- application/       # DTOs, interfaces, services
�   �   +-- domain/            # Modelos y repositorios
�   �   +-- infra/             # Controllers, config, security, exceptions
�   +-- src/main/resources/
�   �   +-- application.properties
�   �   +-- data.sql           # Seed de usuarios
�   +-- CONTEXT.md             # Contexto y backlog del backend
�   +-- pom.xml
�
+-- astroSetupsFrontend/       # Frontend React
�   +-- src/
�   �   +-- api/               # API client
�   �   +-- components/        # Componentes UI
�   �   +-- hooks/             # Custom hooks
�   �   +-- interfaces/        # TypeScript types
�   �   +-- pages/             # Paginas/rutas
�   �   +-- services/          # Servicios API
�   �   +-- stores/            # Zustand stores
�   �   +-- styles/            # CSS
�   +-- README.md              # Contexto y backlog del frontend
�   +-- package.json
�
+-- README.md                  # Este archivo - Auditoria general
```

## Credenciales de Prueba

> **[REDACTADO por seguridad — 05/10/2026]** Las credenciales de prueba ya no se
> documentan en repositorios publicos. Para entorno de desarrollo, consultar
> `astrosetupsback/src/main/resources/data.sql` (usuarios seed locales).
> En staging/produccion las credenciales se gestionan como secreto en Railway
> y se rotan tras cada import del dump.

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

- **Backend**: Ver `astrosetupsback/CONTEXT.md` para contexto detallado y backlog de implementacion
- **Frontend**: Ver `astroSetupsFrontend/README.md` para contexto detallado y backlog de implementacion

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

## Plan de Despliegue - STAGING (Octubre 2026)

> **Objetivo:** Predespliegue firme para un grupo cerrado de interesados (clientes, desarrolladores).
> **Arquitectura:** Vercel (React + TS) --HTTPS--> Railway (Docker + Spring Boot) --> Railway MySQL 8 (persistente).

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
