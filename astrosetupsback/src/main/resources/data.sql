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
