CREATE TABLE IF NOT EXISTS paises (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS departamentos (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    pais_id BIGINT NOT NULL,
    CONSTRAINT uk_departamento UNIQUE (pais_id, nombre),
    CONSTRAINT fk_departamento_pais FOREIGN KEY (pais_id) REFERENCES paises (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS ciudades (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    departamento_id BIGINT NOT NULL,
    CONSTRAINT uk_ciudad UNIQUE (departamento_id, nombre),
    CONSTRAINT fk_ciudad_departamento FOREIGN KEY (departamento_id) REFERENCES departamentos (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS tipos_identificacion (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(10) NOT NULL UNIQUE,
    nombre VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS marcas (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS productos (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    categoria VARCHAR(60) NOT NULL,
    talla VARCHAR(10) NOT NULL,
    color VARCHAR(40) NOT NULL,
    marca_id BIGINT NOT NULL,
    precio INT NOT NULL,
    estado_prenda VARCHAR(30) NOT NULL,
    disponible_para VARCHAR(30) NOT NULL,
    imagen VARCHAR(500) NOT NULL,
    CONSTRAINT fk_producto_marca FOREIGN KEY (marca_id) REFERENCES marcas (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS clientes_fidelidad (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo_identificacion_id BIGINT NOT NULL,
    numero_identificacion VARCHAR(20) NOT NULL,
    nombres VARCHAR(80) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    ciudad_id BIGINT NOT NULL,
    departamento_id BIGINT NOT NULL,
    pais_id BIGINT NOT NULL,
    marca_id BIGINT NOT NULL,
    fecha_registro DATE NOT NULL,
    CONSTRAINT uk_cliente_marca UNIQUE (tipo_identificacion_id, numero_identificacion, marca_id),
    CONSTRAINT fk_cliente_tipo FOREIGN KEY (tipo_identificacion_id) REFERENCES tipos_identificacion (id),
    CONSTRAINT fk_cliente_ciudad FOREIGN KEY (ciudad_id) REFERENCES ciudades (id),
    CONSTRAINT fk_cliente_departamento FOREIGN KEY (departamento_id) REFERENCES departamentos (id),
    CONSTRAINT fk_cliente_pais FOREIGN KEY (pais_id) REFERENCES paises (id),
    CONSTRAINT fk_cliente_marca FOREIGN KEY (marca_id) REFERENCES marcas (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;