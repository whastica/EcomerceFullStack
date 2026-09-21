# Astro Setups Backend - Contexto del Proyecto

## Descripcion del Negocio
Astro Setups es una tienda en linea de productos de hardware que opera bajo un modelo de intermediacion, sin stock propio. La plataforma conecta clientes con proveedores, facilitando la compra de productos sin necesidad de manejar inventario directamente.

### Funcionalidades Principales
- Exploracion de catalogo con filtros
- Consulta de especificaciones tecnicas y comparacion de productos
- Compra rapida sin registro o con cuenta
- Aplicacion de codigos promocionales
- Seguimiento de pedidos
- Gestion administrativa del catalogo, clientes, pedidos y promociones

## Arquitectura Tecnica

### Stack
- **Framework:** Spring Boot 3.4.5
- **Lenguaje:** Java 21
- **Base de Datos:** MySQL 8.0
- **ORM:** Spring Data JPA
- **Seguridad:** Spring Security + JWT (jjwt 0.12.6)
- **Build:** Maven
- **Lombok:** Para reduccion de boilerplate

### Estructura del Proyecto (Arquitectura Hexagonal)
```
src/main/java/com/whalensoft/astrosetupsback/
├── application/
│   ├── common/              # Mensajes de error, constantes
│   ├── dto/                 # DTOs organizados por contexto
│   │   ├── auth/           # Auth, Login, Register
│   │   ├── catalog/        # Productos y Categorias
│   │   │   ├── Product/    # CreateProduct, UpdateProduct, ProductDTO, etc.
│   │   │   └── Category/   # CreateCategory, CategoryDTO, CategoryTypeDTO, etc.
│   │   ├── customer/       # Clientes y Usuarios
│   │   │   ├── Users/      # UserAdmin, UserAdminProfile, etc.
│   │   │   ├── Address/    # ShippingAddress DTOs
│   │   │   └── Stats/      # CustomerStats
│   │   ├── promotion/      # Codigos promocionales
│   │   │   ├── code/       # CRUD de promociones
│   │   │   ├── validation/ # Validar y aplicar codigos
│   │   │   └── bullk/      # Operaciones en lote
│   │   ├── sales/          # Ventas y Pedidos
│   │   │   ├── cart/       # Carrito de compras
│   │   │   ├── checkout/   # Procesamiento de checkout
│   │   │   ├── orders/     # CRUD de ordenes
│   │   │   └── search/     # Busqueda y estadisticas
│   │   ├── shipping/       # Envios
│   │   │   ├── address/    # Direcciones de envio
│   │   │   ├── cost/       # Calculo de costos
│   │   │   ├── location/   # Ciudades, codigos postales
│   │   │   ├── preferences/# Preferencias de usuario
│   │   │   ├── stats/      # Estadisticas de envios
│   │   │   └── zone/       # Zonas de envio
│   │   └── common/         # PageResponseDTO
│   ├── interfaces/          # Interfaces de servicios
│   └── services/           # Implementaciones de servicios
├── domain/
│   ├── model/              # Entidades del dominio (22 entidades)
│   └── repository/         # Interfaces de repositorios
└── infra/
    ├── adapters/           # Adaptadores repository
    ├── config/             # SecurityConfig, RepositoryAdapterConfig
    ├── controllers/        # Controladores REST (7)
    ├── exceptions/         # Manejo global de excepciones
    ├── repository/         # Implementaciones JPA
    └── security/           # JWT: JwtProvider, JwtAuthenticationFilter, SecurityUtils
```

### Puertos
- Backend: **8081**
- Base de datos MySQL: **3306**

---

## Estado Actual de Implementacion

### Completado

#### 1. Modelo de Dominio ✅
- **22 entidades** implementadas: User, Product, Category, CategoryType, Order, OrderItem, ShoppingCart, CartItem, PromoCode, AppliedPromoCode, AppliedPromoCodeId, ShippingAddress, Warranty, City, State, Country, PostalCode, OrderStatus, PaymentMethod, UserRole, UserStatus, WarrantyStatus
- Relaciones entre entidades definidas
- Enums y tipos de datos definidos
- Builder pattern con Lombok

