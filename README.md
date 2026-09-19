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

### FUNCIONALIDADES POR AJUSTAR (6)

| # | Funcionalidad | Problema | Ubicacion | Ajuste |
|---|--------------|----------|-----------|--------|
| 1 | Checkout sin conexion | Solo muestra toast, no llama al backend | CheckoutPage.tsx:43-51 | Conectar con POST /api/sales/orders |
| 2 | Carrito desincronizado | Frontend=localStorage, backend=endpoints propios | Cart.tsx vs CartController | Decidir estrategia (localStorage OK para MVP) |
| 3 | Descuento es stub | Solo toast.info, no valida con backend | CartPage.tsx:31-38 | Conectar con POST /api/promotions/codes/validate |
| 4 | Tipo FormData incompleto | Interfaz tiene 5 campos, form tiene 15+ | Checkoutform.tsx:267-272 | Actualizar interfaz TypeScript |
| 5 | Productos relacionados vacios | Array vacio con TODO | ProductDetailPage.tsx:50-51 | Crear endpoint backend o filtrar por categoria |
| 6 | Promociones sin contenido | Promotions.tsx existe pero no muestra datos | Promotions.tsx | Conectar con backend de promociones |

---

### FUNCIONALIDADES POR IMPLEMENTAR (Para Fase Beta)

#### Fase 1: FUNCIONALIDAD CORE

| # | Funcionalidad | Que hacer |
|---|--------------|-----------|
| 1 | Seed data productos/categorias | Crear INSERTs iniciales en data.sql para que el catalogo no venga vacio |
| 2 | Conectar Checkout con backend | Llamar a POST /api/sales/orders en CheckoutPage.tsx. Solo metodo "Contra entrega" |
| 3 | Corregir tipo FormData | Actualizar interfaz en Checkoutform.tsx (5 campos vs 15+ del form) |
| 4 | Conectar validacion de descuento | Llamar a POST /api/promotions/codes/validate en CartPage.tsx |
| 5 | Endpoint productos relacionados | Crear GET /api/catalog/products/{id}/related en backend |

#### Fase 2: FUNCIONALIDADES PENDIENTES

| # | Funcionalidad | Que hacer |
|---|--------------|-----------|
| 6 | Pagina Promociones | Mostrar promociones activas desde backend en Promotions.tsx |
| 7 | Paginacion real en searchOrders | Filtrar en query JPA, no en memoria |
| 8 | Validar transiciones de estado | Implementar validateStatusTransition() en SalesServiceImpl |
| 9 | Historial de estado ordenes | Crear entidad OrderStatusHistory o usar JSON |
| 10 | Descuento de stock al comprar | Decrementar stock al crear orden |
| 11 | Admin Promociones | CRUD de codigos promocionales en admin |
| 12 | Admin Reportes | Pagina de reportes de ventas |
| 13 | Admin Configuracion | Pagina de configuracion general |

#### Fase 3: MEJORAS - Post-Beta

| # | Funcionalidad | Que hacer |
|---|--------------|-----------|
| 14 | Perfil de usuario | Pagina /profile para clientes |
| 15 | Seguimiento de pedidos | Pagina de tracking para clientes |
| 16 | Pagina 404 | Pagina de ruta no encontrada |
| 17 | Tests | Tests unitarios e integracion (backend y frontend) |
| 18 | Swagger/OpenAPI | Documentacion de API |
| 19 | Refresh Token | Sesion larga con refresh automatico |
| 20 | Pasarela de pagos | Wompi/PayU para pagos Colombia |

#### Fase 4: DEPLOY - Configuracion Produccion

| # | Funcionalidad | Que hacer |
|---|--------------|-----------|
| 21 | Variables de entorno produccion | Mover config de application.properties a variables de entorno (DB_URL, JWT_SECRET, etc.) |
| 22 | CORS para produccion | Agregar dominio de Vercel a SecurityConfig.java |
| 23 | JWT Secret seguro | Eliminar fallback hardcoded, usar solo variable de entorno |

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

## Orden Recomendado para Despliegue Beta

1. Crear seed data de productos/categorias en data.sql
2. Conectar checkout con backend (solo contra entrega)
3. Corregir tipo FormData en CheckoutForm
4. Conectar validacion de descuentos
5. Crear endpoint de productos relacionados
6. Crear pagina de promociones
7. Implementar funcionalidades pendientes (paginacion, transiciones, stock)
8. Crear paginas admin faltantes (Promociones, Reportes, Config)
9. Configurar variables de entorno en backend (Railway)
10. Configurar CORS para produccion
11. Configurar variables de entorno en frontend (Vercel)
12. Desplegar y probar flujo completo: registro -> catalogo -> carrito -> checkout
