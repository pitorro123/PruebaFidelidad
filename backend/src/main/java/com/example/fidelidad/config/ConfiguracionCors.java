package com.example.fidelidad.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Permite que el frontend consuma el backend (local y desplegado).
 * Origenes configurables con la propiedad app.cors.allowed-origins
 * (variable de entorno APP_CORS_ALLOWED_ORIGINS, separados por coma).
 */
@Configuration
public class ConfiguracionCors implements WebMvcConfigurer {

    @Value("${app.cors.allowed-origins:}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        List<String> origenes = new ArrayList<>(List.of("http://localhost:[*]", "http://127.0.0.1:[*]"));
        if (allowedOrigins != null && !allowedOrigins.isBlank()) {
            origenes.addAll(Arrays.asList(allowedOrigins.split(",")));
        }
        registry.addMapping("/api/**")
                .allowedOriginPatterns(origenes.toArray(new String[0]))
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}