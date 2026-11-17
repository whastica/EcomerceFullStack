# Astro Setups Backend - Contexto del Proyecto

> **Documento de contexto y trazabilidad del backend.** Actualizado: **17/11/2026**.
> Público: el agente de IA (contexto de trabajo) y el dueño del proyecto (historial).
> El registro maestro de las fases de despliegue está en `README.md` de la raíz.

## 1. Descripción del Negocio

Astro Setups es una tienda en línea de hardware/componentes de PC bajo modelo de
intermediación (sin stock propio): conecta clientes con proveedores. La plataforma
soporta catálogo con filtros y specs, compra rápida con o sin cuenta, códigos
promocionales, seguimiento de pedidos y gestión administrativa (catálogo, clientes,
pedidos, promociones, envíos).

## 2. Stack Técnico

| Capa | Tecnología | Detalle |
|------|-----------|---------|
| Framework | Spring Boot 3.4.5 | Java 21, Maven |
| ORM | Spring Data JPA | Hibernate, `ddl-auto=update` |
| Base de datos (desarrollo) | MySQL 8.0 local | `astrosetupsdb` (localhost:3306) |
| Base de datos (beta) | **TiDB Cloud Starter** | MySQL-compatible (puerto 4000, TLS); ver §6 |
| Seguridad | Spring Security + JWT | jjwt 0.12.6, sesiones stateless |
| Build/Deploy | Maven + Docker | `Dockerfile` multi-stage Maven→JRE 21 |
| Hosting objetivo | **Vercel (contenedores)** | front + back en Vercel, ver §6 y `docs/DEPLOY-VERCEL.md` |
| Hosting anterior (retirado) | Railway | trial agotado; servicios dados de baja en nov 2026 |
| Lombok | Reducción de boilerplate | builder/getters en entidades y DTOs |

**Puertos:** backend local **8081** (en despliegue: `PORT` inyectada por la plataforma,
`server.port=${PORT:8081}`); health check público: `GET /api/health` → `{"status":"UP"}`.

## 3. Estructura del Proyecto (Arquitectura Hexagonal)

```
src/main/java/com/whalensoft/astrosetupsback/
├── application/
│   ├── common/              # Mensajes de error, constantes
│   ├── dto/                 # DTOs por contexto: auth, catalog (Product/Category),
│   │                        # customer (Users/Address/Stats), promotion (code/validation/bulk),
│   │                        # sales (cart/checkout/orders/search), shipping (address/cost/
│   │                        # location/preferences/stats/zone), common (PageResponseDTO)
│   ├── interfaces/          # Interfaces de servicios
│   └── services/            # Implementaciones (6)
├── domain/
│   ├── model/               # 22 entidades + enums (builder Lombok)
│   └── repository/          # 11 interfaces de repositorio
└── infra/
    ├── adapters/            # Adaptadores repository (11)
    ├── config/              # SecurityConfig, RepositoryAdapterConfig
    ├── controllers/         # 8 controladores REST (7 de negocio + HealthController)
    ├── exceptions/          # GlobalExceptionHandler + excepciones de dominio
    ├── repository/          # Implementaciones JPA (11) con queries personalizadas
    └── security/            # JwtProvider, JwtAuthenticationFilter, SecurityUtils

src/main/resources/
├── application.properties         # Config por defecto (dev) con defaults locales
├── application-prod.properties    # Perfil prod: fail-fast JWT/CORS, sin data.sql
├── application-test.properties    # Perfil test: H2 in-memoria (en src/test/resources)
└── data.sql                       # Seed dev: 3 usuarios + 112 productos (solo perfil dev)
```

## 4. Estado Actual de Implementación (funcional)

### 4.1 Controladores REST (8) y alcance

