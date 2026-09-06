-- ============================================================
-- Prueba de valoracion - Programa de fidelidad
-- Setup inicial de MySQL (se ejecuta UNA sola vez en el servidor)
-- ============================================================

CREATE DATABASE IF NOT EXISTS fidelidad
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'fidelidad'@'localhost' IDENTIFIED BY 'fidelidad123';
GRANT ALL PRIVILEGES ON fidelidad.* TO 'fidelidad'@'localhost';
FLUSH PRIVILEGES;

-- Conexion JDBC resultante (ver application-mysql.properties):
--   jdbc:mysql://localhost:3306/fidelidad
-- Usuario: fidelidad  /  Clave: fidelidad123
--
-- Alternativa si ya tienes MySQL con root:
--   mysql -u root -p < db/setup-mysql.sql
--   ./mvnw spring-boot:run -Dspring-boot.run.profiles=mysql
-- (las credenciales se pueden sobreescribir con DB_USERNAME / DB_PASSWORD)