#### 2. Repositorios ✅
- 11 interfaces de repositorio en el dominio
- 11 implementaciones JPA en infraestructura
- 11 adaptadores para conexion entre capas
- Consultas personalizadas (findByActiveTrue, findByFilters, findFeaturedProducts, findNewArrivals, findBestSellers, countByStatus, findByUser, etc.)

#### 3. DTOs ✅
- DTOs de entrada y salida para **todos los contextos**:
  - auth: AuthResponseDTO, CurrentUserDTO, LoginRequestDTO, RegisterRequestDTO, UserInfoDTO
  - catalog: ProductDTO, ProductSummaryDTO, ProductDetailDTO, ProductSearchDTO, CreateProductDTO, UpdateProductDTO, CategoryDTO, CategorySummaryDTO, CategoryTypeDTO, CreateCategoryDTO, UpdateCategoryDTO, CreateCategoryTypeDTO, CategoryTypeBasicDTO
  - customer: UserAdminDTO, UserAdminProfileDTO, CreateUserDTO, UpdateUserDTO, ChangePasswordDTO, CustomerStatsDTO, ShippingAddressDTO
  - promotion: PromoCodeDTO, PromoCodeSummaryDTO, CreatePromoCodeDTO, UpdatePromoCodeDTO, PromoCodeSearchDTO, PromoCodeValidationDTO, PromoCodeValidationResultDTO, ApplyPromoCodeDTO, PromoCodeApplicationResultDTO, UserPromoCodeHistoryDTO, PromoCodeStatsDTO, BulkCreatePromoCodeDTO, BulkPromoCodeActionDTO, BulkPromoCodeActionResultDTO
  - sales: ShoppingCartDTO, CartItemDTO, CartSummaryDTO, AddToCartDTO, UpdateCartItemDTO, OrderDTO, OrderSummaryDTO, OrderItemResponseDTO, CreateOrderDTO, CreateOrderItemDTO, UpdateOrderStatusDTO, OrderStatusHistoryDTO, OrderTrackingDTO, CheckoutSummaryDTO, ProcessCheckoutDTO, OrderSearchDTO, OrderSearchResultDTO, SalesStatsDTO, AppliedPromoCodeDTO
  - shipping: ShippingAddressDTO, ShippingAddressSummaryDTO, CreateShippingAddressDTO, UpdateShippingAddressDTO, ShippingCostCalculationDTO, ShippingCostResponseDTO, ShippingZoneDTO, UserShippingPreferencesDTO, ShippingStatsDTO, CitySummaryDTO, PostalCodeSummaryDTO
  - common: PageResponseDTO

#### 4. Servicios ✅ (6 implementaciones)
- **AuthServiceImpl**: Register (con BCrypt), Login (con JWT), getCurrentUser
- **CatalogServiceImpl**: CRUD Productos, CRUD Categorias, CRUD CategoryTypes, busqueda con filtros, productos destacados/nuevos/mas vendidos
- **SalesServiceImpl**: CRUD Ordenes, Carrito de compras (agregar/actualizar/eliminar/summary), Checkout con validacion de promociones, Estadisticas de ventas, Busqueda de ordenes con filtros
- **CustomerServiceImpl**: CRUD Usuarios, perfil de usuario, cambio de password, direcciones de envio, estadisticas de clientes
- **PromotionServiceImpl**: CRUD Codigos promocionales, validacion, aplicacion, historial, estadisticas, operaciones en lote
- **ShippingServiceImpl**: CRUD Direcciones de envio, ciudades, codigos postales, calculo de costos, zonas, preferencias de usuario, estadisticas

