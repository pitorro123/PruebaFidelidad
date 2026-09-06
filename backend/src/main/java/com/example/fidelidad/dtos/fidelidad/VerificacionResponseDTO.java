package com.example.fidelidad.dtos.fidelidad;

/**
 * Respuesta del endpoint de verificacion: dice si una identificacion ya esta
 * inscrita en la marca seleccionada y, si existe, devuelve el registro.
 */
public record VerificacionResponseDTO(
        boolean inscrito,
        ClienteFidelidadResponseDTO registroExistente
) {
}