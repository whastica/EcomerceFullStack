-- ============================================================
-- SEEDER: Usuarios iniciales para Astro Setups
-- Se ejecuta automáticamente al iniciar el backend
-- (spring.sql.init.mode=always)
-- ============================================================

-- ADMIN: admin@astrosetups.com / Admin123*
INSERT IGNORE INTO users (first_name, last_name, email, phone, role, status, verified, password_hash, created_at)
VALUES ('Admin', 'Astro', 'admin@astrosetups.com', '3000000001', 'ADMIN', 'ACTIVE', true,
        '$2b$10$k7L55m2bQWbojxxqCzVPB.b5V72t94yUVqiRrASK0zmSi2qR1uGc2',
        NOW());

-- SUPER_ADMIN: superadmin@astrosetups.com / SuperAdmin123*
INSERT IGNORE INTO users (first_name, last_name, email, phone, role, status, verified, password_hash, created_at)
VALUES ('Super', 'Admin', 'superadmin@astrosetups.com', '3000000002', 'SUPER_ADMIN', 'ACTIVE', true,
        '$2b$10$QXwlKJMd1vL8eUrfBcblO.z2aQU97.soeCUa7Eeyjz1f0jz4/qG4C',
        NOW());

-- CLIENT: cliente@astrosetups.com / Cliente123*
INSERT IGNORE INTO users (first_name, last_name, email, phone, role, status, verified, password_hash, created_at)
VALUES ('Cliente', 'Test', 'cliente@astrosetups.com', '3000000003', 'CLIENT', 'ACTIVE', true,
        '$2b$10$x2SwgOhBEHC0m/PHKpC83eOopNYXIKkVXj8WU7EvGRuEh0MGTE6MK',
        NOW());

-- Productos destacados por categoría (1-2 por categoría principal)
UPDATE products SET is_featured = true WHERE product_id IN (58, 59, 93, 92, 71, 74, 18, 35, 9, 1, 13, 53, 86, 24, 100, 42, 51);

-- Categoría adicional para el home (category_types)
-- NOT EXISTS en lugar de INSERT IGNORE: category_types no tiene clave única,
-- así cada arranque creaba un duplicado nuevo de "Lámparas LED".
INSERT INTO category_types (name)
SELECT 'Lámparas LED' FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM category_types WHERE name = 'Lámparas LED');

-- ============================================================
-- SEEDER: Normalización de categorías del catálogo (sidebar)
-- Idempotente: se ejecuta en cada arranque sin duplicar nada.
-- Mantiene la estructura que espera el frontend:
--   Memorias Ram      → DDR4, DDR5
--   Tarjetas Gráficas → Radeon, Nvidia
--   Procesadores        → Intel, AMD
--   Tarjetas Madres     → Intel, AMD
--   Refrigeración       → Disipador, Refrigeración Líquida, Ventiladores
--   Almacenamiento SSD  → SATA, M.2
--   Monitores           → Full HD (1920x1080), QHD (2560x1440)
--   Fuentes de Poder   → Modular, No Modular
--   Periféricos        → Mouse, Teclado, Diademas, Parlantes, Micrófonos
-- ============================================================

-- 1) Subcategorías faltantes -------------------------------------------------

-- Memorias Ram → DDR4
INSERT INTO categories (name, category_type_id, slug)
SELECT 'DDR4', ct.category_type_id, 'ddr4'
FROM category_types ct
WHERE ct.name = 'Memorias Ram'
  AND NOT EXISTS (
    SELECT 1 FROM categories c
    WHERE c.category_type_id = ct.category_type_id AND c.name = 'DDR4'
  );

-- Periféricos → Micrófonos
INSERT INTO categories (name, category_type_id, slug)
SELECT 'Micrófonos', ct.category_type_id, 'microfonos'
FROM category_types ct
WHERE ct.name = 'Periféricos'
  AND NOT EXISTS (
    SELECT 1 FROM categories c
    WHERE c.category_type_id = ct.category_type_id AND c.name = 'Micrófonos'
  );

-- 2) Productos mal clasificados dentro de "Memorias Ram" ---------------------

-- 2.1 Placas base → Tarjetas Madres / Intel o AMD
UPDATE products p
JOIN categories src ON src.category_id = p.category_id
JOIN category_types src_type
      ON src_type.category_type_id = src.category_type_id AND src_type.name = 'Memorias Ram'