| Controller | Ruta | Cobertura |
|---|---|---|
| AuthController | `/api/auth` | register, login, getCurrentUser (BCrypt + JWT) |
| CatalogController | `/api/catalog` | CRUD productos/categorías/category-types, `_search` (filtros: query, categoryTypeId, precio, etc.), featured, new-arrivals, best-sellers, `products/{id}/related`, `category-types/with-categories` |
| CartController | `/api/cart` | getCart, addToCart, update/remove item, summary, **guest cart** (`GET /guest/{id}`), **migrate** (guest→user) |
| SalesController | `/api/sales` | CRUD órdenes, search, updateStatus (state machine), statusHistory, tracking, customerOrders, checkout (aplica promos), stats + stats/series |
| CustomerController | `/api/customers` | CRUD usuarios, profile, changePassword, shipping addresses, stats; IDOR protegido con `checkOwnership` |
| PromotionController | `/api/promotions` | CRUD códigos, validate, apply, history (ownership), stats, bulk-create/update |
| ShippingController | `/api/shipping` | addresses, cities, postal-codes, cost calc, zones, preferences, stats |
| HealthController | `/api/health` | `permitAll`, usado por health check de la plataforma |

### 4.2 Seguridad (reglas vigentes)

- **Públicos:** auth register/login, catálogo lectura, `_search`, validate de promos,
  cities/postal-codes, guest cart, `POST /cart/items`, `/api/health`.
- **ADMIN/SUPER_ADMIN:** escritura de catálogo, clientes, ventas (search/status/stats),
  promociones, stats de envíos, `GET /shipping/addresses`.
- **Autenticados:** todo lo demás; 401/403 con cuerpo JSON (`ErrorResponseDTO`).
- `isAdmin()` incluye `ROLE_SUPER_ADMIN`; IDOR verificado en Customer/Promotion/Cart (Fase 3).
- CORS **por variable de entorno** `cors.allowed-origins=${CORS_ALLOWED_ORIGINS:localhost:5173,localhost:3000}` (`allowCredentials=true`, orígenes exactos).

### 4.3 Configuración por entorno (ya externalizada — Fase 1 del staging)

| Variable | Uso | Falta si... |
|---|---|---|
| `PORT` | puerto HTTP (default 8081) | — |
| `DB_URL` / `DB_USER` / `DB_PASSWORD` | datasource JDBC | — (default local root/root) |
| `JWT_SECRET` | firma JWT | **perfil `prod` falla al arrancar (fail-fast)** |
| `CORS_ALLOWED_ORIGINS` | orígenes permitidos | **perfil `prod` falla al arrancar** |
| `SPRING_PROFILES_ACTIVE` | `prod` \| `test` | — |
| `JAVA_OPTS` | heap/JVM en contenedor | — (recomendado `-XX:MaxRAMPercentage=60`) |

Perfil `prod`: `ddl-auto=update`, `sql.init.mode=never` (NO ejecuta data.sql; los datos
vienen del dump importado), `show-sql=false`. Perfil `test`: H2 `MODE=MySQL`,
1 test de contexto (`mvn clean package` pasa sin MySQL ni red).

### 4.4 Funcionalidades beta (implementadas, sept–oct 2026)

- Búsqueda por `query` + `categoryTypeId` en `findByFilters` (JPQL).
- `GET /category-types/with-categories` (sidebar jerárquico).
- `isFeatured` en Product + query de destacados; productos relacionados por categoría.
- Transiciones de estado con state machine: PENDING→IN_PREPARATION→SHIPPED→DELIVERED.
- Historial real de órdenes (`OrderStatusHistory` + `getRealHistory`, `getOrderTracking`).
- Carrito guest (expiración 24h) + migración guest→user con merge; `CartItem.productName` (snapshot).
- DTO fix: `ProductDetailDTO.imageUrl` (renombrado desde `mainImageUrl`).

### 4.5 Datos

- **Desarrollo:** `data.sql` se ejecuta en cada arranque (perfil dev): 3 usuarios
  (admin/superadmin/cliente@astrosetups.com) + 112 productos + categorías.
