package com.example.fidelidad;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Punto de entrada del backend del formulario de fidelidad.
 *
 * Con la aplicacion corriendo:
 *   - Swagger  : http://localhost:8080/swagger-ui.html
 *   - JSON API : http://localhost:8080/v3/api-docs
 *   - H2       : http://localhost:8080/h2-console (perfil por defecto)
 */
@SpringBootApplication
public class FidelidadApplication {

	public static void main(String[] args) {
		SpringApplication.run(FidelidadApplication.class, args);
	}
}