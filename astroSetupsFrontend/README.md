# Astro Setups Frontend

## Descripcion del Proyecto

Frontend de la plataforma e-commerce **Astro Setups**, tienda de productos de hardware/componentes de PC. Interfaz visual oscura y minimalista.

## Stack Tecnologico

- React 19.1 + TypeScript 5.8
- Vite 6.3 + Tailwind CSS 4
- Zustand 5 (auth), Context API + useReducer (carrito)
- TanStack React Query 5 (data fetching)
- Axios (HTTP client)
- React Router v7 (routing)
- Recharts (dashboard admin)
- Lucide React + React Icons (iconografia)
- Framer Motion (animaciones)
- Sonner (notificaciones toast)

## Estructura del Proyecto

```
src/
├── api/                    # API client y configuracion
│   ├── apiConfig.ts
│   └── client.ts           # Axios con interceptores JWT
├── components/
│   ├── admin/              # AdminLayout
│   ├── auth/               # ProtectedRoute
│   ├── home/               # CategoryGrid, FAQ, CustomSetup
│   ├── layout/             # Container, Footer, Navbar, Sidebar
│   ├── products/           # ProductCard, ProductGrid, ProductInfo, etc.
│   └── ui/                 # Modal, StatusBadge, Carousel, states/
├── hooks/                  # useAuth, useProducts, useCategories, admin/*
├── interfaces/             # TypeScript types por contexto
├── pages/
│   ├── home/               # Home.tsx
│   ├── products/           # Products, ProductDetailPage, Promotions
│   ├── cart/               # Cart (context), CartPage, TrustBanner
│   ├── checkout/           # CheckoutPage, Checkoutform, Ordersummary
│   ├── login/              # Login, Register, Contact
│   ├── admin/              # Dashboard, AdminProducts, AdminOrders, AdminUsers
│   ├── conditions.tsx
│   └── privacyPolicies.tsx
├── services/               # auth, product, category, admin* services
├── stores/                 # authStore (Zustand)
├── styles/                 # global.css, admin.css
├── App.tsx                 # Router principal
└── main.tsx
```

## Variables de Entorno

Desarrollo (`.env`):
```
VITE_API_BASE_URL=http://localhost:8081/api
VITE_APP_NAME=ASTROSETUPSFRONTEND
```

Produccion (Vercel):
```
VITE_API_BASE_URL=https://tu-backend.railway.app/api
VITE_APP_NAME=ASTROSETUPSFRONTEND
```

---

## Componentes Implementados

### Pages (12 paginas)
- [x] Home.tsx - Carousel, Categorias, FAQ, Productos destacados
- [x] Products.tsx - Catalogo con sidebar de filtros, busqueda, paginacion
- [x] ProductDetailPage.tsx - Detalle de producto
- [x] Promotions.tsx - Pagina de promociones
- [x] CartPage.tsx - Carrito con cantidades, descuento, resumen
- [x] CheckoutPage.tsx - Checkout multi-paso (3 pasos)
- [x] Login.tsx - Formulario de login
- [x] Register.tsx - Formulario de registro
- [x] Contact.tsx - Pagina de contacto
- [x] Admin/DashboardPage.tsx - KPIs, graficas, pedidos recientes
- [x] Admin/AdminProductsPage.tsx - CRUD productos con modal
- [x] Admin/AdminOrdersPage.tsx - Listado, detalle, cambio estado
- [x] Admin/AdminUsersPage.tsx - Listado clientes, perfil
- [x] conditions.tsx - Terminos y condiciones
- [x] privacyPolicies.tsx - Politica de privacidad

### Components (20+)
- [x] Navbar, Footer, Container, Sidebar (filtros + admin)
- [x] ProductCard, ProductCardRelated, ProductGrid, ProductGridRelated
- [x] ProductInfo, ProductDescription, ProductImageGallery, ProductModal
- [x] AdminLayout, AdminSidebar, Modal, StatusBadge
- [x] Carousel, CarouselControls, CarouselIndicators
- [x] LoadingState, ErrorState, EmptyState
- [x] Breadcrumbs, TrustBanner, ProtectedRoute

### Services (7)
- [x] auth.service.ts - login, register, getCurrentUser
- [x] product.service.ts - getProducts, getProductById, searchProducts, featured, newArrivals, bestSellers
- [x] category.service.ts - getCategories
- [x] adminProduct.service.ts - CRUD admin productos
- [x] adminOrder.service.ts - searchOrders, getOrderById, updateOrderStatus
- [x] adminUser.service.ts - searchUsers, getUserById, getUserProfile, getCustomerStats
- [x] adminSales.service.ts - getSalesStats

