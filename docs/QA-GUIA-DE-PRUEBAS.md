# 🧪 Astro Setups — Guía de Pruebas (QA Manual)

> **Objetivo:** verificar la funcionalidad completa de la tienda y el panel admin antes de la
> prueba con grupo cerrado. El feedback de ese grupo debe ser de **diseño**, no de errores.
> **Pruebas unitarias y de calidad automatizada:** fuera de alcance por ahora (fase posterior).
>
> **Fecha de ejecución de la Suite A:** 2026-10-01 · **Resultado:** 44/46 PASS · 2 defectos bloqueantes.
> **Ejecutor Suite A:** automatizada (script) · **Suites B/C/D:** manual (checklist en este documento).

---

## 0. Preparación del entorno

| Componente | Cómo levantarlo | URL / Puerto |
|---|---|---|
| Backend | En `astrosetupsback/`: `mvn compile` y luego `mvn spring-boot:run` | `http://localhost:8081` |
| Frontend | En `astroSetupsFrontend/`: `npm run dev` | `http://localhost:5173` |
| Base de datos | MySQL 8 local (`astrosetupsdb`, root/root). El `data.sql` se ejecuta solo al arrancar el back | `localhost:3306` |

**Credenciales**

| Rol | Email | Password | Uso |
|---|---|---|---|
| ADMIN | `admin@astrosetups.com` | `Admin123*` | Panel admin completo |
| SUPER_ADMIN | `superadmin@astrosetups.com` | `SuperAdmin123*` | Prueba de permisos |
| CLIENT | `cliente@astrosetups.com` | `Cliente123*` | Prueba de guards de rol |

**Requisitos de la sesión de prueba**
- Usar siempre `http://localhost:5173` (no `127.0.0.1` — CORS solo permite `localhost`).
- Tener DevTools abierto (pestañas **Network** y **Console**) durante las Suites B/C.
- Empezar con **logout** (o ventana de incógnito) para flujos guest.
- Los datos del seed: ~19 usuarios, 26 pedidos, 112 productos, 7 promociones (`ASTRO15`, `FLASH30`, `GAMER10`, `NUEVO20`, `BIENVENIDO`, `VERANO25`).

**Convención de resultados:** marca ✅ (funciona), ❌ (falla) o ⚠️ (funciona con observación) en las tablas. Los IDs `B3.2`, etc., se usan también en la tabla de defectos.

---

## Suite A — API (ejecutada de forma automatizada)

Ejecutada el **2026-10-01** contra `localhost:8081`. Script re-ejecutable: `docs/qa-suite-a.ps1`
(`powershell -NoProfile -ExecutionPolicy Bypass -File docs\qa-suite-a.ps1`).

### Resultados

