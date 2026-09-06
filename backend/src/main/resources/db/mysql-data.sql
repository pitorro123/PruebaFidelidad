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

-- Departamentos de Mexico
INSERT IGNORE INTO departamentos (id, nombre, pais_id) VALUES
    (7,  'Ciudad de Mexico',   2),
    (8,  'Jalisco',            2),
    (9,  'Nuevo Leon',         2),
    (10, 'Estado de Mexico',   2);

-- Departamentos (regiones) de Chile
INSERT IGNORE INTO departamentos (id, nombre, pais_id) VALUES
    (11, 'Region Metropolitana', 3),
    (12, 'Valparaiso',           3),
    (13, 'Biobio',               3);

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
    (18, 'Zipaquiria',   6),

    -- Ciudades de Mexico
    (19, 'Ciudad de Mexico', 7),
    (20, 'Guadalajara',      8),
    (21, 'Zapopan',          8),
    (22, 'Monterrey',        9),
    (23, 'Guadalupe',        9),
    (24, 'Ecatepec',        10),
    (25, 'Toluca',          10),

    -- Ciudades de Chile
    (26, 'Santiago',    11),
    (27, 'Providencia', 11),
    (28, 'Las Condes',  11),
    (29, 'Valparaiso',  12),
    (30, 'Vina del Mar', 12),
    (31, 'Concepcion',  13),
    (32, 'Talcahuano',  13);