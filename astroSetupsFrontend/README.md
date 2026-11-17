# Astro Setups Frontend

> **Documento de contexto y trazabilidad del frontend.** Actualizado: **17/11/2026**.
> Contexto global del proyecto y plan de despliegue: `README.md` de la raíz.
> Contexto del backend: `astrosetupsback/CONTEXT.md`.

## Descripcion del Proyecto

Frontend de la plataforma e-commerce **Astro Setups**, tienda de productos de
hardware/componentes de PC. Interfaz visual oscura y minimalista. SPA React
(Router v7) que consume la API REST del backend Spring Boot.

## Stack Tecnologico

- React 19.1 + TypeScript 5.8
- Vite 6.3 + Tailwind CSS 4
- Zustand 5 (auth), Context API + useReducer (carrito, localStorage)
- TanStack React Query 5 (data fetching/caché)
- Axios (HTTP client con interceptores JWT)
- React Router v7 (routing)
- Recharts (dashboard admin)
- Lucide React + React Icons (iconografia)
- Framer Motion (animaciones)
- Sonner (notificaciones toast)

## Estructura del Proyecto

```
src/
├── api/                    # API client y configuracion
│   ├── apiConfig.ts        # lee VITE_API_BASE_URL (obligatoria en prod, error visible si falta)
│   └── client.ts           # Axios con interceptores JWT + toasts 403/500/sin red
├── components/
│   ├── admin/              # AdminLayout + AdminSidebar
│   ├── auth/               # ProtectedRoute (roles)
│   ├── home/               # CategoryGrid, FAQ, CustomSetup, PromoBanner
│   ├── layout/             # Container, Footer, Navbar (Carrito/Buscador), Sidebar filtros
│   ├── products/           # ProductCard, ProductGrid, ProductInfo, ProductModal, etc.
│   └── ui/                 # Modal, StatusBadge, Carousel, states/ (Loading/Error/Empty)
├── hooks/                  # useAuth, useProduct(s), useProductSearch, useCategoryTypes,
│                           # useRelatedProducts, useCatalogProducts, useSidebarFilters,
│                           # admin/: useAdminOrders|Products|Users|Promotions, useSalesStats…
├── interfaces/             # TypeScript types por contexto
├── pages/
│   ├── home/               # Home.tsx (carousel, categorías, destacados, FAQ)
│   ├── products/           # Products (catálogo), ProductDetailPage, Promotions,
│   │                       # CustomPCPage (ruta /custom-pc)
│   ├── cart/               # Cart.tsx (Context+useReducer), CartPage, TrustBanner
│   ├── checkout/           # CheckoutPage, Checkoutform, Ordersummary
│   ├── login/              # Login, Register, Contact
│   ├── admin/              # Dashboard, AdminProducts, AdminOrders, AdminUsers,
│   │                       # AdminPromotions, AdminReports
│   ├── tracking/           # TrackingPage (placeholder "en construcción")
│   ├── NotFound.tsx        # Ruta * → 404
│   ├── conditions.tsx
│   └── privacyPolicies.tsx
├── services/               # auth, product, category, categoryType, promotion, order,
│                           # adminProduct, adminOrder, adminUser, adminSales (10)
├── stores/                 # authStore (Zustand): token, user, isAuthenticated, isAdmin
├── styles/                 # global.css, admin.css
├── App.tsx                 # Router principal (rutas públicas + /admin protegido)
└── main.tsx                # Providers: CartProvider, QueryClient, Router
```

## Variables de Entorno

Desarrollo (`.env`, ver `.env.example`):
```
VITE_API_BASE_URL=http://localhost:8081/api
VITE_APP_NAME=ASTROSETUPSFRONTEND
```

Produccion (Vercel → Settings → Environment Variables):
```
VITE_API_BASE_URL=https://<backend>.vercel.app/api   # termina en /api
VITE_APP_NAME=ASTRO SETUPS
```
> Las variables `VITE_*` se inyectan en **build time**: cambiarlas exige un **Redeploy**.

## Despliegue (Vercel)

- Proyecto Vercel con **Root Directory:** `astroSetupsFrontend`, preset **Vite**
  (build `npm run build`, output `dist`).
- `vercel.json` → rewrite SPA `/* → index.html` (refresh/compartir sin 404).
- Guía completa (orden de despliegue + cierre de circuito con el backend):
  ver `docs/DEPLOY-VERCEL.md` en la raíz.
- Estado: dominio histórico `https://ecomerce-full-stack.vercel.app` (desde oct 2026);
  en nov 2026 se reconecta al nuevo backend en Vercel.

---

## Componentes Implementados

### Pages (17 rutas)
- [x] Home.tsx — Carousel, Categorias, FAQ, Productos destacados
- [x] Products.tsx — Catalogo con sidebar jerárquico (CategoryType→Category), busqueda server-side, paginacion
- [x] ProductDetailPage.tsx — Detalle + productos relacionados (`/products/{id}/related`)
- [x] Promotions.tsx — Promociones activas desde backend (promotion.service)
- [x] CartPage.tsx — Carrito con cantidades, descuento (validado con backend), resumen
- [x] CheckoutPage.tsx — Checkout multi-paso; crea orden (`POST /sales/orders`)
- [x] Login.tsx / Register.tsx — Auth con JWT (authStore)
- [x] Contact.tsx — Formulario (**solo `console.log`**, pendiente conectar)
- [x] NotFound.tsx — Ruta `*` con links a inicio/catálogo
- [x] Admin/DashboardPage.tsx — KPIs, graficas, pedidos recientes
- [x] Admin/AdminProductsPage.tsx — CRUD productos con modal
- [x] Admin/AdminOrdersPage.tsx — Listado, detalle, cambio estado
- [x] Admin/AdminUsersPage.tsx — Listado clientes, perfil, stats
- [x] Admin/AdminPromotionsPage.tsx — CRUD codigos promocionales + stats (bulk pendiente)
- [x] Admin/AdminReportsPage.tsx — Reportes de ventas/clientes/promos (Recharts)
- [x] tracking/TrackingPage.tsx — **placeholder** "en construcción" (backend ya expone tracking)
- [x] products/CustomPCPage.tsx — ruta `/custom-pc` (contenido informativo)
- [x] conditions.tsx / privacyPolicies.tsx — legales