JOIN category_types dst_type ON dst_type.name = 'Tarjetas Madres'
JOIN categories dst
      ON dst.category_type_id = dst_type.category_type_id
     AND dst.name = ( CASE
                        WHEN LOWER(p.name) LIKE '%intel%' THEN 'Intel'
                        WHEN LOWER(p.name) LIKE '%amd%'   THEN 'AMD'
                        ELSE NULL
                      END )
SET p.category_id = dst.category_id
WHERE LOWER(p.name) LIKE '%placa base%'
   OR LOWER(p.name) LIKE '%placa madre%'
   OR LOWER(p.name) LIKE '%motherboard%'
   OR LOWER(p.name) LIKE '%b650%'
   OR LOWER(p.name) LIKE '%b850%'
   OR LOWER(p.name) LIKE '%b550%'
   OR LOWER(p.name) LIKE '%a620%'
   OR LOWER(p.name) LIKE '%x670%'
   OR LOWER(p.name) LIKE '%x870%'
   OR LOWER(p.name) LIKE '%b660%'
   OR LOWER(p.name) LIKE '%b760%'
   OR LOWER(p.name) LIKE '%z790%'
   OR LOWER(p.name) LIKE '%z690%'
   OR ( ( LOWER(p.name) LIKE '%am5%' OR LOWER(p.name) LIKE '%am4%' )
        AND LOWER(p.name) NOT LIKE '%ram%'
        AND LOWER(p.name) NOT LIKE '%sodimm%' );

-- 2.3 Memorias DDR4 → Memorias Ram / DDR4
UPDATE products p
JOIN categories src ON src.category_id = p.category_id
JOIN category_types src_type
      ON src_type.category_type_id = src.category_type_id AND src_type.name = 'Memorias Ram'
JOIN categories dst
      ON dst.category_type_id = src_type.category_type_id AND dst.name = 'DDR4'
SET p.category_id = dst.category_id
WHERE p.name LIKE '%DDR4%'
  AND LOWER(p.name) NOT LIKE '%placa%';

-- 2.4 Accesorios de fuente de poder → Fuentes de Poder / Modular
UPDATE products p
JOIN categories src ON src.category_id = p.category_id
JOIN category_types src_type
      ON src_type.category_type_id = src.category_type_id AND src_type.name = 'Memorias Ram'
JOIN category_types dst_type ON dst_type.name = 'Fuentes de Poder'
JOIN categories dst
      ON dst.category_type_id = dst_type.category_type_id AND dst.name = 'Modular'
SET p.category_id = dst.category_id
WHERE p.name LIKE '%PSU%'
   OR p.name LIKE '%fuente de poder%'
   OR LOWER(p.name) LIKE '%fuente de alimentaci%';

-- 3) "Memorias Ram" solo puede tener DDR4 y DDR5 (borra el resto si está vacía)
DELETE c
FROM categories c
JOIN category_types ct
      ON ct.category_type_id = c.category_type_id AND ct.name = 'Memorias Ram'
LEFT JOIN products p ON p.category_id = c.category_id
WHERE c.name NOT IN ('DDR4', 'DDR5')
  AND p.category_id IS NULL;

-- 4) Elimina category_types duplicados que no tengan categorías asociadas
DELETE ct
FROM category_types ct
JOIN category_types keep
      ON keep.name = ct.name
     AND keep.category_type_id < ct.category_type_id
LEFT JOIN categories c ON c.category_type_id = ct.category_type_id
WHERE c.category_id IS NULL;

-- 5) Nombres de subcategoría alineados con la estructura del sidebar ----------
UPDATE categories c
JOIN category_types ct ON ct.category_type_id = c.category_type_id
SET c.name = CASE
               WHEN ct.name = 'Procesadores' AND c.name = 'Procesadores Intel' THEN 'Intel'
               WHEN ct.name = 'Procesadores' AND c.name = 'Procesadores AMD'   THEN 'AMD'
               WHEN ct.name = 'Monitores'    AND c.name = 'Full HD'            THEN 'Full HD (1920x1080)'
               WHEN ct.name = 'Monitores'    AND c.name = 'QHD'                THEN 'QHD (2560x1440)'
               ELSE c.name
             END
WHERE c.name IN ('Procesadores Intel', 'Procesadores AMD', 'Full HD', 'QHD');