- **Staging/Beta:** dump completo `dumps/astrosetups_full_dump.sql` (schema+datos:
  21 users, 114 products, 26 orders…; `dumps/` está en `.gitignore`, **nunca commitear**).
  Import: `dumps/import-staging.ps1` (histórico, Railway) → se creará `dumps/import-tidb.ps1` (TiDB).
- Passwords de admins rotadas en staging (Fase 6.5): `AdminStg2026!` / `SuperStg2026!`
  (hashes bcrypt verificados en el dump de staging).

## 5. Trazabilidad (historial de fases y despliegues)

| Fecha | Hito | Estado | Detalle |
|---|---|---|---|
| Sept 2026 | Ajustes críticos beta (back+front: búsqueda, sidebar jerárquico, related, comprar ahora, checkout crea orden) | ✅ | `README.md` raíz, sección "Plan de Accion - Ajustes Criticos Beta" |
| 05/10/2026 | Staging Fases 1–8: config env vars + perfil prod, tests H2, seguridad (IDOR/SUPER_ADMIN/carrito), Docker, front fixes, dump+import+rotación, guía, verificación final | ✅ | `README.md` raíz (registro maestro con verificaciones ejecutadas) |
| 05/10/2026 | Despliegue staging verificado: front `https://ecomerce-full-stack.vercel.app` + back Railway + MySQL Railway (volumen) | ✅ histórico | Incidentes resueltos documentados en `docs/DEPLOY-STAGING.md` |
| 05/10/2026 | Commit `1e5283c` "Deploy prebeta grupo cerrado ok" — **beta con grupo cerrado puesto en marcha** | ✅ | corrige Dockerfile (target port) + docs |
| Oct–Nov 2026 | Beta con grupo cerrado (~10 testers): pruebas de flujo/funcionalidad, feedback recopilado | ✅ | la BD de Railway (datos del beta) ya no es accesible; se usa el dump del repo |
| Nov 2026 | Trial gratuito de Railway agotado, tráfico del beta escaso → **app bajada**; decisión: no pagar por hosting de pruebas | ✅ | — |
| **17/11/2026** | **Plan aprobado: front + back en Vercel (Hobby, contenedores) y BD en TiDB Cloud Starter (gratis sin tarjeta)** | 🔄 en curso | Plan completo en `README.md` raíz y `docs/DEPLOY-VERCEL.md` |
| Post-beta | Corrección del feedback del grupo cerrado (lista por consolidar con el dueño) | ⬜ pendiente | nueva ronda de desarrollo |
| Post-beta | Migración de BD a **PostgreSQL** (Neon/Supabase/RDS) para la fase pública | ⬜ pendiente | el código lo permite: JPQL puro, sin `nativeQuery` ni `columnDefinition`; solo driver + dialecto + conversión del dump |

## 6. Despliegue actual: Vercel + TiDB (plan aprobado 17/11/2026)

```
https://<front>.vercel.app  (React/Vite — root astroSetupsFrontend)
        │ HTTPS
        ▼
https://<back>.vercel.app   (Spring Boot vía Dockerfile — root astrosetupsback, preset Container)
        │ internet (TLS)
        ▼
gateway.<region>.prod.aws.tidbcloud.com:4000 / astrosetupsdb  (TiDB Starter, MySQL-compat)
```

**Por qué TiDB y no Postgres ahora:** compatibilidad total con el driver/dialecto/dump
actuales = cero cambios de código para la beta; gratis sin tarjeta (5 GiB + 50M ops/mes,
sin caducidad). La migración a Postgres queda para la fase pública (ver §5).

**Variables del proyecto backend en Vercel (Production):**

