package com.example.fidelidad.dtos.fidelidad;

public record VerificacionResponseDTO(
        boolean inscrito,
        ClienteFidelidadResponseDTO registroExistente
) {
}