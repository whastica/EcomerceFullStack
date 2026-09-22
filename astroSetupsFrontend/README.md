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

## Backlog de Implementacion - Ajustes Criticos Beta

### 🔴 Tareas Criticas Frontend (En progreso)

| # | Tarea | Estado | Archivos | Descripcion |
|---|-------|--------|----------|-------------|
| 4 | Service y hook category types | ✅ Completado | nuevo `categoryType.service.ts`, nuevo `useCategoryTypes.ts` | Consumir `GET /category-types/with-categories` |
| 5 | Sidebar jerárquico | ✅ Completado | `CatalogSidebar.tsx`, `SidebarTypes.ts` | CategoryType → Category colapsable |
| 6 | Filtrado server-side Products | ✅ Completado | `Products.tsx`, `SidebarTypes.ts` | Reemplazar client-side por `useProductSearch` |
| 7 | Productos relacionados | ✅ Completado | `ProductDetailPage.tsx`, `product.service.ts`, nuevo hook | Conectar `GET /products/{id}/related` |
| 8 | Comprar ahora funcional | ✅ Completado | `ProductInfo.tsx` | Add to cart + navegar a `/checkout` |
| 9 | Checkout crea orden | ✅ Completado | `CheckoutPage.tsx`, nuevo `order.service.ts` | Conectar `POST /sales/orders` |
| 10 | Checkout form UX | ✅ Completado | `Checkoutform.tsx` | Labels claros, campos pago condicionales |
| 11 | Home cards categoryTypeId | ✅ Completado | `Home.tsx`, `CategoryCard.tsx` | Usar `categoryTypeId` en links |

### ✅ Completado (Pre-existente)

| # | Tarea | Estado |
|---|-------|--------|
| 1 | ~~Auth (Login/Register/JWT)~~ | ✅ Login.tsx, Register.tsx, authStore |
| 2 | ~~CRUD Admin Productos/Categorias/Ordenes/Clientes~~ | ✅ AdminPages |
| 3 | ~~Carrito (agregar/eliminar/cantidad)~~ | ✅ CartContext localStorage |
| 4 | ~~API client con interceptores JWT~~ | ✅ client.ts |
| 5 | ~~ProtectedRoute con verificacion de rol~~ | ✅ ProtectedRoute.tsx |
| 6 | ~~Checkout multi-paso~~ | ✅ CheckoutPage + CheckoutForm |
| 7 | ~~Home con carousel, categorias, FAQ, destacados~~ | ✅ Home.tsx |
| 8 | ~~Products con sidebar filtros~~ | ✅ Products.tsx (fix pendiente) |

### 📋 Pendiente Post-Beta

| # | Tarea | Notas |
|---|-------|-------|
| 9 | cart.service.ts + Integrar carrito backend | Sincronizar con backend |
| 10 | Pagina Promociones conectada | Conectar con backend |
| 11 | Admin Promociones / Reportes | CRUD codigos + dashboard |
| 12 | Pagina Personalizar PC | Placeholder `/custom-pc` |
| 13 | Pagina 404 | Ruta no encontrada |
| 14 | Perfil de usuario | `/profile` para clientes |
| 15 | Seguimiento de pedidos | Order tracking |
| 16 | Refresh Token | Sesion larga |
| 17 | Testing | Vitest componentes criticos |
| 18 | Variables de entorno produccion | `.env.production` Railway |
| 19 | Pasarela de pagos | PayPal/PSE/Wompi |

---

## Credenciales de Prueba

| Rol | Email | Password |
|-----|-------|----------|
| ADMIN | admin@astrosetups.com | Admin123* |
| SUPER_ADMIN | superadmin@astrosetups.com | SuperAdmin123* |
| CLIENT | cliente@astrosetups.com | Cliente123* |
