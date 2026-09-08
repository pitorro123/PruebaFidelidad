package com.example.fidelidad.dtos.campanas;

import java.time.LocalDate;

public record CuponResponseDTO(
        Long id,
        String codigo,
        String tipo,
        Integer descuentoPorcentaje,
        LocalDate fechaExpiracion,
        String estado,
        String campanaNombre
) {
}