-- ============================================================
-- SEEDER: Grupo cerrado de pruebas (Clientes + Pedidos)
-- Para el panel administrativo. Idempotente (IDs explícitos +
-- INSERT IGNORE / NOT EXISTS): se puede reiniciar sin duplicar.
-- Password de todos los clientes nuevos: Cliente123*
-- ============================================================

-- ------------------------------------------------------------
-- 10 clientes de prueba (IDs 101-110)
-- ------------------------------------------------------------
INSERT IGNORE INTO users (user_id, first_name, last_name, email, phone, role, status, verified, password_hash, created_at)
VALUES
  (101, 'Andrés',      'Rojas',     'andres.rojas@example.com',     '3101110001', 'CLIENT', 'ACTIVE',    true,  '$2b$10$x2SwgOhBEHC0m/PHKpC83eOopNYXIKkVXj8WU7EvGRuEh0MGTE6MK', '2026-04-02 10:00:00'),
  (102, 'Camila',      'Vega',      'camila.vega@example.com',      '3101110002', 'CLIENT', 'ACTIVE',    true,  '$2b$10$x2SwgOhBEHC0m/PHKpC83eOopNYXIKkVXj8WU7EvGRuEh0MGTE6MK', '2026-05-11 09:30:00'),
  (103, 'Mateo',       'Herrera',   'mateo.herrera@example.com',    '3101110003', 'CLIENT', 'ACTIVE',    false, '$2b$10$x2SwgOhBEHC0m/PHKpC83eOopNYXIKkVXj8WU7EvGRuEh0MGTE6MK', '2026-06-20 15:45:00'),
  (104, 'Valentina',   'López',     'valentina.lopez@example.com',  '3101110004', 'CLIENT', 'ACTIVE',    true,  '$2b$10$x2SwgOhBEHC0m/PHKpC83eOopNYXIKkVXj8WU7EvGRuEh0MGTE6MK', '2026-07-03 11:20:00'),
  (105, 'Sebastián',   'Morales',   'sebastian.morales@example.com','3101110005', 'CLIENT', 'ACTIVE',    true,  '$2b$10$x2SwgOhBEHC0m/PHKpC83eOopNYXIKkVXj8WU7EvGRuEh0MGTE6MK', '2026-07-18 16:05:00'),
  (106, 'Isabella',    'Castro',    'isabella.castro@example.com',  '3101110006', 'CLIENT', 'SUSPENDED', false, '$2b$10$x2SwgOhBEHC0m/PHKpC83eOopNYXIKkVXj8WU7EvGRuEh0MGTE6MK', '2026-08-05 14:10:00'),
  (107, 'Santiago',    'Reyes',     'santiago.reyes@example.com',   '3101110007', 'CLIENT', 'ACTIVE',    true,  '$2b$10$x2SwgOhBEHC0m/PHKpC83eOopNYXIKkVXj8WU7EvGRuEh0MGTE6MK', '2026-08-22 10:40:00'),
  (108, 'Lucía',       'Mendoza',   'lucia.mendoza@example.com',    '3101110008', 'CLIENT', 'ACTIVE',    true,  '$2b$10$x2SwgOhBEHC0m/PHKpC83eOopNYXIKkVXj8WU7EvGRuEh0MGTE6MK', '2026-09-06 17:30:00'),
  (109, 'Daniel',      'Ortiz',     'daniel.ortiz@example.com',     '3101110009', 'CLIENT', 'INACTIVE',  false, '$2b$10$x2SwgOhBEHC0m/PHKpC83eOopNYXIKkVXj8WU7EvGRuEh0MGTE6MK', '2026-09-19 12:15:00'),
  (110, 'Gabriela',    'Fuentes',   'gabriela.fuentes@example.com', '3101110010', 'CLIENT', 'ACTIVE',    true,  '$2b$10$x2SwgOhBEHC0m/PHKpC83eOopNYXIKkVXj8WU7EvGRuEh0MGTE6MK', '2026-10-01 08:50:00');

-- ------------------------------------------------------------
-- Códigos promocionales: reactivar los caducados y añadir 2 nuevos
-- ------------------------------------------------------------
UPDATE promo_codes
SET expiration_date = '2026-12-31 23:59:59'
WHERE code IN ('BIENVENIDO', 'GAMER10', 'NUEVO20', 'VERANO25')
  AND (expiration_date IS NULL OR expiration_date < '2026-12-31 00:00:00');