### Hooks (10)
- [x] useAuth, useCarousel, useCategories, useFeaturedProducts
- [x] useProduct, useProducts, useProductsByCategory, useProductSearch
- [x] useSidebarFilters
- [x] admin/: useAdminOrders, useAdminProducts, useAdminUsers, useCustomerStats, useSalesStats

### Stores
- [x] authStore.ts (Zustand) - token, user, isAuthenticated, isAdmin

### Infraestructura
- [x] API client con interceptores JWT (request/response)
- [x] ProtectedRoute con verificacion de rol
- [x] Rutas admin protegidas por `RequiredRoute`

---

## Backlog de Implementacion (Priorizado para Beta)

### Fase 1: FUNCIONALIDAD CORE

| # | Tarea | Archivos | Notas |
|---|-------|----------|-------|
| 1 | **Conectar Checkout con backend** | `CheckoutPage.tsx`, nuevo `order.service.ts` | Llamar a `POST /api/sales/orders`. Solo metodo "Contra entrega" para MVP |
| 2 | **Corregir tipo FormData** | `Checkoutform.tsx` | La interfaz `FormData` (linea 267) solo tiene 5 campos pero el form tiene 15+. Actualizar interfaz |
| 3 | **Conectar validacion de descuento** | `CartPage.tsx` | Llamar a `POST /api/promotions/codes/validate` en vez de solo mostrar toast |
| 4 | **Productos relacionados** | `ProductDetailPage.tsx` | Conectar con endpoint `/api/catalog/products/{id}/related` cuando este disponible |

### Fase 2: FUNCIONALIDADES PENDIENTES

| # | Tarea | Archivos | Notas |
|---|-------|----------|-------|
| 5 | **Pagina Promociones** | `Promotions.tsx` | Mostrar promociones activas desde backend |
| 6 | **Integrar carrito con backend** | `Cart.tsx`, `CartPage.tsx`, nuevo `cart.service.ts` | Sincronizar localStorage con `POST /api/cart/items`. Opcional para MVP cerrado |
| 7 | **Admin: Pagina Promociones** | Nueva `AdminPromotionsPage.tsx` | CRUD de codigos promocionales. Sidebar ya tiene el link |
| 8 | **Admin: Pagina Reportes** | Nueva `AdminReportsPage.tsx` | Reportes de ventas, productos mas vendidos. Sidebar ya tiene el link |
| 9 | **Admin: Pagina Configuracion** | Nueva `AdminSettingsPage.tsx` | Configuracion general de la tienda. Sidebar ya tiene el link |
| 10 | **Admin: Busqueda global** | `AdminLayout.tsx` | Conectar el input de busqueda del header con funcionalidad real |

### Fase 3: MEJORAS - Post-Beta

| # | Tarea | Archivos | Notas |
|---|-------|----------|-------|
| 11 | **Perfil de usuario** | Nueva `ProfilePage.tsx` | Pagina `/profile` para que el cliente vea sus pedidos y datos |
| 12 | **Seguimiento de pedidos** | Nueva `OrderTrackingPage.tsx` | Conectar con `GET /api/sales/orders/{id}/tracking` |
| 13 | **Pagina 404** | Nueva `NotFound.tsx` | Pagina de ruta no encontrada |
| 14 | **Error Boundary** | `App.tsx` | Componente ErrorBoundary para capturar errores de render |
| 15 | **SEO Meta Tags** | `index.html`, rutas | Agregar meta tags dinamicos por pagina |
| 16 | **Lazy Loading de rutas** | `App.tsx` | Usar `React.lazy()` para code-splitting por ruta |
| 17 | **Refresh Token** | `auth.service.ts`, `client.ts` | Implementar refresh automatico de token |
| 18 | **Testing** | `src/__tests__/` | Tests de componentes criticos con Vitest |

### Fase 4: DEPLOY - Configuracion Produccion

| # | Tarea | Archivos | Notas |
|---|-------|----------|-------|
| 19 | **Variables de entorno produccion** | `.env`, `apiConfig.ts` | Crear `.env.production` con URL de Railway |
| 20 | **CORS produccion** | Solo verificar backend | Asegurar que el backend acepta el dominio de Vercel |

---

## Credenciales de Prueba

| Rol | Email | Password |
|-----|-------|----------|
| ADMIN | admin@astrosetups.com | Admin123* |
| SUPER_ADMIN | superadmin@astrosetups.com | SuperAdmin123* |
| CLIENT | cliente@astrosetups.com | Cliente123* |
