package com.example.fidelidad.servicios.correo;

import com.example.fidelidad.modelos.Cupon;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class ServicioCorreoImpl implements IServicioCorreo {

    private static final Logger log = LoggerFactory.getLogger(ServicioCorreoImpl.class);
    private static final String COLOR_PINE = "#1f5e4a";
    private static final String COLOR_MOSS = "#3e9c7a";
    private static final String COLOR_MARIGOLD = "#f2a03d";

    private static final String COLOR_INK = "#22251f";

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

        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper ayuda = new MimeMessageHelper(mensaje, true, "UTF-8");
            ayuda.setFrom(remitente);
            ayuda.setTo(email.trim());
            ayuda.setSubject(asunto);
            ayuda.setText(construirHtml(nombreUsuario, marca, incluirDescuento), true);
            mailSender.send(mensaje);
            log.info("Correo de bienvenida enviado a {}", email);
        } catch (Exception ex) {
            log.warn("No se pudo enviar correo de bienvenida a {}: {}", email, ex.getMessage());
        }
    }

    @Override
    @Async
    public void enviarBienvenidaConBono(String email, String nombre, String marca, Cupon bonoCumpleanos) {
        if (email == null || email.isBlank()) {
            log.warn("No se envio correo de bienvenida: el email esta vacio");
            return;
        }

        String nombreUsuario = (nombre == null || nombre.isBlank()) ? "amigo" : nombre.trim();
        String asunto = "Bienvenido a ReVuelta - tu 20% y tu bono de cumpleanos te esperan";

        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper ayuda = new MimeMessageHelper(mensaje, true, "UTF-8");
            ayuda.setFrom(remitente);
            ayuda.setTo(email.trim());
            ayuda.setSubject(asunto);
            ayuda.setText(construirHtml(nombreUsuario, marca, true, bonoCumpleanos), true);
            mailSender.send(mensaje);
            log.info("Correo de bienvenida con bono enviado a {}", email);
        } catch (Exception ex) {
            log.warn("No se pudo enviar correo de bienvenida a {}: {}", email, ex.getMessage());
        }
    }

    private String construirHtml(String nombre, String marca, boolean incluirDescuento) {
        return construirHtml(nombre, marca, incluirDescuento, null);
    }

    private String construirHtml(String nombre, String marca, boolean incluirDescuento, Cupon bonoCumpleanos) {
        StringBuilder cuerpo = new StringBuilder();

        String etiquetaBloque;
        String mensajePrincipal;
        if (incluirDescuento) {
            etiquetaBloque = "Programa de fidelidad";
            mensajePrincipal = "Te registraste al programa de fidelidad"
                    + (marca != null && !marca.isBlank() ? " de <strong style=\"color:" + COLOR_PINE + "\">" + escaparHtml(marca) + "</strong>" : "")
                    + ". Ya cuentas con un <strong style=\"color:" + COLOR_PINE + "\">20% de descuento</strong> en tu primera compra.";
        } else {
            etiquetaBloque = "Estamos felices de tenerte";
            mensajePrincipal = "Tu cuenta en ReVuelta fue creada con exito. Compra, vende y truequea prendas en un solo lugar.";
        }

        cuerpo.append("<!DOCTYPE html>")
                .append("<html lang=\"es\">")
                .append("<head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>Bienvenido a ReVuelta</title></head>")
                .append("<body style=\"margin:0;padding:0;background-color:#f6f3ec;\">")
                .append("<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color:#f6f3ec;\">")
                .append("<tr><td align=\"center\" style=\"padding:32px 16px;\">")
                .append("<table role=\"presentation\" width=\"600\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;max-width:600px;background-color:#ffffff;border-radius:14px;border:1px solid #e7e2d6;overflow:hidden;\">")

                // Cabecera
                .append("<tr><td align=\"center\" style=\"background-color:").append(COLOR_PINE).append(";padding:30px 24px;\">")
                .append("<h1 style=\"margin:0;font-family:Georgia,'Times New Roman',serif;font-size:34px;font-weight:700;letter-spacing:2px;color:#ffffff;\">REVUELTA</h1>")
                .append("<p style=\"margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:").append(COLOR_MARIGOLD).append(";\">Tu estilo da otra vuelta</p>")
                .append("</td></tr>")

                // Divisor marigold
                .append("<tr><td style=\"height:4px;background-color:").append(COLOR_MARIGOLD).append(";\"></td></tr>")

                // Cuerpo
                .append("<tr><td style=\"padding:30px 32px;font-family:Arial,Helvetica,sans-serif;\">")
                .append("<span style=\"display:inline-block;margin:0 0 12px;padding:5px 12px;background-color:").append(COLOR_MARIGOLD).append(";color:").append(COLOR_PINE).append(";border-radius:999px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;\">").append(etiquetaBloque).append("</span>")
                .append("<h2 style=\"margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-size:24px;color:").append(COLOR_PINE).append(";\">Hola, ").append(escaparHtml(nombre)).append("</h2>")
                .append("<p style=\"margin:0 0 12px;font-size:15px;line-height:1.6;color:#3c3a34;\">").append(mensajePrincipal).append("</p>");

                if (bonoCumpleanos != null) {
                    cuerpo.append("<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin:4px 0 16px;background-color:").append(COLOR_MARIGOLD).append(";border-radius:12px;\">")
                            .append("<tr><td style=\"padding:16px 18px;\">")
                            .append("<p style=\"margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:").append(COLOR_PINE).append(";\">🎂 Tu bono de cumpleanos</p>")
                            .append("<p style=\"margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:").append(COLOR_PINE).append(";\">").append(bonoCumpleanos.getDescuentoPorcentaje()).append("% de descuento con el codigo <span style=\"color:#ffffff;background-color:").append(COLOR_PINE).append(";padding:2px 8px;border-radius:6px;\">").append(escaparHtml(bonoCumpleanos.getCodigo())).append("</span></p>")
                            .append("<p style=\"margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:").append(COLOR_PINE).append(";\">Vence el ").append(bonoCumpleanos.getFechaExpiracion()).append(". Disfrutalo durante tu mes de nacimiento.</p>")
                            .append("</td></tr></table>");
                }

                // Beneficios
                cuerpo.append("<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin:8px 0 16px;\">")
                .append("<tr>")
                .append(beneficio("20% en tu primera compra"))
                .append(beneficio("Ofertas exclusivas de tus marcas"))
                .append(beneficio("Acumula SUMAS en cada compra"))
                .append("</tr></table>")

                .append("<p style=\"margin:0;font-size:13px;line-height:1.5;color:").append(COLOR_INK).append(";\">Disfruta de descuentos, trueques de prendas y ofertas especiales de todas las marcas del grupo. Tu saldo de SUMAS crece con cada compra y puedes canjearlo cuando quieras.</p>")
                .append("</td></tr>")

                // Pie
                .append("<tr><td align=\"center\" style=\"background-color:#f6f3ec;padding:20px 24px;border-top:1px solid #e7e2d6;\">")
                .append("<p style=\"margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:").append(COLOR_MOSS).append(";\">El equipo de ReVuelta</p>")
                .append("<p style=\"margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8a8678;\">Si tienes dudas, responde este correo y te ayudamos.</p>")
                .append("</td></tr>")

                .append("</table>")
                .append("</td></tr></table>")
                .append("</body></html>");

        return cuerpo.toString();
    }

    private String beneficio(String texto) {
        return "<td align=\"center\" width=\"33%\" style=\"padding:10px 6px;\">"
                + "<div style=\"background-color:#f6f3ec;border:1px solid #e7e2d6;border-radius:10px;padding:12px 8px;\">"
                + "<div style=\"width:10px;height:10px;margin:0 auto 8px;background-color:" + COLOR_MARIGOLD + ";border-radius:50%;\"></div>"
                + "<span style=\"font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:" + COLOR_PINE + ";line-height:1.3;\">" + texto + "</span>"
                + "</div></td>";
    }

    private String escaparHtml(String texto) {
        if (texto == null) {
            return "";
        }
        return texto
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;");
    }
}