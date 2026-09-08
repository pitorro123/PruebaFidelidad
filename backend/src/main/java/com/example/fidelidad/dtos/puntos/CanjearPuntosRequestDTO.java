package com.example.fidelidad.dtos.puntos;

public record CanjearPuntosRequestDTO(
        Long tipoIdentificacionId,
        String numeroIdentificacion,
        Long marcaId,
        Integer puntos,
        String referencia
) {
}