#### 5. Controladores REST ✅ (7 controladores)
- **AuthController** (`/api/auth`): register, login, getCurrentUser
- **CatalogController** (`/api/catalog`): CRUD productos, CRUD categorias, CRUD category-types, busqueda, destacados, nuevos, mas vendidos, por categoria
- **CartController** (`/api/cart`): getCart, addToCart, updateCartItem, removeFromCart, getCartSummary
- **SalesController** (`/api/sales`): CRUD ordenes, search, updateStatus, statusHistory, tracking, customerOrders, checkout, stats
- **CustomerController** (`/api/customers`): CRUD usuarios, profile, password, shipping addresses, stats
- **PromotionController** (`/api/promotions`): CRUD codigos, validate, apply, history, stats, bulk operations
- **ShippingController** (`/api/shipping`): CRUD addresses, cities, postal codes, cost calculation, zones, preferences, stats

#### 6. Seguridad ✅
- **SecurityConfig**: CORS configurado, CSRF deshabilitado, sesiones stateless
- **JWT Authentication Filter**: Filtro antes de UsernamePasswordAuthenticationFilter
- **JwtProvider**: Generacion y validacion de tokens
- **SecurityUtils**: Utilidades para obtener usuario actual y verificar roles
- **Reglas de autorizacion**:
  - Publicos: Auth (register/login), Catalogo (lectura), Validacion de promociones, Ciudades/codigos postales, Carrito
  - Admin: Escritura de catalogo, Clientes, Ventas, Promociones, Stats de envios
  - Autenticados: Todo lo demas
- **CORS**: Permite localhost:5173 y localhost:3000 (DESARROLLO)

#### 7. Data Seeder ✅
- `data.sql` con 3 usuarios iniciales:
  - admin@astrosetups.com / Admin123* (ADMIN)
  - superadmin@astrosetups.com / SuperAdmin123* (SUPER_ADMIN)
  - cliente@astrosetups.com / Cliente123* (CLIENT)
- `spring.sql.init.mode=always` ejecuta al iniciar

#### 8. Excepciones ✅
- GlobalExceptionHandler para manejo centralizado de errores
- InvalidCredentialsException, AccountDisabledException, AccessDeniedException
- ErrorMessages con mensajes estandarizados

#### 9. Funcionalidades Beta ✅ (Septiembre 2026)
- **isFeatured en Product**: Campo booleano para productos destacados, 17 productos marcados en data.sql
- **Productos relacionados**: GET /api/catalog/products/{id}/related (misma categoria)
- **Transiciones de estado**: validateStatusTransition() con state machine (PENDING→IN_PREPARATION→SHIPPED→DELIVERED)
- **Historial de ordenes**: OrderStatusHistory entity + getRealHistory() + getOrderTracking() con historial real
- **Carrito guest**: GET /api/cart/guest/{guestCartId} con expiracion 24h
- **Migracion carrito**: POST /api/cart/migrate (guest→user) con merge de items
- **CartItem.productName**: Campo snapshot del nombre del producto

---

## Backlog de Implementacion (Priorizado para Despliegue Beta)

### Fase 1: FUNCIONALIDAD CORE ✅ COMPLETADA

| # | Tarea | Estado |
|---|-------|--------|
| 1 | ~~Seed data de productos/categorias~~ | ✅ 112 productos en data.sql |
| 2 | ~~Endpoint productos relacionados~~ | ✅ GET /api/catalog/products/{id}/related |
| 3 | ~~Productos destacados automaticos~~ | ✅ Campo isFeatured + query filtrada |

### Fase 2: FUNCIONALIDADES PENDIENTES ✅ COMPLETADA

| # | Tarea | Estado |
|---|-------|--------|
| 4 | ~~Paginacion real en searchOrders~~ | ⏳ Pendiente (no critico para beta) |
| 5 | ~~Validacion de transiciones de estado~~ | ✅ validateStatusTransition() con state machine |
| 6 | ~~Historial de estado de ordenes~~ | ✅ OrderStatusHistory + getRealHistory |
| 7 | ~~Gestion de stock en checkout~~ | ⏳ Pendiente (pedido por orden, sin stock propio) |