| ID | Prueba | Resultado | Detalle |
|---|---|---|---|
| A1.1 | Login admin → 200 + role ADMIN | ✅ | role=ADMIN |
| A1.2 | Login cliente → 200 + token | ✅ | |
| A1.3 | Login contraseña incorrecta → 401 | ✅ | 401 |
| A1.4 | Registro usuario nuevo → 201 | ✅ | 201 |
| A1.5 | Registro email duplicado → 4xx | ❌ | **500** → defecto **M1** |
| A1.6 | GET /auth/me con token admin | ✅ | 200 |
| A2.1 | Búsqueda pública de productos (≥112) | ✅ | total=112 |
| A2.2 | Público NO ve productos inactivos | ✅ | 0 inactivos |
| A2.3 | Filtro de texto `query=tarjeta` | ✅ | total=10 |
| A2.4 | Filtro `hasDiscount` (≥12) | ✅ | total=12 |
| A2.5 | Detalle de producto | ✅ | 200 |
| A2.6 | Productos relacionados | ✅ | 200 |
| A2.7 | Listado de categorías | ✅ | 200 |
| A3.1 | Checkout **sin token** (invitado) | ❌ | **403** → defecto **B1** |
| A3.2 | Checkout con sesión + `guestShippingAddress` | ✅ | 200, order 1020 |
| A3.3 | Detalle del pedido creado | ✅ | 200 |
| A3.4 | Pedido con producto inexistente → 4xx | ✅ | 404 |
| A4.1 | Validar cupón `ASTRO15` (body correcto) | ✅ | valid=true |
| A4.2 | Validar cupón inexistente → invalid | ✅ | valid=false |
| A5.1 | Admin: crear producto | ✅ | id=114 |
| A5.2 | Admin: ver productos inactivos con `active=false` | ✅ | 1 inactivo |
| A5.3 | Admin: actualizar producto | ✅ | 200 |
| A5.4 | Admin: producto actualizado aparece en búsqueda | ✅ | 1 |
| A5.5 | Admin: eliminar producto | ✅* | 204 (re-verificado tras reinicio del back) |
| A5.6 | Eliminar producto inexistente → 404 | ✅* | 404 (re-verificado) |
| A6.1 | Búsqueda de pedidos (≥25) | ✅ | total=26 |
| A6.2 | Filtro `status=PENDING` | ✅ | 7 pendientes |
| A6.3 | Transición PENDING → IN_PREPARATION | ✅ | 200 |
| A6.4 | Estadísticas de ventas | ✅* | 200 (re-verificado) |
| A6.5 | Serie de ventas 7d = 7 puntos | ✅* | 200 (re-verificado) |
| A7.1 | Búsqueda de clientes (≥18) | ✅ | total=19 |
| A7.2 | Filtro `role=ADMIN` | ✅ | 2 admins |
| A7.3 | Estadísticas de clientes | ✅* | 200 (re-verificado) |
| A7.4 | Perfil de cliente | ✅* | 200 (re-verificado) |
| A7.5 | Cambiar estado de cliente INACTIVE↔ACTIVE | ✅ | 200/200 |
| A8.1 | Búsqueda de cupones (≥6) | ✅ | total=7 |
| A8.2 | Estadísticas de cupones | ✅* | 200 (re-verificado) |
| A8.3 | Crear cupón | ✅ | 200 |
| A8.4 | Actualizar cupón | ✅ | 200 |
| A8.5 | Eliminar cupón | ✅* | 204 (re-verificado) |
| A9.1 | Endpoint admin sin token → 401/403 | ✅ | 403 |
| A9.2 | Token CLIENT en endpoint admin → 403 | ✅ | 403 |
| A9.3 | Token CLIENT en /sales/stats → 403 | ✅* | 403 (re-verificado) |
| A9.4 | Token CLIENT borrando producto → 403 | ✅ | 403 |
| A9.5 | Serie sin token → 401/403 | ✅ | 403 |
| A10.1 | CORS preflight desde `localhost:5173` | ✅ | ACAO correcto |

`*` = falló durante la primera ejecución por un **reinicio del back** en mitad de la suite; re-verificado después con token fresco → PASS.

**Resumen Suite A: 44 PASS / 2 FAIL** → los 2 FAIL son defectos reales (M1 y B1, ver sección de defectos).

