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
