package com.example.fidelidad.servicios.correo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class ServicioCorreoImpl implements IServicioCorreo {

    private static final Logger log = LoggerFactory.getLogger(ServicioCorreoImpl.class);

    private final JavaMailSender mailSender;
    private final String remitente;

    public ServicioCorreoImpl(JavaMailSender mailSender,
                              @Value("${spring.mail.username:}") String remitente) {
        this.mailSender = mailSender;
        this.remitente = remitente;
    }

    @Override
    @Async
    public void enviarBienvenida(String email, String nombre, String marca, boolean incluirDescuento) {
        if (email == null || email.isBlank()) {
            log.warn("No se envio correo de bienvenida: el email esta vacio");
            return;
        }

        String nombreUsuario = (nombre == null || nombre.isBlank()) ? "amigo" : nombre.trim();

        String asunto = incluirDescuento
                ? "Bienvenido a ReVuelta - tu 20% de descuento te espera"
                : "Bienvenido a ReVuelta";

        StringBuilder texto = new StringBuilder();
        texto.append("Hola ").append(nombreUsuario).append(",\n\n");
        texto.append("Estamos felices de tenerte en ReVuelta.");
        if (marca != null && !marca.isBlank()) {
            texto.append(" Te registraste al programa de fidelidad de ").append(marca).append(".\n\n");
        } else {
            texto.append("\n\n");
        }
        if (incluirDescuento) {
            texto.append("Ya cuentas con un 20% de descuento en tu primera compra.\n\n");
        }
        texto.append("Disfruta de descuentos exclusivos, trueques de prendas y ofertas especiales de todas las marcas del grupo.\n\n");
        texto.append("¡Dale otra vuelta a tu estilo!\n");
        texto.append("El equipo de ReVuelta");

        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setFrom(remitente);
        mensaje.setTo(email.trim());
        mensaje.setSubject(asunto);
        mensaje.setText(texto.toString());

        try {
            mailSender.send(mensaje);
            log.info("Correo de bienvenida enviado a {}", email);
        } catch (Exception ex) {
            log.warn("No se pudo enviar correo de bienvenida a {}: {}", email, ex.getMessage());
        }
    }
}