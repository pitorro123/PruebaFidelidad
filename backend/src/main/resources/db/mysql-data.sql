-- ============================================================
-- Programa de fidelidad - Datos semilla MySQL
-- Alimenta las listas desplegables del formulario.
-- INSERT IGNORE: puede ejecutarse en cada arranque sin duplicar.
-- ============================================================

-- Marcas del grupo (6 del enunciado)
INSERT IGNORE INTO marcas (id, nombre) VALUES
    (1, 'Americanino'),
    (2, 'American Eagle'),
    (3, 'Chevignon'),
    (4, 'Esprit'),
    (5, 'Naf Naf'),
    (6, 'Rifle');

-- Tipos de identificacion
INSERT IGNORE INTO tipos_identificacion (id, codigo, nombre) VALUES
    (1, 'CC',        'Cedula de Ciudadania'),
    (2, 'CE',        'Cedula de Extranjeria'),
    (3, 'NIT',       'NIT'),
    (4, 'PASAPORTE', 'Pasaporte'),
    (5, 'TI',        'Tarjeta de Identidad');

-- Paises
INSERT IGNORE INTO paises (id, nombre) VALUES
    (1, 'Colombia'),
    (2, 'Mexico'),
    (3, 'Chile');

-- Departamentos de Colombia
INSERT IGNORE INTO departamentos (id, nombre, pais_id) VALUES
    (1, 'Antioquia',        1),
    (2, 'Bogota D.C.',      1),
    (3, 'Atlantico',        1),
    (4, 'Valle del Cauca',  1),
    (5, 'Santander',        1),
    (6, 'Cundinamarca',     1);

-- Ciudades
INSERT IGNORE INTO ciudades (id, nombre, departamento_id) VALUES
    (1,  'Medellin',     1),
    (2,  'Bello',        1),
    (3,  'Envigado',     1),
    (4,  'Itagui',       1),
    (5,  'Rionegro',     1),
    (6,  'Bogota',       2),
    (7,  'Barranquilla', 3),
    (8,  'Soledad',      3),
    (9,  'Malambo',      3),
    (10, 'Cali',         4),
    (11, 'Buenaventura', 4),
    (12, 'Palmira',      4),
    (13, 'Bucaramanga',  5),
    (14, 'Floridablanca',5),
    (15, 'Giron',        5),
    (16, 'Soacha',       6),
    (17, 'Chia',         6),
    (18, 'Zipaquiria',   6);