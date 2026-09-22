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

| Rol | Email | Password |
|-----|-------|----------|
| ADMIN | admin@astrosetups.com | Admin123* |
| SUPER_ADMIN | superadmin@astrosetups.com | SuperAdmin123* |
| CLIENT | cliente@astrosetups.com | Cliente123* |

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
