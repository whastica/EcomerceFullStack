# Astro Setups - Contexto del Proyecto

## Descripción del Negocio
Astro Setups es una tienda en línea de productos de hardware que opera bajo un modelo de intermediación, sin stock propio. La plataforma conecta clientes con proveedores, facilitando la compra de productos sin necesidad de manejar inventario directamente.

### Funcionalidades Principales
- Exploración de catálogo con filtros avanzados
- Consulta de especificaciones técnicas y comparación de productos
- Compra rápida sin registro o con cuenta
- Aplicación de códigos promocionales
- Seguimiento de pedidos
- Gestión administrativa del catálogo, clientes, pedidos y promociones

## Arquitectura Técnica

### Frontend
- React + TypeScript
- Tailwind CSS
- Estilo visual similar a MercadoLibre pero más minimalista
- Arquitectura basada en componentes

### Backend
- Spring Boot
- Arquitectura Hexagonal
- Base de datos MySQL
- Dependencias principales:
  - Spring Web
  - Spring Security
  - Spring Data JPA
  - Lombok
  - MySQL

### Estructura del Proyecto
```
application/
├── dto/                    # DTOs organizados por contexto
│   ├── catalog/           # Catálogo y Productos
│   ├── sales/            # Ventas y Pedidos
│   ├── customer/         # Clientes y Autenticación
│   ├── promotion/        # Promociones y Descuentos
│   ├── shipping/         # Gestión de Envíos
│   └── common/           # DTOs comunes
├── interfaces/           # Interfaces de servicios
└── services/            # Implementaciones de servicios

domain/
├── model/               # Entidades del dominio
└── repository/         # Interfaces de repositorios

infra/
├── config/             # Configuraciones
├── repository/         # Implementaciones JPA
└── adapters/          # Adaptadores de infraestructura
```

## Estado Actual de Implementación

### Completado
1. **Modelo de Dominio**
   - Entidades principales implementadas
   - Relaciones entre entidades definidas
   - Enums y tipos de datos definidos

2. **Repositorios**
   - Interfaces de repositorios en el dominio
   - Implementaciones JPA en infraestructura
   - Adaptadores para la conexión entre capas

3. **DTOs**
   - DTOs de entrada y salida para todos los contextos
   - DTOs para operaciones específicas
   - DTOs comunes y de utilidad

4. **Servicios**
   - Interfaces de servicios definidas
   - Implementaciones base de servicios creadas
   - CatalogServiceImpl completamente implementado

### En Progreso
1. **Servicios**
   - Implementación de la lógica de negocio en los servicios restantes
   - Validaciones y manejo de errores
   - Transacciones y concurrencia

### Pendiente
1. **Controladores**
   - Implementación de endpoints REST
   - Manejo de seguridad
   - Documentación de API

2. **Seguridad**
   - Configuración de Spring Security
   - Autenticación y autorización
   - Manejo de roles y permisos

3. **Mejoras Futuras**
   - Chatbot con IA (Python + LangChain)
   - Integración con sistemas de pago
   - Sistema de notificaciones

## Contextos Delimitados
1. **Catálogo y Productos**
   - Gestión de productos y categorías
   - Búsqueda y filtrado
   - Gestión de precios y descuentos

2. **Ventas y Pedidos**
   - Procesamiento de órdenes
   - Gestión del carrito
   - Seguimiento de pedidos

3. **Clientes y Autenticación**
   - Registro y autenticación
   - Gestión de perfiles
   - Direcciones de envío

4. **Promociones y Descuentos**
   - Códigos promocionales
   - Validación y aplicación
   - Historial de uso

5. **Gestión de Envíos**
   - Cálculo de costos
   - Zonas de envío
   - Preferencias de usuario

## Decisiones Técnicas
1. **Arquitectura Hexagonal**
   - Separación clara de responsabilidades
   - Independencia de frameworks
   - Facilidad de testing

2. **Patrones de Diseño**
   - Repository Pattern
   - DTO Pattern
   - Service Layer Pattern
   - Adapter Pattern

3. **Buenas Prácticas**
   - Inmutabilidad en DTOs
   - Manejo de transacciones
   - Validaciones en capa de servicio
   - Conversión explícita entre capas

## Próximos Pasos
1. Completar la implementación de los servicios restantes
2. Implementar los controladores REST
3. Configurar la seguridad
4. Implementar pruebas unitarias y de integración
5. Documentar la API 