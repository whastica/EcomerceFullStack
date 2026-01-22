# 🎮 GamerStore

> Plataforma e-commerce personalizada para tienda de productos gaming

[![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow)]()
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)]()
[![React](https://img.shields.io/badge/React-18-blue)]()
[![Proyecto](https://img.shields.io/badge/tipo-freelance-orange)]()

---

## 📖 Sobre el Proyecto

### Contexto del Cliente

**Cliente:** Tienda de productos gaming en Colombia  
**Necesidad:** Migración de plataforma CMS (Shopify/WooCommerce) a solución custom  
**Objetivo:** Control total de funcionalidades y reducción de costos operativos

**Problema del CMS:**
- Costo: $150 USD/mes ($1,800/año)
- Limitaciones en personalización
- Features bloqueadas tras paywall
- Dependencia de plataforma tercera

**Solución Propuesta:**
- Plataforma custom con control total
- Costo reducido a ~$40/mes (hosting + servicios)
- Ahorro anual: ~$1,300 USD
- Features específicas para el negocio

---

## 🎯 Alcance del Proyecto

### Fase 1: MVP (En Desarrollo) 🚧

**Backend:**
- ✅ API REST con Spring Boot
- ✅ Modelos de datos (Productos, Categorías, Órdenes)
- ✅ Autenticación de administradores
- ✅ CRUD completo de productos
- 🚧 Gestión de inventario en tiempo real
- 🚧 Sistema de órdenes y checkout

**Frontend:**
- ✅ Catálogo de productos con filtros
- ✅ Carrito de compras (localStorage)
- ✅ Página de detalles de producto
- ✅ Diseño responsive
- 🚧 Checkout con pasarela de pagos
- 🚧 Panel de administración

### Fase 2: Producción (Planeada)
- Integración con Wompi/PayU (pagos Colombia)
- Sistema de envíos (Servientrega/Coordinadora)
- Panel admin completo
- Analytics y reportes
- Email marketing integrado

---

## 🛠️ Stack Tecnológico

### Backend
- **Framework:** Spring Boot 3.2.x
- **Lenguaje:** Java 17
- **Base de Datos:** MySQL 8.0
- **ORM:** Spring Data JPA
- **Seguridad:** Spring Security + JWT
- **Documentación:** Swagger/OpenAPI

### Frontend
- **Framework:** React 18
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **State Management:** Context API + useReducer
- **Routing:** React Router v6
- **Forms:** React Hook Form

### Infraestructura
- **Hosting Backend:** Railway
- **Hosting Frontend:** Vercel
- **CDN:** Cloudflare (imágenes)
- **Email:** SendGrid

---

## 📊 Arquitectura del Sistema
```
┌──────────────┐
│   Cloudflare │  ← CDN (Imágenes de productos)
└──────────────┘
        │
        ▼
┌──────────────┐      HTTPS/REST     ┌──────────────┐
│    React     │ ←─────────────────→ │ Spring Boot  │
│   (Vercel)   │                     │  (Railway)   │
└──────────────┘                     └──────────────┘
                                             │
                                             ▼
                                     ┌──────────────┐
                                     │    MySQL     │
                                     │  (Railway)   │
                                     └──────────────┘
```

---

## 🗄️ Modelo de Datos

### Entidades Principales
```sql
Producto
  ├── id (PK)
  ├── nombre
  ├── descripcion
  ├── precio
  ├── stock
  ├── categoria_id (FK)
  ├── imagenes (JSON array)
  └── timestamps

Categoria
  ├── id (PK)
  ├── nombre
  ├── descripcion
  └── imagen_url

Orden
  ├── id (PK)
  ├── usuario_id (FK - opcional para guest checkout)
  ├── estado (PENDIENTE | PAGADO | ENVIADO | ENTREGADO)
  ├── total
  ├── metodo_pago
  ├── direccion_envio (JSON)
  └── timestamps

OrdenItem
  ├── id (PK)
  ├── orden_id (FK)
  ├── producto_id (FK)
  ├── cantidad
  ├── precio_unitario
  └── subtotal
```

---

## 📸 Screenshots

> **Nota:** Por privacidad del cliente, se muestran screenshots con datos de ejemplo

### Catálogo de Productos
![Catalog](docs/images/catalog-demo.png)

### Carrito de Compras
![Cart](docs/images/cart-demo.png)

### Panel de Administración
![Admin](docs/images/admin-demo.png)

---

## 🔐 Seguridad Implementada

- ✅ Contraseñas hasheadas (BCrypt)
- ✅ JWT para autenticación
- ✅ Validación de inputs (backend + frontend)
- ✅ CORS configurado correctamente
- ✅ HTTPS en producción
- ✅ Rate limiting en endpoints críticos
- 🚧 PCI compliance para pagos (en progreso)

---

## 🚀 Instalación (Para Desarrollo)

> **Nota:** El código completo no es público por ser proyecto de cliente. Se muestra proceso general.

### Backend
```bash
# Prerrequisitos: Java 17, MySQL 8

# 1. Configurar base de datos
mysql -u root -p
CREATE DATABASE gamerstore;

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con credenciales

# 3. Ejecutar migraciones
mvn flyway:migrate

# 4. Iniciar servidor
mvn spring-boot:run
```

### Frontend
```bash
# Prerrequisitos: Node.js 18+

# 1. Instalar dependencias
npm install

# 2. Configurar variables
cp .env.example .env
# VITE_API_URL=http://localhost:8080

# 3. Iniciar desarrollo
npm run dev
```

---

## 📈 Métricas del Proyecto

**Tiempo de Desarrollo:** 8 semanas (estimado)  
**Líneas de Código:** ~15,000 (backend + frontend)  
**Endpoints API:** 25+  
**Componentes React:** 40+  
**Cobertura de Tests:** 55% (objetivo: 70%)

---

## 💼 Valor Entregado al Cliente

### Beneficios Técnicos
- ✅ Control total de la plataforma
- ✅ Customización ilimitada
- ✅ Integración con herramientas locales
- ✅ Datos propios (no en plataforma tercera)

### Beneficios Económicos
- ✅ Ahorro: $1,300 USD/año
- ✅ Escalabilidad sin costos ocultos
- ✅ Sin límites de productos o transacciones

### Beneficios de Negocio
- ✅ Features específicas para gaming (ej: pre-órdenes)
- ✅ Programa de puntos personalizado
- ✅ Analytics detallados del negocio

---

## 🎓 Aprendizajes Técnicos

### Desafíos Superados

1. **Gestión de Inventario en Tiempo Real**
   - Problema: Race conditions en stock
   - Solución: Transacciones ACID + locking optimista

2. **Optimización de Imágenes**
   - Problema: Catálogo lento (imágenes pesadas)
   - Solución: CDN + lazy loading + WebP format

3. **Checkout Sin Fricciones**
   - Problema: Alto abandono de carrito
   - Solución: Guest checkout + progreso visual claro

4. **SEO para E-commerce**
   - Server-side rendering para rutas clave
   - Meta tags dinámicos
   - Sitemap XML generado automáticamente

---

## 🗺️ Roadmap

### Q1 2025
- [x] MVP backend
- [x] Catálogo frontend
- [ ] Integración de pagos
- [ ] Launch versión 1.0

### Q2 2025
- [ ] App móvil (React Native)
- [ ] Sistema de fidelización
- [ ] Integración WhatsApp Business

---

## 📝 Notas sobre Privacidad

- Código fuente completo no publicado (proyecto de cliente)
- Screenshots usan datos de ejemplo, no reales
- Funcionalidad core documentada para fines de portfolio

---

## 📬 Contacto

**Tu Nombre**  
Desarrollador Fullstack

- Email: tu@email.com  
- LinkedIn: [linkedin.com/in/tuusuario](https://linkedin.com/in/tuusuario)  
- Portfolio: [tuportfolio.com](https://tuportfolio.com)

*¿Interesado en un proyecto similar? Contáctame.*

---

<p align="center">
  Desarrollado con 💻 y ☕ para [Cliente]
</p>
