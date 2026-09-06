package com.example.fidelidad.dtos.fidelidad;

public record VerificacionRequestDTO(
        Long tipoIdentificacionId,
        String numeroIdentificacion,
        Long marcaId
) {
}