package com.example.fidelidad.dtos.puntos;

public record AcumularPuntosRequestDTO(
        Long tipoIdentificacionId,
        String numeroIdentificacion,
        Long marcaId,
        Integer valorCompra,
        String referencia
) {
}