### Components (20+)
- [x] Navbar (buscador + CarIcon), Footer, Container, Sidebar (filtros + admin)
- [x] ProductCard, ProductCardRelated, ProductGrid, ProductGridRelated
- [x] ProductInfo, ProductDescription, ProductImageGallery, ProductModal
- [x] AdminLayout, AdminSidebar, Modal, StatusBadge
- [x] Carousel, CarouselControls, CarouselIndicators, PromoBanner
- [x] LoadingState, ErrorState, EmptyState
- [x] Breadcrumbs, TrustBanner, ProtectedRoute

### Services (10)
- [x] auth.service.ts — login, register, getCurrentUser
- [x] product.service.ts — getProducts, search, byId, by-category, featured, newArrivals, bestSellers, related
- [x] category.service.ts / categoryType.service.ts — categorías y árbol category-type
- [x] promotion.service.ts — promociones activas, validate (descuento en checkout), admin CRUD vía hooks
- [x] order.service.ts — crear orden desde checkout
- [x] adminProduct.service.ts / adminOrder.service.ts / adminUser.service.ts / adminSales.service.ts — panel admin

### Hooks (20+)
- [x] useAuth, useCarousel, useCategories, useCategoryTypes, useFeaturedProducts
- [x] useProduct, useProducts, useProductsByCategory, useProductSearch, useCatalogProducts, useRelatedProducts
- [x] useSidebarFilters
- [x] admin/: useAdminOrders, useAdminProducts, useAdminUsers, useCustomerStats, useSalesStats (+serie), useAdminPromotions (search/stats/create/update/delete)

### Infraestructura
- [x] API client con interceptores JWT + manejo de errores (toast 403/500/sin red)
- [x] ProtectedRoute con verificación de rol (rutas `/admin` exigen ADMIN)
- [x] authStore (Zustand) + CartContext (localStorage)

---

## Trazabilidad (frontend)

| Fecha | Hito | Estado |
|---|---|---|
| Sept 2026 | Ajustes críticos beta: service/hook categoryTypes, sidebar jerárquico, filtrado server-side, relacionados, comprar ahora, checkout crea orden (order.service), UX checkout, home cards con categoryTypeId | ✅ |
| 05/10/2026 | Fase 5 staging: `vercel.json` SPA, `apiConfig` sin fallback (error visible), `.env` fuera del repo, fix ruta de búsqueda → `/catalog`, ruta 404, placeholder.png, tsconfig solution-style, error handling con toasts | ✅ |
| 05/10/2026 | Desplegado en Vercel (`ecomerce-full-stack.vercel.app`) apuntando a backend Railway | ✅ histórico |
| Beta cerrado (oct–nov 2026) | Grupo cerrado probó el flujo completo; feedback recopilado | ✅ |
| Nov 2026 | Backend Railway retirado (trial agotado); frontend a reconectar a backend en **Vercel** (plan aprobado) | 🔄 |

## Backlog de Implementacion

### 🔴 En curso

| # | Tarea | Notas |
|---|---|---|
| 1 | Reconectar `VITE_API_BASE_URL` al backend Vercel + Redeploy | parte del plan de despliegue (raíz / DEPLOY-VERCEL.md) |
| 2 | Corregir feedback del beta cerrado | lista pendiente de definir |

### ✅ Completado (referencia)
Auth + JWT · CRUD admin (productos/pedidos/clientes/promociones) · reportes admin ·
catálogo con filtros server-side y sidebar jerárquico · destacados/relacionados ·
checkout crea orden · validación de descuento con backend · promociones (página +
admin) · 404 · buscador navegación correcta · error handling con toasts ·
verificación de roles.

### 📋 Pendiente post-beta

| # | Tarea | Notas |
|---|---|---|
| 1 | **carrito.service.ts + integrar carrito con backend** | el carrito hoy es Context+localStorage; el backend ya tiene guest cart + migrate |
| 2 | Perfil de usuario `/profile` | backend: `/api/customers/{id}/profile` |
| 3 | Tracking real | página placeholder; backend ya expone `GET /sales/orders/tracking` |
| 4 | Contact form → backend | hoy solo `console.log` |
| 5 | Personalizar PC (contenido/flujo) | ruta creada, validar con grupo |
| 6 | Refresh Token | sesión larga |
| 7 | Testing (Vitest) | componentes críticos |
| 8 | Pasarela de pagos | Wompi/PayU/PSE |
| 9 | `verbatimModuleSyntax`/`erasableSyntaxOnly` en tsconfig | requiere migrar ~40 archivos a `import type` (no bloquea) |

---

## Credenciales de Prueba

> **[REDACTADO por seguridad]** Las credenciales de pruebas/producción no se documentan
> en repositorios. Para desarrollo local consultar
> `astrosetupsback/src/main/resources/data.sql`. En despliegue se gestionan como
> secretos en la plataforma (Vercel/TiDB) y se rotan tras cada import del dump.