INSERT IGNORE INTO promo_codes (code, discount_percentage, expiration_date, remaining_uses, for_discounted_products_only, active)
VALUES
  ('ASTRO15',  15.0, '2026-12-31 23:59:59', 150, false, true),
  ('FLASH30',  30.0, '2026-11-30 23:59:59', 50,  false, true);

-- ------------------------------------------------------------
-- Productos con descuento de ejemplo (12 productos destacados)
-- ------------------------------------------------------------
UPDATE products
SET discount_price = ROUND(price * 0.85, 2)
WHERE product_id IN (1, 9, 13, 18, 24, 35, 42, 51, 53, 58, 71, 86)
  AND discount_price IS NULL;

-- ------------------------------------------------------------
-- 19 pedidos de prueba (IDs 1001-1019) — abr 2026 a sep 2026
-- ------------------------------------------------------------
INSERT IGNORE INTO orders (order_id, order_date, status, payment_method, user_id, total)
VALUES
  (1001, '2026-04-10 10:15:00', 'DELIVERED',      'CREDIT_CARD',      1,   0),
  (1002, '2026-05-08 15:40:00', 'DELIVERED',      'BANK_TRANSFER',    2,   0),
  (1003, '2026-06-12 09:20:00', 'CANCELLED',      'CASH_ON_DELIVERY', 3,   0),
  (1004, '2026-07-05 11:05:00', 'DELIVERED',      'CREDIT_CARD',      5,   0),
  (1005, '2026-07-14 16:30:00', 'DELIVERED',      'BANK_TRANSFER',    101, 0),
  (1006, '2026-07-22 12:45:00', 'DELIVERED',      'CREDIT_CARD',      6,   0),
  (1007, '2026-07-29 18:10:00', 'CANCELLED',      'CASH_ON_DELIVERY', 102, 0),
  (1008, '2026-08-04 10:00:00', 'DELIVERED',      'CREDIT_CARD',      103, 0),
  (1009, '2026-08-11 14:25:00', 'SHIPPED',        'BANK_TRANSFER',    2,   0),
  (1010, '2026-08-18 17:50:00', 'DELIVERED',      'CREDIT_CARD',      104, 0),
  (1011, '2026-08-25 09:35:00', 'DELIVERED',      'CASH_ON_DELIVERY', 105, 0),
  (1012, '2026-08-29 13:20:00', 'SHIPPED',        'BANK_TRANSFER',    1,   0),
  (1013, '2026-09-03 11:15:00', 'DELIVERED',      'CREDIT_CARD',      106, 0),
  (1014, '2026-09-09 15:55:00', 'SHIPPED',        'BANK_TRANSFER',    107, 0),
  (1015, '2026-09-15 10:40:00', 'IN_PREPARATION', 'CREDIT_CARD',      108, 0),
  (1016, '2026-09-20 16:20:00', 'DELIVERED',      'CASH_ON_DELIVERY', 9,   0),
  (1017, '2026-09-26 12:10:00', 'IN_PREPARATION', 'CREDIT_CARD',      109, 0),
  (1018, '2026-09-29 17:30:00', 'PENDING',        'BANK_TRANSFER',    110, 0),
  (1019, '2026-09-30 09:45:00', 'PENDING',        'CREDIT_CARD',      101, 0);

-- ------------------------------------------------------------
-- Ítems de los pedidos (nombre y precio tomados del catálogo real)
-- ------------------------------------------------------------
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2001, 1001, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 7;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2002, 1001, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 42;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2003, 1002, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 12;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2004, 1003, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 55;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2005, 1004, p.product_id, p.name, 2, p.price, 2 * p.price       FROM products p WHERE p.product_id = 18;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2006, 1004, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 28;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2007, 1005, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 77;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2008, 1006, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 53;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2009, 1007, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 24;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2010, 1007, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 40;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2011, 1008, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 86;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2012, 1009, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 58;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2013, 1010, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 95;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2014, 1010, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 15;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2015, 1011, p.product_id, p.name, 2, p.price, 2 * p.price       FROM products p WHERE p.product_id = 35;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2016, 1012, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 63;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2017, 1012, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 9;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2018, 1013, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 13;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2019, 1013, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 99;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2020, 1014, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 71;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2021, 1015, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 1;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2022, 1015, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 105;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2023, 1016, p.product_id, p.name, 2, p.price, 2 * p.price       FROM products p WHERE p.product_id = 20;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2024, 1016, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 22;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2025, 1017, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 30;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2026, 1017, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 80;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2027, 1018, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 110;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2028, 1019, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 51;
INSERT IGNORE INTO order_items (order_item_id, order_id, product_id, product_name, quantity, final_price, subtotal)
SELECT 2029, 1019, p.product_id, p.name, 1, p.price, 1 * p.price       FROM products p WHERE p.product_id = 7;