**Limpieza aplicada:** productos y cupones de prueba (QA) eliminados; usuario `qatest*@test.com` dado de baja (DELETED). Queda 1 pedido de prueba (#1020, estado IN_PREPARATION) — descartable.

---

## Suite B — Tienda (navegador)

> Requiere sesión abierta en `http://localhost:5173` con DevTools. Marca ✅/❌/⚠️.

### B1 — Home (`/`)

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| B1.1 | Abrir `/` | Carga carrusel, banner de promoción, grid de categorías, sección FAQ y "Explora nuestros productos" | |
| B1.2 | Click en una categoría del home | Llega a `/catalog?categoryTypeId=...` filtrado | |
| B1.3 | Click en "Promociones" en el navbar | Lista de productos con descuento (12/pág) | |
| B1.4 | Consola del navegador | Sin errores rojos | |

### B2 — Catálogo (`/catalog`)

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| B2.1 | Abrir `/catalog` | Grid de productos (20/pág), sidebar de filtros, paginación | |
| B2.2 | Seleccionar categoría principal y luego subcategoría | Selección exclusiva tipo↔subcategoría (radio) | |
| B2.3 | Mover el rango de precios (0–5.000.000) | Lista filtrada en vivo | |
| B2.4 | Cambiar los 4 órdenes (recientes/antiguos/precio asc/desc) | Reordena correctamente | |
| B2.5 | Click "Limpiar filtros" | Vuelve a la lista completa | |
| B2.6 | Buscar en el **SearchBox del sidebar** con término sin resultados | Muestra estado vacío "No se encontraron productos" | |
| B2.7 | Paginar a la página 2 y volver | Funciona | |
| B2.8 | Con un filtro sin resultados | Estado vacío (no error) | |

### B3 — Buscador del navbar

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| B3.1 | Escribir "tarjeta" en el buscador del header y Enter | **Esperado:** catálogo filtrado en `/catalog?q=...`. **Defecto M2 conocido:** navega a `/products?q=` (ruta inexistente → pantalla con solo navbar/footer). Marcar ❌ si ocurre | |

### B4 — Detalle de producto (`/product/{id}`)

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| B4.1 | Abrir un producto desde el catálogo | Imagen, precio, descripción, stock, cantidad, botones | |
| B4.2 | Sección de relacionados | Muestra productos de la misma categoría | |
| B4.3 | "Añadir al carrito" | Toast `"<nombre>" fue añadido al carrito 🛒` + contador del icono sube | |
| B4.4 | Cantidad < 1 | Toast "La cantidad mínima es 1" | |
| B4.5 | "Comprar ahora" | Navega directo a `/checkout` con el ítem | |

### B5 — Carrito (`/cart`)

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| B5.1 | Abrir `/cart` con 2+ productos | Subtotales por línea y total correctos | |
| B5.2 | Cambiar cantidades | Total se recalcula | |
| B5.3 | Eliminar un producto | Toast "Producto eliminado del carrito" | |
| B5.4 | Carrito vacío | Estado vacío con CTA "Ver productos" | |
| B5.5 | "Insertar código de descuento" + vacío | Toast de error | |
| B5.6 | Ingresar `ASTRO15` y validar | **Defecto M3 conocido:** solo `toast.info('Código ingresado...')`, no valida ni aplica. Marcar ❌ | |
| B5.7 | Click "Ir a pagar" | Navega a `/checkout` | |

### B6 — Checkout (`/checkout`) — **flujo crítico**

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| B6.1 | Abrir `/checkout` con carrito vacío | "No hay productos en el carrito" | |
| B6.2 | Paso 1 sin nombre/email → Continuar | Toast "Por favor completa todos los campos obligatorios" | |
| B6.3 | Paso 1 completo → Paso 2 (dirección) | Navega correctamente, botón Atrás funciona | |
| B6.4 | Paso 2 completo → Paso 3 (pago) | Select con 5 métodos: contra entrega (default), tarjeta, PSE, PayPal, MercadoPago | |
| B6.5 | Seleccionar "tarjeta" | Aparecen campos de tarjeta (no se envían, es simulado) | |
| B6.6 | Revisar resumen: subtotal < $500.000 | Envío $25.000; ≥ $500.000 → "Gratis" con barra de progreso | |
| B6.7 | Revisar IVA en el resumen | **Defecto M4 conocido:** el IVA 19% se muestra pero NO se suma al Total. Marcar ⚠️ | |
| B6.8 | **Sin sesión** → "Realizar Pedido" | **Defecto B1 (BLOQUEANTE):** la compra falla (back devuelve 403, la tienda no puede vender a invitados). Marcar ❌ | |
| B6.9 | **Con sesión** (login admin/cliente) → "Realizar Pedido" | **Defecto B2 (BLOQUEANTE):** falla con "Se requiere una dirección de envío" (el front no envía `guestShippingAddress`). Marcar ❌ | |
| B6.10 | Si B6.8/B6.9 se arreglan: verificar toast "¡Pedido realizado con éxito! 🎉", carrito vacío, redirect a `/` en 2s, y el pedido nuevo en `/admin/orders` | ✅ | |

### B7 — Registro y sesión

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| B7.1 | `/register` con contraseña < 8 o sin mayúscula/número | Errores en línea, no envía | |
| B7.2 | Registro con contraseñas que no coinciden | Error en línea | |
| B7.3 | Registro válido | Toast "Cuenta creada exitosamente" + queda autenticado en navbar | |
| B7.4 | Registro con email ya existente | **Defecto M1:** backend responde 500 (debería ser 409). El front muestra toast de error genérico. Marcar ⚠️ | |
| B7.5 | `/login` con credenciales mal | Toast "Credenciales inválidas" | |
| B7.6 | `/login` correcto | Toast "Bienvenido, {nombre}" | |
| B7.7 | Logout desde el navbar | Toast "Sesión cerrada", el menú desaparece | |

### B8 — Páginas secundarias

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| B8.1 | `/contact` → enviar formulario | **Defecto m3:** no envía nada (solo `console.log`). Botón WhatsApp sí funciona | |
| B8.2 | `/tracking` | **Defecto m2:** página "🚧 En construcción" | |
| B8.3 | `/privacy-policies` y `/conditions` | Páginas estáticas cargan | |
| B8.4 | URL inexistente (ej. `/esto-no-existe`) | **Defecto m5:** muestra solo navbar + footer (no hay página 404) | |

---

## Suite C — Panel Admin (navegador)

> Login con `admin@astrosetups.com` / `Admin123*` → entra a `/admin/dashboard`.

### C1 — Dashboard

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| C1.1 | Abrir `/admin/dashboard` | Tarjetas KPI con valores reales (ventas, pedidos, clientes, etc.) — sin datos en 0 | |
| C1.2 | Gráfico de serie de ventas | Renderiza con datos; cambiar 7d/30d/90d cambia el gráfico | |
| C1.3 | "Últimos pedidos" y "Best sellers" | Listas pobladas | |
| C1.4 | Sin errores en consola / Network | Sin respuestas 4xx/5xx | |

### C2 — Productos (`/admin/products`)

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| C2.1 | KPIs de stock y tabla | Totales coherentes (112 productos) | |
| C2.2 | Buscar por nombre | Resultados con debounce | |
| C2.3 | Filtros: categoría, activo/inactivo, stock mín/máx | Filtran correctamente | |
| C2.4 | "Agregar producto" sin nombre o precio | Validación "Nombre y precio son obligatorios" | |
| C2.5 | Crear producto completo | Toast "Producto creado" + aparece en la lista | |
| C2.6 | Editar producto (cambiar precio) | Toast "Producto actualizado" | |
| C2.7 | Botón power (activar/desactivar) | Badge de estado cambia + toast | |
| C2.8 | Eliminar → modal de confirmación → confirmar | Se elimina y desaparece | |
| C2.9 | Cancelar en el modal | No elimina | |
| C2.10 | Paginación | Funciona | |

### C3 — Pedidos (`/admin/orders`)

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| C3.1 | Lista de pedidos | Poblada (>25), badges de estado con colores | |
| C3.2 | Buscar por nombre/email de cliente | Filtra | |
| C3.3 | Filtro por estado | Filtra (PENDING, IN_PREPARATION, SHIPPED, DELIVERED, CANCELLED) | |
| C3.4 | Ojo (detalle) | Modal con ítems, totales, cliente, dirección | |
| C3.5 | "Cambiar Estado" PENDING → IN_PREPARATION con observación | Toast "Estado de orden actualizado" + badge actualizado | |
| C3.6 | Cambio inválido (ej. DELIVERED → PENDING) | **Defecto m1:** backend responde 500 (debería ser 400). Marcar ⚠️ | |
| C3.7 | Paginación | Funciona | |

### C4 — Clientes (`/admin/users`)

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| C4.1 | Lista de usuarios | Poblada (~19), con rol, estado, verificado | |
| C4.2 | Buscar (debounce 300ms) | Filtra | |
| C4.3 | Filtros de rol y estado | Filtran | |
| C4.4 | Ojo (ver perfil) | Modal con datos, pedidos y direcciones de envío | |
| C4.5 | Botón power en un CLIENT | Activa/Desactiva + toast "Estado del cliente actualizado" | |
| C4.6 | Verificar badge de "verificado" en verde lime | Color lime `#d6ff3c` (Fase 3) | |

### C5 — Promociones (`/admin/promotions`)

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| C5.1 | Lista de cupones + KPIs | 6+ cupones del seed con stats | |
| C5.2 | Crear cupón válido (código MAYÚSCULAS/números, % ) | Toast "Código promocional creado" | |
| C5.3 | Crear con código con minúsculas | Validación de formato | |
| C5.4 | Editar cupón (cambiar %) | Toast de actualización | |
| C5.5 | Activar/desactivar | Badge cambia | |
| C5.6 | Eliminar → confirmación | Se elimina | |
| C5.7 | Filtros y paginación | Funcionan | |

### C6 — Reportes (`/admin/reports`)

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| C6.1 | KPIs de reportes | Valores reales | |
| C6.2 | Gráfico de barras por estado | Renderiza | |
| C6.3 | Gráfico de 30 días | Renderiza con datos | |
| C6.4 | Top de cupones usados | Ranking poblado | |
| C6.5 | Resumen de clientes | Coherente con C4 | |

### C7 — Seguridad y guards

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| C7.1 | Abrir `/admin/dashboard` **sin sesión** | Redirect a `/login` | |
| C7.2 | Login con `cliente@astrosetups.com` y abrir `/admin` | Redirect a `/` (home) | |
| C7.3 | Login `superadmin@astrosetups.com` → admin | Entra al panel (nota: algunos endpoints solo aceptan rol ADMIN — ver defecto **M5** si hay 403) | |
| C7.4 | Con sesión admin, ir a `/admin/ruta-inexistente` | **Defecto m5:** layout sin contenido (no hay catch-all) | |
| C7.5 | Recargar con F5 estando en `/admin/orders` | Debe mantener la sesión (si redirige a login sin razón → ⚠️) | |
| C7.6 | Logout desde el header del admin | Vuelve a `/login` | |

---

## Suite D — Calidad visual y transversal

| ID | Paso | Resultado esperado | ✅/❌ |
|---|---|---|---|
| D1.1 | Badge "Entregado" y "Activo" en tablas admin | Color **lime** `#d6ff3c`, no esmeralda | |
| D1.2 | KPIs con tendencia positiva (dashboard/reportes) | Delta en lime; negativo en rojo | |
| D1.3 | Superficies del admin (sidebar, header, cards, tablas) | Grises de la paleta (`#010101`, `#111111`, `#1a1a1a`, `#333333`) — sin hex sueltos en `admin.css` | |
| D1.4 | Botón de acción primaria | Naranja `--color-brand` | |
| D1.5 | Stock OK en productos | Texto lime | |
| D2.1 | Toasts en toda la app (añadir, eliminar, crear, actualizar) | Aparecen arriba, tipo success/error, no se pisan | |
| D3.1 | Estados de carga | Skeletons en tablas admin; LoadingState en catálogo | |
| D3.2 | Estados de error | `ErrorState` en catálogo y detalle (admin: ver defecto **M4**) | |
| D4.1 | DevTools Console en todo el recorrido | Sin errores rojos (warnings aceptables) | |
| D4.2 | Network | Sin peticiones fallidas inesperadas (4xx/5xx) durante flujos sanos | |
| D5.1 | Build de producción: `npm run build` | Compila sin errores (tsc + vite) | |
| D5.2 | `npm run lint` | 0 errores (2 warnings preexistentes aceptados) | |
| D6.1 | Responsive: 1280px, 768px, 390px | Admin: sidebar colapsa; tienda: navbar hamburguesa; sin elementos cortados | |

---

## Registro de defectos (conocidos al iniciar las pruebas)

> Decisión: **solo documentar** (los arreglos se priorizan después de este pase).

| ID | Severidad | Área | Descripción | Evidencia |
|---|---|---|---|---|
| **B1** | 🔴 Bloqueante | Checkout | La compra como **invitado** es imposible: `POST /api/sales/orders` sin token → **403** (SecurityConfig no lo permite y el front invita a comprar sin sesión) | Suite A A3.1 |
| **B2** | 🔴 Bloqueante | Checkout | La compra **con sesión** falla con 500 "Se requiere una dirección de envío": el front no envía el campo `guestShippingAddress` que exige `SalesServiceImpl:714-717` | Suite A (manual) |
| **M1** | 🟠 Mayor | Registro | Registro con email duplicado → **500** en vez de 409/400 (excepción sin manejar) | Suite A A1.5 |
| **M2** | 🟠 Mayor | Navbar | Buscador del header navega a `/products?q=...` → **ruta inexistente → pantalla en blanco** (debe ser `/catalog`) — `SearchBar.tsx:12` | Inspección de código |
| **M3** | 🟠 Mayor | Cupones tienda | El cupón **no funciona en la tienda**: en carrito solo hace `toast.info` sin llamar a la API; en checkout el botón "Aplicar" **no tiene onClick**. El back sí tiene `POST /promotions/codes/validate` | Inspección de código |
| **M4** | 🟠 Mayor | Resumen | El IVA 19% **se muestra pero no se suma al Total** y no viaja al backend — `Ordersummary.tsx:41-43` | Inspección de código |
| **M5** | 🟠 Mayor | Seguridad/UX | El back responde **403 sin `AuthenticationEntryPoint`** ante tokens ausentes/expirados (debería 401); el interceptor del front solo reacciona a 401 y las páginas admin pintan el error como "lista vacía" (sin `isError`) | Inspección de código |
| **m1** | 🟡 Menor | Pedidos admin | Transición de estado inválida → **500** en vez de 400/409 | Suite A (manual) |
| **m2** | 🟡 Menor | Tienda | `/tracking` es "🚧 En construcción" (sin seguimiento real de pedidos) | Inspección |
| **m3** | 🟡 Menor | Contacto | Formulario de contacto no envía nada (`console.log`) | Inspección |
| **m4** | 🟡 Menor | UI | Botones sin handler: "CAMBIAR" (envío) en checkout, "Mi perfil" en header admin | Inspección |
| **m5** | 🟡 Menor | Navegación | Sin ruta catch-all: URLs inexistentes muestran navbar+footer (ni 404 ni redirect) | Inspección |
| **m6** | 🟡 Menor | Cliente | No existe "Mis pedidos" / cuenta de cliente en la tienda (solo el admin ve pedidos) | Inspección |
| **m7** | 🟡 Menor | Carrito | Carrito 100% `localStorage` (no usa el carrito guest del back); sin sincronización entre dispositivos | Inspección |

---

## Criterios de salida (Go / No-Go) para el grupo cerrado

| Condición | Estado |
|---|---|
| Suite A: ≥95% PASS | ✅ 96% (44/46) |
| **Sin defectos bloqueantes (B1, B2)** | ❌ **No listo** — el flujo de compra está roto en la UI |
| M2 (buscador roto) y M3 (cupón inerte) corregidos | ❌ Pendiente de decisión |
| Suites B/C/D completadas sin errores en flujos críticos | ⏳ Pendiente (checklist de este documento) |
| Build y lint limpios | ✅ |

**Recomendación:** corregir **B1, B2 y M2** antes del grupo cerrado (son los tres que un usuario detecta en los primeros 2 minutos). M3/M4/M5 pueden ir en el primer sprint de feedback; los menores al backlog.

---

## Cómo re-ejecutar la Suite A

```powershell
# 1. Back y front arriba (ver sección 0)
# 2. Ejecutar:
powershell -NoProfile -ExecutionPolicy Bypass -File docs\qa-suite-a.ps1
# 3. Resultados por consola + CSV en %TEMP%\opencode\suite-a-results.csv
```

> Nota: la suite crea y limpia datos de prueba (usuarios `qatest*`, productos "QA Producto Test",
> cupones `QATEST*`). Si el back se reinicia a mitad de ejecución, re-ejecutar: los FAIL intermitentes
> (`status=0`/403) suelen deberse a ese reinicio.