| Variable | Valor |
|---|---|
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `PORT` | `8081` (Vercel enruta a `$PORT`; la imagen corre como usuario no-root y no puede enlazar el 80) |
| `DB_URL` | `jdbc:mysql://<host-tidb>:4000/astrosetupsdb?sslMode=VERIFY_IDENTITY&enabledTLSProtocols=TLSv1.2,TLSv1.3` |
| `DB_USER` | `<prefijo>.root` (exactamente como lo entrega TiDB, incluye prefijo) |
| `DB_PASSWORD` | generado por TiDB |
| `JWT_SECRET` | `[guid]::NewGuid() + [guid]::NewGuid()` |
| `CORS_ALLOWED_ORIGINS` | `https://<front>.vercel.app` (sin `/` final) |
| `JAVA_OPTS` | `-XX:MaxRAMPercentage=60` |

Frontend en Vercel: `VITE_API_BASE_URL=https://<back>.vercel.app/api` (se inyecta en
build time → cambiarla exige Redeploy). Guía paso a paso: `docs/DEPLOY-VERCEL.md`.

**Límites a vigilar (Vercel Hobby, gratis):** 4 CPU-hrs activas, 360 GB-hrs memoria,
1M peticiones/mes; si se excede, la app se **pausa sin cobro** hasta el reset de 30 días.
Runtime de contenedores en beta. Plan B documentado: backend en Render free.

## 7. Backlog

### 🔴 En curso

| # | Tarea | Notas |
|---|---|---|
| 1 | Redespliegue Vercel + TiDB | plan aprobado 17/11/2026, ver §6 y `docs/DEPLOY-VERCEL.md` |
| 2 | Consolidar y corregir feedback del beta cerrado | lista pendiente de definir con el dueño |

### ✅ Completado (referencia rápida)

Config externa por env vars + perfil prod fail-fast · tests H2 en build · seguridad
(IDOR, SUPER_ADMIN, carrito restringido, 401/403 JSON) · Docker multi-stage · health
endpoint · CORS por variable · búsqueda con filtros · category-types anidados ·
productos relacionados · destacados · state machine de órdenes · historial/tracking ·
carrito guest + migración · datos de staging con dump y passwords rotadas.

### 📋 Pendiente post-beta

| # | Tarea | Notas |
|---|---|---|
| 1 | Tests unitarios/integración | 1 test de contexto (H2); faltan tests de servicios |
| 2 | Swagger/OpenAPI | springdoc-openapi |
| 3 | Refresh Token | sesiones largas |
| 4 | Email de verificación/bienvenida | starter-mail ya incluido |
| 5 | Paginación real en searchOrders | hoy filtra en memoria |
| 6 | Integración pasarela de pagos | Wompi/PayU/PSE |
| 7 | Migración a PostgreSQL | post-beta, ver §5; sin bloqueos de código |
| 8 | Rendimiento/consultas N+1 | revisión con profiling cuando haya datos reales |

## 8. Decisiones Técnicas

1. **Arquitectura Hexagonal** — separación de responsabilidades.
2. **Repository Pattern** — acceso a datos abstraído (dominio → adapter → JPA).
3. **DTO Pattern** — inmutabilidad y separación entre capas.
4. **Service Layer** — lógica de negocio centralizada (6 servicios).
5. **JWT stateless** — sin sesiones servidor.
6. **Config 100% por variables de entorno** con defaults solo en dev; perfil `prod` fail-fast.
7. **Vercel Hobby + contenedores** para la beta (gratis, scale-to-zero); TiDB Starter
   como BD MySQL gratis sin tarjeta; Postgres como destino final post-beta.

## 9. Credenciales de Prueba

> **[REDACTADO por seguridad]** Las credenciales de staging/producción no se documentan
> en el repositorio.

- **Desarrollo local:** usuarios seed en `src/main/resources/data.sql` (admin/superadmin/cliente@astrosetups.com).
- **Beta (dump del repo, hashes rotados Fase 6.5):** `admin@astrosetups.com` = `AdminStg2026!`, `superadmin@astrosetups.com` = `SuperStg2026!`, `cliente@astrosetups.com` = `Cliente123*` — aplican al importar `dumps/astrosetups_full_dump.sql` en TiDB.
- **Railway (retirado nov 2026):** servicios y secretos eliminados junto con el trial gratuito.
