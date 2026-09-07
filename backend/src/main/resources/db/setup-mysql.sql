CREATE DATABASE IF NOT EXISTS fidelidad
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'fidelidad'@'localhost' IDENTIFIED BY 'fidelidad123';
GRANT ALL PRIVILEGES ON fidelidad.* TO 'fidelidad'@'localhost';
FLUSH PRIVILEGES;