INSERT IGNORE INTO marcas (id, nombre) VALUES
    (1, 'Americanino'),
    (2, 'American Eagle'),
    (3, 'Chevignon'),
    (4, 'Esprit'),
    (5, 'Naf Naf'),
    (6, 'Rifle');

INSERT IGNORE INTO productos (id, nombre, categoria, talla, color, marca_id, precio, estado_prenda, disponible_para, imagen) VALUES
    (1,  "Chaqueta de mezclilla negra Levi's", 'Chaquetas', 'M',  'Negro',  1, 180000, 'Nuevo', 'Unisex', 'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_01.png'),
    (2,  'Vestido rojo escote cruzado',        'Vestidos',   'S',  'Rojo',   5,  89000, 'Nuevo', 'Mujer',  'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_02.png'),
    (3,  'Jeans azules corte mom fit',         'Pantalones', 'M',  'Azul',   6, 120000, 'Excelente', 'Mujer',  'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_03.png'),
    (4,  'Blusa beige manga abullonada',       'Blusas',     'S',  'Beige',  4,  75000, 'Nuevo', 'Mujer',  'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_04.png'),
    (5,  'Polo blanco Adidas',                 'Camisas',    'L',  'Blanco', 2, 130000, 'Nuevo', 'Hombre', 'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_05.png'),
    (6,  'Falda plisada rosada',               'Faldas',     'S',  'Rosa',   5,  68000, 'Muy bueno', 'Mujer',  'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_06.png'),
    (7,  'Tenis Nike azules con gorra Adidas beige', 'Zapatos', 'M', 'Azul', 2, 175000, 'Nuevo', 'Hombre', 'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_07.png'),
    (8,  'Pantalón cargo negro',               'Pantalones', 'M',  'Negro',  3,  95000, 'Nuevo', 'Unisex', 'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_08.png'),
    (9,  'Chaqueta cortavientos roja Nike',    'Chaquetas',  'M',  'Rojo',   2, 160000, 'Nuevo', 'Unisex', 'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_09.png'),
    (10, 'Camisa de cuadros azul',             'Camisas',    'L',  'Azul',   3,  89000, 'Muy bueno', 'Hombre', 'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_10.png'),
    (11, 'Minifalda de mezclilla blanca',      'Faldas',     'S',  'Blanco', 6,  78000, 'Excelente', 'Mujer',  'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_11.png'),
    (12, 'Tenis Nike rosados',                 'Zapatos',    'M',  'Rosa',   2, 145000, 'Nuevo', 'Mujer',  'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_12.png'),
    (13, 'Cinturón de cuero negro',            'Accesorios', 'M',  'Negro',  3,  45000, 'Nuevo', 'Unisex', 'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_13.png'),
    (14, 'Pantalón cargo verde',               'Pantalones', 'M',  'Verde',  1,  98000, 'Nuevo', 'Unisex', 'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_14.png'),
    (15, 'Trench coat beige',                  'Chaquetas',  'M',  'Beige',  4, 320000, 'Nuevo', 'Mujer',  'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_15.png'),
    (16, 'Vestido amarillo infantil',          'Vestidos',   'XS', 'Amarillo', 5, 55000, 'Nuevo', 'Niño',  'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_16.png'),
    (17, 'Blusa negra de encaje',              'Blusas',     'S',  'Negro',  4,  82000, 'Muy bueno', 'Mujer',  'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_17.png'),
    (18, 'Camisa a rayas blanco y azul',       'Camisas',    'M',  'Blanco', 1,  90000, 'Nuevo', 'Mujer',  'https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_18.png');

INSERT IGNORE INTO tipos_identificacion (id, codigo, nombre) VALUES
    (1, 'CC',        'Cedula de Ciudadania'),
    (2, 'CE',        'Cedula de Extranjeria'),
    (3, 'NIT',       'NIT'),
    (4, 'PASAPORTE', 'Pasaporte'),
    (5, 'TI',        'Tarjeta de Identidad');

INSERT IGNORE INTO paises (id, nombre) VALUES
    (1, 'Colombia'),
    (2, 'Mexico'),
    (3, 'Chile');

INSERT IGNORE INTO departamentos (id, nombre, pais_id) VALUES
    (1, 'Antioquia',        1),
    (2, 'Bogota D.C.',      1),
    (3, 'Atlantico',        1),
    (4, 'Valle del Cauca',  1),
    (5, 'Santander',        1),
    (6, 'Cundinamarca',     1);

INSERT IGNORE INTO departamentos (id, nombre, pais_id) VALUES
    (7,  'Ciudad de Mexico',   2),
    (8,  'Jalisco',            2),
    (9,  'Nuevo Leon',         2),
    (10, 'Estado de Mexico',   2);

INSERT IGNORE INTO departamentos (id, nombre, pais_id) VALUES
    (11, 'Region Metropolitana', 3),
    (12, 'Valparaiso',           3),
    (13, 'Biobio',               3);

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
    (19, 'Ciudad de Mexico', 7),
    (20, 'Guadalajara',      8),
    (21, 'Zapopan',          8),
    (22, 'Monterrey',        9),
    (23, 'Guadalupe',        9),
    (24, 'Ecatepec',        10),
    (25, 'Toluca',          10),
    (26, 'Santiago',    11),
    (27, 'Providencia', 11),
    (28, 'Las Condes',  11),
    (29, 'Valparaiso',  12),
    (30, 'Vina del Mar', 12),
    (31, 'Concepcion',  13),
    (32, 'Talcahuano',  13);