-- Totales de los pedidos nuevos = suma de sus ítems
UPDATE orders o
JOIN (SELECT order_id, SUM(subtotal) AS s FROM order_items GROUP BY order_id) x
  ON x.order_id = o.order_id
SET o.total = x.s
WHERE o.order_id BETWEEN 1001 AND 1019;

-- ------------------------------------------------------------
-- Promociones aplicadas (1 por pedido) para poblar estadísticas
-- ------------------------------------------------------------
INSERT IGNORE INTO applied_promo_codes (order_id, promo_code, user_id, application_date)
VALUES
  (1004, 'GAMER10',   5,   '2026-07-05 11:10:00'),
  (1005, 'BIENVENIDO', 101, '2026-07-14 16:35:00'),
  (1008, 'NUEVO20',   103, '2026-08-04 10:05:00'),
  (1010, 'VERANO25',  104, '2026-08-18 17:55:00'),
  (1013, 'GAMER10',   106, '2026-09-03 11:20:00'),
  (1016, 'ASTRO15',   9,   '2026-09-20 16:25:00');

-- Ajustar el total de los pedidos con promoción: total = suma ítems - descuento
UPDATE orders o
JOIN (
    SELECT a.order_id,
           x.s,
           SUM(pc.discount_percentage) AS pct
    FROM applied_promo_codes a
    JOIN promo_codes pc ON pc.code = a.promo_code
    JOIN (SELECT order_id, SUM(subtotal) AS s FROM order_items GROUP BY order_id) x
      ON x.order_id = a.order_id
    GROUP BY a.order_id, x.s
) d ON d.order_id = o.order_id
SET o.total = ROUND(d.s * (1 - d.pct / 100), 2)
WHERE o.order_id BETWEEN 1001 AND 1019;

-- ------------------------------------------------------------
-- Historial de estados (generado desde el estado actual de cada
-- pedido; NOT EXISTS lo hace idempotente)
-- ------------------------------------------------------------
INSERT IGNORE INTO order_status_history (order_id, previous_status, new_status, observation, changed_at)
SELECT o.order_id, 'PENDING', 'IN_PREPARATION', 'Preparación iniciada', DATE_ADD(o.order_date, INTERVAL 6 HOUR)
FROM orders o
WHERE o.status IN ('IN_PREPARATION', 'SHIPPED', 'DELIVERED')
  AND NOT EXISTS (
    SELECT 1 FROM order_status_history h
    WHERE h.order_id = o.order_id AND h.new_status = 'IN_PREPARATION'
  );

INSERT IGNORE INTO order_status_history (order_id, previous_status, new_status, observation, changed_at)
SELECT o.order_id, 'IN_PREPARATION', 'SHIPPED', 'Paquete enviado al cliente', DATE_ADD(o.order_date, INTERVAL 30 HOUR)
FROM orders o
WHERE o.status IN ('SHIPPED', 'DELIVERED')
  AND NOT EXISTS (
    SELECT 1 FROM order_status_history h
    WHERE h.order_id = o.order_id AND h.new_status = 'SHIPPED'
  );

INSERT IGNORE INTO order_status_history (order_id, previous_status, new_status, observation, changed_at)
SELECT o.order_id, 'SHIPPED', 'DELIVERED', 'Entrega confirmada', DATE_ADD(o.order_date, INTERVAL 78 HOUR)
FROM orders o
WHERE o.status = 'DELIVERED'
  AND NOT EXISTS (
    SELECT 1 FROM order_status_history h
    WHERE h.order_id = o.order_id AND h.new_status = 'DELIVERED'
  );

INSERT IGNORE INTO order_status_history (order_id, previous_status, new_status, observation, changed_at)
SELECT o.order_id, 'PENDING', 'CANCELLED', 'Pedido cancelado', DATE_ADD(o.order_date, INTERVAL 12 HOUR)
FROM orders o
WHERE o.status = 'CANCELLED'
  AND NOT EXISTS (
    SELECT 1 FROM order_status_history h
    WHERE h.order_id = o.order_id AND h.new_status = 'CANCELLED'
  );
