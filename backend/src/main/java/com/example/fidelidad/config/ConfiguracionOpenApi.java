package com.example.fidelidad.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "API Programa de Fidelidad",
        version = "1.0",
        description = """
            Formulario de inscripcion al programa de fidelidad de las marcas del grupo:
            Americanino, American Eagle, Chevignon, Esprit, Naf Naf y Rifle.
            Ejercicio de valoracion tecnica - area de medios digitales.
            """,
        contact = @Contact(name = "Andres")
    ),
    servers = @Server(url = "http://localhost:8080", description = "Entorno local de desarrollo")
)
public class ConfiguracionOpenApi {
}