### Fase 2: CARRITO GUEST + MIGRACION ✅ COMPLETADA

| # | Tarea | Archivos modificados |
|---|-------|---------------------|
| 8 | ~~Carrito guest~~ | CartController (GET /guest/{id}), SalesService, SalesServiceImpl |
| 9 | ~~Migracion guest→user~~ | CartController (POST /migrate), MigrateCartDTO, SalesService |
| 10 | ~~CartItem.productName~~ | CartItem.java, SalesServiceImpl (addToCart + migrateGuestCart) |

### Fase 3: MEJORAS - Post-Beta

| # | Tarea | Archivos a modificar | Notas |
|---|-------|---------------------|-------|
| 11 | **Tests unitarios** | `src/test/` | Crear tests para servicios criticos: AuthService, CatalogService, SalesService |
| 12 | **Tests de integracion** | `src/test/` | Tests de controladores con MockMvc |
| 13 | **Documentacion Swagger/OpenAPI** | `pom.xml`, `SecurityConfig.java` | Agregar dependencia springdoc-openapi y configurar |
| 14 | **Refresh Token** | `AuthController.java`, `AuthServiceImpl.java`, `JwtProvider.java` | Implementar refresh token para sesiones largas |
| 15 | **Email de verificacion** | `AuthServiceImpl.java`, nuevo servicio de email | Enviar email de bienvenida al registrar usuario |
| 16 | **Paginacion real searchOrders** | `SalesServiceImpl.java` | Filtrar en query JPA, no en memoria |
| 17 | **Chatbot con IA** | Nuevo modulo | Python + LangChain para soporte al cliente |
| 18 | **Integracion con pasarela de pagos** | `SalesServiceImpl.java`, nuevo servicio | Wompi/PayU para pagos en Colombia |

### Fase 4: DEPLOY - Configuracion Produccion

| # | Tarea | Archivos a modificar | Notas |
|---|-------|---------------------|-------|
| 19 | **Variables de entorno para produccion** | `application.properties` | Mover MySQL config, JWT secret, y demas a variables de entorno (`${DB_URL}`, `${JWT_SECRET}`, etc.) |
| 20 | **CORS para produccion** | `SecurityConfig.java` | Agregar dominio de Vercel a `setAllowedOrigins` |
| 21 | **JWT Secret seguro** | `application.properties`, `JwtProvider.java` | Asegurar que uses `${JWT_SECRET}` sin fallback a valor por defecto |

---

## Contextos Delimitados

1. **Catalogo y Productos**
   - Gestion de productos y categorias
   - Busqueda y filtrado
   - Gestion de precios y descuentos

2. **Ventas y Pedidos**
   - Procesamiento de ordenes
   - Gestion del carrito
   - Seguimiento de pedidos

3. **Clientes y Autenticacion**
   - Registro y autenticacion
   - Gestion de perfiles
   - Direcciones de envio

4. **Promociones y Descuentos**
   - Codigos promocionales
   - Validacion y aplicacion
   - Historial de uso

5. **Gestion de Envios**
   - Calculo de costos
   - Zonas de envio
   - Preferencias de usuario

## Decisiones Tecnicas
1. **Arquitectura Hexagonal** - Separacion clara de responsabilidades
2. **Repository Pattern** - Acceso a datos abstraido
3. **DTO Pattern** - Inmutabilidad y separacion entre capas
4. **Service Layer Pattern** - Logica de negocio centralizada
5. **Adapter Pattern** - Conexion entre dominio e infraestructura
6. **JWT Stateless** - Sin sesiones en servidor, ideal para escalabilidad

## Credenciales de Prueba
| Rol | Email | Password |
|-----|-------|----------|
| ADMIN | admin@astrosetups.com | Admin123* |
| SUPER_ADMIN | superadmin@astrosetups.com | SuperAdmin123* |
| CLIENT | cliente@astrosetups.com | Cliente123* |
